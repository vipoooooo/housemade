import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import {
  HeadingMedium,
  HeadingXSmall,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import { StyleObject } from "styletron-standard";
import { HeadingTitle } from "../../../components/shared/HeadingTitle";
import { projects } from "../../../mocks/project.const";
import { Button, KIND, SIZE } from "baseui/button";
import AddProjectModal from "./AddProjectModal";

export default function ProjectCont() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { query } = useRouter();
  const portfolios = projects.filter(
    (item) => item.workerId.toString() === query.id
  );

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Block>
        <Block
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"start"}
          width={"100%"}
        >
          <HeadingTitle title="Project" />
          <Button
            onClick={() => setIsOpen(true)}
            kind={KIND.primary}
            size={SIZE.compact}
          >
            Add project
          </Button>
        </Block>
        {portfolios.length > 0 ? (
          <FlexGrid
            flexGridColumnCount={[1, 2, 3, 2]}
            flexGridColumnGap={["0px", "10px", "10px", "20px"]}
            flexGridRowGap={["30px"]}
          >
            {portfolios.map((portfolio) => (
              <FlexGridItem key={portfolio.id.toString()}>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <AspectRatioBoxBody
                    onClick={() => {
                      router.push(`/browse/Project?id=${portfolio.id}`);
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                    width={"100%"}
                    className={css(imageContainer)}
                    overrides={{
                      Block: {
                        style: {
                          cursor: "pointer",
                        },
                      },
                    }}
                  >
                    <Image
                      alt={portfolio?.title}
                      src={portfolio ? portfolio.coverImg : ""}
                      objectFit={"cover"}
                      priority
                      layout="fill"
                      className={css(image)}
                    />
                  </AspectRatioBoxBody>
                </AspectRatioBox>
                <ParagraphSmall margin={"10px 0 0 0"}>
                  {portfolio?.title}
                </ParagraphSmall>
              </FlexGridItem>
            ))}
          </FlexGrid>
        ) : (
          <>
            <Block
              display={"flex"}
              flexDirection={"column"}
              className={css({ gap: "10px" })}
            >
              <HeadingXSmall margin={0}>
                There is nothing to show here
              </HeadingXSmall>
              <ParagraphXSmall margin={0}>
                you can click button below add one right now!
              </ParagraphXSmall>
            </Block>
          </>
        )}
      </Block>
      <AddProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

const imageContainer: StyleObject = {
  width: "100%",
  ">div": {
    position: "unset",
  },
};

const image: StyleObject = {
  objectFit: "contain",
  width: "100% !important",
  position: "relative",
  height: "unset !important",
};
