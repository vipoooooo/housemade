import { useStyletron } from "baseui";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import { Block } from "baseui/block";
import { Skeleton } from "baseui/skeleton";
import * as React from "react";
import { imageContainer } from "../../pages/browse/components/profile/PortfolioCont";

export function SkeletonText() {
  return (
    <Skeleton
      width="60px"
      height="15px"
      overrides={{
        Root: {
          style: {
            borderRadius: "15px",
          },
        },
      }}
      animation
    />
  );
}

export function SkeletonBtn() {
  return <Skeleton width="160px" height="48px" animation />;
}

export function SkeletonProfileCont() {
  const [css, $theme] = useStyletron();
  return (
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
      <ProfileInfo />
      <ProfileBtn />
      <ProfileContent />
    </Block>
  );
}

export function SkeletonPortfolioCont() {
  const [css, $theme] = useStyletron();
  return (
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
      <ProfileInfo />
      <PortfolioBtn />
      <ProfileContent />
    </Block>
  );
}

function ProfileInfo() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "10px",
      })}
    >
      <Skeleton
        width="100px"
        height="100px"
        animation
        overrides={{
          Root: {
            style: {
              borderRadius: "50%",
            },
          },
        }}
      />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        })}
      >
        <Skeleton
          width="100px"
          height="15px"
          overrides={{
            Root: {
              style: {
                borderRadius: "15px",
              },
            },
          }}
          animation
        />
        <Skeleton
          width="75px"
          height="15px"
          overrides={{
            Root: {
              style: {
                borderRadius: "15px",
              },
            },
          }}
          animation
        />
      </div>
    </div>
  );
}

function ProfileContent() {
  const [css] = useStyletron();
  return (
    <Skeleton
      rows={3}
      width="200px"
      animation
      overrides={{
        Row: {
          style: {
            height: "20px",
            marginBottom: "15px",
          },
        },
      }}
    />
  );
}

function ProfileBtn() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "5px",
      })}
    >
      <Skeleton
        width="calc((100% - (36px + (5px*2)))/2)"
        height="36px"
        animation
      />
      <Skeleton
        width="calc((100% - (36px + (5px*2)))/2)"
        height="36px"
        animation
      />
      <Skeleton width="36px" height="36px" animation />
    </div>
  );
}

function PortfolioBtn() {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "5px",
      })}
    >
      <Skeleton width="100%" height="36px" animation />
    </div>
  );
}

export function ProjectSkeleton() {
  const [css] = useStyletron();
  return (
    <>
      <AspectRatioBox aspectRatio={16 / 9}>
        <AspectRatioBoxBody
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          marginBottom="20px"
          className={css(imageContainer)}
          overrides={{
            Block: {
              style: {
                cursor: "pointer",
              },
            },
          }}
        >
          <Skeleton rows={0} height="100%" width="100%" animation />
        </AspectRatioBoxBody>
      </AspectRatioBox>
      <Skeleton
        width="100px"
        height="15px"
        overrides={{
          Root: {
            style: {
              borderRadius: "15px",
            },
          },
        }}
        animation
      />
    </>
  );
}

export function SkeletonReview() {
  const [css, theme] = useStyletron();
  return (
    <Block
      width={"100%"}
      // className={css({ flex: 1})}
      marginBottom="20px"
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
          <Skeleton
            width="40px"
            height="40px"
            animation
            overrides={{
              Root: {
                style: {
                  borderRadius: "50%",
                },
              },
            }}
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
              <Skeleton
                width="50px"
                height="15px"
                overrides={{
                  Root: {
                    style: {
                      borderRadius: "15px",
                    },
                  },
                }}
                animation
              />
            </div>
            <Skeleton
              width="100px"
              height="15px"
              overrides={{
                Root: {
                  style: {
                    borderRadius: "15px",
                  },
                },
              }}
              animation
            />
          </div>
        </div>
      </div>
    </Block>
  );
}
