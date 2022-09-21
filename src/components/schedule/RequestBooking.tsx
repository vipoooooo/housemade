import * as React from "react";
import { useStyletron } from "baseui";
import { IoCheckmark, IoClose, IoMailUnread } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { trpc } from "../../utils/trpc";
import {
  IDeleteAppointment,
  IUpdateAppointment,
} from "../../server/router/schedule/schedule.type";
import { djs } from "../../helpers/snipet";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";

export function RequestBooking({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();

  const declineApp = trpc.useMutation(["schedule.deleteAppointments"]);

  const acceptApp = trpc.useMutation(["schedule.updateAppointments"]);

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
            color={theme.colors.contentInversePrimary}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundInversePrimary}
        title={
          <>
            <b>{scheduleData.client.username} </b>
            want to booked on
            <b> {scheduleData.appointmentDate.toDateString()}</b>
          </>
        }
        date={djs(scheduleData.createdAt).fromNow()}
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
          // width: "calc(100% - (10px + (24px + (10px * 2))))",
          // marginLeft: "calc(10px + (24px + (10px * 2)))",
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
                style: () => ({
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
                style: () => ({
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
