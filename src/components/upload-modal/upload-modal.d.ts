type UploadModalProps = {
    onCopyLink: (link: string) => void;
    show: boolean;
    selected: string;
    onHide: (hasShown: boolean) => void;
    onSave: (hasShown: boolean) => void;
    onSelected: (selected: string) => void;
};

declare const UploadModal: React.FunctionComponent<UploadModalProps>;

export default UploadModal;
