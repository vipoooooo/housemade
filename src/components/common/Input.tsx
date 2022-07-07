import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import * as React from "react";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, SIZE } from "baseui/phone-input";
import { PinCode } from "baseui/pin-code";
import { Block } from "baseui/block";
import { StyledLink } from "baseui/link";

export function InputNormal({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  const [css] = useStyletron();
  const [value, setValue] = React.useState("");
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      <ParagraphMedium margin={0}>{title}</ParagraphMedium>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder={placeholder}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: "100%",
            }),
          },
        }}
      />
    </div>
  );
}

export function InputPasswordI({
  title,
  placeholder,
  requirment,
}: {
  title: string;
  placeholder: string;
  requirment: string;
}) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState("");
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      <ParagraphMedium margin={0}>{title}</ParagraphMedium>
      <Input
        value={value}
        type="password"
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder={placeholder}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: "100%",
            }),
          },
        }}
      />
      <ParagraphXSmall
        margin={0}
        className={css({
          color: theme.colors.primary500,
        })}
      >
        {requirment}
      </ParagraphXSmall>
    </div>
  );
}

export function InputPasswordII({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState("");
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      <Block display={"flex"} justifyContent={"space-between"}>
        <ParagraphMedium margin={0}>{title}</ParagraphMedium>
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
      </Block>
      <Input
        value={value}
        type="password"
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder={placeholder}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: "100%",
            }),
          },
        }}
      />
    </div>
  );
}

export function InputPhoneNumber({ title }: { title: string }) {
  const [css, theme] = useStyletron();
  const [country, setCountry] = React.useState(COUNTRIES.KH);
  const [text, setText] = React.useState("");
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      <ParagraphMedium margin={0}>{title}</ParagraphMedium>
      <PhoneInput
        country={country}
        onCountryChange={(event: any) => {
          setCountry(event.option);
        }}
        text={text}
        onTextChange={(e) => setText(e.currentTarget.value)}
      />
    </div>
  );
}

export function InputOTP({ title }: { title: string }) {
  const [css, theme] = useStyletron();
  const [values, setValues] = React.useState(["", "", "", ""]);
  return (
    <div
      className={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      })}
    >
      <ParagraphMedium margin={0}>{title}</ParagraphMedium>
      <PinCode
        values={values}
        onChange={({ values }) => setValues(values)}
        clearOnEscape
      />
    </div>
  );
}
