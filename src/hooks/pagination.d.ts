type PaginationProps = {
    fetchingAPIInstance: (prop: { controller: AbortController; page: number; take: number }) => Promise<any>;
    propToGetItem: string;
    propToGetTotalPage: string;
    amountPerPage: number;
    startingPage: number;
    totalPages: number;
    deps: any[];
};
type PaginationResponse = {
    currentPage;
    perPageAmount;
    total;
    loading;
    error;
    items;
    nextPage;
    prevPage;
    setCurrent: setCurrentPage;
    setPerPageAmount;
    refresh;
    search;
    setItems;
};

export declare const usePagination: (props: PaginationProps) => PaginationResponse;
