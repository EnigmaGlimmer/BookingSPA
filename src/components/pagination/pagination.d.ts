type PaginationProps = {
    activePage: number;
    pageNumbers: number;
    limited: number;
    containerClass?: string;
    hoverClass?: string;
    hoverArrowClass?: string;
    leftIconComponent?: React.Component;
    rightIconComponent?: React.Component;
    activePageComponent?: (children: React.Component) => React.Component;
    normalPageComponent?: (children: React.Component) => React.Component;
};

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
