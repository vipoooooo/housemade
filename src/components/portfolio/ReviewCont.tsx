import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Paragraph3, ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingTitle } from "../shared/HeadingTitle";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { SkeletonReview } from "../common/Skeleton";
import { djs } from "../../helpers/snipet";

export default function ReviewSide() {
  const [css, theme] = useStyletron();
  const { data: session } = useSession();
  const { data, isLoading, isFetching } = trpc.useQuery(
    ["review.reviews", { id: session?.id as string }],
    {
      retry: false,
    }
  );

  return (
    <>
      {isLoading ? (
        <>
          <Block display={"flex"} flexDirection={"column"}>
            <HeadingTitle title="Review" />
            <FlexGrid
              flexGridColumnCount={[1]}
              flexGridColumnGap="scale0"
              flexGridRowGap="scale800"
            >
              <FlexGridItem>
                <SkeletonReview />
                <SkeletonReview />
                <SkeletonReview />
                <SkeletonReview />
              </FlexGridItem>
            </FlexGrid>
          </Block>
        </>
      ) : (
        <>
          <Block display="flex" flexDirection="column" paddingBottom="20px">
            <HeadingTitle title="Review" />
            {!data?.reviews.length ? (
              <Block
                width="100%"
                backgroundColor={theme.colors.backgroundSecondary}
                padding={"5px 20px"}
              >
                <Paragraph3
                  className={css({
                    textAlign: "center",
                  })}
                >
                  No one review you yet
                </Paragraph3>
              </Block>
            ) : (
              <FlexGrid
                flexGridColumnCount={[1]}
                flexGridColumnGap="scale0"
                flexGridRowGap="scale800"
              >
                {data?.reviews.map((review) => (
                  <FlexGridItem key={review.id.toString()}>
                    <Block width="100%">
                      <div
                        className={css({
                          display: "flex",
                          flexDirection: "column",
                        })}
                      >
                        <div
                          className={css({
                            display: "flex",
                            gap: "10px",
                          })}
                        >
                          {
                            <Avatar
                              name={review?.client?.username || ""}
                              size="40px"
                              src={review?.imageURL || ""}
                            />
                          }
                          <div
                            className={css({
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            })}
                          >
                            <div
                              className={css({
                                display: "flex",
                                gap: "10px",
                              })}
                            >
                              <ParagraphSmall margin={0}>
                                {review?.client?.username}
                              </ParagraphSmall>
                              <ParagraphXSmall
                                margin={0}
                                color={theme.colors.contentStateDisabled}
                              >
                                | Rate {review.rating.toFixed(0)}
                              </ParagraphXSmall>

                              <ParagraphXSmall
                                margin={0}
                                color={theme.colors.contentStateDisabled}
                              >
                                &bull; {djs(review?.updatedAt).fromNow()}
                              </ParagraphXSmall>
                            </div>
                            <ParagraphSmall
                              margin={0}
                              color={theme.colors.contentSecondary}
                            >
                              {review?.description}
                            </ParagraphSmall>
                          </div>
                        </div>
                      </div>
                    </Block>
                  </FlexGridItem>
                ))}
              </FlexGrid>
            )}
          </Block>
        </>
      )}
    </>
  );
}
