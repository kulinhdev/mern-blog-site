import { useRouter } from "next/router";
import axios from "axios";

function PostPage({ post }) {
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/posts/${post._id}`);
			router.push("/admin");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold mb-6">{post.title}</h1>
			<p className="mb-8">{post.content}</p>
			<div className="flex items-center space-x-4">
				<button
					onClick={() => router.push(`/admin/edit-post/${post._id}`)}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Edit
				</button>
				<button
					onClick={handleDelete}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Delete
				</button>
			</div>
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

export default PostPage;
