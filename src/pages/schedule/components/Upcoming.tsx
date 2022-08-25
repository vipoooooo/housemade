import * as React from "react";
import { useStyletron } from "baseui";
import { IoToday } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";

export function Upcoming({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoToday
            color={theme.colors.backgroundAccent}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundLightAccent}
        title={"Appointment on " + scheduleData.appointmentDate.toDateString()}
        date={scheduleData.createAt}
        name={scheduleData.workerName}
        location={scheduleData.location}
      />
    </RequestingWrapper>
  );
}
