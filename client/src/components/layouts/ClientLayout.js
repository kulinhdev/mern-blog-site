import ClientNav from "./ClientNav";
import React from "react";

const ClientLayout = ({ children }) => {
	return (
		<div className="client-page">
			<ClientNav />
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
};

export default ClientLayout;
