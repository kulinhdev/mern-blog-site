import AdminLayout from "@/layouts/AdminLayout";
import { useState, useEffect } from "react";
import api from "@/utils/backendApi";
import Link from "next/link";
import PostListAdmin from "@/components/PostListAdmin";
import Pagination from "@/components/Pagination";

function PostsPage() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [limit, setLimit] = useState(0);

	const fetchPostsByCondition = async (page = 1) => {
		const response = await api.get(
			`/api/admin/posts/search?page=${page}&limit=${limit}&title=${searchTerm}`
		);
		setCurrentPage(page);
		setPages(Math.ceil(response.data.count / limit));
		setPosts(response.data.posts);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await api.get("/api/admin/posts");

			console.log("posts", response);

			if (response.status === 200) {
				setPages(Math.ceil(response.data.count / 5));
				setPosts(response.data?.posts);
			}
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		console.log({ limit, searchTerm });
		if (limit > 0 || searchTerm != "") fetchPostsByCondition();
	}, [limit, searchTerm]);

	const handleLimitChange = (event) => {
		const newLimit = event.target.value;
		setLimit(newLimit);
	};

	const handleTitleChange = (event) => {
		const newSearchTerm = event.target.value;
		setSearchTerm(newSearchTerm);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
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
					<form onSubmit={handleSubmit} className="flex my-5">
						<input
							type="text"
							id="search"
							name="search"
							value={searchTerm}
							onChange={handleTitleChange}
							placeholder="Search by title"
							className="flex-2 border-gray-400 border-2 py-2 px-4 rounded-lg w-full text-slate-700 dark:text-slate-100 bg-slate-100 dark:bg-slate-600"
						/>
						<select
							value={limit}
							onChange={handleLimitChange}
							className="w-44 border-gray-400 border-2 py-2 px-4 rounded-lg ml-7 text-slate-700 dark:text-slate-100 bg-slate-100 dark:bg-slate-600"
						>
							<option value="0">= Limit =</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="40">40</option>
						</select>
					</form>
				</div>
				<div className="show-posts my-7">
					<h2 className="text-slate-900 tracking-tight dark:text-slate-200 text-xl font-semibold mb-2">
						All Posts
					</h2>
					<PostListAdmin posts={posts} />
					<Pagination
						currentPage={currentPage}
						pages={pages}
						switchPage={fetchPostsByCondition}
					/>
				</div>
			</div>
		</AdminLayout>
	);
}

export default PostsPage;
