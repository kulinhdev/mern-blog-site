import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layouts/AdminLayout";
import api from "@/utils/api";
import Swal from "sweetalert2";

function EditCategoryPage() {
	const router = useRouter();
	const [categoryId, setCategoryId] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const fileInputRef = useRef(null);

	useEffect(() => {
		const { id } = router.query;
		setCategoryId(id);

		const fetchData = async () => {
			const response = await api.get(`/api/admin/categories/${id}`);

			console.log(response);

			const category = response.data.category;

			if (response.status === 200 && category) {
				setTitle(category.title);
				setContent(category.content);
				setSelectedImage(category.imageUrl);
			}
		};

		if (id) fetchData();
	}, [router.query]);

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
		const imageFile = event.target.image.files[0];

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("content", content);
			formData.append("image", imageFile);

			console.log("formData", Object.fromEntries(formData));

			const res = await api.put(
				`/api/admin/categories/${categoryId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log(`Edit category: ${categoryId} ==> `, res);

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
				title: "Edit new category failed!",
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
						<textarea
							id="content"
							rows="4"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={content}
							onChange={(event) => setContent(event.target.value)}
						></textarea>
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

export default EditCategoryPage;
