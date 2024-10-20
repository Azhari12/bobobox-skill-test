import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/animated-modal";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useWishlist } from "@/store/product";

const WishlistModal = () => {
	const navigate = useNavigate();

	const { wishlist, setWishlist } = useWishlist();

	const removeWishlist = (idProduct: number) => {
		const filtered = wishlist.filter((item) => item.id !== idProduct);
		localStorage.setItem("whislist", JSON.stringify(filtered));
		setWishlist(filtered);
	};

	return (
		<Modal>
			<ModalTrigger className="dark:bg-black bg-white border text-black dark:text-white flex justify-center group/modal-btn w-[2.5rem] hover:w-[10rem] transition-all duration-300 ease-in-out shadow-md rounded-lg p-[0.7rem] ">
				<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
					<FaRegHeart />
				</span>
				<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black dark:text-white z-20 truncate">
					View your wishlist
				</div>
			</ModalTrigger>
			<ModalBody customClassname="-mt-[30.5px] min-h-screen">
				<ModalContent className="overflow-auto">
					<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
						Purchase your wishlist item now!{" "}
					</h4>
					{wishlist.length === 0 ? (
						<p className="w-full text-center font-medium text-lg text-gray-500">
							You don't have wishlist yet
						</p>
					) : (
						<div className="grid grid-cols-4">
							{wishlist.map((item, idx) => (
								<motion.div
									onClick={() => navigate(`/product-detail/${item.id}`)}
									key={"images" + idx}
									style={{
										rotate: Math.random() * 20 - 10,
									}}
									whileHover={{
										scale: 1.1,
										rotate: 0,
										zIndex: 100,
									}}
									whileTap={{
										scale: 1.1,
										rotate: 0,
										zIndex: 100,
									}}
									className="rounded-xl cursor-pointer -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 group/card"
								>
									<X
										onClick={(event) => {
											event.stopPropagation();
											removeWishlist(item.id);
										}}
										color="white"
										size={18}
										className="absolute top-2 right-2 z-50 opacity-0 group-hover/card:opacity-100  transition-all duration-300 ease-in-out "
									/>
									<DirectionAwareHover imageUrl={item.thumbnail} className="relative">
										<p className="font-bold text-sm">{item.title}</p>
										<p className="font-normal text-xs">
											${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
										</p>
									</DirectionAwareHover>
								</motion.div>
							))}
						</div>
					)}
				</ModalContent>
				<ModalFooter className="gap-4">
					<button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
						Purchase Now
					</button>
				</ModalFooter>
			</ModalBody>
		</Modal>
	);
};

export default WishlistModal;
