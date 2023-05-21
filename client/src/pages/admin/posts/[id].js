import api from "@/utils/api";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../layout";
import { formatDate } from "@/utils/common";

function PostPage() {
	const [post, setPost] = useState();
	const router = useRouter();

	useEffect(() => {
		const { id } = router.query;
		console.log("query", router.query);
		const fetchData = async () => {
			const response = await api.get(`/api/admin/posts/${id}`);

			console.log(response.data);

			if (response.status === 200) {
				setPost(response.data);
			}
		};

		if (id !== "undefined") fetchData();
	}, [router.query]);

	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure you want to delete this post?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				confirmDelete();
			}
		});

		const confirmDelete = async () => {
			try {
				console.log(post._id);
				const res = await api.delete(`/api/admin/posts/${post._id}`);

				// Display success message
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: res.data.message ?? "Delete Successful!",
					showConfirmButton: false,
					timer: 1500,
				});
				router.push("/admin/posts");
			} catch (error) {
				console.error("Delete error ==> ", error);
				Swal.fire({
					icon: "error",
					title: "Delete post failed!",
					text: "Error occurs ..!",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "OK",
				});
			}
		};
	};

	return (
		<AdminLayout>
			<div className="mega-page">
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
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								Slug:
							</span>{" "}
							<span className="bg-orange-500 text-white font-medium py-1 px-2 rounded-full">
								{post.slug}
							</span>
						</div>
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
						<div className="flex justify-end mt-8">
							<button
								onClick={() =>
									router.push(`/admin/posts/edit/${post._id}`)
								}
								className="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
							>
								Edit
							</button>

							<button
								onClick={handleDelete}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ml-4"
							>
								Delete
							</button>
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}

export default PostPage;
