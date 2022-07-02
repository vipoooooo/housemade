import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import {
  HeadingMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import { Avatar } from "baseui/avatar";

export default function ReviewSide() {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState(4);
  return (
    <Block
      width={"100%"}
      // className={css({ flex: 1})}
    >
      <HeadingMedium margin={0} marginBottom={"20px"}>
        Review
      </HeadingMedium>
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
            src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
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
              <ParagraphSmall margin={0}>Username</ParagraphSmall>
              <ParagraphXSmall
                margin={0}
                color={theme.colors.contentStateDisabled}
              >
                &bull; 2 hours ago
              </ParagraphXSmall>
            </div>
            <ParagraphSmall margin={0} color={theme.colors.contentSecondary}>
              Lorem ipsum dolor sit amet, consectetuasjodnf asodnjflasndf as
              fdoasndfo asdkf aos dfoa sdfjo aojsd faosj df tetuasjodnf
              asodnjflasndf as fdoasndfo asdkf aos dfoa sdfjo aojsd faosj df
            </ParagraphSmall>
          </div>
        </div>
      </div>
    </Block>
  );
}
