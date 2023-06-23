import { formatDate } from "@/utils/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
	BookmarkIcon as BookmarkIconOutline,
	HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import ClientLayout from "@/components/layouts/ClientLayout";

const Post = () => {
	const router = useRouter();
	const [post, setPost] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const { slug } = router.query;
		console.log("router.query", router.query);
		const fetchPost = async () => {
			const { data } = await axios.get(
				`http://localhost:5005/api/posts/${router.query.slug}`
			);
			setPost(data);
		};
		if (slug) fetchPost();
	}, [router.query]);

	const toggleSaveStatus = async () => {
		const { data } = await axios.post(
			`http://localhost:5005/api/posts/${post.id}/save`,
			{ isSaved: !isSaved }
		);
		setIsSaved(data.isSaved);
	};

	const incrementLikeCount = async () => {
		const { data } = await axios.post(
			`http://localhost:5005/api/posts/${post.id}/like`
		);
		setLikeCount(data.likeCount);
	};

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		const content = e.target.elements.comment.value;
		const { data } = await axios.post(
			`http://localhost:5005/api/posts/${post.id}/comments`,
			{ content }
		);
		setComments([...comments, data]);
	};

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<ClientLayout>
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{post && (
					<div className="bg-gray-200 rounded-lg shadow-lg px-6 py-8">
						<div className="flex items-center justify-between my-8">
							<h1 className="text-3xl font-bold">{post.title}</h1>
							<div className="flex items-center space-x-5">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									onClick={toggleSaveStatus}
								>
									{isSaved ? (
										<BookmarkIcon className="w-6 h-6" />
									) : (
										<BookmarkIconOutline className="w-6 h-6" />
									)}
								</button>
								<button
									className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									onClick={incrementLikeCount}
								>
									<HeartIcon className="w-6 h-6" />
								</button>
								<p className="text-lg text-slate-600 font-semibold">
									({likeCount})
								</p>
							</div>
						</div>
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
						<div className="comment-section border-b border-gray-400">
							<form
								onSubmit={handleSubmitComment}
								className="flex items-center pb-2"
							>
								<textarea
									type="text"
									name="comment"
									placeholder="Add a comment"
									className="block bg-transparent focus:outline-none w-80 h-16 px-4 py-2 rounded-lg border border-gray-500"
								/>
								<button
									type="submit"
									className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
								>
									Submit
								</button>
							</form>
							<div className="mt-6 space-y-4">
								{comments.map((comment) => (
									<div
										key={comment.id}
										className="bg-gray-100 rounded-lg p-4"
									>
										<p className="text-gray-800">
											{comment.content}
										</p>
										<span className="text-sm text-gray-500">
											{comment.date}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</ClientLayout>
	);
};

export default Post;
