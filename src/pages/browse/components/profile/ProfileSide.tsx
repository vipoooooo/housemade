import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import {
  HeadingXSmall,
  ParagraphXSmall,
  ParagraphSmall,
} from "baseui/typography";
import { IoAdd, IoCheckmark, IoCheckmarkCircle } from "react-icons/io5";
import { StyledLink } from "baseui/link";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { StarRating } from "baseui/rating";
import ReportModal from "../modals/ReportModal";
import BookingModal from "../modals/BookingModal";
import { workers } from "../../../../mocks/worker.const";
import { Ireview, reviews } from "../../../../mocks/review.const";

export default function ProfileSide() {
  const [css, $theme] = useStyletron();
  const { query } = useRouter();
  const [isBookmarked, setIsBookmark] = React.useState(false);
  const [value, setValue] = React.useState(4);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);
  const profile = workers.find((item) => item.id.toString() === query.id);
  React.useEffect(() => {
    if (profile) setIsBookmark(profile.bookmark);
  }, [profile]);

  const rater = reviews.filter((item) => item.workerId.toString() === query.id);
  const rating = rater.reduce(
    (previousValue: number, currentValue: Ireview) => previousValue + currentValue.rating,
0
  ) / rater.length;

  if (!profile) return <>Loading ...</>;
  return (
    <>
      <Block
        position={["relative", "relative", "relative", "sticky"]}
        top={[0, 0, 0, "68px"]}
        flex={["0 360px"]}
        width={["100%", "100%", "360px", "360px"]}
        margin={"0 auto"}
        className={css({
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "10px",
          })}
        >
          <Avatar name={profile.username} size="100px" src={profile.pfp} />
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            })}
          >
            <Block display={"flex"} alignItems={"center"}>
              <HeadingXSmall margin={"0 5px 0 0"}>
                {profile.username}
              </HeadingXSmall>
              {profile.verify ? (
                <IoCheckmarkCircle size={"20px"} color={$theme.colors.accent} />
              ) : (
                <></>
              )}
            </Block>
            <ParagraphSmall margin={0} color={$theme.colors.contentTertiary}>
              {profile.occupation}
            </ParagraphSmall>
            <StarRating
              numItems={5}
              onChange={(data) => setValue(data.value)}
              size={15}
              value={rating}
              readOnly
            />
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "5px",
          })}
        >
          <Button
            onClick={() => setIsOpenB(true)}
            kind={KIND.primary}
            shape={SHAPE.square}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  width: "calc((100% - (36px + (5px*2)))/2)",
                }),
              },
            }}
          >
            Book Now
          </Button>
          <Button
            onClick={() => alert("click")}
            kind={KIND.secondary}
            shape={SHAPE.square}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  width: "calc((100% - (36px + (5px*2)))/2)",
                }),
              },
            }}
          >
            Contact Me
          </Button>
          <Button
            onClick={() => setIsBookmark(!isBookmarked)}
            kind={KIND.secondary}
            shape={SHAPE.square}
            size={SIZE.compact}
          >
            {isBookmarked ? <IoCheckmark size={16} /> : <IoAdd size={16} />}
          </Button>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          })}
        >
          <ParagraphSmall margin={0} color={$theme.colors.contentPrimary}>
            About
          </ParagraphSmall>
          <ParagraphSmall margin={0} color={$theme.colors.contentTertiary}>
            {profile.description}
          </ParagraphSmall>
        </div>
        <ParagraphXSmall margin={0}>
          <StyledLink
            href="/"
            style={{
              //   textDecoration: "none",
              color: $theme.colors.accent,
            }}
          >
            {profile.link}
          </StyledLink>
        </ParagraphXSmall>
        <ParagraphXSmall
          margin={0}
          color={$theme.colors.contentTertiary}
          onClick={() => setIsOpen(true)}
          className={css({
            cursor: "pointer",
          })}
        >
          Report
        </ParagraphXSmall>
      </Block>
      <BookingModal isOpenB={isOpenB} setIsOpenB={setIsOpenB} />
      <ReportModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
