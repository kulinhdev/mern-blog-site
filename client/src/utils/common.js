import Cookies from "js-cookie";

export function setTokensAdmin(accessToken, refreshToken) {
	// Set asset token in cookie with 1 hour expiry
	Cookies.set("access_token", accessToken, {
		expires: 1 / 24,
		path: "/admin",
	});

	// Set refresh token in cookie with 30 day expiry
	Cookies.set("refresh_token", refreshToken, { expires: 30, path: "/admin" });
}
