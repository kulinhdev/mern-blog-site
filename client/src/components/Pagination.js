import Link from "next/link";

function Pagination({ currentPage, numPages }) {
	const isFirst = currentPage === 1;
	const isLast = currentPage === numPages;
	const prevPage = `/page/${currentPage - 1}`;
	const nextPage = `/page/${currentPage + 1}`;

	if (numPages === 1) return null;

	return (
		<div className="flex justify-center items-center my-8">
			{!isFirst && (
				<Link href={prevPage}>
					<a className="pagination" rel="prev">
						Previous
					</a>
				</Link>
			)}
			{Array.from({ length: numPages }, (_, i) => (
				<Link key={`page-${i}`} href={`/page/${i + 1}`}>
					<a
						className={`${
							currentPage === i + 1
								? "bg-blue-500 hover:bg-blue-700 text-white"
								: "text-gray-700 hover:text-black"
						} pagination`}
						aria-current={
							currentPage === i + 1 ? "page" : undefined
						}
					>
						{i + 1}
					</a>
				</Link>
			))}
			{!isLast && (
				<Link href={nextPage}>
					<a className="pagination" rel="next">
						Next
					</a>
				</Link>
			)}
		</div>
	);
}

export default Pagination;
