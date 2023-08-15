import React from 'react';

// Text Editor
import ReactQuill from 'react-quill';

// Upload Modal
import UploadModal from '../upload-modal/upload-modal';

// Formik
import { Formik } from 'formik';

// React Bootstrap
import { Form } from 'react-bootstrap';

class CustomReactQuill extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isImageModalShow: false };
        this.imageInputRef = React.createRef(null);
        this.quillRef = React.createRef(null);
    }

    imageHandler = async () => {
        this.setState(() => ({
            isImageModalShow: true,
        }));
    };

    render() {
        return (
            <>
                <ReactQuill
                    onChange={(content, delta, source, editor) => {
                        this.props?.onChange?.(content);
                        console.log(content);
                        console.log(delta);
                        console.log(source);
                    }}
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                                [{ align: [] }],
                                ['link', 'image'],
                                ['clean'],
                            ],
                            handlers: {
                                image: this.imageHandler,
                            },
                        },
                    }}
                    formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'indent',
                        'link',
                        'image',
                    ]}
                    ref={this.quillRef}
                ></ReactQuill>

                <UploadModal
                    show={this.state.isImageModalShow}
                    onCopyLink={(link) => {
                        console.log(link);
                    }}
                    onHide={() => {
                        this.setState({ isImageModalShow: false });
                    }}
                    onSave={() => {
                        this.setState({ isImageModalShow: false });
                    }}
                    onSelected={(image) => {
                        if (this.quillRef.current) {
                            console.log(this.quillRef.current);

                            const range = this.quillRef.current.getEditorSelection();
                            console.log(range);

                            this.quillRef.current.getEditor().insertEmbed(range?.index, 'image', image);
                        }
                    }}
                ></UploadModal>
            </>
        );
    }
}

export default CustomReactQuill;
