import * as React from "react";
import { useStyletron } from "baseui";
import ModalW from "../../../../layouts/ModalW";
import { Block } from "baseui/block";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND } from "baseui/button";
import { Input } from "baseui/input";
import { IoLocate } from "react-icons/io5";
import { DatePicker, ORIENTATION } from "baseui/datepicker";
import { SIZE } from "baseui/input";
import { FormControl } from "baseui/form-control";

export default function BookingModal({
  isOpenB,
  setIsOpenB,
}: {
  isOpenB: boolean;
  setIsOpenB: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();
  const [date, setDate] = React.useState([new Date()]);
  const [location, setLocation] = React.useState("");
  const [desc, setDesc] = React.useState("");

  return (
    <ModalW
      isOpen={isOpenB}
      setIsOpen={setIsOpenB}
      title="Booking"
      hasModal={true}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <FormControl
          label="Appointment Date"
          caption="When do you want this appointment to happen"
        >
          <DatePicker
            value={date}
            onChange={({ date }) =>
              setDate(Array.isArray(date) ? date : [date])
            }
            size={SIZE.compact}
          />
        </FormControl>
        <FormControl
          label="Your Location"
          caption="Where do you want this appointment to happen"
        >
          <Input
            required
            id="inputUsername-id"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
            size={SIZE.compact}
          />
        </FormControl>
        <FormControl
          label="Description"
          caption="When do you want this appointment to happen"
        >
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.currentTarget.value)}
            size={SIZE.compact}
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
        </FormControl>
        <Button onClick={() => alert("click")} kind={KIND.primary}>
          Book
        </Button>
      </div>
    </ModalW>
  );
}
