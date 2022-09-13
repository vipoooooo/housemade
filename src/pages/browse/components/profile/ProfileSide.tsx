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
import { IoAdd, IoCheckmark, IoCheckmarkCircle, IoStar } from "react-icons/io5";
import { StyledLink } from "baseui/link";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import ReportModal from "../modals/ReportModal";
import BookingModal from "../modals/BookingModal";
import { trpc } from "../../../../utils/trpc";
import { SkeletonProfileCont } from "../../../../components/common/Skeleton";

export default function ProfileSide() {
  const [css, $theme] = useStyletron();
  const [isBookmarked, setIsBookmark] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenB, setIsOpenB] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = trpc.useQuery(
    ["worker.profile", { id: id as string }],
    { retry: false }
  );

  return (
    <>
      {isLoading ? (
        <SkeletonProfileCont />
      ) : (
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
              <Avatar
                name={data?.profile?.user?.username || ""}
                size="100px"
                src={data?.profile?.imageURL || ""}
              />
              <div
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                })}
              >
                <Block display={"flex"} alignItems={"center"}>
                  <HeadingXSmall margin={"0 5px 0 0"}>
                    {data?.profile?.user?.username}
                  </HeadingXSmall>
                  {data?.profile?.verify ? (
                    <IoCheckmarkCircle
                      size={"20px"}
                      color={$theme.colors.accent}
                    />
                  ) : (
                    <></>
                  )}
                </Block>
                <ParagraphSmall
                  margin={0}
                  color={$theme.colors.contentTertiary}
                >
                  {data?.profile?.subcategory?.title}
                </ParagraphSmall>
                <Block display={"flex"}>
                  <Block marginRight={"5px"}>
                    <IoStar
                      size={"15px"}
                      color={$theme.colors.backgroundWarning}
                    />
                  </Block>
                  <ParagraphXSmall margin={0}>
                    {data?.profile?.rating} ({data?.profile?.reviewer} review)
                  </ParagraphXSmall>
                </Block>
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
                disabled
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
                disabled
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
                {data?.profile?.description}
              </ParagraphSmall>
            </div>
            <ParagraphXSmall margin={0}>
              <StyledLink
                href={data?.profile?.link || ""}
                target="_blank"
                style={{
                  //   textDecoration: "none",
                  color: $theme.colors.accent,
                }}
              >
                {data?.profile?.link}
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
      )}
    </>
  );
}
