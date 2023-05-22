import React from "react";
import ClientNavbar from "@/components/layouts/ClientNavbar";

const ClientLayout = ({ children }) => {
	return (
		<div className="client-page">
			<ClientNavbar />
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
};

export default ClientLayout;
