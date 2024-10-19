/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Heart } from "lucide-react";
import { renderRating } from "@/helper/rating";
import { ProductType } from "@/types/dummy";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
				className
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	product,
	wishlistData,
	setWishlistData,
	onClickCard,
}: {
	className?: string;
	product: ProductType;
	wishlistData: ProductType[];
	setWishlistData: any;
	onClickCard: () => void;
}) => {
	const handleWhislist = (action: "add" | "remove") => {
		if (action === "add") {
			const dataWishlist = [...wishlistData];
			dataWishlist.push(product);
			setWishlistData(dataWishlist);
			localStorage.setItem("whislist", JSON.stringify(dataWishlist));
		} else {
			const filterWishlist = wishlistData.filter((item) => item.id !== product.id);
			setWishlistData(filterWishlist);
			localStorage.setItem("whislist", JSON.stringify(filterWishlist));
		}
	};

	const checkWhislist = () => {
		return wishlistData.some((item) => item.id === product.id);
	};

	return (
		<div
			onClick={onClickCard}
			className={cn(
				" row-span-1 cursor-pointer rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent shadow-sm justify-between flex flex-col space-y-4",
				className
			)}
		>
			<div className="relative aspect-square mb-4">
				<img
					src={product.thumbnail}
					alt={product.title}
					className="object-cover rounded-md"
					loading="lazy"
				/>
				<div className="cursor-pointer absolute top-2 left-2 opacity-0 group-hover/bento:opacity-100 transition duration-200 p-1 bg-slate-100 rounded-full">
					<Heart
						onClick={(event) => {
							event.stopPropagation();
							handleWhislist(checkWhislist() ? "remove" : "add");
						}}
						size={20}
						fill={checkWhislist() ? "red" : "white"}
						stroke={checkWhislist() ? "none" : "black"}
					/>
				</div>
				{product.discountPercentage > 0 && (
					<Badge className="absolute top-2 right-2 bg-red-500">
						{product.discountPercentage.toFixed(1)}% OFF
					</Badge>
				)}
			</div>
			<h2 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h2>
			<p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
			<div className="flex justify-between items-center mb-2">
				<span className="font-bold text-lg">
					${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
				</span>
				{product.discountPercentage > 0 && (
					<span className="text-sm text-gray-500 line-through">
						${product.price.toFixed(2)}
					</span>
				)}
			</div>
			{renderRating(product.rating)}
			<div className="flex items-center py-6 pt-0">
				{product.stock <= 5 ? (
					<Badge variant="destructive" className="w-full justify-center">
						Low Stock: Only {product.stock} left
					</Badge>
				) : (
					<Badge variant="secondary" className="w-full justify-center">
						In Stock: {product.stock} available
					</Badge>
				)}
			</div>
		</div>
	);
};
