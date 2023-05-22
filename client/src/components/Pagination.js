import Link from "next/link";

const Pagination = ({ currentPage, pages, fetchPosts }) => {
	return (
		<div className="flex justify-between items-center mt-8">
			<button
				onClick={() => fetchPosts(currentPage - 1)}
				disabled={currentPage === 1}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Previous Page
			</button>
			<p className="text-xl text-slate-900 tracking-wide dark:text-slate-200">
				Page {currentPage} of {pages}
			</p>
			<button
				onClick={() => fetchPosts(currentPage + 1)}
				disabled={currentPage === pages}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Next Page
			</button>
		</div>
	);
};

export default Pagination;
