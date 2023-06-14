import Cookies from "js-cookie";
import axios from "axios";
import { setAccessTokenAdmin } from "@/utils/common";

const baseURL = "https://mearn-blog-backend.onrender.com";

const api = axios.create({
	baseURL: baseURL,
});

async function updateAccessToken() {
	try {
		const refreshToken = Cookies.get("refresh_token");

		// console.log("refreshToken in fc updateAccessToken", refreshToken);

		if (!refreshToken) {
			throw new Error("Refresh token not found.");
		}

		const response = await axios.post(`${baseURL}/api/auth/refresh-token`, {
			refresh_token: refreshToken,
		});

		console.log("response get /refresh-token ==> ", response);

		// Save new tokens to cookies
		setAccessTokenAdmin(response.data.access_token);

		return response.data.access_token;
	} catch (error) {
		// Redirect user to login page or perform other error handling
		console.log(error);
	}
}

api.interceptors.request.use(
	async (config) => {
		let accessToken = Cookies.get("access_token");

		// access_token expired, get new token
		if (!accessToken) {
			accessToken = await updateAccessToken();
		}

		// console.log("accessToken ==> ", accessToken);

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

			// console.log("newAccessToken ==> ", newAccessToken);

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
