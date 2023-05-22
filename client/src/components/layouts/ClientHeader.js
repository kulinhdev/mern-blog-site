import Link from "next/link";

function ClientHeader({ currentUser }) {
	return (
		<header className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<Link href="/">
					<h1 className="text-xl font-bold">PNL Blog</h1>
				</Link>
				<nav>
					<ul className="flex space-x-4">
						{currentUser ? (
							<>
								<li>
									<Link href="/admin">
										<p>Admin</p>
									</Link>
								</li>
								<li>
									<Link href="/logout">
										<p>Logout</p>
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href="/signup">
										<p>Sign Up</p>
									</Link>
								</li>
								<li>
									<Link href="/login">
										<p>Login</p>
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default ClientHeader;
