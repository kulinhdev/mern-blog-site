import { useEffect, useState } from "react";
import api from "../../../utils/api";
import PostList from "@/components/PostList";

const Index = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const { data } = await api.get("/api/posts");
			console.log("data", data);
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<div>
			<h1>All Posts</h1>
			<ul>
				{posts.length > 0 ? (
					<PostList posts={posts} />
				) : (
					<p>Don't have any posts ..!</p>
				)}
			</ul>
		</div>
	);
};

export default Index;
