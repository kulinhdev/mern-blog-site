import Cookies from "js-cookie";

function setTokensAdmin(assetToken, refreshToken) {
	// Set asset token in cookie with 1 hour expiry
	Cookies.set("asset_token", assetToken, { expires: 1 / 24, path: "/admin" });

	// Set refresh token in cookie with 30 day expiry
	Cookies.set("refresh_token", refreshToken, { expires: 30, path: "/admin" });
}

module.exports = { setTokensAdmin };
