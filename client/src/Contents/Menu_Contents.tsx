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
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}
export const defaultMenu = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  accessToken: "",
  menuLocations: [],
  updateData: () => {},
  fetchData: () => {},
};
export const MenuContent = createContext<MenuType>(defaultMenu);

const MenuProvider = (props: any) => {
  const [data, updateData] = useState(defaultMenu);

  useEffect(() => {
    if (data.accessToken) {
      fetchData();
    }
  }, [data.accessToken]);

  //get all menus
  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
    });
  };

  return (
    <MenuContent.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </MenuContent.Provider>
  );
};

export default MenuProvider;
