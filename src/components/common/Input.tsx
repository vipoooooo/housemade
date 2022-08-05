import * as React from "react";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, SIZE } from "baseui/phone-input";
import { PinCode } from "baseui/pin-code";
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Alert } from "baseui/icon";

function Negative() {
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

// export function InputEmail({
//   label,
//   caption,
//   placeholder,
//   positive,
//   error,
// }: {
//   label: string;
//   caption: string;
//   placeholder: string;
//   positive: string;
//   error: string;
// }) {
//   const [css, theme] = useStyletron();
//   const [value, setValue] = React.useState("");
//   const [isValid, setIsValid] = React.useState(false);
//   const [isVisited, setIsVisited] = React.useState(false);
//   const shouldShowError = !isValid && isVisited;
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;
//     setIsValid(validateEmail(value));
//     setValue(value);
//   };
//   return (
//     <FormControl
//       label={label}
//       caption={caption}
//       positive={positive}
//       error={shouldShowError ? "Please input a valid email address" : null}
//     >
//       <Input
//         id="input-id"
//         value={value}
//         onChange={onChange}
//         onBlur={() => setIsVisited(true)}
//         error={shouldShowError}
//         placeholder={placeholder}
//         overrides={shouldShowError ? {After: Negative} : {}}
//       />
//     </FormControl>
//   );
// }

export function InputNormal({
  label,
  caption,
  placeholder,
  positive,
  value,
  setValue,
}: {
  label: string;
  caption: string;
  placeholder: string;
  positive: string;
  value: string;
  setValue: React.FormEventHandler<HTMLInputElement>;
}) {
  const [css, theme] = useStyletron();
  return (
    <FormControl
      label={label}
      caption={caption}
      positive={positive}
    >
      <Input
        id="input-id"
        value={value}
        // onChange={(event) => setValue(event.currentTarget.value)}
        placeholder={placeholder}
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

export function InputTextArea({
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
      <Textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
      />
    </FormControl>
  );
}
