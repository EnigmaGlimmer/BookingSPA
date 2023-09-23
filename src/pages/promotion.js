import React, { useEffect, useState } from 'react';

// React Bootstrap
import { Col, Container, Row, Breadcrumb, Form, Button, Dropdown } from 'react-bootstrap';

// React Icon
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// momentjs
import moment from 'moment';

// Css
import './style/promotion.css';

// Assets
import headerBackground from '../images/promotion/header.svg';
import ReactPaginate from 'react-paginate';

// router
import { Link, createSearchParams, useSearchParams } from 'react-router-dom';

// Document Meta (SEO)
import DocumentMeta from 'react-document-meta';
import * as DOMPurify from 'dompurify';

// store
import { useDispatch, useSelector } from 'react-redux';
import { getBlogList, getCategoryList } from '../store/actions';

// api
import { getSingleBlog as getSingleBlogAPI, getBlogList as getBlogListAPI } from '../api';
import { BlogOrderBy, BlogSearchBy } from '../api/enum';
import { toast } from 'react-toastify';

function Promotion() {
    document.title = 'Little Daisy - Promotion';
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

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);

    useEffect(() => {
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

    // Get latest post
    const [latestPosts, setLatestPosts] = React.useState([]);
    useEffect(() => {
        getBlogListAPI({
            skip: 1,
            take: 3,
            keyword: '',
            orderBy: BlogOrderBy.CreatedDate,
            searchBy: BlogSearchBy.None,
        })
            .then((response) => {
                if (!!response?.list) {
                    setLatestPosts(response.list);
                }
            })
            .catch((error) => {
                toast.error('Server Error', {
                    autoClose: 3000,
                });
            });
    }, []);

    const linkStyle = {
        color: 'initial',
        textDecoration: 'none',
    };
    return (
        <section id="promotion">
            {/* Header */}
            <header
                className="d-flex align-items-center"
                style={{ background: `url(${headerBackground}) 100% no-repeat, var(--clr-primary)`, height: '216px' }}
            >
                <Container>
                    <Row>
                        <Col>
                            <h2>Promotion</h2>
                        </Col>
                        <Col>
                            <Breadcrumb
                                listProps={{
                                    style: {
                                        justifyContent: 'flex-end',
                                    },
                                }}
                            >
                                <Breadcrumb.Item href="" style={linkStyle}>
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={linkStyle}>Services</Breadcrumb.Item>
                                <Breadcrumb.Item href="" active>
                                    Promotion
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </header>
            {!!searchParams?.get?.('postId') && (
                <section>
                    <img
                        src={
                            posts?.find?.((p) => {
                                return p.blogId.toString() === searchParams?.get?.('postId');
                            })?.presentedImage
                        }
                        alt=""
                        className="w-100"
                        style={{ maxHeight: '420px', objectFit: 'cover' }}
                    ></img>
                </section>
            )}

            {/*  */}
            <Container>
                <Row
                    // className="gap-5"
                    style={{
                        padding: '3.5rem 0',
                    }}
                    id="promotion-content"
                >
                    {/* Left side */}
                    <Col id="promotion-post-list-sidebar" sm="3">
                        <Form className="d-flex position-relative me-2 align-items-center mb-5">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="position-relative"
                                aria-label="Search"
                                id="global-search"
                            />
                            <div className="position-absolute top-50 end-0 search-icon">
                                <div id="gls"></div>
                            </div>
                        </Form>

                        <article className="mb-5">
                            <h3>Categories</h3>
                            <ul className="text-uppercase list-style-none">
                                {categories.slice(0, 3).map((c) => {
                                    return (
                                        <li className="py-2">
                                            <Link
                                                to={{
                                                    search: `?category=${c.categoryId}`,
                                                }}
                                                style={linkStyle}
                                            >
                                                {c?.categoryName}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </article>

                        {/* Latest Post */}
                        <article className="mb-3">
                            <h3 className="mb-3">Latest Posts</h3>
                            <div>
                                {latestPosts?.map?.((post, index) => {
                                    return (
                                        <article key={index} className="mb-4">
                                            <Row>
                                                <Col sm="6">
                                                    <img
                                                        src={post?.presentedImage}
                                                        // src="https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg"
                                                        alt={post.title}
                                                    ></img>
                                                </Col>
                                                <Col sm="6">
                                                    <Link
                                                        to={{
                                                            search: `?postId=${post?.blogId}`,
                                                        }}
                                                        style={linkStyle}
                                                    >
                                                        <p className="text-uppercase font-3 fw-light">
                                                            {moment(post?.createdDate).format('MMM D, YYYY')}
                                                        </p>
                                                        <h5 className="font-1">{post?.articleTitle}</h5>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </article>
                                    );
                                })}
                            </div>
                        </article>
                    </Col>
                    {/* Blog list */}
                    <Col id="promotion-post-list-right" sm="9">
                        <header className="d-flex mb-3 align-items-center gap-3">
                            <div>Show entries: </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline" className="btn-primary-outline">
                                    Select item number
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {[2, 3, 5, 8, 10].map((number) => (
                                        <Dropdown.Item onClick={() => setTake(number)}>{number}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </header>
                        {(!!searchParams?.get?.('postId') && <SinglePromotion></SinglePromotion>) || (
                            <>
                                {posts?.map?.((post, key) => {
                                    return (
                                        <SinglePromotionThumbnail
                                            key={key}
                                            id={post?.blogId}
                                            categories={post?.categories?.map?.((c) => c.categoryName)}
                                            content={post?.articleContent.replace(/<img[^>]*>/g, '').substring(0, 255)}
                                            postedDate={post?.createdDate}
                                            presentImage={post?.presentedImage}
                                            title={post?.articleTitle}
                                        ></SinglePromotionThumbnail>
                                    );
                                })}

                                <ReactPaginate
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
                                ></ReactPaginate>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

function SinglePromotionThumbnail({ id, title, postedDate, categories, content, presentImage }) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <article>
            <div
                style={{
                    maxHeight: '467px',
                    width: '100%',
                    height: 'auto',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={presentImage}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                ></img>
            </div>
            <div className="text-center p-4">
                <h6 className="text-uppercase">
                    {moment(postedDate).format('MMM DD, YYYY')} - {categories.join(', ')}
                </h6>
                <h2>{title}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content),
                    }}
                ></p>
                {/* <Button
                    variant="outline"
                    className="text-uppercase btn-primary-outline"
                    style={{ borderRadius: 'unset' }}
                    onClick={() => {
                        setSearchParams(
                            createSearchParams({
                                postId: id,
                            }),
                        );
                    }}
                >
                    Read More
                </Button> */}
            </div>
        </article>
    );
}

function SinglePromotion() {
    const [searchParams] = useSearchParams();
    const postId = searchParams?.get?.('postId');

    const { posts } = useSelector((state) => {
        return {
            posts: state?.Blog?.blogs,
        };
    });

    const [post, setPost] = React.useState();

    useEffect(() => {
        const foundPost = posts?.find?.((post) => {
            return post.blogId.toString() === postId;
        });

        if (!foundPost) {
            getSingleBlogAPI(postId)
                .then((response) => {
                    if (response?.blogId) {
                        setPost(response);
                    }
                })
                .catch((err) => {
                    toast.error(typeof err === 'string' ? err : 'Get Failed', {
                        autoClose: 3000,
                    });
                });
            return;
        }

        setPost(foundPost);
    }, [postId, posts]);

    const linkStyle = {
        color: 'initial',
        textDecoration: 'none',
    };
    if (post?.status === 1) {
        return <ClosedSinglePromotion></ClosedSinglePromotion>;
    }

    return (
        <DocumentMeta
            {...{
                title: `Little spa - [Blog] ${post?.articleTitle}`,
                description: 'I am a description, and I can create multiple tags',
                canonical: 'http://example.com/path/to/page',
                meta: {
                    charset: 'utf-8',
                    name: {
                        title: post?.metaTitle,
                        keywords: post?.metaKeywords,
                        description: post?.metaDescription,
                    },
                },
            }}
        >
            <article className="">
                <p className="text-center">
                    {moment(post?.createdDate).format('MMMM DD, YYYY')} -{' '}
                    {post?.categories?.map((c, index) => {
                        return (
                            <>
                                <Link
                                    key={index}
                                    // to={{
                                    //     search: {
                                    //         category: c?.categoryId,
                                    //     },
                                    // }}
                                    style={linkStyle}
                                    to={{
                                        search: `?category=${c?.categoryId}`,
                                    }}
                                    preventScrollReset={true}
                                >
                                    {c?.categoryName}
                                </Link>
                                {index !== post?.categories?.length - 1 && ', '}
                            </>
                        );
                    })}
                </p>
                <h2 className="text-center">{post?.articleTitle}</h2>
                <br></br>
                <br></br>
                <article
                    className="mb-3"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post?.articleContent),
                    }}
                ></article>

                {/* Comment */}
                {/* <div>
                    <h4>Comments</h4>
                    <Row>
                        <Col>
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                                alt="Avatar"
                            ></img>
                        </Col>
                        <Col>
                            <p>{moment(post?.postedDate).format('MMMM DD, YYYY')}</p>
                            <h3>Alizabeth</h3>
                            <p>
                                Sit amet quis id adipisicing do culpa anim magna est sint dolore nisi dolore. Laborum
                                cupidatat elit officia consectetur incididunt ad dolore enim incididunt incididunt
                                consectetur. Nostrud dolor sunt cillum irure quis. Excepteur ad consequat aliqua
                                reprehenderit est proident. Eiusmod fugiat velit exercitation deserunt nisi adipisicing
                                laborum cupidatat non non velit ea.
                            </p>
                        </Col>
                        <Col>Reply</Col>
                    </Row>
                    <h4>Leave a Reply</h4>
                    <p>Logged in as cao tien dat. Edit your profile. Log out?</p>
                    <Form.Control as="textarea" rows={3} placeholder="Your comment *" className="w-100"></Form.Control>
                </div> */}
            </article>
        </DocumentMeta>
    );
}

function ClosedSinglePromotion() {
    return <h2>This blog has been blocked by its authority</h2>;
}

export default Promotion;
