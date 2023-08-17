const Pagination = ({ currentPage, pages, switchPage }) => {
	const getPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= pages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	return (
		<div className="flex justify-between items-center mt-8">
			<button
				onClick={() => switchPage(currentPage - 1)}
				disabled={currentPage === 1}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Previous Page
			</button>
			{/* <p className="text-xl text-slate-900 tracking-wide dark:text-slate-200">
				Page {currentPage} of {pages}
			</p> */}
			<div className="flex items-center space-x-2">
				{getPageNumbers().map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => switchPage(pageNumber)}
						className={`${
							pageNumber === currentPage
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						} rounded-full w-8 h-8 flex items-center justify-center leading-none font-semibold transition duration-300 ease-in-out`}
					>
						{pageNumber}
					</button>
				))}
			</div>
			<button
				onClick={() => switchPage(currentPage + 1)}
				disabled={currentPage === pages}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Next Page
			</button>
		</div>
	);
};

export default Pagination;
