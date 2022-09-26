import * as React from "react";
import { useStyletron } from "baseui";
import { IoCalendar, IoClose } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { IDeleteUpcomingAppointment } from "../../server/router/schedule/schedule.type";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { djs } from "../../helpers/snipet";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";

export function UpcomingEndingRecieverAsClient({
  scheduleData,
}: {
  scheduleData: any;
}) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();

  const { mutateAsync, isLoading } = trpc.useMutation([
    "schedule.deleteUpcomingAppointmentSchema",
  ]);

  const onSubmit = React.useCallback(
    async (data: IDeleteUpcomingAppointment) => {
      try {
        await mutateAsync(data, {
          onSuccess: () => {
            utils.invalidateQueries(["schedule.appointments"]);
          },
        });
      } catch (err) {}
    },
    []
  );
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
          <>
            You have an appointment with
            <b> {scheduleData.worker.username} </b>
            on
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
          // startEnhancer={<IoClose size={20} />}
          overrides={{
            BaseButton: {
              style: ({ theme }) => ({
                width: "100%",
              }),
            },
          }}
        >
          Cancel request end appointment
        </Button>
      </div>
    </RequestingWrapper>
  );
}
