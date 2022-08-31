import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Button, KIND, SIZE } from "baseui/button";
import { useRouter } from "next/router";
import ReviewModal from "../modals/ReviewModal";
import { HeadingTitle } from "../../../../components/shared/HeadingTitle";
import { trpc } from "../../../../utils/trpc";
import { Skeleton } from "baseui/skeleton";

export default function ReviewSide() {
  const [css, theme] = useStyletron();

  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isFetching } = trpc.useQuery(
    ["review.reviews", { id: id as string }],
    {
      retry: false,
    }
  );
  console.log(data);

  return (
    <>
      {isLoading ? (
        <>
          <Block display={"flex"} flexDirection={"column"}>
            <Block
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <HeadingTitle title="Review" />
              <Button
                onClick={() => setIsOpen(true)}
                kind={KIND.primary}
                size={SIZE.compact}
              >
                Write a review
              </Button>
            </Block>
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
          <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      ) : (
        <>
          <Block
            display={"flex"}
            flexDirection={"column"}
            paddingBottom={"20px"}
          >
            <Block
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <HeadingTitle title="Review" />
              <Button
                onClick={() => setIsOpen(true)}
                kind={KIND.primary}
                size={SIZE.compact}
              >
                Write a review
              </Button>
            </Block>
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
                        <Avatar
                          name={review?.client?.username || ""}
                          size="40px"
                          src={review?.client?.image || ""}
                        />
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
          <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </>
  );
}

function SkeletonComp() {
  const [css, theme] = useStyletron();
  return (
    <Block
      width={"100%"}
      // className={css({ flex: 1})}
      marginBottom="20px"
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
          <Skeleton
            width="40px"
            height="40px"
            animation
            overrides={{
              Root: {
                style: {
                  borderRadius: "50%",
                },
              },
            }}
          />
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
              <Skeleton
                width="50px"
                height="15px"
                overrides={{
                  Root: {
                    style: {
                      borderRadius: "15px",
                    },
                  },
                }}
                animation
              />
            </div>
            <Skeleton
              width="100px"
              height="15px"
              overrides={{
                Root: {
                  style: {
                    borderRadius: "15px",
                  },
                },
              }}
              animation
            />
          </div>
        </div>
      </div>
    </Block>
  );
}
