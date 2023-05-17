import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
