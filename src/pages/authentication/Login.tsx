import * as React from "react";
import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Negative } from "./Signup";

export default function Login() {
  const [css, theme] = useStyletron();
  const router = useRouter();

  return (
    <Form title="Sign up to housemade" hasForm={true} >
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
            padding: "20px",
            border: "2px solid #EEEEEE",
          })}
        >
          <FormControl
            label="Enter your email"
            caption=""
            positive=""
          >
            <Input
              required
              id="inputEmail-id"
              // onBlur={() => setIsVisited(true)}
              // placeholder=""
              // overrides={shouldShowError ? { After: Negative } : {}}
            />
          </FormControl>
          <FormControl
            label="Enter your password"
            // caption="8 - 24 characters"
            caption=""
            positive=""
            error=""
          >
            <Input
              id="inputPassword-id"
              required
              type="password"
            />
          </FormControl>
          <ParagraphXSmall margin={0}>
            <StyledLink
              href="/authentication/Reset"
              style={{
                textDecoration: "none",
                color: theme.colors.accent,
              }}
            >
              Forgot Password
            </StyledLink>
          </ParagraphXSmall>
          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "100%",
                }),
              },
            }}
          >
            Log in
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
