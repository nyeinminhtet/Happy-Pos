export interface Menu {
  id?: string;
  name: string;
  price: number;
  assetUrl?: string;
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
  assetUrl?: string;
  description?: string;
  locationIds: string[];
}
