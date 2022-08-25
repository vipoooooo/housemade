import * as React from "react";
import { useStyletron } from "baseui";
import { IoCheckmark, IoClose, IoMailUnread } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import { trpc } from "../../../utils/trpc";
import { IDeleteAppointment, IUpdateAppointment } from "../../../server/router/schedule/schedule.type";

export function RequestBooking({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();

  const declineApp = trpc.useMutation([
    "schedule.deleteAppointments",
  ]);

  const acceptApp = trpc.useMutation([
    "schedule.updateAppointments",
  ]);

  const onDecline = React.useCallback(async (data: IDeleteAppointment) => {
    try {
      const result = await declineApp.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["schedule.appointments"]);
        },
      });
    } catch (err) {}
  }, []);

  const onAccept = React.useCallback(async (data: IUpdateAppointment) => {
    try {
      const result = await acceptApp.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["schedule.appointments"]);
        },
      });
    } catch (err) {}
  }, []);
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoMailUnread
            color={theme.colors.backgroundWarning}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundLightWarning}
        title={
          scheduleData.client.username +
          " want to booked on " +
          scheduleData.appointmentDate.toDateString()
        }
        date={scheduleData.createAt}
        name={scheduleData.workerName}
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
            width: "100%",
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
            onClick={() => onDecline({ id: scheduleData.id })}
            isLoading={declineApp.isLoading}
            disabled={declineApp.isLoading}
            kind={KIND.secondary}
            size={SIZE.compact}
            startEnhancer={<IoClose size={20} />}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "calc(50% - (10px/2))",
                }),
              },
            }}
          >
            Decline
          </Button>
          <Button
            onClick={() => onAccept({ id: scheduleData.id })}
            isLoading={acceptApp.isLoading}
            disabled={acceptApp.isLoading}
            kind={KIND.primary}
            size={SIZE.compact}
            startEnhancer={<IoCheckmark size={20} />}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "calc(50% - (10px/2))",
                }),
              },
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </RequestingWrapper>
  );
}
