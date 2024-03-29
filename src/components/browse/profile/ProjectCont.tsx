import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Paragraph3, ParagraphSmall } from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";

import { HeadingTitle } from "../../shared/HeadingTitle";
import { trpc } from "../../../utils/trpc";
import { ProjectSkeleton } from "../../common/Skeleton";
import { style } from "../../../styles/StyleObject";

export default function ProjectCont() {
  const [css, theme] = useStyletron();
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
            <Block
              width="100%"
              backgroundColor={theme.colors.backgroundSecondary}
              padding="5px 20px"
            >
              <Paragraph3 className={css({ textAlign: "center" })}>
                This worker has not upload a project yet
              </Paragraph3>
            </Block>
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
                      display="flex"
                      flexDirection="column"
                      width="100%"
                      className={css(style.imageContainer)}
                      overrides={{ Block: { style: { cursor: "pointer" } } }}
                    >
                      <Image
                        alt={project?.title}
                        src={project.imageURL || ""}
                        objectFit="cover"
                        priority
                        layout="fill"
                        className={css(style.image)}
                      />
                    </AspectRatioBoxBody>
                  </AspectRatioBox>
                  <ParagraphSmall margin="10px 0 0 0">
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
