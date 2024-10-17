/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Heart, Star, StarHalf } from "lucide-react";
import { Dispatch } from "react";

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
	title,
	image,
	discount,
	category,
	price,
	stock,
	rating,
	id,
	wishlistData,
	setWishlistData,
}: {
	className?: string;
	title?: string;
	image?: string;
	discount: number;
	category: string;
	price: number;
	stock: number;
	rating: number;
	id: number;
	wishlistData: number[];
	setWishlistData: Dispatch<React.SetStateAction<number[]>>;
}) => {
	const renderRating = (rating: number) => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;
		return (
			<div className="flex items-center">
				{[...Array(fullStars)].map((_, i) => (
					<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
				))}
				{hasHalfStar && (
					<StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
				)}
				<span className="ml-1 text-sm text-gray-600">{rating.toFixed(2)}</span>
			</div>
		);
	};

	const handleWhislist = (action: "add" | "remove", idProduct: number) => {
		if (action === "add") {
			const dataWishlist = [...wishlistData];
			dataWishlist.push(idProduct);
			setWishlistData(dataWishlist);
			localStorage.setItem("whislist", JSON.stringify(dataWishlist));
		} else {
			const filterWishlist = wishlistData.filter((id) => id !== idProduct);
			setWishlistData(filterWishlist);
			localStorage.setItem("whislist", JSON.stringify(filterWishlist));
		}
	};

	const checkWhislist = () => {
		return wishlistData.includes(id);
	};

	return (
		<div
			className={cn(
				" row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent shadow-sm justify-between flex flex-col space-y-4",
				className
			)}
		>
			<div className="relative aspect-square mb-4">
				<img
					src={image}
					alt={title}
					className="object-cover rounded-md"
					loading="lazy"
				/>
				<div className="cursor-pointer absolute top-2 left-2 opacity-0 group-hover/bento:opacity-100 transition duration-200 p-1 bg-slate-100 rounded-full">
					<Heart
						onClick={() => handleWhislist(checkWhislist() ? "remove" : "add", id)}
						size={20}
						fill={checkWhislist() ? "red" : "white"}
						stroke={checkWhislist() ? "none" : "black"}
					/>
				</div>
				{discount > 0 && (
					<Badge className="absolute top-2 right-2 bg-red-500">
						{discount.toFixed(1)}% OFF
					</Badge>
				)}
			</div>
			<h2 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h2>
			<p className="text-sm text-gray-500 mb-2">{category}</p>
			<div className="flex justify-between items-center mb-2">
				<span className="font-bold text-lg">
					${(price * (1 - discount / 100)).toFixed(2)}
				</span>
				{discount > 0 && (
					<span className="text-sm text-gray-500 line-through">
						${price.toFixed(2)}
					</span>
				)}
			</div>
			{renderRating(rating)}
			<div className="flex items-center py-6 pt-0">
				{stock <= 5 ? (
					<Badge variant="destructive" className="w-full justify-center">
						Low Stock: Only {stock} left
					</Badge>
				) : (
					<Badge variant="secondary" className="w-full justify-center">
						In Stock: {stock} available
					</Badge>
				)}
			</div>
		</div>
	);
};
