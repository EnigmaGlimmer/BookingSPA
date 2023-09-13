import React, { useState } from 'react';

// Local Components
import { CustomReactQuill } from '../../../components';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { FieldArray, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { UploadModal } from '../../../components';
import { getBlogList, getCategoryList, postBlog, postCategory } from '../../../store/actions';
import { BiEdit } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { BlogOrderBy, BlogSearchBy } from '../../../api/enum';
import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

let blogSchema = yup.object().shape({
    articleTitle: yup.string().required('This field is require field'),
    articleContent: yup.object().shape({
        value: yup.string().required('This field is require field'),
    }),
    categories: yup.array().required(),
    presentedImageId: yup.number().typeError('This field must be number').required('This field is require field'),
    status: yup.number().typeError('This field must be number').required('This field is require field'),
    metaKeywords: yup.string().required('This field is require field'),
    metaTitle: yup.string().required('This field is require field'),
    metaDescription: yup.string().required('This field is require field'),
    createdDate: yup.date().required(),
});
let categorySchema = yup.object().shape({
    categoryName: yup.string().required('This field is require field'),
});
function AdminBlog() {
    const [searchParams] = useSearchParams();
    
    const [take, setTake] = useState(5);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [orderBy, setOrderBy] = useState(BlogOrderBy.CreatedDate);
    const [searchBy, setSearchBy] = useState(BlogSearchBy.None);

    const dispatch = useDispatch();
    const { posts, categories, totalPost } = useSelector((state) => {
        return {
            posts: state?.Blog?.blogs,
            totalPost: state?.Blog?.total,
            categories: state?.Category?.category,
        };
    });
    console.log(posts,categories)
    React.useEffect(() => {
        let query = {
            skip: page,
            take: take,
            keyword: keyword,
            orderBy: orderBy,
            searchBy: searchBy,
        };
        if (!!searchParams.get('category')) {
            query = {
                ...query,
                keyword: searchParams.get('category'),
                searchBy: BlogSearchBy.Category,
            };
        }
        dispatch(getBlogList(query));
    }, [searchParams, take, page, keyword]);

    return (
        <section>
            <div className='blog'>
                <div className='blog-title'>Title</div>
                <div className='blog-content'>Content</div>
                <div className='blog-meta'>Meta</div>
            </div>
            {/* <ReactPaginate
                previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                nextLabel={<AiOutlineRight></AiOutlineRight>}
                pageCount={Math.ceil(totalPost / take)}
                onPageChange={({ selected }) => {
                    setPage(selected + 1);
                }}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination-arrow-hover'}
                nextLinkClassName={'pagination-arrow-hover'}
                pageClassName="px-3"
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination-item-active'}
            ></ReactPaginate> */}
        </section>
    );
}

const CreateBlog = () => {
        const [demo, setDemo] = useState('');
    const [modal, setModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const categoryIdsOptionRef = React.useRef();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => {
        return { categories: state?.Category?.category };
    });
    const { uploads, error } = useSelector((state) => {
        return {
            uploads: state.Upload.uploads,
            error: state.Upload.error,
        };
    });
    React.useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);
    return(
        <section className="container-fluid py-3">
            <h2 className="mb-3">Post your new blog</h2>

            <Row>
                <Col sm="6">
                    <h3>Edit the content</h3>
                    <Formik
                        initialValues={{
                            articleTitle: '',
                            articleContent: {
                                value: '',
                            },
                            categories: [],
                            presentedImage: '',
                            status: 0,
                            metaKeywords: '',
                            metaTitle: '',
                            metaDescription: '',
                            categories: [],
                            createdDate: moment(),
                        }}
                        onSubmit={(values, formikHelper) => {
                            formikHelper.setSubmitting(false);
                            dispatch(postBlog(values));
                        }}
                    >
                        {({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-3">Title</Form.Label>
                                        <Form.Control
                                            name="articleTitle"
                                            value={values.articleTitle}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-3">Update Image</Form.Label>
                                        <div>
                                            <Button variant="success" onClick={() => setShowUploadModal(true)}>
                                                Upload your image
                                            </Button>
                                        </div>
                                        <UploadModal
                                            show={showUploadModal}
                                            onSave={(hasShown) => {}}
                                            onSelected={(selected) => {}}
                                            selected={''}
                                            onHide={() => {
                                                setShowUploadModal(false);
                                            }}
                                            onCopyLink={(link) => {
                                                setFieldValue('presentedImage', link);
                                                setShowUploadModal(false);
                                            }}
                                        ></UploadModal>
                                        {values.presentedImage ? (
                                            <div className="admin-images-form">
                                                <div style={{ textAlign: 'right' }}>
                                                    <FaTimes
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setFieldValue('presentedImage', '');
                                                        }}
                                                    ></FaTimes>
                                                    <img src={values.presentedImage} width={'100%'} />;
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-3">Content</Form.Label>
                                        <CustomReactQuill
                                            name="articleContent.value"
                                            onBlur={handleBlur}
                                            onChange={(htmlText) => {
                                                setFieldValue('articleContent.value', htmlText);
                                                setDemo(htmlText);
                                            }}
                                        ></CustomReactQuill>
                                    </Form.Group>

                                    <h3>Meta detail</h3>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta title</Form.Label>
                                        <Form.Control
                                            name="metaTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter meta title"
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta Keywords</Form.Label>
                                        <Form.Control
                                            name="metaKeywords"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter meta keywords"
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta Description</Form.Label>
                                        <Form.Control
                                            name="metaDescription"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter meta Description"
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Category show={modal} hide={() => setModal(false)}></Category>
                                        <Form.Label>Category</Form.Label>
                                        <BiEdit
                                            className="mx-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setModal(true)}
                                        ></BiEdit>
                                        <Form.Select
                                            // onChange={handleChange}
                                            placeholder="Enter service title"
                                            ref={categoryIdsOptionRef}
                                        >
                                            {categories?.map((item, index) => (
                                                <option key={index} value={item?.categoryId}>
                                                    {item?.categoryName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <FieldArray
                                            name="categories"
                                            render={(array) => {
                                                return (
                                                    <Button
                                                        onClick={() => {
                                                            const currentCategoryId = parseInt(
                                                                categoryIdsOptionRef.current.value,
                                                            );
                                                            if (!values.categories.includes(currentCategoryId)) {
                                                                array.push(currentCategoryId);
                                                            }
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="my-4">
                                        {values?.categories?.map((item, index) => {
                                            return (
                                                <Button variant="success" style={{ marginRight: '15px' }}>
                                                    {categories.find((g) => item === g.categoryId)?.categoryName}
                                                    &nbsp;
                                                    <FaTimes
                                                        style={{ marginBottom: '1px', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setFieldValue(
                                                                'categories',
                                                                values.categories.filter((e) => e !== item),
                                                            );
                                                        }}
                                                    ></FaTimes>
                                                </Button>
                                            );
                                        })}
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="my-4">
                                        Submit
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </Col>
                <Col sm="6" style={{ position: 'sticky', top: 0, maxHeight: '720px', overflowY: 'scroll' }}>
                    <div>
                        <h4 className="mb-5">Demo</h4>
                        <article
                            className="w-100 demo p-2"
                            style={{ border: '1px solid var(--clr-border)', minHeight: '600px' }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: demo }}></div>
                        </article>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

const Category = ({ show, hide }) => {
    const dispatch = useDispatch();
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            dispatch(
                postCategory({
                    categoryName: values.categoryName,
                }),
            );
        },
    });
    return (
        <Modal
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={hide}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header style={{ margin: '0 auto', width: '80%', background: 'white' }} closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    margin: '0 auto',
                    maxWidth: 'unset',
                    background: 'white',
                    width: '80%',
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            name="categoryName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.categoryName && !!errors?.categoryName}
                            placeholder="Enter Category Name"
                        ></Form.Control>
                    </Form.Group>
                    <Button variant="success">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default AdminBlog;
