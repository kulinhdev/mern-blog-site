import AdminLayout from "@/components/layouts/AdminLayout";

function AdminPage() {
	return (
		<AdminLayout>
			<div className="mega-page">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
					Admin Dashboard
				</h1>
			</div>
		</AdminLayout>
	);
}

export default AdminPage;
