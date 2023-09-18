import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import Swal from "sweetalert2";

function ClientNav() {
	const [userAccount, setUserAccount] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const refreshToken = Cookies.get("refresh_token");
		const user = localStorage.getItem("user");

		console.log({ user });

		if (refreshToken && user) {
			setUserAccount(JSON.parse(user));
		}
	}, []);

	const onLogOutUser = () => {
		localStorage.removeItem("user");

		// Display success message
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Logout Successful!",
			showConfirmButton: false,
			timer: 1500,
		});

		setUserAccount(null);
	};

	// Define a function to check if a route is active
	const isRouteActive = (href) => {
		return router.pathname === href
			? " md:text-blue-700 md:dark:text-blue-500"
			: "";
	};

	return (
		<nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<p className="flex items-center">
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
								className={`block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${isRouteActive(
									"/"
								)}`}
								aria-current="page"
							>
								Home
							</p>
						</Link>
						<Link href="/client/posts">
							<p
								className={`block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${isRouteActive(
									"/client/posts"
								)}`}
								aria-current="page"
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
					{userAccount ? (
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<Avatar
									alt="Avatar"
									img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									rounded={true}
									bordered={true}
									color="purple"
								/>
							}
						>
							<Dropdown.Header>
								<span className="block text-sm">
									Hi,
									{userAccount && (
										<span className="ml-1 font-medium truncate">
											{userAccount.firstName}{" "}
											{userAccount.lastName}
										</span>
									)}
								</span>
								<span className="block truncate text-sm font-medium">
									{userAccount && userAccount.email}
								</span>
							</Dropdown.Header>
							<Dropdown.Item>Dashboard</Dropdown.Item>
							<Dropdown.Item>Settings</Dropdown.Item>
							<Dropdown.Item>Earnings</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={onLogOutUser}>
								Sign out
							</Dropdown.Item>
						</Dropdown>
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

export default ClientNav;
