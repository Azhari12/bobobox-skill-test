"use client";
import React from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ProductType } from "@/types/dummy";
import { BentoGridItem } from "./bento-grid";

export const HeroParallax = ({ products }: { products: ProductType[] }) => {
	const ref = React.useRef(null);
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
		useTransform(scrollYProgress, [0, 0.2], [-2000, 500]),
		springConfig
	);

	return (
		<div
			ref={ref}
			className="pb-[27rem] pt-40 overflow-hidden w-full  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
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
				<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20 w-3/4">
					{products.map((item) => (
						<BentoGridItem
							key={item.title}
							title={item.title}
							image={item.thumbnail}
							discount={item.discountPercentage}
							category={item.category}
							price={item.price}
							stock={item.stock}
						/>
					))}
				</motion.div>
				{/* <motion.div className="flex flex-row  mb-20 space-x-20 ">
					{secondRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateXReverse}
							key={product.title}
						/>
					))}
				</motion.div> */}
				{/* <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
					{thirdRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div> */}
			</motion.div>
		</div>
	);
};

export const Header = () => {
	return (
		<div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
			<h1 className="text-2xl md:text-7xl font-bold dark:text-white">
				Whole Store
			</h1>
			<p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
				we provide a vast array of high-quality products across multiple categories.
				Our commitment to quality and affordability ensures that you find everything
				you need, from beauty essentials to everyday items. Experience convenience
				and variety like never before at Whole Store!
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
