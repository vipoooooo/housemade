import * as React from "react";
import {
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import Image from "next/image";
import { Logo } from "../../constants/icon.const";
import { Button, KIND } from "baseui/button";
import { IoClose, IoMenu } from "react-icons/io5";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
import { useRouter } from "next/router";
import { Navlink, NavBtn } from "../common/NavItem";
import { useActiveMenu } from "../../hooks/useActiveMenu";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { SkeletonBtn, SkeletonText } from "../common/Skeleton";

export default function Navigationbar() {
  const [css] = useStyletron();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const { menus } = useActiveMenu();
  const router = useRouter();

  const { data, isLoading } = trpc.useQuery(
    ["user.getUser", { id: session?.id as string }],
    {
      retry: false,
    }
  );

  return (
    <>
      <div
        className={css({
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "saturate(180%) blur(15px)",
        })}
      >
        <Block maxWidth={"1200px"} margin={"0 auto"} display={"flex"}>
          <NavigationList $align={ALIGN.left}>
            <NavigationItem
              className={css({
                paddingLeft: "20px",
                lineHeight: "0px",
                cursor: "pointer",
              })}
            >
              <Image
                onClick={() => router.push("/browse/Browse")}
                src={Logo}
                height={20}
                width={20}
                objectFit={"contain"}
              />
            </NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.left}>
            {isLoading ? (
              <Block display={["none", "none", "none", "flex"]}>
                <StyledNavigationItem>
                  <SkeletonText />
                </StyledNavigationItem>
                <StyledNavigationItem>
                  <SkeletonText />
                </StyledNavigationItem>
                <StyledNavigationItem>
                  <SkeletonText />
                </StyledNavigationItem>
              </Block>
            ) : (
              <Block display={["none", "none", "none", "flex"]}>
                {menus.map((item, key) => {
                  if (item.roles.includes(data?.user?.role || ""))
                    return (
                      <Navlink
                        key={key}
                        herf={item.href}
                        title={item.title}
                        active={item.active}
                      />
                    );
                })}
              </Block>
            )}
          </NavigationList>
          <NavigationList $align={ALIGN.center} />

          <NavigationList
            $align={ALIGN.right}
            className={css({
              paddingRight: "0px",
              //   lineHeight: "0px",
              display: "flex",
              justifyContent: "flex-end",
            })}
          >
            {/* <Block width={"300px"} display={["none", "none", "none", "block"]}>
              <Search
                {...options}
                type={TYPE.search}
                getOptionLabel={(props) =>
                  props.option && props.option.id ? props.option.id : null
                }
                onChange={() => {}}
              />
            </Block> */}
            {isLoading ? (
              <Block display={["none", "none", "none", "flex"]}>
                <SkeletonBtn />
              </Block>
            ) : (
              <>
                {data?.user?.role === "worker" ? (
                  <Block height={"48px"}></Block>
                ) : (
                  <Button
                    onClick={() =>
                      router.push("/authentication/RegisterWorker")
                    }
                    kind={KIND.tertiary}
                  >
                    Become a worker
                  </Button>
                )}
              </>
            )}
            <Block display={["block", "block", "block", "none"]}>
              <Button onClick={() => setIsOpen(!isOpen)} kind={KIND.tertiary}>
                {isOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
              </Button>
            </Block>
          </NavigationList>
        </Block>
      </div>
      <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

function MenuDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css] = useStyletron();
  const { menus } = useActiveMenu();
  const { data: session } = useSession();
  const { data } = trpc.useQuery(
    ["user.getUser", { id: session?.id as string }],
    {
      retry: false,
    }
  );

  return (
    <Drawer
      isOpen={isOpen}
      autoFocus
      renderAll
      onClose={() => setIsOpen(false)}
      size={SIZE.auto}
      anchor={ANCHOR.top}
      overrides={{
        DrawerBody: {
          style: () => ({
            // top: '100px',
            zIndex: 3,
            margin: "0px 0px 0px 0px",
            padding: "60px 20px 20px 20px",
          }),
        },
      }}
    >
      <Block
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
        <>
          {/* <Block width={"100%"}>
            <Search
              {...options}
              type={TYPE.search}
              getOptionLabel={(props) =>
                props.option && props.option.id ? props.option.id : null
              }
              onChange={() => {}}
            />
          </Block> */}
          {menus.map((item, key) => {
            if (item.roles.includes(data?.user?.role || ""))
              return (
                <NavBtn
                  key={key}
                  link={item.href}
                  title={item.title}
                  active={item.active}
                  icon={item.icon}
                />
              );
          })}
        </>
      </Block>
    </Drawer>
  );
}
