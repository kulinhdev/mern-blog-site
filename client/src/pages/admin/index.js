import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AdminPage() {
	const router = useRouter();

	useEffect(() => {
		const token = "token";

		if (router.pathname.startsWith("/admin") && !token) {
			router.push("/admin/login");
		}
	}, [router]);

	// axios.defaults.headers.common["Authorization"] =
	// 	localStorage.getItem("token");

	return (
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
		</div>
	);
}

export default AdminPage;
