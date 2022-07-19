import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import {
  HeadingMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Button, KIND, SIZE } from "baseui/button";
import { useRouter } from "next/router";
import ReviewModal from "../modals/ReviewModal";
import { HeadingTitle } from "../../../../components/shared/HeadingTitle";
import { reviews } from "../../../../mocks/review.const";

export default function ReviewSide() {
  const [css, theme] = useStyletron();
  const { query } = useRouter();
  const review = reviews.filter((item) => item.workerId.toString() === query.id);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
        {review.map((reviewItem) => (
          <FlexGridItem key={reviewItem.id.toString()}>
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
                  <Avatar name="Jane Doe" size="40px" src={reviewItem?.pfp} />
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
                        {reviewItem?.username}
                      </ParagraphSmall>
                      <ParagraphXSmall
                        margin={0}
                        color={theme.colors.contentStateDisabled}
                      >
                        &bull; {reviewItem?.createdAt}
                      </ParagraphXSmall>
                    </div>
                    <ParagraphSmall
                      margin={0}
                      color={theme.colors.contentSecondary}
                    >
                      {reviewItem?.description}
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
  );
}