import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import {
  HeadingMedium,
  HeadingXSmall,
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import Default from "../../layouts/Default";
import { Block } from "baseui/block";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { workers } from "../../mocks/worker.const";
import { useStyletron } from "baseui";

const isBookmarked = workers.filter((item) => item.bookmark);

export default function Bookmark() {
  const [css, theme] = useStyletron();
  return (
    <Default hasHeader={true}>
      <HeadingTitle title="Schedule" />
      {isBookmarked.length > 0 ? (
        <FlexGrid
          flexGridColumnCount={[1, 1, 2, 3]}
          flexGridColumnGap="scale500"
          flexGridRowGap="scale500"
        >
          {isBookmarked.map((bm) => {
            return (
              <FlexGridItem>{/* <WorkerCard data={bm} /> */}</FlexGridItem>
            );
          })}
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
            <ParagraphMedium margin={0}>
              don’t worry, there will be one soon
            </ParagraphMedium>
          </Block>
        </>
      )}
    </Default>
  );
}
