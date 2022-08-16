import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import Image from "next/image";
import { StyleObject } from "styletron-standard";
import {
  DisplaySmall,
  DisplayXSmall,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import { trpc } from "../../utils/trpc";

export default function Project() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isSuccess } = trpc.useQuery(
    ["project.project", { id: id as string }],
    { retry: false, enabled: Boolean(id) }
  );
  const proj = data && data.project;

  return (
    <Layout hasHeader={true}>
      {proj === undefined || isLoading ? (
        <>is loading...</>
      ) : (
        <>
          <AspectRatioBox aspectRatio={16 / 9}>
            <AspectRatioBoxBody
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              className={css(imageContainer)}
            >
              <Image
                alt={proj.title}
                src={proj.coverImg}
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
                {proj.title}
              </DisplayXSmall>
              <DisplaySmall
                margin={0}
                display={["none", "none", "block", "block"]}
              >
                {proj.title}
              </DisplaySmall>
              <ParagraphMedium margin={["0 0 20px 0", "0 0 20px 0", 0, 0]}>
                Client : {proj.client}
              </ParagraphMedium>
            </Block>
            <Block flex={"0 65%"}>
              <ParagraphSmall margin={0}>{proj.description}</ParagraphSmall>
            </Block>
          </Block>
        </>
      )}
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
