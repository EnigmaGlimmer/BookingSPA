type PaginationEvent = {
    activePage: number;
    pageNumbers: number;
    limited: number;
};

type PaginationProps = PaginationEvent & {
    containerClass?: string;
    hoverClass?: string;
    hoverArrowClass?: string;
    leftIconComponent?: React.Component;
    rightIconComponent?: React.Component;
    activePageComponent?: (children: React.Component) => React.Component<PaginationProps>;
    normalPageComponent?: (children: React.Component) => React.Component<PaginationProps>;
    onChangePage: (event: PaginationEvent) => void;
};

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
