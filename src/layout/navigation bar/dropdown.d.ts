type DropdownMenuProps = {
    submenu: Array<{ title: string; link: string }>;
    styleContainer: React.CSSProperties;
    show: boolean;
};

declare const DropdownMenu: React.FunctionComponent<DropdownMenuProps>;

export default DropdownMenu;
