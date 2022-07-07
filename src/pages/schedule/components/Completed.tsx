import * as React from "react";
import { useStyletron } from "baseui";
import ScheduleContent from "./wrapper/ScheduleContent";
import { IoCheckbox } from "react-icons/io5";
import { ISchedule } from "../../../constants/schedule.const";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";

export function Completed({ scheduleData }: { scheduleData: ISchedule }) {
  const [css, theme] = useStyletron();
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoCheckbox
            color={theme.colors.backgroundPositive}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundLightPositive}
        title={"Completed on " + scheduleData.date}
        date={scheduleData.createAt}
        name={scheduleData.workerName}
        location={scheduleData.location}
      />
    </RequestingWrapper>
  );
}
