import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ParagraphSmall } from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import { StyleObject } from "styletron-standard";
import { HeadingTitle } from "../../../../components/shared/HeadingTitle";
import { trpc } from "../../../../utils/trpc";
import { Skeleton } from "baseui/skeleton";
import { ProjectSkeleton } from "../../../../components/common/Skeleton";

export default function PortfolioCont() {
  const [css] = useStyletron();
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = trpc.useQuery(
    ["project.projects", { id: id as string }],
    {
      retry: false,
    }
  );

  return (
    <>
      {isLoading ? (
        <Block>
          <HeadingTitle title="Portfolio" />
          {/* Spacer */}
          <FlexGrid
            flexGridColumnCount={[1, 2, 3, 2]}
            flexGridColumnGap={["0px", "10px", "10px", "20px"]}
            flexGridRowGap={["30px"]}
          >
            <FlexGridItem>
              <ProjectSkeleton />
            </FlexGridItem>
            <FlexGridItem>
              <ProjectSkeleton />
            </FlexGridItem>
          </FlexGrid>
        </Block>
      ) : (
        <Block>
          <HeadingTitle title="Portfolio" />
          {/* Spacer */}
          {!data?.projects.length ? (
            "no project"
          ) : (
            <FlexGrid
              flexGridColumnCount={[1, 2, 3, 2]}
              flexGridColumnGap={["0px", "10px", "10px", "20px"]}
              flexGridRowGap={["30px"]}
            >
              {data?.projects.map((project) => (
                <FlexGridItem key={project.id.toString()}>
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
                        src={project.coverImg || ""}
                        objectFit={"cover"}
                        priority
                        layout="fill"
                        className={css(image)}
                      />
                    </AspectRatioBoxBody>
                  </AspectRatioBox>
                  <ParagraphSmall margin={"10px 0 0 0"}>
                    {project?.title}
                  </ParagraphSmall>
                </FlexGridItem>
              ))}
            </FlexGrid>
          )}
        </Block>
      )}
    </>
  );
}

export const imageContainer: StyleObject = {
  width: "100%",
  ">div": {
    position: "unset",
  },
};

export const image: StyleObject = {
  objectFit: "contain",
  width: "100% !important",
  position: "relative",
  height: "unset !important",
};
