import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";

const AdminLayout = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const accessToken = Cookies.get("access_token");
		const adminLogin = localStorage.getItem("admin");

		console.log("adminCheck ==> ", {
			refreshToken,
			accessToken,
			adminLogin,
		});

		if (!refreshToken || !adminLogin) {
			router.push("/admin/auth/login");
		}
	}, []);

	return (
		<div className="bg-gray-100 dark:bg-gray-600">
			<AdminNavBar />
			<div className="max-w-full mt-10 mx-5 p-14 sm:ml-64 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto py-6 px-4">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
