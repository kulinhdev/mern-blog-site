import React from "react";
import ClientNavbar from "@/components/layouts/ClientNavbar";

const UserLayout = ({ children }) => {
	return (
		<div className="bg-gray-100 dark:bg-gray-600">
			<ClientNavbar />
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
};

export default UserLayout;
