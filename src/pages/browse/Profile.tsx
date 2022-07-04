import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import ReviewSide from "../../components/profile/ReviewCont";
import ProfileSide from "../../components/profile/ProfileSide";
import ContentSide from "../../components/profile/ContentSide";
import { wrap } from "module";

export default function ViewWorkerProfile() {
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
