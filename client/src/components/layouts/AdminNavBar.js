import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

export default function NavBarAdmin() {
	const router = useRouter();
	const [adminAccount, setAdminAccount] = useState();

	useEffect(() => {
		// Get admin account
		const getAdminAccount = () => {
			const admin = localStorage.getItem("admin");

			if (admin) {
				setAdminAccount(JSON.parse(admin));
			}
		};

		// Get previous color theme or user's device
		const getColorTheme = () => {
			if (
				localStorage.getItem("color-theme") === "dark" ||
				(!("color-theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};

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

	return (
		<div className="mx-auto">
			<Navbar
				fluid={true}
				className="fixed top-0 z-50 w-full text-white bg-gray-200 border border-gray-200 shadow-md dark:border-gray-700"
			>
				<div className="flex md:order-1">
					<Navbar.Brand>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold text-gray-600 dark:text-white">
							PNL - Admin
						</span>
					</Navbar.Brand>
					<TextInput
						className="ml-24 w-72 xs:w-40"
						id="search-mega-input"
						type="text"
						icon={MagnifyingGlassIcon}
						placeholder="Search..."
						required={true}
					/>
				</div>
				<div className="flex md:order-2">
					<Flowbite>
						<DarkThemeToggle className="mr-5 border-2 border-gray-400 rounded-3xl" />
					</Flowbite>
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
			<div className="w-fit">
				<Sidebar
					aria-label="Sidebar"
					className="fixed left-0 top-14 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				>
					<React.Fragment key=".0">
						<Sidebar.Items>
							<Sidebar.ItemGroup>
								<Sidebar.Item icon={TableCellsIcon}>
									<Link href="/admin">Dashboard</Link>
								</Sidebar.Item>
								<Sidebar.Collapse
									label="Posts"
									icon={DocumentTextIcon}
								>
									<Sidebar.Item>
										<Link href="/admin/posts">
											All Posts
										</Link>
									</Sidebar.Item>
									<Sidebar.Item>
										<Link href="/admin/posts/create">
											Create Post
										</Link>
									</Sidebar.Item>
								</Sidebar.Collapse>
								<Sidebar.Item href="#" icon={FolderIcon}>
									<Link href="/admin/categories">
										Categories
									</Link>
								</Sidebar.Item>
								<Sidebar.Item href="#" icon={UserGroupIcon}>
									Users
								</Sidebar.Item>
								<Sidebar.Item href="#" icon={HashtagIcon}>
									Tags
								</Sidebar.Item>
							</Sidebar.ItemGroup>
						</Sidebar.Items>
					</React.Fragment>
				</Sidebar>
			</div>
		</div>
	);
}
