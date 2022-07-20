import * as React from "react";
import { useStyletron } from "baseui";
import ModalW from "../../../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { StarRating } from "baseui/rating";
import { FormControl } from "baseui/form-control";

export default function ReviewModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();
  const [inputvalue, inputsetValue] = React.useState("");
  const [value, setValue] = React.useState(0);

  return (
    <ModalW
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Review Submission"
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
          })}
        >
          <Block display={"flex"} justifyContent={"space-between"}>
            <ParagraphMedium margin={0}>Tap to rate:</ParagraphMedium>
            <StarRating
              numItems={5}
              onChange={(data) => setValue(data.value)}
              size={20}
              value={value}
            />
          </Block>
          <FormControl label="Write your review here">
            <Textarea
              value={inputvalue}
              onChange={(e) => inputsetValue(e.currentTarget.value)}
              size={SIZE.compact}
              placeholder={"Review..."}
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
        </div>
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Submit
        </Button>
      </div>
    </ModalW>
  );
}
