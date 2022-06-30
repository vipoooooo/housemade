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

export default function Signup() {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState("");
  const router = useRouter();
  return (
    <Form title="Sign up to housemade" hasHeader={true}>
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
          <InputNormal title="Enter your username" placeholder="username" />
          <InputNormal title="Enter your email" placeholder="email" />
          <InputPasswordI
            title="Enter your password"
            placeholder="password"
            requirment="8 - 24 characters"
          />
          <InputPasswordI
            title="Confirm your password"
            placeholder="password"
            requirment=""
          />
          <InputPhoneNumber title="Enter your Phonenumber" />
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
            Login
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
              Already have an account?{" "}
              <StyledLink
                href="/authentication/Login"
                style={{
                  textDecoration: "none",
                  color: theme.colors.accent,
                }}
              >
                Log in
              </StyledLink>
            </span>
          </ParagraphMedium>
        </div>
      </div>
    </Form>
  );
}
