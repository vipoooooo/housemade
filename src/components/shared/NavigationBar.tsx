import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { StyledLink as Link } from "baseui/link";
import { StatefulSelect as Search, TYPE } from "baseui/select";
import { StyledLink } from "baseui/link";
import Image from "next/image";
import { Logo } from "../../constants/icon.const";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import Navlink from "../common/Navlink";
import { Button, KIND, SHAPE } from "baseui/button";
import {
  IoBookmark,
  IoCalendar,
  IoChatbubble,
  IoCog,
  IoHome,
  IoLanguage,
  IoLogOut,
  IoMenu,
  IoSettings,
} from "react-icons/io5";
import { useStyletron } from "styletron-react";
import { Block } from "baseui/block";
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
import { ActiveLink, PassiveLink } from "../common/Navbtn";
import { useRouter } from "next/router";

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
  const [css] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  return (
    <>
      <div
        className={css({
          display: "flex",
        })}
      >
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
            <Navlink herf={"/browse/Browse"} title={"Browse"} />
            <Navlink herf={"/chat/Chat"} title={"Chat"} />
            <Navlink herf={"/schedule/Schedule"} title={"Schedule"} />
            <Navlink herf={"/bookmark/Bookmark"} title={"Bookmark"} />
          </Block>
        </NavigationList>
        <NavigationList $align={ALIGN.center} />
        <NavigationList
          $align={ALIGN.right}
          className={css({
            paddingRight: "0px",
            //   lineHeight: "0px",
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
            <Block width={"300px"} display={["none", "none", "none", "block"]}>
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
              onClick={() => router.push("/authentication/Login")}
              kind={KIND.tertiary}
            >
              Login
            </Button>
            <Block display={["none", "none", "none", "block"]}>
              <Button
                onClick={() => router.push("/setting/Setting")}
                kind={KIND.tertiary}
              >
                <IoCog size={20} />
              </Button>
            </Block>
            <Block display={["block", "block", "block", "none"]}>
              <Button onClick={() => setIsOpen(true)} kind={KIND.tertiary}>
                <IoMenu size={20} />
              </Button>
            </Block>
          </NavigationItem>
        </NavigationList>
      </div>
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
          <ActiveLink
            link={"/browse/Browse"}
            icon={<IoHome size={20} />}
            title={"Browse"}
          />
          <PassiveLink
            link={"/chat/Chat"}
            icon={<IoChatbubble size={20} />}
            title={"Chat"}
          />
          <PassiveLink
            link={"/schedule/Schedule"}
            icon={<IoCalendar size={20} />}
            title={"Schedule"}
          />
          <PassiveLink
            link={"/bookmark/Bookmark"}
            icon={<IoBookmark size={20} />}
            title={"Bookmark"}
          />
          <PassiveLink
            link={"/setting/Setting"}
            icon={<IoCog size={20} />}
            title={"Setting"}
          />
        </Block>
      </Drawer>
    </>
  );
}

// need fixing*********
function MenuDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css] = useStyletron();
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
            margin: "0px",
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
        <ActiveLink
          link={"/browse/Browse"}
          icon={<IoHome size={20} />}
          title={"Browse"}
        />
        <PassiveLink
          link={"/chat/Chat"}
          icon={<IoChatbubble size={20} />}
          title={"Chat"}
        />
        <PassiveLink
          link={"/schedule/Schedule"}
          icon={<IoCalendar size={20} />}
          title={"Schedule"}
        />
        <PassiveLink
          link={"/bookmark/Bookmark"}
          icon={<IoBookmark size={20} />}
          title={"Bookmark"}
        />
        <PassiveLink
          link={"/setting/Setting"}
          icon={<IoCog size={20} />}
          title={"Setting"}
        />
      </Block>
    </Drawer>
  );
}
