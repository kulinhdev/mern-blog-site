import NavBar from "../components/NavbarClient";

export default function Index() {
	return (
		<div>
			<NavBar />
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">Welcome to our Blog</h1>
				<p className="mb-8">Hello world, I'm Linh</p>
			</div>
		</div>
	);
}
