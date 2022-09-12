import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingTitle } from "../../../components/shared/HeadingTitle";
import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";
import { SkeletonComp } from "../../browse/components/profile/ReviewCont";

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
                <SkeletonComp />
                <SkeletonComp />
                <SkeletonComp />
                <SkeletonComp />
              </FlexGridItem>
            </FlexGrid>
          </Block>
        </>
      ) : (
        <>
          <Block
            display={"flex"}
            flexDirection={"column"}
            paddingBottom={"20px"}
          >
            <HeadingTitle title="Review" />
            <FlexGrid
              flexGridColumnCount={[1]}
              flexGridColumnGap="scale0"
              flexGridRowGap="scale800"
            >
              {data?.reviews.map((review) => (
                <FlexGridItem key={review.id.toString()}>
                  <Block
                    width={"100%"}
                    // className={css({ flex: 1})}
                  >
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
                              &bull; {review?.createdAt.toDateString()}
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
          </Block>
        </>
      )}
    </>
  );
}
