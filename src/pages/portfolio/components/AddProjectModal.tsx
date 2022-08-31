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
  return (
    <ModalTemp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Project"
      hasModal={true}
    >
      <FormControl label="Cover">
        <FileUploader
          
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
