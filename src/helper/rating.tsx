import { Star, StarHalf } from "lucide-react";

export const renderRating = (rating: number) => {
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
