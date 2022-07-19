import * as React from "react";
import {
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { InputEmail } from "../../components/common/Input";
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
          padding: "20px",
          border: "2px solid #EEEEEE",
        })}
      >
        <InputEmail
          label="Verification code"
          caption="and we will send you a password reset link."
          placeholder=""
          positive=""
          error=""
        />
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
