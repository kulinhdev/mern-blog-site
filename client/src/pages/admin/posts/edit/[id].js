import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { WithContext as ReactTags } from "react-tag-input";
import api from "@/utils/api";
import dynamic from "next/dynamic"; // Import the dynamic function from Next.js
import Swal from "sweetalert2";

const DynamicEditor = dynamic(
	() => import("../../../../components/DynamicEditor"),
	{
		ssr: false, // Ensure the component is not rendered on the server
	}
);
const suggestions = [
	{ id: "mango", text: "mango" },
	{ id: "pineapple", text: "pineapple" },
];

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function EditPostPage() {
	const router = useRouter();
	const [postId, setPostId] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState([]);
	const [content, setContent] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const fileInputRef = useRef(null);

	useEffect(() => {
		const { id } = router.query;
		console.log(router.query);
		setPostId(id);
		const fetchData = async () => {
			const response = await api.get(`/api/admin/posts/${id}`);

			console.log(response.data);

			if (response.status === 200) {
				setTitle(response.data?.title);
				setContent(response.data?.content);
				setSelectedImage(response.data?.imageUrl);
				setTags(response.data?.tags);
			}
		};

		fetchData();
	}, [router.query]);

	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags([...tags, { id: tag.text, text: tag.text }]);
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

	const handleTagUpdate = (editIndex, updatedTag) => {
		const updatedTags = [...tags];
		updatedTags[editIndex] = updatedTag;
		setTags(updatedTags);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		console.log("file", file);
		if (file) {
			setSelectedImage(URL.createObjectURL(file));
		} else {
			setSelectedImage(null);
		}
	};

	const handleUnselectImage = () => {
		setSelectedImage(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const adminLogin = localStorage.getItem("admin");
		const authorId = JSON.parse(adminLogin).id;
		const tagsString = JSON.stringify(tags);
		const imageFile = event.target.image.files[0];

		console.log("params ==> ", tagsString, imageFile);

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("content", content);
			formData.append("tags", tagsString);
			formData.append("author", authorId);
			formData.append("image", imageFile);

			console.log("formData", Object.fromEntries(formData));

			const res = await api.put(`/api/admin/posts/${postId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(`Edit post: ${postId} ==> `, res);

			// Display success message
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: res.data.message ?? "Create Successful!",
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error("Edit error ==> ", error);
			Swal.fire({
				icon: "error",
				title: "Edit new post failed!",
				text: "Error occurs ..!",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<AdminLayout>
			<div className="mega-page">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
					Edit Post
				</h1>
				<form
					onSubmit={handleSubmit}
					className="form rounded-lg p-5 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 my-7"
				>
					<div className="mb-7">
						<label
							htmlFor="title"
							className="block text-slate-900 dark:text-slate-200 font-bold mb-2"
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
							className="appearance-none border rounded w-full py-2 px-3 text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 shadow-sm focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-7">
						<label
							htmlFor="image"
							className="block text-slate-900 dark:text-slate-200 font-bold mb-2"
						>
							Image
						</label>
						<div className="grid grid-cols-2 gap-2 content-center">
							<div className="my-2 self-center">
								<input
									type="file"
									name="image"
									id="image"
									accept="image/*"
									onChange={handleImageChange}
									ref={fileInputRef}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							{selectedImage && (
								<div className="flex items-center mb-2 ml-6">
									<img
										src={selectedImage}
										alt="Selected"
										className="w-44 max-h-52 object-cover border-solid border-2 border-sky-500 rounded-md mr-2"
									/>
									<button
										type="button"
										className="text-red-500 font-medium"
										onClick={handleUnselectImage}
									>
										Remove
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="mb-7">
						<label
							htmlFor="content"
							className="block text-slate-900 dark:text-slate-200 font-bold mb-2"
						>
							Content
						</label>
						<DynamicEditor
							data={content}
							onReady={(editor) => {
								// You can store the "editor" and use when it is needed.
								console.log("Editor is ready to use!", editor);
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								console.log({ event, editor, data });
								setContent(data);
							}}
							onBlur={(event, editor) => {
								console.log("Blur.", editor);
							}}
							onFocus={(event, editor) => {
								console.log("Focus.", editor);
							}}
						/>
					</div>
					<div className="mb-7">
						<label
							htmlFor="tags"
							className="block text-slate-900 dark:text-slate-200 font-bold mb-2"
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
							onTagUpdate={handleTagUpdate}
							inputFieldPosition="bottom"
							placeholder="Enter tags..."
							autocomplete
							editable
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
