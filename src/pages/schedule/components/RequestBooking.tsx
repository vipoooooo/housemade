import * as React from "react";
import { useStyletron } from "baseui";
import { IoCheckmark, IoClose, IoMailUnread } from "react-icons/io5";
import { ParagraphSmall } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { ISchedule } from "../../../constants/schedule.const";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";

export function RequestBooking({ scheduleData }: { scheduleData: ISchedule }) {
  const [css, theme] = useStyletron();
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoMailUnread
            color={theme.colors.backgroundWarning}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundLightWarning}
        title={
          "You’re requesting an appointment with " +
          scheduleData.workerName +
          " on " +
          scheduleData.date
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
            width: "100%",
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
                style: ({ $theme }) => ({
                  width: "calc(50% - (10px/2))",
                }),
              },
            }}
          >
            Decline
          </Button>
          <Button
            onClick={() => alert("click")}
            kind={KIND.primary}
            size={SIZE.compact}
            startEnhancer={<IoCheckmark size={20} />}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
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