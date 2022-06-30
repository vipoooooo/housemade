import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MenuItem, menuItems } from "../constants/menu.const";


export const useActiveMenu = () => {
  const [menus, setMenus] = useState<MenuItem[]>(menuItems);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname) {
      const items = menuItems.map((item) => {
        if (item.href === router.pathname) {
          return { ...item, active: true };
        }
        return item;
      });
      setMenus(items);
    }
  }, [router]);

  return { menus };
};
