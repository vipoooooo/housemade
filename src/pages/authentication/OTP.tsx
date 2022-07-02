import * as React from "react";
import {
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { InputOTP } from "../../components/common/Input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";

export default function OTP() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  return (
    <Form title="OTP Verification" hasHeader={true}>
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        })}
      >
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
          <span>
            <ParagraphSmall
              margin={0}
              className={css({
                color: theme.colors.primary500,
              })}
            >
              The code sent to{" "}
            </ParagraphSmall>
            <ParagraphLarge margin={0}>+855 93 759 714</ParagraphLarge>
          </span>
          <InputOTP title="Enter your code" />
          <Button
            onClick={() => router.push("/authentication/Welcome")}
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
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "10px 20px",
            border: "2px solid #EEEEEE",
          })}
        >
          <ParagraphMedium margin={0}>
            <span>
              Didn’t recieve the code?{" "}
              <StyledLink
                onClick={() => alert("resend")}
                style={{
                  textDecoration: "none",
                  color: theme.colors.accent,
                }}
              >
                Resend code
              </StyledLink>
            </span>
          </ParagraphMedium>
        </div>
      </div>
    </Form>
  );
}
