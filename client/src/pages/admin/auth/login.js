import api from "../../../utils/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	setAccessTokenAdmin,
	setRefreshTokenAdmin,
} from "../../../utils/common";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const accessToken = Cookies.get("access_token");
		const admin = localStorage.getItem("admin");

		console.log("loginCheck ==> ", { refreshToken, accessToken, admin });

		if (refreshToken && admin) {
			router.push("/admin");
		}
	}, [router]);

	const handleLogin = async (email, password) => {
		const res = await api.post("/api/auth/login", {
			email,
			password,
		});

		console.log("response ==> ", res);

		if (res.status == 200) {
			const { user, access_token, refresh_token } = res.data;

			console.log("res.data", res.data);

			// Save tokens to cookies
			setAccessTokenAdmin(access_token);
			setRefreshTokenAdmin(refresh_token);

			// Save user data to localStorage
			localStorage.setItem("admin", JSON.stringify(user));

			// Display success message
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Login Successful!",
				showConfirmButton: false,
				timer: 1500,
			});

			// Redirect to admin page
			router.push("/admin");
		} else {
			// Get error message
			const responseMessage =
				res.response?.data.message ?? "Error occurs!";
			setError(responseMessage);
			// Display success message
			Swal.fire({
				icon: "error",
				title: "Login failed!",
				text: error,
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			handleLogin(email, password);
		} catch (error) {
			// Get error message
			const responseMessage =
				res.response?.data.message ?? "Error occurs!";
			setError(responseMessage);
			// Display success message
			Swal.fire({
				icon: "error",
				title: "Login failed!",
				text: error,
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
					Admin - Log in
				</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{error && (
							<div className="rounded-md bg-red-50 p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-red-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.293-9.707a1 1 0 011.414 0L11 9.586l2.293-2.293a1 1 0 011.414 1.414L12.414 11l2.293 2.293a1 1 0 01-1.414 1.414L11 12.414l-2.293 2.293a1 1 0 01-1.414 0 1 1 0 010-1.414L9.586 11 7.293 8.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											{error}
										</h3>
									</div>
								</div>
							</div>
						)}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-stone-800"
									value={email}
									onChange={(event) =>
										setEmail(event.target.value)
									}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-stone-800"
									value={password}
									onChange={(event) =>
										setPassword(event.target.value)
									}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
