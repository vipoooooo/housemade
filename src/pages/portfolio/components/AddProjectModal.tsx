import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

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
  const [title, setTitle] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [desc, setDesc] = React.useState("");
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
      <FormControl label="Cover">
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
      </FormControl>
      <FormControl label="Title" caption="your project title">
        <Input
          required
          id="inputTitle-id"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          size={SIZE.compact}
        />
      </FormControl>
      <FormControl
        label="Client's name"
        caption="what is the name of the project's client?"
      >
        <Input
          required
          id="inputClientName-id"
          value={clientName}
          onChange={(event) => setClientName(event.currentTarget.value)}
          size={SIZE.compact}
        />
      </FormControl>
      <FormControl
        label="Description"
        caption="Description your problem in details"
      >
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.currentTarget.value)}
          size={SIZE.compact}
          placeholder={""}
          overrides={{
            Input: {
              style: {
                maxHeight: "300px",
                minHeight: "100px",
                minWidth: "300px",
                width: "100vw", // fill all available space up to parent max-width
                resize: "both",
              },
            },
            InputContainer: {
              style: {
                maxWidth: "100%",
                width: "min-content",
              },
            },
          }}
        />
      </FormControl>
      <Button onClick={() => alert("click")} kind={KIND.primary}>
        Submit
      </Button>
      {/* </div> */}
    </ModalTemp>
  );
}
