import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import * as React from "react";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, SIZE } from "baseui/phone-input";
import { PinCode } from "baseui/pin-code";
import { Block } from "baseui/block";
import { StyledLink } from "baseui/link";
import { FormControl } from "baseui/form-control";

export function InputNormal({
  label,
  caption,
  placeholder,
  positive,
  error,
}: {
  label: string;
  caption: string;
  placeholder: string;
  positive: string;
  error: string;
}) {
  const [css] = useStyletron();
  const [value, setValue] = React.useState("");
  return (
    <FormControl
      label={label}
      caption={caption}
      positive={positive}
      error={error}
    >
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
    </FormControl>
  );
}

export function InputPW({
  label,
  caption,
  placeholder,
  positive,
  error,
}: {
  label: string;
  caption: string;
  placeholder: string;
  positive: string;
  error: string;
}) {
  const [css] = useStyletron();
  const [value, setValue] = React.useState("");
  return (
    <FormControl
      label={label}
      caption={caption}
      positive={positive}
      error={error}
    >
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
    </FormControl>
  );
}

export function InputPN({
  label,
  caption,
  placeholder,
  positive,
  error,
}: {
  label: string;
  caption: string;
  placeholder: string;
  positive: string;
  error: string;
}) {
  const [css] = useStyletron();
  const [country, setCountry] = React.useState(COUNTRIES.KH);
  const [text, setText] = React.useState("");
  return (
    <FormControl
      label={label}
      caption={caption}
      positive={positive}
      error={error}
    >
      <PhoneInput
        country={country}
        onCountryChange={(event: any) => {
          setCountry(event.option);
        }}
        text={text}
        onTextChange={(e) => setText(e.currentTarget.value)}
      />
    </FormControl>
  );
}

export function InputOTP({
  label,
  caption,
  positive,
  error,
}: {
  label: string;
  caption: string;
  positive: string;
  error: string;
}) {
  const [css] = useStyletron();
  const [values, setValues] = React.useState(["", "", "", ""]);
  return (
    <FormControl
      label={label}
      caption={caption}
      positive={positive}
      error={error}
    >
      <PinCode
        values={values}
        onChange={({ values }) => setValues(values)}
        clearOnEscape
      />
    </FormControl>
  );
}