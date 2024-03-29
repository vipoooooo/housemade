import { useStyletron } from "baseui";
import * as React from "react";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { style } from "../../styles/StyleObject";

export default function Account() {
  const [css] = useStyletron();
  return (
    <div className={css(style.settingDefaultLayout)}>
      <Head>
        <title>Account | Housemade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormControl label="Logout" caption="If click, you will be sign out">
        <Button type="submit" onClick={() => signOut({ callbackUrl: "/" })}>
          Log out
        </Button>
      </FormControl>
    </div>
  );
}
