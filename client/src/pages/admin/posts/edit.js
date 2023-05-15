import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function EditPostPage({ post }) {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await axios.put(`/api/posts/${post._id}`, { title, content });

			router.push("/admin");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold mb-6">Edit Post</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="block text-gray-700 font-bold mb-2"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="content"
						className="block text-gray-700 font-bold mb-2"
					>
						Content
					</label>
					<textarea
						name="content"
						id="content"
						value={content}
						onChange={(event) => setContent(event.target.value)}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const response = await axios.get(`/api/posts/${params.id}`);
	const post = response.data;

	return {
		props: { post },
	};
}

export default EditPostPage;
