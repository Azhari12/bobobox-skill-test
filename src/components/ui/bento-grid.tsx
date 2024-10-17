import { cn } from "@/lib/utils";
import { Badge } from "./badge";

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
}: {
	className?: string;
	title?: string;
	image?: string;
	discount: number;
	category: string;
	price: number;
	stock: number;
}) => {
	return (
		<div
			className={cn(
				" row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent shadow-sm justify-between flex flex-col space-y-4",
				className
			)}
		>
			{/* {header}
			<div className="group-hover/bento:translate-x-2 transition duration-200">
				{icon}
				<div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
					{title}
				</div>
				<div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
					{description}
				</div>
			</div> */}
			<div className="relative aspect-square mb-4">
				<img
					src={image}
					alt={title}
					className="object-cover rounded-md"
					loading="lazy"
				/>
				{discount > 0 && (
					<Badge className="absolute top-2 right-2 bg-red-500">
						{discount.toFixed(0)}% OFF
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
