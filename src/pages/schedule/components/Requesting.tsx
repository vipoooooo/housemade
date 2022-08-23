import * as React from "react";
import { useStyletron } from "baseui";
import { IoClose, IoHandRight } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
// import { Schedule } from "../../../constants/schedule.const";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import RequestingModal from "./wrapper/ScheduleContentModal";
import { Appointment } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import { IDeleteAppointment } from "../../../server/router/schedule/schedule.type";
import { object } from "zod";

export function Requesting({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();

  const { mutateAsync, isLoading } = trpc.useMutation([
    "schedule.deleteAppointments",
  ]);

  const onSubmit = React.useCallback(async (data: IDeleteAppointment) => {
    try {
      const result = await mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["schedule.appointments"]);
        },
      });
    } catch (err) {}
  }, []);
  return (
    <>
      <RequestingWrapper>
        <ScheduleContent
          icon={
            <IoHandRight
              color={theme.colors.backgroundWarning}
              size={24}
              display={"block"}
            />
          }
          bg={theme.colors.backgroundLightWarning}
          title={
            "You’re requesting an appointment with " +
            scheduleData.worker.username +
            " on " +
            scheduleData.appointmentDate.toDateString()
          }
          date={scheduleData.createAt}
          name={scheduleData.worker.username}
          location={scheduleData.location}
        />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            // width: "calc(100% - (10px + (24px + (10px * 2))))",
            // marginLeft: "calc(10px + (24px + (10px * 2)))",
          })}
        >
          <ParagraphSmall
            margin={0}
            className={css({
              textAlign: "left",
            })}
          >
            {scheduleData.description}
          </ParagraphSmall>

          <div
            className={css({
              display: "flex",
              alignItems: "stretch",
              gap: "10px",
              width: "100%",
            })}
          >
            <Button
              onClick={() => onSubmit({ id: scheduleData.id })}
              isLoading={isLoading}
              disabled={isLoading}
              kind={KIND.secondary}
              size={SIZE.compact}
              startEnhancer={<IoClose size={20} />}
              overrides={{
                BaseButton: {
                  style: ({ theme }) => ({
                    width: "100%",
                  }),
                },
              }}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </RequestingWrapper>
    </>
  );
}
