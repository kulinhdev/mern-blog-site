import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavbarClient";
import { formatDate } from "@/utils/common";

const Post = () => {
	const router = useRouter();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const { slug } = router.query;
		console.log("router.query", router.query);
		const fetchPost = async () => {
			const { data } = await axios.get(
				`http://localhost:5005/api/posts/${router.query.slug}`
			);
			setPost(data);
		};
		if (slug !== "undefined") fetchPost();
	}, [router.query]);

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<NavBar />
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{post && (
					<div className="bg-gray-200 rounded-lg shadow-lg px-6 py-8">
						<h1 className="text-3xl font-bold mb-6">
							{post.title}
						</h1>
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								{formatDate(post.createdAt)}
							</span>
						</div>
						{post.imageUrl && (
							<img
								src={post.imageUrl}
								alt={post.title}
								className="mb-6 rounded-lg"
							/>
						)}
						<div
							dangerouslySetInnerHTML={{
								__html: post.content,
							}}
							className="mb-6"
						></div>
						<div className="flex items-center space-x-5 my-8">
							<span className="text-lg font-bold mr-3">
								Tags:
							</span>{" "}
							{post.tags &&
								post.tags.map((tag) => (
									<span
										key={tag.id}
										className="bg-blue-500 text-white font-medium py-1 px-2 rounded-full"
									>
										{tag.text}
									</span>
								))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Post;
