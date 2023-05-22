import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { NextLink } from "next/link";
import React, { useEffect, useState } from "react";

import {
	TableCellsIcon,
	DocumentTextIcon,
	FolderIcon,
	UserGroupIcon,
	HashtagIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
	Navbar,
	Dropdown,
	Avatar,
	Sidebar,
	DarkThemeToggle,
	Flowbite,
	TextInput,
} from "flowbite-react";

function AdminNavbar() {
	const router = useRouter();
	const [adminAccount, setAdminAccount] = useState(null);

	useEffect(() => {
		// Get admin account
		const getAdminAccount = () => {
			const admin = localStorage.getItem("admin");

			if (admin) {
				setAdminAccount(JSON.parse(admin));
			}
		};

		// Get previous color theme or user's device
		const getPreviousColorTheme = () => {
			var themeToggleDarkIcon = document.getElementById(
				"theme-toggle-dark-icon"
			);
			var themeToggleLightIcon = document.getElementById(
				"theme-toggle-light-icon"
			);

			// Change the icons inside the button based on previous settings
			if (
				localStorage.getItem("color-theme") === "dark" ||
				(!("color-theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				themeToggleLightIcon.classList.remove("hidden");
				document.documentElement.classList.add("dark");
			} else {
				themeToggleDarkIcon.classList.remove("hidden");
				document.documentElement.classList.remove("dark");
			}
		};

		getPreviousColorTheme();
		getAdminAccount();
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

	const ToggleDarkMode = () => {
		var themeToggleDarkIcon = document.getElementById(
			"theme-toggle-dark-icon"
		);
		var themeToggleLightIcon = document.getElementById(
			"theme-toggle-light-icon"
		);

		// Toggle icons inside button
		themeToggleDarkIcon.classList.toggle("hidden");
		themeToggleLightIcon.classList.toggle("hidden");

		// if set via local storage previously
		if (localStorage.getItem("color-theme")) {
			if (localStorage.getItem("color-theme") === "light") {
				document.documentElement.classList.add("dark");
				localStorage.setItem("color-theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("color-theme", "light");
			}

			// if NOT set via local storage previously
		} else {
			if (document.documentElement.classList.contains("dark")) {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("color-theme", "light");
			} else {
				document.documentElement.classList.add("dark");
				localStorage.setItem("color-theme", "dark");
			}
		}
	};

	const CustomSidebarItem = ({ icon: HeroIcon, href, name, active }) => {
		return (
			<li>
				<Link
					href={href}
					className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700${
						!HeroIcon
							? " group w-full pl-8 transition duration-75"
							: ""
					}${active ? " bg-gray-100 dark:bg-gray-700" : ""}`}
				>
					{HeroIcon && (
						<HeroIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
					)}
					<span className="px-3 flex-1 whitespace-nowrap">
						{name}
					</span>
				</Link>
			</li>
		);
	};

	return (
		<div className="mx-auto">
			<Navbar
				fluid={true}
				className="fixed top-0 z-50 w-full text-white bg-gray-200 border border-gray-200 shadow-md dark:border-gray-700"
			>
				<div className="flex md:order-1">
					<Link
						href="/admin"
						className="text-xl underline decoration-wavy sm:text-3xl font-extrabold text-slate-800 tracking-tight dark:text-slate-200 self-center whitespace-nowrap cursor-pointer"
					>
						PNL - Admin
					</Link>
					<TextInput
						className="ml-36 w-72 xs:w-40"
						id="search-mega-input"
						type="text"
						icon={MagnifyingGlassIcon}
						placeholder="Search..."
						required={true}
					/>
				</div>
				<div className="flex md:order-2">
					{/* <Flowbite>
						<DarkThemeToggle
							onClick={ToggleDarkMode}
							className="mr-5 border-2 border-gray-400 rounded-3xl"
						/>
					</Flowbite> */}
					<div className="dark-theme-toggle">
						<button
							onClick={ToggleDarkMode}
							type="button"
							className="p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mr-5 border-2 border-gray-400 rounded-3xl"
						>
							<svg
								id="theme-toggle-dark-icon"
								className="hidden w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
							</svg>
							<svg
								id="theme-toggle-light-icon"
								className="hidden w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
									fill-rule="evenodd"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>
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
								{adminAccount && (
									<span className="ml-1 font-medium truncate">
										{adminAccount.firstName}{" "}
										{adminAccount.lastName}
									</span>
								)}
							</span>
							<span className="block truncate text-sm font-medium">
								{adminAccount && adminAccount.email}
							</span>
						</Dropdown.Header>
						<Dropdown.Item>Dashboard</Dropdown.Item>
						<Dropdown.Item>Settings</Dropdown.Item>
						<Dropdown.Item>Earnings</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item onClick={onLogOutAdmin}>
							Sign out
						</Dropdown.Item>
					</Dropdown>
					<Navbar.Toggle />
				</div>
			</Navbar>
			<Sidebar
				aria-label="Sidebar"
				className="fixed left-0 top-14 z-40 w-64 h-screen border-r border-gray-300 dark:border-gray-500 transition-transform -translate-x-full sm:translate-x-0"
			>
				<React.Fragment key=".0">
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<CustomSidebarItem
								icon={TableCellsIcon}
								href={"/admin"}
								name="Dashboard"
								active={router.pathname === "/admin"}
							/>
							<Sidebar.Collapse
								label="Posts"
								className={`${
									router.pathname === "/admin/posts"
										? " bg-gray-100 dark:bg-gray-700"
										: ""
								}`}
								icon={DocumentTextIcon}
							>
								<CustomSidebarItem
									href="/admin/posts"
									name="All Posts"
									active={router.pathname === "/admin/posts"}
								/>
								<CustomSidebarItem
									href="/admin/posts/create"
									name="Create Post"
									active={
										router.pathname ===
										"/admin/posts/create"
									}
								/>
							</Sidebar.Collapse>
							<CustomSidebarItem
								icon={FolderIcon}
								href="/admin/categories"
								name="Categories"
								active={router.pathname === "/admin/categories"}
							/>
							<CustomSidebarItem
								icon={UserGroupIcon}
								href="/admin/users"
								name="Users"
								active={router.pathname === "/admin/users"}
							/>
							<CustomSidebarItem
								icon={HashtagIcon}
								href="/admin/tags"
								name="Tags"
								active={router.pathname === "/admin/tags"}
							/>
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</React.Fragment>
			</Sidebar>
		</div>
	);
}

export default AdminNavbar;
