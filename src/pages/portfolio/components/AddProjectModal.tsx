import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { InputNormal, InputPW, InputTextArea } from "../../../components/common/Input";

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

export default function AddProjectModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();
  const [inputvalue, inputsetValue] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress();

  return (
    <ModalTemp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Project"
      hasModal={true}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
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
                  // width: "200px",
                  height: "200px",
                  padding: "60px 20px",
                }),
              },
              ContentMessage: {
                style: ({ $theme }) => ({
                  textAlign: "center",
                }),
              },
            }}
          />
          <InputNormal
            label="Project Title"
            caption=""
            placeholder="Enter your project title"
            positive=""
            error=""
          />
          <InputNormal
            label="Client's name of the project"
            caption=""
            placeholder="Enter your project's client's name"
            positive=""
            error=""
          />
          <InputTextArea
            label="Description"
            caption=""
            placeholder="Describe your problem"
            positive=""
            error=""
          />
        </div>
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Submit
        </Button>
      </div>
    </ModalTemp>
  );
}
