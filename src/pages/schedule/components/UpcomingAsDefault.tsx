import * as React from "react";
import { useStyletron } from "baseui";
import { IoCalendar, IoClose } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { IUpdateUpcomingAppointment } from "../../../server/router/schedule/schedule.type";
import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";

export function UpcomingAsDefault({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  const utils = trpc.useContext();
  const { data: session } = useSession();

  const { mutateAsync, isLoading } = trpc.useMutation([
    "schedule.updateUpcomingAppointmentSchema",
  ]);

  const onSubmit = React.useCallback(
    async (data: IUpdateUpcomingAppointment) => {
      try {
        const result = await mutateAsync(data, {
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
          "You have an appointment with " +
          scheduleData.worker.username +
          " on " +
          scheduleData.appointmentDate.toDateString()
        }
        date={scheduleData.createdAt.toDateString()}
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
          onClick={() =>
            onSubmit({ id: scheduleData.id, senderId: session?.id as string })
          }
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
          End appointment
        </Button>
      </div>
    </RequestingWrapper>
  );
}
