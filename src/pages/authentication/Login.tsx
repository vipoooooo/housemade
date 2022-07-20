import * as React from "react";
import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Negative } from "./Signup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
interface IFormLogin {
  email: string;
  password: string;
}

export default function Login() {
  const [css, theme] = useStyletron();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    console.log(data);
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at 8 char long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormLogin>(formOptions);

  return (
    <Form
      title="Sign up to housemade"
      hasForm={true}
      onSubmit={handleSubmit(onSubmit)}
    >
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
            caption=""
            positive={!errors.password}
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
                style: ({ $theme }) => ({
                  marginBottom: "20px",
                  width: "100%",
                }),
              },
            }}
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
