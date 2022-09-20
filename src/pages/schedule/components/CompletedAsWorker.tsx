import * as React from "react";
import { useStyletron } from "baseui";
import ScheduleContent from "./wrapper/ScheduleContent";
import { IoCheckbox, IoCheckmark } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";

export function CompletedAsWorker({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoCheckmark
            color={theme.colors.contentInversePrimary}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundInversePrimary}
        title={
          "Completed an appointment with " +
          scheduleData.client.username +
          " that happened on " +
          scheduleData.appointmentDate.toDateString()
        }
        date={scheduleData.createdAt.toDateString()}
        worker={scheduleData.worker.username}
        client={scheduleData.client.username}
        location={scheduleData.location}
        desc={scheduleData.description}
      />
    </RequestingWrapper>
  );
}
