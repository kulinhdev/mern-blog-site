import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<Script
				src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
				strategy="beforeInteractive"
				onReady={() => {
					console.log("Script flowbite has loaded!");
				}}
			/>
		</>
	);
}
