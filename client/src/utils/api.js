import Cookies from "js-cookie";
import axios from "axios";
import { setCookieTokens } from "../utils/common";
import { useRouter } from "next/router";

const baseURL = "http://localhost:5005";

const api = axios.create({
	baseURL: baseURL,
});

async function updateAccessToken() {
	// const router = useRouter();

	try {
		const refreshToken = Cookies.get("refresh_token");

		if (!refreshToken) {
			// router.push("/admin/auth.login");
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
		console.log(error);
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

		// Check if login request
		if ((originalRequest.url = "/api/auth/login")) return error;

		// Check if access token is expired
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const newAccessToken = await updateAccessToken();

			console.log("newAccessToken ==> ", newAccessToken);

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
