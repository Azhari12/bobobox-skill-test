import { ProductType } from "@/types/dummy";
import { create } from "zustand";

type Store = {
	wishlist: ProductType[] | [];
	setWishlist: (data: ProductType[] | []) => void;
};

export const useWishlist = create<Store>()((set) => ({
	wishlist: [],
	setWishlist: (data: ProductType[] | []) =>
		set(() => ({
			wishlist: data,
		})),
}));
