import * as React from "react";
import { useStyletron } from "baseui";
import ScheduleContent from "./wrapper/ScheduleContent";
import { IoCheckmark } from "react-icons/io5";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
import { djs } from "../../../helpers/snipet";

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
          <>
            Completed an appointment with
            <b> {scheduleData.client.username} </b>
            that happened on
            <b> {scheduleData.appointmentDate.toDateString()}</b>
          </>
        }
        date={djs(scheduleData.createdAt).fromNow()}
        worker={scheduleData.worker.username}
        client={scheduleData.client.username}
        location={scheduleData.location}
        desc={scheduleData.description}
      />
    </RequestingWrapper>
  );
}
