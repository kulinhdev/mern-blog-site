import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const accessToken = Cookies.get("access_token");
		const adminLogin = localStorage.getItem("admin");

		// console.log("adminCheck ==> ", {
		// 	route: router.pathname,
		// 	refreshToken,
		// 	accessToken,
		// 	adminLogin,
		// });

		if (!refreshToken || !adminLogin) {
			router.push("/admin/auth/login");
		}
	}, []);

	return (
		<div className="admin-page">
			<AdminNavbar />
			<div className="max-w-full mt-10 mx-5 p-14 sm:ml-64 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
