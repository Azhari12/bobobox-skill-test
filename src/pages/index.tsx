/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ProductType } from "../types/dummy";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import WishlistModal from "./components/wishlist-modal";
import { ModeToggle } from "@/components/mode-toggle";

const MainPage = () => {
	const [data, setData] = useState<ProductType[]>([]);
	const [defaultData, setDefaultData] = useState<ProductType[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [category, setCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filterProduct = () => {
		if (category === "all" && searchQuery === "") {
			setData(defaultData);
		} else {
			let filteredData: any[] = [];
			if (searchQuery === "") {
				filteredData = defaultData.filter((item) => item.category === category);
			} else if (category === "all") {
				filteredData = defaultData.filter((item) =>
					item.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
				);
			} else {
				filteredData = defaultData.filter(
					(item) =>
						item.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) &&
						item.category === category
				);
			}
			setData(filteredData);
		}
	};

	const handleScroll = () => {
		if (window.scrollY >= 800) {
			setIsVisible(true);
		} else {
			if (data.length !== 0) {
				setIsVisible(false);
			} else {
				if (window.scrollY <= 100) {
					setIsVisible(false);
				} else {
					setIsVisible(true);
				}
			}
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
				const dataProduct = data.products;
				setData(dataProduct);
				setDefaultData(dataProduct);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [data]);

	useEffect(() => {
		filterProduct();
	}, [category, searchQuery]);

	return (
		<div className="relative">
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={{
					y: isVisible ? 30 : -100,
					opacity: isVisible ? 1 : 0,
				}}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="fixed top-0 w-full z-50 flex justify-center items-start gap-5"
			>
				<div className="w-[500px] flex shadow-md rounded-lg ">
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-[180px] rounded-r-none border-r-0 focus:ring-0 focus:outline-none focus:ring-offset-0 ">
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All categories</SelectItem>
							<SelectItem value="beauty">Beauty</SelectItem>
							<SelectItem value="fragrances">Fragrances</SelectItem>
							<SelectItem value="furniture">Furniture</SelectItem>
							<SelectItem value="groceries">Groceries</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Search Products"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className=" border-l-0 rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>
				<WishlistModal />
				<ModeToggle />
			</motion.div>
			<HeroParallax products={data} />
		</div>
	);
};

export default MainPage;
