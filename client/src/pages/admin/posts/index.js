import { useState, useEffect } from "react";
import PostList from "@/components/PostListAdmin";
import api from "@/utils/api";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchData = async (page = 1) => {
		const response = await api.get(
			`/api/admin/posts?page=${page}&title=${searchTerm}`
		);
		setCurrentPage(page);
		setPages(Math.ceil(response.data.count / 10));
		setPosts(response.data.posts);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("/api/admin/posts");

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

		if (!searchTerm) return;
		fetchData();
	};

	return (
		<AdminLayout>
			<div className="mega-page">
				<h1 className="text-3xl font-bold mb-6">All Posts</h1>
				<Link
					href="/admin/posts/create"
					className="bg-blue-500 hover:bg-blue-700 inline-block mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Create New
				</Link>
				<div className="search-box my-7">
					<h2 className="text-xl font-semibold mb-2">Search</h2>
					<form onSubmit={handleSearch}>
						<input
							type="text"
							id="search"
							name="search"
							value={searchTerm}
							onChange={(event) =>
								setSearchTerm(event.target.value)
							}
							placeholder="Search by title"
							className="border-gray-400 border-2 py-2 px-4 rounded-lg w-full bg-slate-100"
						/>
					</form>
				</div>
				<div className="show-posts my-7">
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
				</div>
			</div>
		</AdminLayout>
	);
}

export default PostPage;
