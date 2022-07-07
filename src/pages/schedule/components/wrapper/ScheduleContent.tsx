import * as React from "react";
import { Theme, useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ParagraphSmall, ParagraphXSmall } from "baseui/typography";
import { StyledLink } from "baseui/link";
import ScheduleContentModal from "./ScheduleContentModal";
import { Button, KIND, SIZE } from "baseui/button";

interface ActiveProps {
  icon: React.ReactNode;
  bg: string;
  title: string;
  date: string;
  name: string;
  location: string;
}
function ScheduleContent({
  icon,
  bg,
  title,
  date,
  name,
  location,
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
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <ParagraphSmall
            margin={0}
            className={css({
              textAlign: "left",
            })}
          >
            {title}
          </ParagraphSmall>
          <ParagraphXSmall margin={0} color={theme.colors.contentStateDisabled}>
            {date}
          </ParagraphXSmall>
          <div
            className={css({
              display: isOpen ? "block" : "none",
            })}
          >
            <Block margin={"10px 0"}>
              <ParagraphXSmall margin={0}>
                <StyledLink
                  href="/"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: theme.colors.accent,
                  }}
                >
                  {name}
                </StyledLink>
              </ParagraphXSmall>
              <ParagraphXSmall margin={0} color={theme.colors.contentSecondary}>
                {location}
              </ParagraphXSmall>
            </Block>
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
