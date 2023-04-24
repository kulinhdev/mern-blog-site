import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const { data } = await axios.get("http://localhost:5000/api/posts");
			console.log("data", data);
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<div>
			<h1>All Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post._id}>
						<a href={`/posts?id=${post._id}`}>{post.title}</a>
						<p>{post.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Index;
