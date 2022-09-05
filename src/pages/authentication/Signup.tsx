import type { NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../layouts/Form";

import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { ISignUp, signUpSchema } from "../../utils/auth-validation";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Alert } from "baseui/icon";
import { ParagraphMedium } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Button, SIZE } from "baseui/button";
import { StyleObject } from "styletron-standard";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { status } = useSession();

  if (status === "authenticated") {
    router.push("//browse/Browse");
  }

  const { mutateAsync, error } = trpc.useMutation(["auth.signup"]);
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/authentication/Login");
        }
      } catch (err) {}
    },
    [mutateAsync, router]
  );

  return (
    <div>
      <Head>
        <title>Next App - Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Form
          title="Sign up to housemade"
          hasForm={true}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={css(style.formWrapper as StyleObject)}>
            <div className={css(style.cardWrapper as StyleObject)}>
              <FormControl
                label="Username"
                caption=""
                positive={!errors.username}
                error={errors.username ? errors.username.message : null}
              >
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} ref={null} size={SIZE.compact} />
                  )}
                />
              </FormControl>
              <FormControl
                label="Email"
                caption=""
                positive={!errors.email}
                error={errors.email ? errors.email.message : null}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} ref={null} size={SIZE.compact} />
                  )}
                />
              </FormControl>
              <FormControl
                label="Password"
                caption="password must be at least 8 characters long"
                positive={!errors.password ? "valid password" : null}
                error={errors.password ? errors.password.message : null}
              >
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      ref={null}
                      size={SIZE.compact}
                    />
                  )}
                />
              </FormControl>
              <Button
                type="submit"
                // disabled={}
                overrides={{
                  BaseButton: { style: ({ $theme }) => ({ width: "100%" }) },
                }}
              >
                Sign up
              </Button>
            </div>
            <div className={css(style.footWrapper as StyleObject)}>
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
      </main>
    </div>
  );
};

export function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

const style = {
  formWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cardWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "2px solid #EEEEEE",
  },
  footWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "10px 20px",
    border: "2px solid #EEEEEE",
  },
};

export default SignUp;
