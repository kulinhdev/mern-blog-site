import Cookies from "js-cookie";
import axios from "axios";
import { setTokensAdmin } from "../utils/common";
import { useRouter } from "next/router";

const baseURL = "http://localhost:5005";

const api = axios.create({
	baseURL: baseURL,
});

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
		setTokensAdmin(response.data.access_token, response.data.refresh_token);

		return response.data.access_token;
	} catch (error) {
		// Redirect user to login page or perform other error handling
		console.log(error);
	}
}

api.interceptors.request.use(
	async (config) => {
		let accessToken = Cookies.get("access_token");

		console.warn({ accessToken });

		// access_token expired, get new token
		if (!accessToken) {
			accessToken = updateAccessToken();
		}

		config.headers.authorization = `Bearer ${accessToken}`;

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
				newConfig.headers.authorization = `Bearer ${newAccessToken}`;
				return axios(newConfig);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
