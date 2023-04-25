export interface Basic {
  id?: number;
  name: string;
}

export interface Menu extends Basic {
  price: number;
}

export interface Addons extends Basic {
  price: number;
  isAvailable: boolean;
  addonCategories: string[];
}

export interface AddonCategories extends Basic {
  isRequire: boolean;
}

export interface MenuCategories {
  category: string;
}
