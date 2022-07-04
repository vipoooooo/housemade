import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium, ParagraphSmall } from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "baseui";
import { projects } from "../../constants/project.const";
import { useRouter } from "next/router";
import { workers } from "../../constants/worker.const";
import { Button, KIND } from "baseui/button";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";

export default function PortfolioCont() {
  const [css, theme] = useStyletron();
  const { query } = useRouter();
  const portfolios = projects.filter(
    (item) => item.workerId.toString() === query.id
  );

  return (
    <>
      <Block className={css({})}>
        <HeadingMedium margin={0} marginBottom={"20px"}>
          Portfolio
        </HeadingMedium>
        {/* Spacer */}
        <Block />
        <FlexGrid
          flexGridColumnCount={[1, 2, 3, 2]}
          flexGridColumnGap={"20px"}
          flexGridRowGap={"30px"}
        >
          {portfolios.map((portfolio) => (
            <FlexGridItem key={portfolio.id.toString()}>
              <AspectRatioBox aspectRatio={16 / 9}>
                <AspectRatioBoxBody
                  display={"flex"}
                  flexDirection={"column"}
                  width={"100%"}
                >
                  <Image
                    alt={portfolio?.title}
                    src={portfolio ? portfolio.coverImg : ""}
                    width={"100%"}
                    height={"100%"}
                    layout={"responsive"}
                    objectFit={"cover"}
                    priority
                  />
                </AspectRatioBoxBody>
              </AspectRatioBox>
              <ParagraphSmall margin={0} marginTop={"10px"}>
                {portfolio?.title}
              </ParagraphSmall>
            </FlexGridItem>
          ))}
        </FlexGrid>
      </Block>
    </>
  );
}
