import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

export default function ClientNavbar() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const user = localStorage.getItem("user");

		if (refreshToken && user) {
			setIsLogin(true);
		}
	}, []);

	return (
		<nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<p href="https://flowbite.com/" className="flex items-center">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="PNL Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						PNL Blog
					</span>
				</p>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="mobile-menu-2"
				>
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 text-gray-800 dark:text-gray-50 dark:bg-gray-900 dark:border-gray-700">
						<Link href="/">
							<p
								className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
								aria-current="page"
							>
								Home
							</p>
						</Link>
						<Link href="/client/posts">
							<p
								href="#"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Posts
							</p>
						</Link>
						<li>
							<p
								href="#"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								About
							</p>
						</li>
						<li>
							<p
								href="#"
								className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Contact
							</p>
						</li>
					</ul>
				</div>
				<div className="flex md:order-2">
					<Flowbite>
						<DarkThemeToggle className="mr-5 border-2 border-gray-400 rounded-3xl" />
					</Flowbite>
					{isLogin ? (
						<div className="flex items-center md:order-2">
							<button
								type="button"
								className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								id="user-menu-button"
								aria-expanded="false"
								data-dropdown-toggle="user-dropdown"
								data-dropdown-placement="bottom"
							>
								<span className="sr-only">Open user menu</span>
								<Image
									src="/images/client/profile-picture.jpg"
									alt="avatar"
									width={150}
									height={150}
									className="w-8 h-8 rounded-full"
								/>
							</button>
							{/* <!-- Dropdown menu --> */}
							<div
								className="z-50 hidden my-4 text-base list-none bg-gray-200 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
								id="user-dropdown"
							>
								<div className="px-4 py-3">
									<span className="block text-sm text-gray-900 dark:text-white">
										Pham Ngoc Linh
									</span>
									<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
										linhpn@gmail.com
									</span>
								</div>
								<ul
									className="py-2"
									aria-labelledby="user-menu-button"
								>
									<li>
										<p
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Profile
										</p>
									</li>
									<li>
										<p
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											My favorites
										</p>
									</li>
									<li>
										<p
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Sign out
										</p>
									</li>
								</ul>
							</div>
							<button
								data-collapse-toggle="mobile-menu-2"
								type="button"
								className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
								aria-controls="mobile-menu-2"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</div>
					) : (
						<div className="flex items-center md:order-2">
							<Link href="/client/auth/login">
								<p className="block py-2 pl-3 pr-4 rounded text-blue-600 dark:text-blue-500 hover:underline">
									Login
								</p>
							</Link>
							<Link href="/client/auth/register">
								<p className="block py-2 pl-3 pr-4 rounded text-blue-600 dark:text-blue-500 hover:underline">
									Register
								</p>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
