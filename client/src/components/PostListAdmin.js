import Link from "next/link";
import { formatDate } from "../utils/common";

function PostListAdmin({ posts }) {
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-7">
			<table className="table-fixed w-full text-sm text-left">
				<thead className="text-xs uppercase text-slate-900 tracking-tight dark:text-slate-200 bg-gray-200 dark:bg-gray-600">
					<tr>
						<th scope="col" className="px-6 py-3">
							Title
						</th>
						<th scope="col" className="px-6 py-3">
							Slug
						</th>
						<th scope="col" className="px-6 py-3">
							Image
						</th>
						<th scope="col" className="px-6 py-3">
							Description
						</th>
						<th scope="col" className="px-6 py-3">
							Tags
						</th>
						<th scope="col" className="px-6 py-3">
							Created At
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{posts.map((post) => (
						<tr
							key={post._id}
							className="bg-gray-50 dark:bg-gray-700 border-b border-gray-700 dark:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 text-slate-900 dark:text-slate-200"
						>
							<td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
								{post.title}
							</td>
							<td className="px-6 py-4">{post.slug}</td>
							<td className="px-6 py-4">
								<img className="w-32" src={post.imageUrl}></img>
							</td>
							<td className="px-6 py-4">
								<div
									dangerouslySetInnerHTML={{
										__html:
											post.content.length > 200
												? `${post.content.substring(
														0,
														50
												  )}...`
												: post.content,
									}}
								></div>
							</td>
							<td className="px-6 py-4">
								<div className="flex flex-col">
									{post.tags.map((item, index) => (
										<span
											className="font-medium text-gray-400 my-2"
											key={index}
										>
											{item.text}
										</span>
									))}
								</div>
							</td>
							<td className="px-6 py-4">
								{formatDate(post.createdAt)}
							</td>
							<td className="px-6 py-4">
								<div className=" flex text-right text-sm font-medium">
									<Link href={`/admin/posts/${post._id}`}>
										<p className="text-base text-indigo-400 hover:text-indigo-600 mr-3 hover:underline">
											View
										</p>
									</Link>
									<Link
										href={`/admin/posts/edit/${post._id}`}
									>
										<p className="text-base text-yellow-400 hover:text-yellow-600 mr-3 hover:underline">
											Edit
										</p>
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PostListAdmin;
