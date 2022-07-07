import * as React from "react";
import { useStyletron } from "baseui";
import { IoClose, IoHandRight } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { ISchedule } from "../../../constants/schedule.const";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import RequestingModal from "./wrapper/ScheduleContentModal";

export function Requesting({ scheduleData }: { scheduleData: ISchedule }) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <RequestingWrapper>
        <ScheduleContent
          icon={
            <IoHandRight
              color={theme.colors.backgroundWarning}
              size={24}
              display={"block"}
            />
          }
          bg={theme.colors.backgroundLightWarning}
          title={
            scheduleData.clientName + "want to booked on " + scheduleData.date
          }
          date={scheduleData.createAt}
          name={scheduleData.workerName}
          location={scheduleData.location}
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
          <ParagraphSmall
            margin={0}
            className={css({
              textAlign: "left",
            })}
          >
            {scheduleData.description}
          </ParagraphSmall>

          <div
            className={css({
              display: "flex",
              alignItems: "stretch",
              gap: "10px",
              width: "100%",
            })}
          >
            <Button
              onClick={() => alert("click")}
              kind={KIND.secondary}
              size={SIZE.compact}
              startEnhancer={<IoClose size={20} />}
              overrides={{
                BaseButton: {
                  style: ({ theme }) => ({
                    width: "100%",
                  }),
                },
              }}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </RequestingWrapper>
    </>
  );
}
