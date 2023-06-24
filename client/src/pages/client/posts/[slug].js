import { formatDate, formatDateTime } from "@/utils/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/frontendApi";
import Swal from "sweetalert2";
import {
	BookmarkIcon as BookmarkIconOutline,
	HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import {
	BookmarkIcon,
	HeartIcon,
	ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import ClientLayout from "@/layouts/ClientLayout";
import { Avatar } from "flowbite-react";

const Post = () => {
	const router = useRouter();
	const [post, setPost] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState();
	const [userAccount, setUserAccount] = useState(false);
	const [replyingTo, setReplyingTo] = useState(null);

	useEffect(() => {
		const user = localStorage.getItem("user");
		const { slug } = router.query;
		const fetchPost = async () => {
			const { data } = await api.get(`api/posts/${router.query.slug}`);
			setPost(data);
			setComments(data.comments);

			if (user) {
				const localUser = JSON.parse(user);
				const dataStatus = await api.get(
					`/api/posts/${data.id}/user/${localUser.id}`
				);
				console.log({ post: data, status: dataStatus });
				setIsSaved(dataStatus.data.isSaved);
				setIsLiked(dataStatus.data.isLiked);
				setLikes(dataStatus.data.likes);
			}
		};
		if (slug) fetchPost();

		if (user) {
			setUserAccount(JSON.parse(user));
		}
	}, [router.query]);

	const CheckIsLoggedIn = () => {
		if (!userAccount) {
			Swal.fire({
				icon: "error",
				title: "Login required!",
				text: "You must be logged in to do this actions!",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
			return;
		}
	};

	const toggleSaveStatus = async () => {
		CheckIsLoggedIn();

		const requestBody = {
			isSaved: !isSaved,
			userId: userAccount.id,
			postId: post.id,
		};

		console.log(post, requestBody);

		const response = await api.post(`api/posts/save`, requestBody);

		console.log(response);

		if (response.status == 200) {
			setIsSaved(response.data.isSaved);
		}
	};

	const toggleLikeStatus = async () => {
		CheckIsLoggedIn();

		const requestBody = {
			isLiked: !isLiked,
			userId: userAccount.id,
			postId: post.id,
		};

		console.log(post, requestBody);

		const response = await api.post(`api/posts/like`, requestBody);

		console.log(response);

		if (response.status == 200) {
			setIsLiked(response.data.isLiked);
			setLikes(response.data.likes);
		}
	};

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		CheckIsLoggedIn();

		const requestBody = {
			content: commentText,
			user: userAccount.id,
			post: post.id,
			replyingTo
		};

		console.log({ requestBody });

		const response = await api.post(`api/posts/comment`, requestBody);
		console.log("add comment", response);
		if (response.status == 200) {
			setComments([...comments, response.data.comment]);
			setCommentText("");
		}
	};

	const handleReplyCommentClick = (commentId) => {
		if (replyingTo == commentId) {
			setReplyingTo(null);
		} else {
			setReplyingTo(commentId);
		}
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
									onClick={toggleLikeStatus}
								>
									{isLiked ? (
										<HeartIcon className="w-6 h-6" />
									) : (
										<HeartIconOutline className="w-6 h-6" />
									)}
								</button>
								<p className="text-lg text-slate-600 font-semibold">
									({likes})
								</p>
							</div>
						</div>
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								{formatDate(
									post.createdAt,
									post.readingMinutes
								)}
							</span>
						</div>
						{post.imageUrl && (
							<img
								src={post.imageUrl}
								alt={post.title}
								className="mb-6 w-64 rounded-lg"
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
						<div className="comment-section border-b border-gray-400 pb-2">
							<form
								onSubmit={handleSubmitComment}
								className="flex items-center pb-2"
							>
								<textarea
									type="text"
									name="comment"
									value={commentText}
									onChange={(e) =>
										setCommentText(e.target.value)
									}
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
								{comments ? (
									comments.map((comment) => (
										<div key={comment._id} className="mb-4">
											{/* Parent comment */}
											<div className="bg-gray-100 rounded-lg p-4 my-4">
												<div className="flex items-center">
													<Avatar
														alt="Avatar"
														img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
														rounded={true}
														bordered={true}
														color="purple"
													/>
													<span className="ml-3 font-medium truncate">
														{comment.user.firstName}{" "}
														{comment.user.lastName}
													</span>
												</div>
												<p className="text-gray-800 my-2">
													{comment.content}
												</p>
												<span className="text-sm text-gray-500">
													{formatDateTime(
														comment.createdAt
													)}
												</span>
												<button
													onClick={() =>
														handleReplyCommentClick(
															comment._id
														)
													}
													className="block bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 my-2 rounded"
												>
													<ArrowUturnLeftIcon className="inline-block text-xs w-6 h-6" />
													<span className="ml-2 text-sm">
														Reply
													</span>
												</button>
											</div>
											{/* Reply from */}
											{replyingTo == comment._id && (
												<form
													onSubmit={
														handleSubmitComment
													}
													className="flex items-center pb-2 pt-2 pl-10"
												>
													<textarea
														type="text"
														name="comment"
														value={commentText}
														onChange={(e) =>
															setCommentText(
																e.target.value
															)
														}
														placeholder={`Reply to @${comment.user.firstName} ${comment.user.lastName}`}
														className="block bg-transparent focus:outline-none w-80 h-12 px-3 py-1 rounded-lg border border-gray-500"
													/>
													<button
														type="submit"
														className="ml-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow"
													>
														Reply
													</button>
												</form>
											)}
											{/* Reply comments */}
											{comment.replies &&
												comment.replies.map((reply) => (
													<div
														key={reply._id}
														className="bg-gray-50 rounded-lg p-4 ml-16 mt-4"
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center">
																<Avatar
																	alt="Avatar"
																	img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
																	rounded={
																		true
																	}
																	bordered={
																		true
																	}
																	color="purple"
																/>
																<span className="ml-3 font-medium truncate">
																	{
																		reply
																			.user
																			.firstName
																	}{" "}
																	{
																		reply
																			.user
																			.lastName
																	}
																</span>
															</div>
														</div>

														<p className="text-gray-800 my-2">
															{reply.content}
														</p>

														<span className="text-sm text-gray-500">
															{formatDateTime(
																reply.createdAt
															)}
														</span>
													</div>
												))}
										</div>
									))
								) : (
									<p className="text-gray-800">
										No comments yet!
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</ClientLayout>
	);
};

export default Post;
