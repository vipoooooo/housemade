import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { ParagraphMedium } from "baseui/typography";
import * as React from "react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { Block } from "baseui/block";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: any, delay: number | null) {
  const savedCallback = React.useRef(() => {});
  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  React.useEffect((): any => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// useFakeProgress is an elaborate way to show a fake file transfer for illustrative purposes. You
// don't need this is your application. Use metadata from your upload destination if it's available,
// or don't provide progress.
function useFakeProgress(): [number, () => void, () => void] {
  const [fakeProgress, setFakeProgress] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  function stopFakeProgress() {
    setIsActive(false);
    setFakeProgress(0);
  }
  function startFakeProgress() {
    setIsActive(true);
  }
  useInterval(
    () => {
      if (fakeProgress >= 100) {
        stopFakeProgress();
      } else {
        setFakeProgress(fakeProgress + 10);
      }
    },
    isActive ? 500 : null
  );
  return [fakeProgress, startFakeProgress, stopFakeProgress];
}

export default function ProfileSetting() {
  const [css, theme] = useStyletron();
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress();

  return (
    <Block
      display={"flex"}
      flexDirection={["column", "column", "row", "row"]}
      className={css({
        maxWidth: "700px",
        margin: "0 auto",
        gap: "20px",
      })}
    >
      <FileUploader
        onCancel={stopFakeProgress}
        onDrop={(acceptedFiles, rejectedFiles) => {
          // handle file upload...
          console.log(acceptedFiles, rejectedFiles);
          startFakeProgress();
        }}
        // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
        progressAmount={progressAmount}
        progressMessage={
          progressAmount ? `Uploading... ${progressAmount}% of 100%` : ""
        }
        overrides={{
          FileDragAndDrop: {
            style: ({ $theme }) => ({
              width: "200px",
              height: "200px",
              padding: "50px 20px",
            }),
          },
          ContentMessage: {
            style: ({ $theme }) => ({
              textAlign: "center",
            }),
          },
        }}
      />
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {/* <InputPW
          label="Password"
          placeholder="password"
          caption=""
          positive=""
          error=""
        />
        <InputPN
          label="Phone Number"
          placeholder=""
          caption=""
          positive=""
          error=""
        /> */}
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Save Changes
        </Button>
      </div>
    </Block>
  );
}
