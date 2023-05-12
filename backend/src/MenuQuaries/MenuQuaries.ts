import { pool } from "../../db/db";
import { CreateMenuParams, LocationMenu, Menu } from "../types/MenuTypes";

interface MenuQuaries {
  createMenu: (createMenuParams: CreateMenuParams) => Promise<Menu>;
  getMenu: (menuId: string) => Promise<Menu | undefined>;
  getMenuByLocations: (locationId: string) => Promise<LocationMenu | undefined>;
  deleteMenu: (menuId: string) => Promise<void>;
}

export const MenuQuaries: MenuQuaries = {
  createMenu: async (createMenuParms: CreateMenuParams) => {
    const { name, price, locationIds, imgUrl } = createMenuParms;
    const text =
      "INSERT INTO menus(name, price,imgUrl) VALUES($1, $2,$3) RETURNING *";
    const values = [name, price, imgUrl];
    const { rows } = await pool.query(text, values);
    const menu = rows[0] as Menu;
    const menuId = menu.id as string;
    await pool.query(
      `insert into menu_locations (menu_id,location_id) select * from unnest ($1::int[],$2::int[])`,
      [Array(locationIds.length).fill(menuId), locationIds]
    );
    return { id: menuId, name, price, imgUrl, locationIds };
  },
  getMenu: async (menuId: string) => {
    const menuResult = await pool.query(`select * from menus where id = $1`, [
      menuId,
    ]);
    const hasMenu = menuResult.rows.length > 0;
    if (hasMenu) {
      const menu = menuResult.rows[0] as Menu;

      //location and menu
      const locationIdsResult = await pool.query(
        `select location_id from menu_locations where menu_id = $1`,
        [menuId]
      );
      const locationIds = locationIdsResult.rows.map((row) => row.location_id);

      //menuCategoryId
      const menuCategoriesIdsResult = await pool.query(
        "select menu_categories_id from menus_menucategrories where menu_id = $1",
        [menuId]
      );
      const menuCategoriesIds = menuCategoriesIdsResult.rows.map(
        (row) => row.menu_categories_id
      );

      //addonCategoryId
      const addonCategoriesIdsResult = await pool.query(
        "select addon_category_id from addons_menus where menu_id =$1",
        [menuId]
      );
      const addonCategoriesIds = addonCategoriesIdsResult.rows.map(
        (row) => row.addon_category_id
      );

      return {
        id: menuId,
        name: menu.name,
        price: menu.price,
        locationIds,
        menuCategoriesIds,
        addonCategoriesIds,
      };
    }
  },
  getMenuByLocations: async (locationId: string) => {
    const locationResult = await pool.query(
      "select * from locations where id = $1",
      [locationId]
    );
    const location = locationResult.rows[0];
    const hasLocation = locationResult.rows.length > 0;
    if (hasLocation) {
      //menu and location
      const menuIdsResult = await pool.query(
        "select menu_id from menu_locations where location_id = $1",
        [locationId]
      );
      const menuId = menuIdsResult.rows.map((row) => row.menu_id);
      const menuResult = await pool.query(
        "select * from menus where id = any($1::int[])",
        [menuId]
      );
      const menu = menuResult.rows;
      // //menuCategories
      const menuCategoriesIdsResult = await pool.query(
        "select menu_categories_id from menus_menucategrories where menu_id = ANY($1::int[])",
        [menuId]
      );
      const menuCategoriesIds = menuCategoriesIdsResult.rows.map(
        (row) => row.menu_categories_id
      );
      //addonCategories
      const addonCategoriesIdsResult = await pool.query(
        "select addon_category_id from addons_menus where menu_id = any($1::int[])",
        [menuId]
      );
      const addonCategoriesIds = addonCategoriesIdsResult.rows.map(
        (row) => row.addon_category_id
      );
      return {
        id: menuId,
        name: menu,
        price: menu,
        addonCategoriesIds,
        menuCategoriesIds,
      };
    }
  },
  deleteMenu: async (menuId: string) => {
    // const menuIdResult = await pool.query("select id from menus where id =$1", [
    //   menuId,
    // ]);
    // const menu = menuIdResult.rows[0];

    //menuCategories
    await pool.query("delete from menus_menucategrories where menu_id =$1", [
      menuId,
    ]);
    // //location
    // await pool.query("delete from menu_locations where menu_id=$1", [menuId]);

    // //addonCategory
    // await pool.query("delete from addons_menus where menu_id =$1", [menuId]);

    // await pool.query("delete from menus where id=$1", [menuId]);
  },
};
