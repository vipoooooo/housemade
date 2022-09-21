import * as React from "react";
import { useStyletron } from "baseui";
import { IoCheckbox } from "react-icons/io5";
import { djs } from "../../helpers/snipet";
import ScheduleContent from "./wrapper/ScheduleContent";
import { RequestingWrapper } from "./wrapper/RequestingWrapper";
export function CompletedAsClient({ scheduleData }: { scheduleData: any }) {
  const [css, theme] = useStyletron();
  return (
    <RequestingWrapper>
      <ScheduleContent
        icon={
          <IoCheckbox
            color={theme.colors.contentInversePrimary}
            size={24}
            display={"block"}
          />
        }
        bg={theme.colors.backgroundInversePrimary}
        title={
          <>
            Completed an appointment with
            <b> {scheduleData.worker.username} </b>that happened on
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
