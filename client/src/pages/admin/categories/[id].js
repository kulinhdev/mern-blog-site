import AdminLayout from "@/layouts/AdminLayout";
import { formatDate } from "@/utils/common";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "@/utils/backendApi";
import Swal from "sweetalert2";

function CategoryPage() {
	const [category, setCategory] = useState();
	const router = useRouter();

	useEffect(() => {
		const { id } = router.query;
		const fetchData = async () => {
			const response = await api.get(`/api/admin/categories/${id}`);

			console.log(response);

			if (response.status === 200) {
				setCategory(response.data.category);
			}
		};

		if (id !== "undefined") fetchData();
	}, [router.query]);

	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure you want to delete this category?",
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
				const res = await api.delete(
					`/api/admin/categories/${category._id}`
				);

				// Display success message
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: res.data.message ?? "Delete Successful!",
					showConfirmButton: false,
					timer: 1500,
				});
				router.push("/admin/categories");
			} catch (error) {
				console.error("Delete error ==> ", error);
				Swal.fire({
					icon: "error",
					title: "Delete category failed!",
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
				{category && (
					<div className="text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg px-6 py-8">
						<h1 className="text-3xl bg-slate-50 dark:bg-slate-700 font-bold mb-6">
							{category.title}
						</h1>
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								{formatDate(category.createdAt, true)}
							</span>
						</div>
						{category.imageUrl && (
							<img
								src={category.imageUrl}
								alt={category.title}
								className="mb-6 w-60 rounded-lg"
							/>
						)}
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								Slug:
							</span>{" "}
							<span className="bg-orange-500 text-white font-medium py-1 px-2 rounded-full">
								{category.slug}
							</span>
						</div>
						<div className="my-8">
							<span className="text-lg font-bold mr-3">
								Content:
							</span>
							<div
								className="my-2"
								dangerouslySetInnerHTML={{
									__html: category.content,
								}}
							></div>
						</div>
						<div className="flex justify-end mt-8">
							<button
								onClick={() =>
									router.push(
										`/admin/categories/edit/${category._id}`
									)
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

export default CategoryPage;
