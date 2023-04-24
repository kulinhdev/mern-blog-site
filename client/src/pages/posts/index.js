// pages/index.js

import { useEffect, useState } from "react";

const Index = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function fetchPosts() {
			const res = await fetch("/api/posts");
			const data = await res.json();
			setPosts(data);
		}

		fetchPosts();
	}, []);

	return (
		<div>
			<h1>All Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<a href={`/posts/${post.id}`}>{post.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Index;
