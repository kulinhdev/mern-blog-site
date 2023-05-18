import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavbarAdmin";

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
		<div className="layout">
			<NavBar />
			<div className="p-4 sm:ml-64">
				<div className="p-4 mt-14">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
