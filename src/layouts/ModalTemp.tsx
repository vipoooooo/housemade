import * as React from "react";
import { useStyletron } from "baseui";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  // SIZE,
  ROLE,
} from "baseui/modal";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { HeadingModalTitle } from "../components/shared/HeadingTitle";
import { Block } from "baseui/block";
import { IoClose } from "react-icons/io5";

export default function ModalTemp({
  title,
  isOpen,
  setIsOpen,
  children,
  hasModal,
}: {
  title: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  children: React.ReactNode;
  hasModal: boolean;
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
        Dialog: {
          style: ({ $theme }) => ({
            borderRadius: 0,
            // padding: 0
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            display: "none",
          }),
        },
      }}
    >
      <ModalBody display={"flex"} flexDirection={"column"} marginBottom={0}>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          })}
        >
          <Block display={"flex"} justifyContent={"space-between"}>
            <HeadingModalTitle title={title} />
            <Button
              onClick={() => setIsOpen(false)}
              kind={KIND.secondary}
              size={SIZE.compact}
              shape={SHAPE.square}
            >
              <IoClose size={16} />
            </Button>
          </Block>
          {hasModal && <main>{children}</main>}
        </div>
      </ModalBody>
    </Modal>
  );
}
