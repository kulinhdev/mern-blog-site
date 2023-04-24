import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
	const router = useRouter();
	const [post, setPost] = useState(null);

	useEffect(() => {
		console.log("router.query", router.query);
		const fetchPost = async () => {
			const { data } = await axios.get(
				`http://localhost:5000/api/posts/${router.query.slug}`
			);
			setPost(data);
		};
		fetchPost();
	}, [router.query.slug]);

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
		</div>
	);
};

export default Post;
