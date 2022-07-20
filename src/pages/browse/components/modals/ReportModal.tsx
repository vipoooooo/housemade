import * as React from "react";
import { useStyletron } from "baseui";
import ModalW from "../../../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";

export default function ReportModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();
  const [inputvalue, inputsetValue] = React.useState("");

  return (
    <ModalW
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Report"
      hasModal={true}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <FormControl
          label="Write your report here"
        >
          <Textarea
            value={inputvalue}
            onChange={(e) => inputsetValue(e.currentTarget.value)}
            size={SIZE.compact}
            placeholder={"report..."}
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
      </div>
    </ModalW>
  );
}
