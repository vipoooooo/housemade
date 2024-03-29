import * as React from "react";
import { useStyletron } from "baseui";
import { Modal, ModalBody, ROLE } from "baseui/modal";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { HeadingModalTitle } from "../components/shared/HeadingTitle";
import { Block } from "baseui/block";
import { IoClose } from "react-icons/io5";

export default function ModalW({
  title,
  isOpen,
  setIsOpen,
  children,
  hasModal,
  onSubmit,
}: {
  title: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  children: React.ReactNode;
  hasModal: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
  const [css] = useStyletron();
  return (
    <Modal
      unstable_ModalBackdropScroll={true}
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: () => ({
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }),
        },
        Close: { style: () => ({ display: "none" }) },
      }}
    >
      <ModalBody display={"flex"} flexDirection={"column"}>
        <form
          onSubmit={onSubmit}
          className={css({
            display: "flex",
            flexDirection: "column",
            // gap: "20px",
          })}
        >
          <Block display={"flex"} justifyContent={"space-between"}>
            <HeadingModalTitle title={title} />
            <Button
              onClick={() => setIsOpen(false)}
              kind={KIND.tertiary}
              size={SIZE.compact}
              shape={SHAPE.square}
              type={"button"}
            >
              <IoClose size={16} />
            </Button>
          </Block>
          {hasModal && children}
        </form>
      </ModalBody>
    </Modal>
  );
}
