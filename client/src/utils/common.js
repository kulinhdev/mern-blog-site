import Cookies from "js-cookie";

export function setAccessTokenAdmin(accessToken) {
	// Set asset token in cookie with 1 hour expiry
	Cookies.set("access_token", accessToken, {
		expires: 1 / 24,
		path: "/admin",
	});
}

export function setRefreshTokenAdmin(refreshToken) {
	// Set refresh token in cookie with 30 day expiry
	Cookies.set("refresh_token", refreshToken, { expires: 30, path: "/admin" });
}

// Format: Thursday, May 18, 2023
export function formatDate(dateString, isMinRead = false) {
	const date = new Date(dateString);

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const formattedDate = date.toLocaleDateString("en-US", options);

	const minutes = 10; // Assuming it's a constant for now

	return `${formattedDate} ${isMinRead ? " — " + minutes + "min read" : ""} `;
}
