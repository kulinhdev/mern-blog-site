import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AdminNav from "./AdminNav";

const AdminLayout = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const adminLogin = localStorage.getItem("admin");

		if (!refreshToken || !adminLogin) {
			router.push("/admin/auth/login");
		}
	}, []);

	return (
		<div className="admin-page">
			<AdminNav />
			<div className="max-w-full mt-10 mx-5 p-14 sm:ml-64 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
