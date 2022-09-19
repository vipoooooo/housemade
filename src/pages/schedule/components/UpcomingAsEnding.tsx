import * as React from "react";
import { useStyletron } from "baseui";
import { IoCalendar, IoCheckmark, IoClose } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { IDeleteUpcomingApprovalAppointment, IUpdateUpcomingApprovalAppointment } from "../../../server/router/schedule/schedule.type";
import { trpc } from "../../../utils/trpc";

export function UpcomingAsEnding({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();

  const declineApp = trpc.useMutation(["schedule.deleteUpcomingApprovalAppointmentSchema"]);

  const acceptApp = trpc.useMutation(["schedule.updateUpcomingApprovalAppointmentSchema"]);

  const onDecline = React.useCallback(async (data: IDeleteUpcomingApprovalAppointment) => {
    try {
      const result = await declineApp.mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["schedule.appointments"]);
        },
      });
    } catch (err) {}
  }, []);

  const onAccept = React.useCallback(async (data: IUpdateUpcomingApprovalAppointment) => {
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
          <IoCalendar
            color={theme.colors.contentInversePrimary}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundInversePrimary}
        title={
          "You have an appointment with " +
          scheduleData.worker.username +
          " on " +
          scheduleData.appointmentDate.toDateString()
        }
        date={scheduleData.createAt}
        worker={scheduleData.worker.username}
        client={scheduleData.client.username}
        location={scheduleData.location}
        desc={scheduleData.description}
      />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        })}
      >
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
            Approve
          </Button>
        </div>
      </div>
    </RequestingWrapper>
  );
}
