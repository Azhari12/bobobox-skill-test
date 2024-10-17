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

const MainPage = () => {
	const [data, setData] = useState<ProductType[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [category, setCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const getData = () => {
		fetch("/src/data/dummy-data.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				const dataProduct = data.products;
				setData(dataProduct);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 800) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="relative">
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={{
					y: isVisible ? 30 : -100,
					opacity: isVisible ? 1 : 0,
				}}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="fixed top-0 w-full z-50 flex justify-center"
			>
				<div className="w-[500px] flex shadow-md rounded-lg">
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-[180px] rounded-r-none border-r-0">
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All categories</SelectItem>
							<SelectItem value="mockups">Mockups</SelectItem>
							<SelectItem value="logos">Logos</SelectItem>
							<SelectItem value="themes">Design Themes</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Search Mockups, Logos, Design Themes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className=" border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>
			</motion.div>
			<HeroParallax products={data} />;
			{/* <BentoGrid className="max-w-4xl mx-auto">
				{data.map((item, i) => (
					<BentoGridItem
						key={i}
						title={item.title}
						description={item.description}
						header={item.category}
						icon={<img src={item.images[0]} className="w-24 h-24 object-contain" />}
					/>
				))}
			</BentoGrid> */}
			{/* <div className="h-full grid grid-cols-3">
				{data.map((item) => {
					return (
						<div>
							<img src={item.images[0]} alt={item.brand} loading="lazy" />
						</div>
					);
				})}
			</div> */}
		</div>
	);
};

export default MainPage;
