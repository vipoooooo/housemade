import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { StatefulSelect as Search, TYPE } from "baseui/select";
import Image from "next/image";
import { Logo } from "../../constants/icon.const";
import { Button, KIND, SHAPE } from "baseui/button";
import { IoMenu } from "react-icons/io5";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
import { useRouter } from "next/router";
import { Navlink, NavBtn } from "../common/NavItem";
import { useActiveMenu } from "../../hooks/useActiveMenu";

const options = {
  options: [
    { id: "AliceBlue", color: "#F0F8FF" },
    { id: "AntiqueWhite", color: "#FAEBD7" },
    { id: "Aqua", color: "#00FFFF" },
    { id: "Aquamarine", color: "#7FFFD4" },
    { id: "Azure", color: "#F0FFFF" },
    { id: "Beige", color: "#F5F5DC" },
    { id: "Bisque", color: "#FFE4C4" },
    { id: "Black", color: "#000000" },
  ],
  labelKey: "id",
  valueKey: "color",
  placeholder: "Search here...",
  maxDropdownHeight: "300px",
};

export default function Navigationbar() {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const { menus } = useActiveMenu();
  const router = useRouter();
  console.log(menus);

  return (
    <>
      <div
        className={css({
          position: "sticky",
          top: 0,
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
              })}
            >
              <Image src={Logo} height={20} width={20} objectFit={"contain"} />
            </NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.left}>
            <Block display={["none", "none", "none", "flex"]}>
              {menus.map((item, key) => (
                <Navlink
                  key={key}
                  herf={item.href}
                  title={item.title}
                  active={item.active}
                />
              ))}
            </Block>
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
            <NavigationItem
              className={css({
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px",
                margin: "0px",
              })}
            >
              <Block
                width={"300px"}
                display={["none", "none", "none", "block"]}
              >
                <Search
                  {...options}
                  type={TYPE.search}
                  getOptionLabel={(props) =>
                    props.option && props.option.id ? props.option.id : null
                  }
                  onChange={() => {}}
                />
              </Block>
              <Button
                onClick={() => router.push("/authentication/LoginMain")}
                kind={KIND.tertiary}
              >
                Login
              </Button>
              <Block display={["block", "block", "block", "none"]}>
                <Button onClick={() => setIsOpen(true)} kind={KIND.tertiary}>
                  <IoMenu size={20} />
                </Button>
              </Block>
            </NavigationItem>
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
          style: ({ $theme }) => ({
            margin: "0px 0px 0px 0px",
            padding: "40px 20px 20px 20px",
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
          <Block width={"100%"}>
            <Search
              {...options}
              type={TYPE.search}
              getOptionLabel={(props) =>
                props.option && props.option.id ? props.option.id : null
              }
              onChange={() => {}}
            />
          </Block>
          {menus.map((item, key) => (
            <NavBtn
              key={key}
              link={item.href}
              title={item.title}
              active={item.active}
              icon={item.icon}
            />
          ))}
        </>
      </Block>
    </Drawer>
  );
}
