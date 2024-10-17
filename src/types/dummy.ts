export type ProductType = {
	availabilityStatus: string;
	brand: string;
	category: string;
	description: string;
	dimensions: Dimensions;
	discountPercentage: number;
	id: number;
	images: string[];
	meta: Meta;
	minimumOrderQuantity: number;
	price: number;
	rating: number;
	returnPolicy: string;
	reviews: Review[];
	shippingInformation: string;
	sku: string;
	stock: number;
	tags: string[];
	thumbnail: string;
	title: string;
	warrantyInformation: string;
	weight: number;
};

export type Dimensions = {
	depth: number;
	height: number;
	width: number;
};

export type Meta = {
	barcode: string;
	createdAt: string; // ISO date string
	qrCode: string;
	updatedAt: string; // ISO date string
};

export type Review = {
	rating: number;
	comment: string;
	date: string; // ISO date string
	reviewerName: string;
	reviewerEmail: string;
};
