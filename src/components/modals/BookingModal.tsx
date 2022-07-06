import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND } from "baseui/button";
import { Input } from "baseui/input";
import { IoLocate } from "react-icons/io5";
import { DatePicker, ORIENTATION } from "baseui/datepicker";
import { SIZE } from "baseui/input";

export default function BookingModal({
  isOpenB,
  setIsOpenB,
}: {
  isOpenB: boolean;
  setIsOpenB: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();
  const [inputvalue, inputsetValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [valueD, setValueD] = React.useState([new Date()]);

  return (
    <ModalTemp
      isOpen={isOpenB}
      setIsOpen={setIsOpenB}
      title="Booking"
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
          <ParagraphMedium margin={0}>Date</ParagraphMedium>
          <DatePicker
            value={valueD}
            onChange={({ date }) =>
              setValueD(Array.isArray(date) ? date : [date])
            }
          />
          <ParagraphSmall margin={0} color={theme.colors.contentStateDisabled}>
            When do you want this appointment to happen
          </ParagraphSmall>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          <ParagraphMedium margin={0}>Your Location</ParagraphMedium>
          <Input
            value={value}
            endEnhancer={<IoLocate size={20} />}
            placeholder="Input your location"
            clearOnEscape
          />
          <ParagraphSmall margin={0} color={theme.colors.contentStateDisabled}>
            Where do you want this appointment to happen
          </ParagraphSmall>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          <Block display={"flex"} justifyContent={"space-between"}>
            <ParagraphMedium margin={0}>
              Write your description here
            </ParagraphMedium>
            <ParagraphMedium margin={0} color={theme.colors.contentTertiary}>
              0 / 150
            </ParagraphMedium>
          </Block>
          <Textarea
            value={inputvalue}
            onChange={(e) => inputsetValue(e.currentTarget.value)}
            placeholder={"description"}
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
          <ParagraphSmall margin={0} color={theme.colors.contentStateDisabled}>
            Tell more about your problems
          </ParagraphSmall>
        </div>
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Book
        </Button>
      </div>
    </ModalTemp>
  );
}
