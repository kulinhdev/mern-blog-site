import Link from "next/link";

function PostList({ posts }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{posts.map((post) => (
				<div
					key={post._id}
					className="bg-white shadow-md rounded-md p-4"
				>
					<img
						src={post.imageUrl}
						alt={post.title}
						className="mb-4 rounded-md"
					/>
					<h2 className="text-xl font-bold mb-2">{post.title}</h2>
					<p className="text-gray-500 mb-4">{post.createdAt}</p>
					<p className="mb-4">{post.content.substring(0, 100)}...</p>
					<Link href={`/admin/posts/${post._id}`}>
						<p className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Read More
						</p>
					</Link>
					<Link href={`/admin/posts/${post._id}/edit`}>
						<p className="inline-block ml-3 bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Edit
						</p>
					</Link>
				</div>
			))}
		</div>
	);
}

export default PostList;
