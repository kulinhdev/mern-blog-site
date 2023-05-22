import AdminLayout from "@/components/layouts/AdminLayout";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import Link from "next/link";
import PostListAdmin from "@/components/PostListAdmin";

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
				<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
					All Posts
				</h1>
				<Link
					href="/admin/posts/create"
					className="bg-blue-500 hover:bg-blue-700 inline-block mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Create New
				</Link>
				<div className="search-box my-7">
					<h2 className="text-slate-900 tracking-tight dark:text-slate-200 text-xl font-semibold mb-2">
						Search
					</h2>
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
					<h2 className="text-slate-900 tracking-tight dark:text-slate-200 text-xl font-semibold mb-2">
						All Posts
					</h2>
					<PostListAdmin posts={posts} />
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
