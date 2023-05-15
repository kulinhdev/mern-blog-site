import Image from "next/image";

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold mb-6">Welcome to our Blog</h1>
			<p className="mb-8">Hello world, I'm Linh</p>
			<div className="flex items-center space-x-4">
				<Link href="/login">
					<a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Log in
					</a>
				</Link>
				<Link href="/register">
					<a className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Register
					</a>
				</Link>
			</div>
		</div>
	);
}
