import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { HeadingMedium } from "baseui/typography";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { projects } from "../../constants/project.const";
import Image from "next/image";
import ReviewSide from "./ReviewCont";
import PortfolioCont from "./PortfolioCont";

export default function ContentSide() {
  const [css, $theme] = useStyletron();
  return (
    <Block
      display={"flex"}
      flexDirection={"column"}
      flex={["0 calc(100% - 360px - 20px)"]}
      
      // width={"100%"}
      className={css({ gap: "50px" })}
    >

      {/* Portfolio */}
      <PortfolioCont />

      {/* Review */}
      <ReviewSide />
    </Block>
  );
}
