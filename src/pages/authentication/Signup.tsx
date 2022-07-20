import * as React from "react";
import { ParagraphMedium } from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Alert } from "baseui/icon";
import { COUNTRIES, PhoneInput } from "baseui/phone-input";
import { StyleObject } from "styletron-standard";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface IFormSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function Signup() {
  const [css, theme] = useStyletron();
  const router = useRouter();

  const [country, setCountry] = React.useState(COUNTRIES.KH);
  const onCountryChange = (event: any) => setCountry(event.option);

  const onSubmit: SubmitHandler<IFormSignup> = (data) => {
    console.log(data, country);
  };

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .max(30, "Username must below 30 char long"),
    email: Yup.string().email().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at 8 char long"),
    confirmPassword: Yup.string()
      .required("Password is required.")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormSignup>(formOptions);

  return (
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
          <FormControl
            label="Confirm your password"
            caption="match your password above"
            positive={!errors.confirmPassword}
            error={
              errors.confirmPassword ? errors.confirmPassword.message : null
            }
          >
            <Controller
              name="confirmPassword"
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
          <FormControl
            label="Enter your phone number"
            positive={!errors.phoneNumber}
            error={errors.phoneNumber ? errors.phoneNumber.message : null}
          >
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={country}
                  onCountryChange={onCountryChange}
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
  );
}

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
