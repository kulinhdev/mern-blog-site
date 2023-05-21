import Link from "next/link";
import { formatDate } from "../utils/common";

function PostList({ posts }) {
	return (
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-7">
			<table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
					<tr>
						<th scope="col" class="px-6 py-3">
							Title
						</th>
						<th scope="col" class="px-6 py-3">
							Slug
						</th>
						<th scope="col" class="px-6 py-3">
							Image
						</th>
						<th scope="col" class="px-6 py-3">
							Description
						</th>
						<th scope="col" class="px-6 py-3">
							Tags
						</th>
						<th scope="col" class="px-6 py-3">
							Created At
						</th>
						<th scope="col" class="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{posts.map((post) => (
						<tr
							key={post._id}
							class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
								{post.title}
							</td>
							<td class="px-6 py-4">{post.slug}</td>
							<td class="px-6 py-4">
								<img class="w-32" src={post.imageUrl}></img>
							</td>
							<td class="px-6 py-4">
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
							<td class="px-6 py-4">
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
										<p className="text-indigo-600 hover:text-indigo-900 mr-3 hover:underline">
											View
										</p>
									</Link>
									<Link
										href={`/admin/posts/edit/${post._id}`}
									>
										<p className="text-yellow-600 hover:text-yellow-900 mr-3 hover:underline">
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

export default PostList;
