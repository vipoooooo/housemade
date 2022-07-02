import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import {
  HeadingXSmall,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import {
  IoAdd,
  IoAlertOutline,
  IoCheckmark,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { StyledLink } from "baseui/link";
import { Button, KIND } from "baseui/button";
import { workers } from "../../constants/worker.const";

export default function ProfileSide() {
  const [css, $theme] = useStyletron();
  const { query } = useRouter();
  const [isBookmarked, setIsBookmark] = React.useState(false);
  console.log(isBookmarked);
  const profile = workers.find((item) => item.id.toString() === query.id);
  console.log(profile);
  React.useEffect(() => {
    if (profile) setIsBookmark(profile.bookmark);
  }, [profile]);

  if (!profile) return <>Loading ...</>;
  return (
    <div
      className={css({
        position: "sticky",
        zIndex: "-1",
        top: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "400px",
        // height: "auto",
        padding: "20px",
        border: "2px solid #EEEEEE",
        gap: "15px",
      })}
    >
      <Avatar name={profile.username} size="110px" src={profile.pfp} />
      <Block display={"flex"} alignItems={"center"}>
        <HeadingXSmall margin={0} marginRight={"5px"}>
          {profile.username}
        </HeadingXSmall>
        {profile.verify ? (
          <IoCheckmarkCircle size={"20px"} color={$theme.colors.accent} />
        ) : (
          <></>
        )}
      </Block>
      <Block display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <ParagraphSmall margin={0} color={$theme.colors.contentTertiary}>
          {profile.occupation}
        </ParagraphSmall>
        <ParagraphXSmall margin={0}>
          <StyledLink
            href="/"
            style={{
              //   textDecoration: "none",
              color: $theme.colors.contentTertiary,
            }}
          >
            {profile.link}
          </StyledLink>
        </ParagraphXSmall>
      </Block>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "10px 0",
          gap: "10px",
        })}
      >
        <Button
          onClick={() => alert("click")}
          //   size={SIZE.compact}
          kind={KIND.primary}
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                width: "100%",
              }),
            },
          }}
        >
          Book Now
        </Button>
        <Button
          onClick={() => alert("click")}
          //   size={SIZE.compact}
          kind={KIND.secondary}
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                width: "100%",
              }),
            },
          }}
        >
          Contact Me
        </Button>
      </div>
      <ParagraphSmall
        className={css({
          margin: 0,
          color: $theme.colors.contentTertiary,
          textAlign: "center",
        })}
      >
        {profile.description}
      </ParagraphSmall>
      <div
        className={css({
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <div
          onClick={() => setIsBookmark(!isBookmarked)}
          className={css({
            display: "flex",
            alignItems: "center",
            color: $theme.colors.negative,
          })}
        >
          <IoAlertOutline size={15} />
          <ParagraphXSmall margin={0} color={$theme.colors.negative}>
            Report
          </ParagraphXSmall>
        </div>

        <div
          onClick={() => setIsBookmark(!isBookmarked)}
          className={css({
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          })}
        >
          {isBookmarked ? (
            <IoCheckmark size={15} color={$theme.colors.accent} />
          ) : (
            <IoAdd size={15} color={$theme.colors.primary} />
          )}
          {isBookmarked ? (
            <ParagraphXSmall margin={0} color={$theme.colors.accent}>
              Listed
            </ParagraphXSmall>
          ) : (
            <ParagraphXSmall margin={0} color={$theme.colors.primary}>
              Add to list
            </ParagraphXSmall>
          )}
        </div>
      </div>
    </div>
  );
}
