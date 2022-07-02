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

export default function LoginOTP() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  return (
    <Form title="Reset Password" hasHeader={true}>
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
        <InputNormal
          title="Enter your user account's verified email address and we will send you a password reset link."
          placeholder="enter your email address"
        />
        <Button
          onClick={() => router.push("/authentication/ResetConfirm")}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                width: "100%",
              }),
            },
          }}
        >
          Send password reset email
        </Button>
      </div>
    </Form>
  );
}
