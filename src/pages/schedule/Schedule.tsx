import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium } from "baseui/typography";
import Default from "../../layouts/Default";
import { Block } from "baseui/block";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { useStyletron } from "baseui";
import {Accordion, Panel} from 'baseui/accordion';
import { schedules, STATUS } from "../../constants/schedule.const";
import { RequestBooking } from "./components/RequestBooking";
import { Upcoming } from "./components/Upcoming";
import { Completed } from "./components/Completed";
import { Requesting } from "./components/Requesting";

const requestingData = schedules.filter(
  (item) => item.status === STATUS.REQUEST
);
const upcomingData = schedules.filter(
  (item) => item.status === STATUS.UPCOMING
);
const completedData = schedules.filter(
  (item) => item.status === STATUS.COMPLETED,
);

// Wrapper
export const ScheduleWrapper = ({children}: {children: React.ReactNode}) => {
  const [css] = useStyletron();
  return (
    <Accordion
      onChange={({expanded}) => console.log(expanded)}
      accordion
      overrides={{
        Header: {
          style: ({$theme}) => ({
            backgroundColor: $theme.colors.backgroundSecondary,
          }),
        },
        Content: {
          style: ({$theme}) => ({
            padding: '0px',
          }),
        },
      }}
    >
      {children}
    </Accordion>
  );
};

export default function Schedule() {
  return (
    <Default hasHeader={true}>
      <HeadingTitle title="Schedule" />
      <FlexGrid
          flexGridColumnCount={[1, 1, 2, 3]}
          flexGridColumnGap="scale500"
          flexGridRowGap="scale500"
          justifyContent="center"
        >
          <FlexGridItem>
            <ScheduleWrapper>
              <Panel title="Requesting...">
                {requestingData.map((item) => (
                  <Requesting scheduleData={item} />
                ))}
              </Panel>
            </ScheduleWrapper>
          </FlexGridItem>
          <FlexGridItem>
            <ScheduleWrapper>
              <Panel title="Upcoming Appointment">
                {upcomingData.map((item) => (
                  <Upcoming scheduleData={item} />
                ))}
              </Panel>
            </ScheduleWrapper>
          </FlexGridItem>
          <FlexGridItem>
            <ScheduleWrapper>
              <Panel title="Completed Appointment">
                {completedData.map((item) => (
                  <Completed scheduleData={item} />
                ))}
              </Panel>
            </ScheduleWrapper>
          </FlexGridItem>
        </FlexGrid>
    </Default>
  );
}

