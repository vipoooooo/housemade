import * as React from "react";
import { ParagraphMedium } from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import {
  InputNormal,
  InputPasswordI,
  InputPasswordII,
  InputPhoneNumber,
} from "../../components/common/Input";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";

export default function Login() {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState("");
  const router = useRouter();
  return (
    <Form title="Log in to housemade" hasHeader={true}>
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
          <InputNormal
            title="Username or email address"
            placeholder="username or email address"
          />
          <InputPasswordII title="Enter your password" placeholder="password" />
          <Button
            onClick={() => router.push("/authentication/OTP")}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "100%",
                }),
              },
            }}
          >
            Sign Up
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
              New to housemade?{" "}
              <StyledLink
                href="/authentication/Signup"
                style={{
                  textDecoration: "none",
                  color: theme.colors.accent,
                }}
              >
                Create an account
              </StyledLink>
            </span>
          </ParagraphMedium>
        </div>
      </div>
    </Form>
  );
}
