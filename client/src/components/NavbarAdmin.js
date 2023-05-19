import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function NavBar() {
	const router = useRouter();

	const [adminAccount, setAdminAccount] = useState();

	useEffect(() => {
		const admin = localStorage.getItem("admin");

		if (admin) {
			setAdminAccount(JSON.parse(admin));
		}
	}, []);

	const onLogOutAdmin = () => {
		localStorage.removeItem("admin");

		// Display success message
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Logout Successful!",
			showConfirmButton: false,
			timer: 1500,
		});

		router.push("/admin/auth/login");
	};

	return (
		<div className="navbar">
			<nav className="fixed top-0 z-50 w-full text-white bg-gray-800">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<a
								href="https://flowbite.com"
								className="flex ml-2 md:mr-24"
							>
								<img
									src="https://flowbite.com/docs/images/logo.svg"
									className="h-8 mr-3"
									alt="FlowBite Logo"
								/>
								<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
									Admin - PNL
								</span>
							</a>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
									<button
										type="button"
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										aria-expanded="false"
										data-dropdown-toggle="dropdown-user"
									>
										<span className="sr-only">
											Open user menu
										</span>
										<img
											className="w-8 h-8 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											alt="user photo"
										/>
									</button>
								</div>
								<div
									className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
									id="dropdown-user"
								>
									<div className="px-4 py-3" role="none">
										<p
											className="text-sm text-gray-900 dark:text-white"
											role="none"
										>
											Hi,
											{adminAccount && (
												<span className="text-sm ml-1 font-medium text-gray-900 truncate">
													{adminAccount.firstName}{" "}
													{adminAccount.lastName}
												</span>
											)}
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none"
										>
											{adminAccount && adminAccount.email}
										</p>
									</div>
									<ul className="py-1" role="none">
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Dashboard
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Settings
											</a>
										</li>
										<li>
											<button
												className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
												onClick={onLogOutAdmin}
											>
												Sign out
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
			<aside
				id="sidebar-multi-level-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-gray-800 border-gray-200"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800 dark:bg-gray-700">
					<ul className="space-y-2 font-medium">
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
									<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
								</svg>
								<span className="ml-3">Dashboard</span>
							</a>
						</li>
						<li>
							<button
								type="button"
								className="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								aria-controls="dropdown-post"
								data-collapse-toggle="dropdown-post"
							>
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
										clipRule="evenodd"
									></path>
								</svg>
								<span
									className="flex-1 ml-3 text-left whitespace-nowrap"
									sidebar-toggle-item="true"
								>
									Posts
								</span>
								<svg
									sidebar-toggle-item="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
							<ul
								id="dropdown-post"
								className="hidden py-2 rounded space-y-2 bg-gray-700"
							>
								<li>
									<Link href="/admin/posts">
										<p className="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300">
											All Posts
										</p>
									</Link>
								</li>
								<li>
									<Link href="/admin/posts/create">
										<p className="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300">
											Create Post
										</p>
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									></path>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">
									Users
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
										clipRule="evenodd"
									></path>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">
									Categories
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
										clipRule="evenodd"
									></path>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">
									Tags
								</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
										clipRule="evenodd"
									></path>
								</svg>
								<span className="flex-1 ml-3 whitespace-nowrap">
									Sign Up
								</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
}
