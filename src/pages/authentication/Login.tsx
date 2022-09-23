import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, ILogin } from "../../utils/auth-validation";
import { useRouter } from "next/router";
import { useStyletron } from "baseui";
import Form from "../../layouts/Form";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Notification, KIND } from "baseui/notification";
import { style } from "../../styles/StyleObject";

const LogIn: NextPage = () => {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

  const [error, setError] = useState<SignInResponse["error"]>();

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/browse/Browse");
  }

  const onSubmit = useCallback(
    async (data: ILogin) => {
      if (!isSubmitting) {
        await signIn("credentials", {
          ...data,
          callbackUrl: "/browse/Browse",
          redirect: false,
        }).then((res) => {
          if (res?.ok) router.push("/browse/Browse");
          else setError("Invalid credentials!");
        });
      }
    },
    [router, signIn]
  );

  return (
    <div>
      <Head>
        <title>Next App - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Form
          title="Sign up to housemade"
          hasForm={true}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={css(style.formWrapper)}>
            <div className={css(style.cardWrapper)}>
              {error && (
                <Notification kind={KIND.negative}>
                  Invalid email or password
                </Notification>
              )}
              <FormControl
                label="Email"
                caption=""
                positive={!errors.email ? errors.email : undefined}
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
                caption=""
                positive={!errors.password ? errors.password : undefined}
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
                overrides={{
                  BaseButton: {
                    style: () => ({ marginBottom: "20px", width: "100%" }),
                  },
                }}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Log in
              </Button>
              <ParagraphXSmall margin={"0 auto"}>
                <StyledLink
                  onClick={() => alert("This feature is in development")}
                  // href="/authentication/Reset"
                  style={{
                    textDecoration: "none",
                    color: theme.colors.contentStateDisabled,
                  }}
                >
                  Forgot Password
                </StyledLink>
              </ParagraphXSmall>
            </div>
            <div className={css(style.footWrapper)}>
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
      </main>
    </div>
  );
};

export default LogIn;
