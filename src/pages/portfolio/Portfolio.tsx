import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import ProfileSide from "./components/ProfileSide";
import ContentSide from "./components/ContentSide";

export default function Profile() {
  const [css, theme] = useStyletron();
  return (
    <Layout hasHeader={true}>
      <Block
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
        className={css({ gap: "20px", flexWrap: "wrap" })}
      >
        {/* Profile */}
        <ProfileSide />

        {/* Content */}
        <ContentSide />
      </Block>
    </Layout>
  );
}