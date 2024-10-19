import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<div className="min-h-screen">
				<RouterProvider router={router} />
			</div>
		</ThemeProvider>
	);
}

export default App;
