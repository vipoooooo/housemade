import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import ReviewSide from "../../components/profile/ReviewCont";
import ProfileSide from "../../components/profile/ProfileSide";
import ContentSide from "../../components/profile/ContentSide";
import { wrap } from "module";
import { projects } from "../../constants/project.const";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import Image from "next/image";
import { StyleObject } from "styletron-standard";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import {
  Display,
  DisplaySmall,
  DisplayXSmall,
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";

export default function Project() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { query } = useRouter();
  const projectFilters = projects.filter(
    (item) => item.id.toString() === query.id
  );
  return (
    <Layout hasHeader={true}>
      {projectFilters.map((project) => (
        <>
          <AspectRatioBox aspectRatio={16 / 9}>
            <AspectRatioBoxBody
              onClick={() => {
                router.push(`/browse/Project?id=${project.id}`);
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
                alt={project?.title}
                src={project ? project.coverImg : ""}
                objectFit={"cover"}
                priority
                layout="fill"
                className={css(image)}
              />
            </AspectRatioBoxBody>
          </AspectRatioBox>
          <Block
            display={"flex"}
            flexDirection={["column", "column", "row", "row"]}
            padding={["20px 0", "30px 0", "40px 0", "50px 0"]}
            className={css({
              gap: "5%",
            })}
          >
            <Block
              flex={"0 30%"}
              display={"flex"}
              flexDirection={"column"}
              className={css({
                gap: "10px",
              })}
            >
              <DisplayXSmall
                margin={0}
                display={["block", "block", "none", "none"]}
              >
                {project.title}
              </DisplayXSmall>
              <DisplaySmall
                margin={0}
                display={["none", "none", "block", "block"]}
              >
                {project.title}
              </DisplaySmall>
              <ParagraphMedium margin={['0 0 20px 0', '0 0 20px 0', 0, 0, ]}>
                Client : {project.client}
              </ParagraphMedium>
            </Block>
            <Block flex={"0 65%"}>
              <ParagraphSmall margin={0}>{project.description}</ParagraphSmall>
            </Block>
          </Block>
        </>
      ))}
    </Layout>
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
