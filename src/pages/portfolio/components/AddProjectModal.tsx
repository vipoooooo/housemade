import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../../layouts/ModalW";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { StyleObject } from "styletron-standard";

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
  return (
    <ModalTemp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Project"
      hasModal={true}
    >
      <FormControl label="Cover">
        <Block
          display={"flex"}
          position={"relative"}
          className={css({
            width: "100%",
            // gap: "20px",
          })}
        >
          <Block height={"200px"} width={"100%"}>
            <Image
              alt={"project?.title"}
              src={
                "https://i.pinimg.com/564x/fd/81/0f/fd810fa4ac3c2dc4b3fe7ce549786cd9.jpg"
              }
              objectFit={"cover"}
              priority
              layout="fill"
              className={css(image)}
            />
          </Block>
          <Block
            className={css({
              position: "absolute",
            })}
          >
            <FileUploader
              overrides={{
                FileDragAndDrop: {
                  style: ({}) => ({
                    height: "200px",
                    paddingTop: "70px",
                    transform: "translate(100%, 0)",
                    background: "transparent",
                    border: "none",
                  }),
                },
                ContentMessage: {
                  style: ({ $theme }) => ({
                    textAlign: "center",
                    display: "none",
                  }),
                },
              }}
            />
            {/* <Controller
                name="imageBase64"
                // control={control}
                defaultValue=""
                render={({ field }) => (
                )}
              /> */}
          </Block>
        </Block>
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

export const image: StyleObject = {
  objectFit: "contain",
  width: "100% !important",
  position: "relative",
  height: "unset !important",
};
