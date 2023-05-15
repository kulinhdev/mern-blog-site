import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbmhwbjFAZ21haWwuY29tIiwiaWQiOiI2NDVmYTljODBiZGJkYzAzMjg3ODBjYWEiLCJpYXQiOjE2ODM5OTIzNDUsImV4cCI6MTY4Mzk5NTk0NX0.zlnX2zpHk7dgiVmRkXW4GLIMlbeY0wGztRxKPBtmizM";

			const { data } = await axios.get(
				"http://localhost:5005/api/posts",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
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
