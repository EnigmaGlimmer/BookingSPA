import React from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const ModalContext = React.createContext();

const ModalContainer = function ({ children }) {
    const [isModalShown, setIsModalShown] = React.useState(false);
    const [body, setBody] = React.useState(null);
    const [footer, setFooter] = React.useState(null);
    const [bodyDialog, setBodyDialog] = React.useState(null);
    const [footerDialog, setFooterDialog] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [textBody, setTextBody] = React.useState('');
    const [modalProps, setModalProps] = React.useState({
        dialogClassName: 'modal-90w',
        size: 'lg',
        onClickDialogSuccess: () => {
            toast.success('Success');
        },
    });

    const [isDialogOpened, setIsDialogOpened] = React.useState(false);

    function openModal({ bodyComponent, footerComponent, modalProps }) {
        if (bodyComponent) {
            setBody(bodyComponent);
        }

        if (footerComponent) {
            setFooter(footerComponent);
        }

        if (modalProps) {
            setModalProps(modalProps);
        }

        setIsModalShown(true);
    }
    function closeModal() {
        setIsModalShown(false);
    }

    function openDialog({ body, footer, title, textBody, dialogProps }) {
        if (body) {
            setBodyDialog(body);
        }

        if (footer) {
            setFooterDialog(footer);
        }

        if (title) {
            setTitle(title);
        }

        if (textBody) {
            setTextBody(textBody);
        }

        if (dialogProps) {
            setModalProps(dialogProps);
        }

        setIsDialogOpened(true);
    }

    function closeDialog() {
        setIsDialogOpened(false);
    }

    let value = { openModal, openDialog, closeDialog, closeModal, setBody, setFooter };
    return (
        <ModalContext.Provider value={value}>
            {children}
            {/* Modal */}
            <Modal show={isModalShown} onHide={closeModal} {...modalProps}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>{footer}</Modal.Footer>
            </Modal>
            {/* OffCanvas */}
            {/* <Offcanvas ></Offcanvas> */}

            {/* Dialog box */}
            <Modal show={isDialogOpened} onHide={closeDialog}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{bodyDialog || <p>{textBody}</p>}</Modal.Body>

                    <Modal.Footer>
                        {footerDialog || (
                            <ButtonGroup>
                                <Button variant="secondary" onClick={closeDialog}>
                                    Back
                                </Button>
                                <Button variant="primary" onClick={modalProps.onClickDialogSuccess}>
                                    Confirm
                                </Button>
                            </ButtonGroup>
                        )}
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </ModalContext.Provider>
    );
};

export default ModalContainer;
