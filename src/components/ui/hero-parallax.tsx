"use client";
import React, { useEffect } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	MotionValue,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "@/types/dummy";
import { BentoGridItem } from "./bento-grid";
import { FlipWords } from "./flip-words";
import { useWishlist } from "@/store/product";

export const HeroParallax = ({ products }: { products: ProductType[] }) => {
	const ref = React.useRef(null);
	const navigate = useNavigate();

	const { wishlist, setWishlist } = useWishlist();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0, 0]),
		springConfig
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig
	);

	const translateY = useSpring(
		useTransform(
			scrollYProgress,
			[0, 0.2],
			[(products.length / 30) * -2000, products.length ? 600 : 0]
		),
		springConfig
	);

	useEffect(() => {
		const storedWhislist = localStorage.getItem("whislist");
		setWishlist(storedWhislist ? JSON.parse(storedWhislist) : []);
	}, []);

	return (
		<div
			ref={ref}
			className="pb-[34rem] pt-40 overflow-hidden w-full  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
		>
			<Header />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					// translateX,
					opacity,
				}}
				className="w-full flex justify-center items-center"
			>
				{products.length === 0 ? (
					<p className=" text-center text-xl font-semibold mb-20 w-3/4">
						No Product Found
					</p>
				) : (
					<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20 w-3/4">
						{products.map((item) => (
							<BentoGridItem
								key={item.title}
								product={item}
								wishlistData={wishlist}
								setWishlistData={setWishlist}
								onClickCard={() => navigate(`product-detail/${item.id}`)}
							/>
						))}
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export const Header = () => {
	const words = ["beauty", "furniture", "groceries", "fragrances"];
	return (
		<div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
			<h1 className="text-2xl md:text-7xl font-bold dark:text-white">
				Whole Store
			</h1>
			<p className="max-w-2xl text-base md:text-lg mt-8 dark:text-neutral-200">
				Find all your essentials, from
				<span className="text-2xl font-semibold">
					<FlipWords words={words} />
				</span>
				<br />
				to everyday items, right here at Whole Store.
			</p>
			<p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
				We provide a vast array of high-quality products. Our commitment to quality
				and affordability ensures that you find everything you need. Experience
				convenience and variety like never before at Whole Store!
			</p>
		</div>
	);
};

export const ProductCard = ({
	product,
	translate,
}: {
	product: ProductType;
	translate: MotionValue<number>;
}) => {
	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
			}}
			key={product.title}
			className="group/product h-96 w-[30rem] relative flex-shrink-0"
		>
			<Link to="" className="block group-hover/product:shadow-2xl ">
				<img
					src={product.thumbnail}
					height="600"
					width="600"
					className="object-cover object-left-top absolute h-full w-full inset-0"
					alt={product.title}
				/>
			</Link>
			<div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
			<h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
				{product.title}
			</h2>
		</motion.div>
	);
};
