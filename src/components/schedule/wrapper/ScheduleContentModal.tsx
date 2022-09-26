import { useStyletron } from "baseui";
import { SIZE } from "baseui/button";
import * as React from "react";
import { Modal, ModalBody, ROLE } from "baseui/modal";
import { Block } from "baseui/block";
import { ParagraphSmall, ParagraphXSmall } from "baseui/typography";

export default function ScheduleContentModal({
  scheduleData,
  isOpen,
  setIsOpen,
}: {
  scheduleData: any;
  isOpen: boolean;
  button: React.ReactNode;
  setIsOpen: (val: boolean) => void;
}) {
  const [css, theme] = useStyletron();

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: { style: () => ({ borderRadius: 0 }) },
        Close: { style: () => ({ display: "none" }) },
      }}
    >
      <ModalBody display="flex" flexDirection="column">
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          })}
        >
          <div className={css({ display: "flex", gap: "10px", width: "100%" })}>
            <div
              className={css({
                display: "inline-block",
                backgroundColor: scheduleData.bg,
                padding: "10px",
                borderRadius: "50%",
                height: "44px",
              })}
            >
              {scheduleData.icon}
            </div>
            <Block
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <ParagraphSmall margin={0} className={css({ textAlign: "left" })}>
                {scheduleData.title}
              </ParagraphSmall>
              <ParagraphXSmall
                margin={0}
                color={theme.colors.contentStateDisabled}
              >
                {scheduleData.date}
              </ParagraphXSmall>
            </Block>
          </div>
          <ParagraphXSmall margin={0}>
            {scheduleData.workerName}
          </ParagraphXSmall>
          <ParagraphXSmall margin={0}>
            {scheduleData.phonenumber}
          </ParagraphXSmall>
          <ParagraphXSmall margin={0}>{scheduleData.location}</ParagraphXSmall>
          <ParagraphXSmall margin={0}>
            {scheduleData.description}
          </ParagraphXSmall>
        </div>
      </ModalBody>
    </Modal>
  );
}
