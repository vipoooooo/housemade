import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Button, KIND, SIZE } from "baseui/button";

interface ActiveProps {
  icon: React.ReactNode;
  bg: string;
  title: React.ReactNode;
  date: string;
  worker: string;
  client: string;
  location: string;
  desc: string;
}
function ScheduleContent({
  icon,
  bg,
  title,
  date,
  worker,
  client,
  location,
  desc,
}: ActiveProps) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        className={css({
          display: "flex",
          gap: "10px",
          width: "100%",
        })}
      >
        <div
          className={css({
            display: "inline-block",
            backgroundColor: bg,
            padding: "10px",
            borderRadius: "50%",
            height: "44px",
          })}
        >
          {icon}
        </div>
        <Block
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
        >
          <ParagraphSmall margin={0} className={css({ textAlign: "left" })}>
            {title}
          </ParagraphSmall>
          <ParagraphXSmall
            margin={"0 0 10px 0"}
            color={theme.colors.contentStateDisabled}
          >
            {date}
          </ParagraphXSmall>
          <div
            className={css({
              display: isOpen ? "block" : "none",
            })}
          >
            <ParagraphXSmall margin={0}>Description : {desc}</ParagraphXSmall>
            <ParagraphXSmall margin={0}>
              Client :
              <StyledLink
                href="/"
                style={{
                  // cursor: "pointer",
                  textDecoration: "none",
                  color: theme.colors.accent,
                }}
              >
                {" " + client}
              </StyledLink>
            </ParagraphXSmall>
            <ParagraphXSmall margin={0}>
              Worker :
              <StyledLink
                href="/"
                style={{
                  // cursor: "pointer",
                  textDecoration: "none",
                  color: theme.colors.accent,
                }}
              >
                {" " + worker}
              </StyledLink>
            </ParagraphXSmall>
            <ParagraphXSmall margin={0}>Location : {location}</ParagraphXSmall>
          </div>

          <Block margin={"5px 0"}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              kind={KIND.tertiary}
              size={SIZE.mini}
            >
              {isOpen ? "Less Details " : "More Details"}
            </Button>
          </Block>
        </Block>
      </div>
    </>
  );
}

export default ScheduleContent;
