import { useEffect, useState } from "react";
import api from "@/utils/api";
import PostList from "@/components/PostListClient";
import ClientLayout from "@/components/layouts/ClientLayout";

const Index = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchData = async (page = 1) => {
		const response = await api.get(
			`/api/posts?page=${page}&title=${searchTerm}`
		);
		setCurrentPage(page);
		setPages(Math.ceil(response.data.count / 10));
		setPosts(response.data.posts);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("/api/posts");

			console.log(response);

			if (response.status === 200) {
				setPages(Math.ceil(response.data.count / 5));
				setPosts(response.data?.posts);
			}
		};

		fetchData();
	}, []);

	const handleSearch = (event) => {
		event.preventDefault();
		fetchData();
	};

	return (
		<ClientLayout>
			<form onSubmit={handleSearch} className="mb-8">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<input
					type="text"
					id="search"
					name="search"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="Search by title"
					className="bg-gray-100 border-gray-400 border-2 py-2 px-4 rounded-lg w-full"
				/>
			</form>
			<h2 className="text-xl font-semibold mb-2">All Posts</h2>
			<PostList posts={posts} />
			<div className="flex justify-between items-center mt-8">
				<button
					onClick={() => fetchData(currentPage - 1)}
					disabled={currentPage === 1}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Previous Page
				</button>
				<p>
					Page {currentPage} of {pages}
				</p>
				<button
					onClick={() => fetchData(currentPage + 1)}
					disabled={currentPage === pages}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Next Page
				</button>
			</div>
		</ClientLayout>
	);
};

export default Index;
