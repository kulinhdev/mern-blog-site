import Cookies from "js-cookie";
import axios from "axios";

const baseURL = "http://localhost:5005";

const api = axios.create({
	baseURL: baseURL,
});

function setCookieTokens(assetToken, refreshToken) {
	// Set asset token in cookie with 1 hour expiry
	Cookies.set("asset_token", assetToken, { expires: 1 / 24 });

	// Set refresh token in cookie with 30 day expiry
	Cookies.set("refresh_token", refreshToken, { expires: 30 });
}

async function updateAccessToken() {
	try {
		const refreshToken = Cookies.get("refresh_token");

		if (!refreshToken) {
			throw new Error("Refresh token not found.");
		}

		const response = await axios.post(`${baseURL}/api/auth/refresh-token`, {
			refresh_token: refreshToken,
		});

		// Save new tokens to cookies
		setCookieTokens(
			response.data.access_token,
			response.data.refresh_token
		);

		return response.data.access_token;
	} catch (error) {
		// Redirect user to login page or perform other error handling
		console.error(error);
	}
}

api.interceptors.request.use(
	async (config) => {
		const assetToken = Cookies.get("asset_token");

		if (assetToken) {
			config.headers.Authorization = `Bearer ${assetToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Check if access token is expired
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const newAccessToken = await updateAccessToken();

			if (newAccessToken) {
				// Resend original request with new access token
				const newConfig = { ...originalRequest };
				newConfig.headers.Authorization = `Bearer ${newAccessToken}`;
				return axios(newConfig);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
