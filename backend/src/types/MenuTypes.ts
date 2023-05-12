export interface Menu {
  id?: string;
  name: string;
  price: number;
  imgUrl?: string;
  locationIds: string[];
  addonCategoriesIds?: string[];
  menuCategoriesIds?: string[];
}
export interface LocationMenu {
  id: string[];
  name?: string[];
  price?: number[];
  addonCategoriesIds: string[];
  menuCategoriesIds: string[];
}

export interface CreateMenuParams {
  name: string;
  price: number;
  imgUrl?: string;
  locationIds: string[];
}
