import * as React from "react";
import { useStyletron } from "baseui";
import ModalW from "../../../../layouts/ModalW";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FormControl, FormControlOverrides } from "baseui/form-control";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  IWriteReport,
  writeReportSchema,
} from "../../../../server/router/report/report.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "baseui/input";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";

export default function ReportModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css] = useStyletron();
  const router = useRouter();
  const { data } = useSession();
  const { id } = router.query;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IWriteReport>({
    resolver: zodResolver(writeReportSchema),
  });
  console.log("errors", errors);

  const { mutateAsync, error } = trpc.useMutation(["report.report"]);
  console.log(error, "adfs eror");

  const onSubmit = React.useCallback(async (data: IWriteReport) => {
    try {
      console.log(data, "data12121");
      const result = await mutateAsync(data);
      setIsOpen(false);
    } catch (err) {}
  }, []);

  return (
    <ModalW
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Report"
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
            name="userId"
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
        <FormControl label="Write your report here">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                ref={field.ref}
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
            )}
          />
        </FormControl>
        <Button type="submit" kind={KIND.primary}>
          Submit
        </Button>
      </div>
    </ModalW>
  );
}

export const hide: FormControlOverrides = {
  ControlContainer: {
    style: ({ $theme }) => ({
      display: "none",
    }),
  },
};
