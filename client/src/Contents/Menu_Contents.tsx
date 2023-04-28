import { createContext, useEffect, useState } from "react";
import {
  AddonCategories,
  Addons,
  Locations,
  Menu,
  MenuCategories,
  MenuLocations,
} from "../Types/Types";
import { config } from "../config/config";

interface MenuType {
  menus: Menu[];
  menuCategories: MenuCategories[];
  addons: Addons[];
  addonCategories: AddonCategories[];
  locations: Locations[];
  menuLocations: MenuLocations[];
  updateData: (value: any) => void;
  fetchData: () => void;
}
const defaultMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
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
    const { menus, menuCategories, addons, addonCategories,locations,menuLocations } = data;
    updateData({ ...data, menus, menuCategories, addons, addonCategories,locations,menuLocations });
  };

  return (
    <MenuContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </MenuContent.Provider>
  );
};

export default MenuProvider;