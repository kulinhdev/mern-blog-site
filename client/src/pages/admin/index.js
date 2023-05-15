import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AdminPage() {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("refresh_token");

		console.log("admin check token ==> ", token);

		// Check token doesn't exist
		if (router.pathname.startsWith("/admin") && token === undefined) {
			router.push("/admin/auth/login");
		}
	}, [router]);

	return (
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
		</div>
	);
}

export default AdminPage;
