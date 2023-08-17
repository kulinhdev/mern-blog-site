import { useEffect, useState } from "react";
import api from "@/services/backendApi";
import PostList from "@/components/PostListClient";
import ClientLayout from "@/components/layouts/ClientLayout";
import Pagination from "@/components/Pagination";

const Index = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");

	const fetchData = async (page = 1) => {
		const response = await api.get(
			`/api/posts?page=${page}&title=${searchTerm}&category=${selectedCategory}`
		);
		setCurrentPage(page);
		setPages(Math.ceil(response.data.count / 5));
		setPosts(response.data.posts);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await api.get("/api/posts");
			if (response.status === 200) {
				setPages(Math.ceil(response.data.count / 5));
				setPosts(response.data?.posts);
			}
		};

		const fetchCategories = async () => {
			const response = await api.get("/api/admin/categories");
			console.log({ cate: response });
			if (response.status === 200) {
				setCategories(response.data.categories);
			}
		};

		fetchPosts();
		fetchCategories();
	}, []);

	const handleSearch = (event) => {
		event.preventDefault();
		fetchData();
	};

	return (
		<ClientLayout>
			<form onSubmit={handleSearch} className="mb-8 flex items-center">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<select
					value={selectedCategory}
					onChange={(event) =>
						setSelectedCategory(event.target.value)
					}
					className="bg-gray-100 border-gray-400 border-2 py-2 px-4 mr-4 rounded-lg"
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.title}
						</option>
					))}
				</select>
				<input
					type="text"
					id="search"
					name="search"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="Search by title"
					className="bg-gray-100 border-gray-400 border-2 py-2 px-4 rounded-lg w-full mr-4"
				/>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Search
				</button>
			</form>
			<h2 className="text-2xl font-semibold mb-4">All Posts</h2>
			<PostList posts={posts} />
			<Pagination
				currentPage={currentPage}
				pages={pages}
				switchPage={fetchData}
			/>
		</ClientLayout>
	);
};

export default Index;
