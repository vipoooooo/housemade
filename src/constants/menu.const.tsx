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

export type MenuItem = {
  title: string;
  href: string;
  active: boolean;
  icon: React.ReactNode;
};

export const menuItems: MenuItem[] = [
  {
    title: "Browse",
    href: "/browse/Browse",
    active: false,
    icon: <IoHome size={20} />,
  },
  {
    title: "Portfolio",
    href: "/portfolio/Portfolio",
    active: false,
    icon: <IoChatbubble size={20} />,
  },
  {
    title: "Chat",
    href: "/chat/Chat",
    active: false,
    icon: <IoChatbubble size={20} />,
  },
  {
    title: "Schedule",
    href: "/schedule/Schedule",
    active: false,
    icon: <IoCalendar size={20} />,
  },
  {
    title: "Bookmark",
    href: "/bookmark/Bookmark",
    active: false,
    icon: <IoBookmark size={20} />,
  },
  {
    title: "Setting",
    href: "/setting/Setting",
    active: false,
    icon: <IoCog size={20} />,
  },
];
