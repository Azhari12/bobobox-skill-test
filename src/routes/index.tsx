import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages";
import ProductDetail from "@/pages/product-detail";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/product-detail/:id",
		element: <ProductDetail />,
	},
]);
