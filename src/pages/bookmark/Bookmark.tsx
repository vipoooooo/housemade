import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingXSmall, ParagraphMedium } from "baseui/typography";
import Default from "../../layouts/Default";
import { Block } from "baseui/block";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { useStyletron } from "baseui";

export default function Bookmark() {
  const [css, theme] = useStyletron();
  return (
    <Default hasHeader={true}>
      <></>
      {/* <HeadingTitle title="Schedule" />
      {isBookmarked.length > 0 ? (
        <FlexGrid
          flexGridColumnCount={[1, 1, 2, 3]}
          flexGridColumnGap="scale500"
          flexGridRowGap="scale500"
        >
          {isBookmarked.map((bm) => {
            return (
              //   <FlexGridItem key={bm.id}>
              //   <WorkerBtn
              //     id={bm.id}
              //     pfp={bm.imageURL}
              //     username={bm.user.username}
              //     verify={worker.verify || false}
              //     skill={worker.subcategory.title}
              //     rating={worker.rating.toFixed(1)}
              //     reviewer={worker.reviewer}
              //   />
              // </FlexGridItem>
              <></>
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
      )} */}
    </Default>
  );
}
