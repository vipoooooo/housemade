import * as React from "react";
import {
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { InputNormal } from "../../components/common/Input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";

export default function ResetConfirm() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  return (
    <Form title="Reset Confirmation" hasForm={true}>
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          border: "2px solid #EEEEEE",
        })}
      >
        <InputNormal title="Verification code" placeholder="enter the code" />
        <Button
          onClick={() => router.push("/authentication/Login")}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                width: "100%",
              }),
            },
          }}
        >
          Confirm
        </Button>
      </div>
    </Form>
  );
}
