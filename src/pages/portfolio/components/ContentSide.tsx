import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import ReviewSide from "./ReviewCont";
import ProjectCont from "./ProjectCont";

export default function ContentSide() {
  const [css] = useStyletron();
  return (
    <Block
      display={"flex"}
      flexDirection={"column"}
      flex={["0 calc(100% - 360px - 20px)"]}
      // width={"100%"}
      className={css({ gap: "50px" })}
    >
      {/* Portfolio */}
      <ProjectCont />

      {/* Review */}
      <ReviewSide />
    </Block>
  );
}
