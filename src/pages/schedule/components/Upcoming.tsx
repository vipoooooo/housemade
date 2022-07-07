import * as React from "react";
import { useStyletron } from "baseui";
import { IoToday } from "react-icons/io5";
import { ISchedule } from "../../../constants/schedule.const";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import ScheduleContent from "./wrapper/ScheduleContent";

export function Upcoming({ scheduleData }: { scheduleData: ISchedule }) {
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
        title={"Appointment on " + scheduleData.date}
        date={scheduleData.createAt}
        name={scheduleData.workerName}
        location={scheduleData.location}
      />
    </RequestingWrapper>
  );
}
