import api from "@/utils/api";
import Swal from "sweetalert2";
import { useState, useRef } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import AdminLayout from "../layout";
import dynamic from "next/dynamic"; // Import the dynamic function from Next.js
const DynamicEditor = dynamic(
	() => import("../../../components/DynamicEditor"),
	{
		ssr: false, // Ensure the component is not rendered on the server
	}
);
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// const DynamicEditor = dynamic(
// 	() => import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor),
// 	{
// 		ssr: false,
// 	}
// );
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

function CreatePostPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const fileInputRef = useRef(null);
	const [tags, setTags] = useState([
		{ id: "Thailand", text: "Thailand" },
		{ id: "India", text: "India" },
		{ id: "Vietnam", text: "Vietnam" },
		{ id: "Turkey", text: "Turkey" },
	]);

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

	const handleImageChange = (event) => {
		const file = event.target.files[0];
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

			const res = await api.post("/api/admin/posts", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("Create post ==>", res);

			// Display success message
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: res.data.message ?? "Create Successful!",
				showConfirmButton: false,
				timer: 1500,
			});

			// Reset input
			// setTitle("");
			// setContent("");
			// setSelectedImage(null);
			// if (fileInputRef.current) {
			// 	fileInputRef.current.value = null;
			// }
		} catch (error) {
			console.error("Create error ==> ", error);
			Swal.fire({
				icon: "error",
				title: "Create new post failed!",
				text: "Error occurs ..!",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<AdminLayout>
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">Create Post</h1>
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
							htmlFor="image"
							className="block text-gray-700 font-bold mb-2"
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
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							{selectedImage && (
								<div className="flex items-center mb-2 ml-6">
									<img
										src={selectedImage}
										alt="Selected"
										className="w-32 h-32 object-cover border-solid border-2 border-sky-500 rounded-md mr-2"
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
					<div className="mb-4">
						<label
							htmlFor="content"
							className="block text-gray-700 font-bold mb-2"
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
							Create Post
						</button>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
}

export default CreatePostPage;
