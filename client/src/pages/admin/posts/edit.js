import api from "@/utils/api";
import { useState } from "react";
import AdminLayout from "../layout";
import { WithContext as ReactTags } from "react-tag-input";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const suggestions = [
	{ id: "mango", text: "mango" },
	{ id: "pineapple", text: "pineapple" },
];

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function EditPostPage({ post }) {
	const router = useRouter();
	const { postId } = router.query;
	console.log({ postId });
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [tags, setTags] = useState(
		post.tags.map((tag) => ({
			id: tag,
			text: tag,
		}))
	);

	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags([...tags, tag]);
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};

	const handleTagClick = (index) => {
		console.log("The tag at index " + index + " was clicked");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const adminLogin = localStorage.getItem("admin");
		const authorId = JSON.parse(adminLogin)._id;

		try {
			const bodyRequest = {
				title,
				content,
				tags: tags.map((tag) => tag.text),
				author: authorId,
			};

			const res = await api.put(
				`/api/admin/posts/${post._id}`,
				bodyRequest
			);
			console.log("==>", bodyRequest, res);

			setTitle("");
			setContent("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AdminLayout>
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
					<div className="mb-4">
						<label
							htmlFor="tags"
							className="block text-gray-700 font-bold mb-2"
						>
							Tags
						</label>
						<ReactTags
							tags={tags}
							suggestions={suggestions}
							delimiters={delimiters}
							handleDelete={handleDelete}
							handleAddition={handleAddition}
							handleDrag={handleDrag}
							handleTagClick={handleTagClick}
							inputFieldPosition="bottom"
							placeholder="Enter tags..."
							autocomplete
							editable
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Update Post
						</button>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
}

export default EditPostPage;
