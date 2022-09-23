import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Paragraph3, ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Button, KIND, SIZE } from "baseui/button";
import { useRouter } from "next/router";
import ReviewModal from "../modals/ReviewModal";
import { HeadingTitle } from "../../shared/HeadingTitle";
import { trpc } from "../../../utils/trpc";
import { SkeletonReview } from "../../common/Skeleton";
import { useSession } from "next-auth/react";
import { IDeleteReview } from "../../../server/router/review/review.type";
import { toaster } from "baseui/toast";
import { Toaster } from "../../common/Toaster";
import { djs } from "../../../helpers/snipet";

export default function ReviewSide() {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const utils = trpc.useContext();
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(
    ["review.reviews", { id: id as string }],
    {
      retry: false,
    }
  );

  const { mutateAsync } = trpc.useMutation(["review.deleteReview"]);

  const onDelete = async (data: IDeleteReview) => {
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["review.reviews"]);
        },
      });
    } catch (err) {
      toaster.warning("Unable to delete project", {});
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Block display="flex" flexDirection="column">
            <Block
              display="flex"
              justifyContent="space-between"
              alignItems="start"
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
                <SkeletonReview />
                <SkeletonReview />
                <SkeletonReview />
                <SkeletonReview />
              </FlexGridItem>
            </FlexGrid>
          </Block>
          <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      ) : (
        <>
          <Toaster />
          <Block display="flex" flexDirection="column" paddingBottom="20px">
            <Block
              display="flex"
              justifyContent="space-between"
              alignItems="start"
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
            {!data?.reviews.length ? (
              <Block
                width="100%"
                backgroundColor={theme.colors.backgroundSecondary}
                padding="5px 20px"
              >
                <Paragraph3 className={css({ textAlign: "center" })}>
                  Cannot found a single review on this worker
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
                          justifyContent: "space-between",
                          alignItems: "start",
                          gap: "10px",
                        })}
                      >
                        <div
                          className={css({
                            display: "flex",
                            flexDirection: "column",
                          })}
                        >
                          <div
                            className={css({ display: "flex", gap: "10px" })}
                          >
                            <Avatar
                              name={review?.client?.username || ""}
                              size="40px"
                              src={review?.imageURL || ""}
                            />
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                              })}
                            >
                              <div
                                className={css({ display: "flex", gap: "5px" })}
                              >
                                <ParagraphSmall margin={0}>
                                  {review?.client?.username}
                                </ParagraphSmall>
                                <ParagraphXSmall
                                  display={["none", "none", "block", "block"]}
                                  margin={0}
                                  // color={theme.colors.contentStateDisabled}
                                >
                                  &bull; {review.rating.toFixed(0)}{" "}
                                  {review.rating > 1 ? "stars" : "star"}
                                </ParagraphXSmall>
                                {session?.id === review.clientId ? (
                                  <ParagraphSmall
                                    margin={0}
                                    color={theme.colors.accent}
                                  >
                                    &bull; you
                                  </ParagraphSmall>
                                ) : (
                                  ""
                                )}
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
                        {session?.id === review.clientId ? (
                          <Button
                            onClick={() => onDelete({ id: review.id })}
                            kind={KIND.tertiary}
                            size={SIZE.mini}
                          >
                            Delete
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </Block>
                  </FlexGridItem>
                ))}
              </FlexGrid>
            )}
          </Block>
          <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </>
  );
}
