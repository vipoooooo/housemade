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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingSchema,
  IBooking,
} from "../../../../server/router/schedule/schedule.type";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { useRouter } from "next/router";
import { hide } from "./ReportModal";

export default function BookingModal({
  isOpenB,
  setIsOpenB,
}: {
  isOpenB: boolean;
  setIsOpenB: (val: boolean) => void;
}) {
  const [css] = useStyletron();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSession();
  // const _toISOString = new Date().toISOString();
  // const _FormatISO = formatISO(new Date());
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBooking>({
    resolver: zodResolver(bookingSchema),
  });
  console.log("errors", errors);

  const { mutateAsync, error } = trpc.useMutation(["schedule.Booking"]);
  console.log(error, "adfs eror");

  const onSubmit = React.useCallback(async (data: IBooking) => {
    try {
      console.log(data, "data12121");
      const result = await mutateAsync(data);
      setIsOpenB(false);
    } catch (err) {}
  }, []);

  return (
    <ModalW
      isOpen={isOpenB}
      setIsOpen={setIsOpenB}
      title="Booking"
      hasModal={true}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <FormControl overrides={hide}>
          <Controller
            name="clientId"
            control={control}
            defaultValue={data?.id as string}
            render={({ field }) => (
              <Input {...field} type="hidden" ref={field.ref} />
            )}
          />
        </FormControl>
        <FormControl overrides={hide}>
          <Controller
            name="workerId"
            control={control}
            defaultValue={id as string}
            render={({ field }) => (
              <Input {...field} type="hidden" ref={field.ref} />
            )}
          />
        </FormControl>
        <FormControl
          label="Appointment Date"
          caption="When do you want this appointment to happen"
        >
          <Controller
            name="appointmentDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                ref={field.ref}
                value={field.value}
                onChange={({ date }) =>
                  field.onChange(Array.isArray(date) ? date[0] : [date][0])
                  // console.log(Array.isArray(date) ? date[0] : [date][0])
                }
                size={SIZE.compact}
              />
            )}
          />
        </FormControl>
        <FormControl
          label="Your Location"
          caption="Where do you want this appointment to happen"
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                required
                id="inputUsername-id"
                {...field}
                size={SIZE.compact}
              />
            )}
          />
        </FormControl>
        <FormControl
          label="Description"
          caption="When do you want this appointment to happen"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
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
            )}
          />
        </FormControl>
        <Button type="submit" kind={KIND.primary}>
          Book
        </Button>
      </div>
    </ModalW>
  );
}
