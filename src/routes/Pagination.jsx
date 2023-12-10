const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav className="z-30 flex items-center justify-between border-t border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface sm:px-6">
            <div className="hidden sm:block">
                <span className="text-sm text-on-surface-variant">
                    頁面 <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span>
                </span>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface disabled:bg-surface-container-low disabled:text-disabled">
                    上一頁
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface disabled:bg-surface-container-low disabled:text-disabled">
                    下一頁
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
