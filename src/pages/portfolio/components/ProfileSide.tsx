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
import { IoCheckmarkCircle, IoStar } from "react-icons/io5";
import { StyledLink } from "baseui/link";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { SkeletonPortfolioCont } from "../../../components/common/Skeleton";

export default function ProfileSide() {
  const [css, $theme] = useStyletron();
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, isLoading } = trpc.useQuery(
    ["worker.profile", { id: session?.id as string }],
    {
      retry: false,
    }
  );
  return (
    <>
      {isLoading ? (
        <SkeletonPortfolioCont />
      ) : (
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
            {data?.profile.user?.image ? (
              <Avatar
                name={data?.profile.user?.username}
                size="100px"
                src={data.profile.imageURL}
              />
            ) : (
              <Avatar
                name={data?.profile.user?.username || ""}
                size="100px"
                src={""}
              />
            )}
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              })}
            >
              <Block display={"flex"} alignItems={"center"}>
                <HeadingXSmall margin={"0 5px 0 0"}>
                  {data?.profile.user?.username}
                </HeadingXSmall>
                {data?.profile.verify ? (
                  <IoCheckmarkCircle
                    size={"20px"}
                    color={$theme.colors.accent}
                  />
                ) : (
                  <></>
                )}
              </Block>
              <ParagraphSmall margin={0} color={$theme.colors.contentTertiary}>
                {data?.profile.subcategory?.title}
              </ParagraphSmall>
              <Block display={"flex"}>
                <Block marginRight={"5px"}>
                  <IoStar
                    size={"15px"}
                    color={$theme.colors.backgroundWarning}
                  />
                </Block>
                <ParagraphXSmall margin={0}>
                  {data?.profile.rating.toFixed(1)} ({data?.profile?.reviewer}{" "}
                  review)
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
              onClick={() => router.push(`/setting/Setting`)}
              kind={KIND.secondary}
              shape={SHAPE.square}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: () => ({
                    width: "100%",
                  }),
                },
              }}
            >
              Edit Profile
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
              {data?.profile.description}
            </ParagraphSmall>
          </div>
          <ParagraphXSmall margin={0}>
            <StyledLink
              href={data?.profile.link || ""}
              target="_blank"
              style={{
                //   textDecoration: "none",
                color: $theme.colors.accent,
              }}
            >
              {data?.profile.link}
            </StyledLink>
          </ParagraphXSmall>
        </Block>
      )}
    </>
  );
}
