import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../../utils/api";

function LoginPage() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			console.log(userName, password);
			// await login(formData);
			// router.push("/admin");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
					Log in to your account
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
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								UserName
							</label>
							<div className="mt-1">
								<input
									id="userName"
									name="userName"
									type="text"
									autoComplete="userName"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-stone-800"
									value={userName}
									onChange={(event) =>
										setUserName(event.target.value)
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
