import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import {
  HeadingMedium,
  HeadingXSmall,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { useRouter } from "next/router";
import { HeadingTitle } from "../../../components/shared/HeadingTitle";
import { reviews } from "../../../mocks/review.const";

export default function ReviewSide() {
  const [css, theme] = useStyletron();
  const { query } = useRouter();
  const review = reviews.filter(
    (item) => item.workerId.toString() === query.id
  );

  return (
    <>
      <Block display={"flex"} flexDirection={"column"}>
        <HeadingTitle title="Review" />
        {review.length > 0 ? (
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
                      <Avatar
                        name="Jane Doe"
                        size="40px"
                        src={reviewItem?.pfp}
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
                DW, there will be one soon
              </ParagraphXSmall>
            </Block>
          </>
        )}
      </Block>
    </>
  );
}
