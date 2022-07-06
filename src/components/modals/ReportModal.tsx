import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND } from "baseui/button";

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
    <ModalTemp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Report"
      hasModal={true}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          <Block display={"flex"} justifyContent={"space-between"}>
            <ParagraphMedium margin={0}>Write your report here</ParagraphMedium>
            <ParagraphMedium margin={0} color={theme.colors.contentTertiary}>
              0 / 150
            </ParagraphMedium>
          </Block>
          <Textarea
            value={inputvalue}
            onChange={(e) => inputsetValue(e.currentTarget.value)}
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
        </div>
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Submit
        </Button>
      </div>
    </ModalTemp>
  );
}
