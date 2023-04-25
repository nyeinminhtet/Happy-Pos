import { createContext, useEffect, useState } from "react";
import { AddonCategories, Addons, Menu, MenuCategories } from "../Types/Types";
import { config } from "../config/config";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  updateData: (value: any) => void;
  fetchData: () => void;
}
const defaultMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  updateData: () => {},
  fetchData: () => {},
};
export const MenuContent = createContext<MenuType>(defaultMenu);

const MenuProvider = (props: any) => {
  const [data, updateData] = useState(defaultMenu);

  useEffect(() => {
    fetchData();
  }, []);

  //get all menus
  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/data`);
    const data = await response.json();
    const { menus, menuCategories, addons, addonCategories } = data;
    updateData({ ...data, menus, menuCategories, addons, addonCategories });
  };

  return (
    <MenuContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </MenuContent.Provider>
  );
};

export default MenuProvider;
