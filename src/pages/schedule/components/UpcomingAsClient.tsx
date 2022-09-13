import * as React from "react";
import { useStyletron } from "baseui";
import { IoCalendar } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";
import { ParagraphSmall } from "baseui/typography";

export function UpcomingAsClient({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
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
    </RequestingWrapper>
  );
}
