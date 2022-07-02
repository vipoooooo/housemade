import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import ReviewSide from "../../components/profile/ReviewCont";
import ProfileSide from "../../components/profile/ProfileSide";
import PortfilioSide from "../../components/profile/PortfilioSide";

export default function ViewWorkerProfile() {
  const [css, theme] = useStyletron();
  return (
    <Layout hasHeader={true}>
      <Block display={"flex"} className={css({ gap: "20px", flex: "0 400px" })}>
        {/* Profile */}
        <ProfileSide />

        {/* Portfolio */}
        <Block
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          className={css({ gap: "20px" })}
        >
          <PortfilioSide />
          <ReviewSide />
        </Block>
      </Block>
    </Layout>
  );
}
