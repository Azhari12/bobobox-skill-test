/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { renderRating } from "@/helper/rating";
import { Lens } from "@/components/ui/lens";
import { IoHeart } from "react-icons/io5";
import { ProductType } from "@/types/dummy";
import { motion } from "framer-motion";

const ProductDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState<ProductType>();
	const [productImage, setProductImage] = useState("");
	const [hovering, setHovering] = useState(false);
	const [onWishlist, setOnWishlist] = useState(false);

	const checkWhislist = () => {
		const storedWhislist = localStorage.getItem("whislist");
		const wishlistArray: ProductType[] | [] = storedWhislist
			? JSON.parse(storedWhislist)
			: [];
		setOnWishlist(wishlistArray.some((item) => item.id === Number(id)));
	};

	const handleWhislist = (action: "add" | "remove") => {
		const storedWhislist = localStorage.getItem("whislist");
		const wishlistArray: ProductType[] = storedWhislist
			? JSON.parse(storedWhislist)
			: [];
		if (action === "add") {
			const dataWishlist = [...wishlistArray];
			if (product) dataWishlist.push(product);
			localStorage.setItem("whislist", JSON.stringify(dataWishlist));
			setOnWishlist(true);
		} else {
			const filterWishlist = wishlistArray.filter(
				(item) => item.id !== Number(id)
			);
			localStorage.setItem("whislist", JSON.stringify(filterWishlist));
			setOnWishlist(false);
		}
	};

	const getData = () => {
		fetch("/data/dummy-data.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const dataProduct = data.products as ProductType[];
				const filteredProduct = dataProduct.find((item) => item.id === Number(id));
				setProduct(filteredProduct);
				setProductImage(filteredProduct?.images[0] ?? "");
			});
	};

	useEffect(() => {
		getData();
		checkWhislist();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className=" container mx-auto p-4 shadow-lg rounded-lg"
		>
			<Button onClick={() => navigate("/")} variant="ghost" className="mb-4">
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
			</Button>
			<div className="grid md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<Lens hovering={hovering} setHovering={setHovering}>
						<div className="relative aspect-auto w-full flex justify-center">
							<img
								src={productImage}
								alt={product?.title}
								className="object-cover rounded-lg h-[28rem]"
								loading="lazy"
							/>
						</div>
					</Lens>
					<div className="grid grid-cols-4 gap-2">
						{product?.images.map((img, index) => (
							<button
								key={index}
								onClick={() => setProductImage(img)}
								className="group/card flex justify-center items-center relative aspect-auto rounded-md overflow-hidden border-2 border-gray-200  focus:border-primary focus:outline-none"
							>
								<div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
								<img
									src={img}
									alt={`${product.title} thumbnail ${index + 1}`}
									className="object-cover h-[10rem]"
									loading="lazy"
								/>
							</button>
						))}
					</div>
				</div>
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold flex items-center justify-between gap-3">
							{product?.title}
							{onWishlist && <IoHeart color="red" size={20} />}
						</h1>
						<p className="text-xl text-gray-500 capitalize">{product?.category}</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="text-3xl font-bold">
								$
								{(
									(product?.price ?? 0) *
									(1 - (product?.discountPercentage ?? 0) / 100)
								).toFixed(2)}
							</p>
							{(product?.discountPercentage ?? 0 > 0) && (
								<p className="text-sm">
									<span className="text-gray-500 line-through">
										${product?.price.toFixed(2)}
									</span>
									<span className="ml-2 text-green-600">
										Save {product?.discountPercentage.toFixed(1)}%
									</span>
								</p>
							)}
						</div>
						<Badge variant={(product?.stock ?? 0) > 0 ? "secondary" : "destructive"}>
							{(product?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
						</Badge>
					</div>
					<div>{renderRating(product?.rating ?? 0)}</div>
					<div className="w-full h-0 border border-gray-200 rounded-full"></div>
					<div className="space-y-2">
						<p className="font-semibold">Description:</p>
						<p className="text-gray-600">{product?.description}</p>
					</div>
					<div className="w-full h-0 border border-gray-200 rounded-full"></div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="font-semibold">Brand:</p>
							<p>{product?.brand}</p>
						</div>
						<div>
							<p className="font-semibold">SKU:</p>
							<p>{product?.sku}</p>
						</div>
						<div>
							<p className="font-semibold">Category:</p>
							<p className="capitalize">{product?.category}</p>
						</div>
						<div>
							<p className="font-semibold">Available Stock:</p>
							<p>{product?.stock}</p>
						</div>
					</div>
					<div className="w-full h-0 border border-gray-200 rounded-full"></div>
					<div className="flex items-center space-x-4 justify-center w-full">
						{!onWishlist ? (
							<Button className="flex-1" onClick={() => handleWhislist("add")}>
								Add to Wishlist
							</Button>
						) : (
							<Button
								className="flex-1"
								variant={"outline"}
								onClick={() => handleWhislist("remove")}
							>
								Remove from Wishlist
							</Button>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetail;
