import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { ParagraphMedium } from "baseui/typography";
import * as React from "react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Select, Value } from "baseui/select";
import { MODE, StatefulButtonGroup } from "baseui/button-group";
import { FormControl } from "baseui/form-control";
import { signOut } from "next-auth/react";

export default function Account() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        // maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        // gap: "20px",
      })}
    >
      <FormControl label="Logout" caption="If click, you will be sign out">
        <Button type="submit" onClick={() => signOut({ callbackUrl: "/" })}>
          Log out
        </Button>
      </FormControl>
    </div>
  );
}
