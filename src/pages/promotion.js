import React from 'react';

// React Bootstrap
import { Col, Container, Row, Breadcrumb, Form, Button } from 'react-bootstrap';

// momentjs
import moment from 'moment';

// Css
import './style/promotion.css';

// Assets
import headerBackground from '../images/promotion/header.svg';
import { Pagination } from '../components';
import { createSearchParams, useSearchParams } from 'react-router-dom';

// Document Meta (SEO)
import DocumentMeta from 'react-document-meta';
import * as DOMPurify from 'dompurify';

function Promotion() {
    document.title = 'Little Daisy - Promotion';
    const [searchParams, setSearchParams] = useSearchParams();
    const [
        latestPosts,
        // setLatestPosts
    ] = React.useState([
        {
            id: 0,
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
        {
            id: 1,
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
        {
            id: 2,
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
    ]);
    const [
        posts,
        // setPosts
    ] = React.useState([
        {
            id: 0,
            presentImage: 'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-img-1.jpg',
            postedDate: new Date(),
            title: 'Love Your Skin',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices. Nunc lobortis mattis aliquam faucibus. Habitasse platea dictumst vestibulum rhoncus. Id porta nibh venenatis cras sed. Nunc consequat interdum varius si',
            categories: ['CAREHYDRATION'],
        },
        {
            id: 1,
            presentImage: 'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-img-1.jpg',
            postedDate: new Date(),
            title: 'Love Your Skin',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices. Nunc lobortis mattis aliquam faucibus. Habitasse platea dictumst vestibulum rhoncus. Id porta nibh venenatis cras sed. Nunc consequat interdum varius si',
            categories: ['CAREHYDRATION'],
        },
    ]);
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
                                <Breadcrumb.Item href="">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="">Services</Breadcrumb.Item>
                                <Breadcrumb.Item href="" active>
                                    Promotion
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </header>
            {searchParams.get('postId') && (
                <section>
                    <img
                        src={posts?.find?.((p) => p.id.toString() === searchParams.get('postId'))?.presentImage}
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
                                <li className="py-2">Beauty</li>
                                <li className="py-2">Care</li>
                                <li className="py-2">Cosmetics</li>
                                <li className="py-2">Hydration</li>
                            </ul>
                        </article>

                        <article className="mb-3">
                            <h3 className="mb-3">Latest Posts</h3>
                            <div>
                                {latestPosts?.map?.((post, index) => {
                                    return (
                                        <article key={index} className="mb-4">
                                            <Row>
                                                <Col sm="auto">
                                                    <img
                                                        src="https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg"
                                                        alt={post.title}
                                                    ></img>
                                                </Col>
                                                <Col>
                                                    <p className="text-uppercase">
                                                        {moment(post.postedDate).format('MMM D, YYYY')}
                                                    </p>
                                                    <h5>Lorem ipsum dolor sit amet</h5>
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
                        {searchParams.get('postId') && (
                            <SinglePromotion
                                title={'Heading'}
                                categories={['Post', 'Nail']}
                                postedDate={new Date()}
                                content={`<div>
                                <p>Something in the post would be shown here</p>
                                <img src="https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg">
                                </div>`}
                            ></SinglePromotion>
                        )}
                        {!searchParams.get('postId') && (
                            <>
                                {posts.map((post, key) => {
                                    return (
                                        <article key={key}>
                                            <div
                                                style={{
                                                    maxHeight: '467px',
                                                    width: '100%',
                                                    height: 'auto',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <img
                                                    src={post?.presentImage}
                                                    alt={post.title}
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
                                                    {moment(post.postedDate).format('MMM D, YYYY')} -{' '}
                                                    {post.categories.join(' ')}
                                                </h6>
                                                <h2>{post?.title}</h2>
                                                <p>{post?.content}</p>
                                                <Button
                                                    variant="outline"
                                                    className="text-uppercase btn-primary-outline"
                                                    style={{ borderRadius: 'unset' }}
                                                    onClick={() => {
                                                        setSearchParams(
                                                            createSearchParams({
                                                                postId: post?.id,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    Read More
                                                </Button>
                                            </div>
                                        </article>
                                    );
                                })}
                                <Pagination
                                    containerClass="mx-auto text-center"
                                    // hoverClass="pagination-hover"
                                    hoverArrowClass="pagination-arrow-hover"
                                    pageNumbers={5}
                                    limited={3}
                                ></Pagination>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

function SinglePromotion({ title, postedDate, categories, content, keywords, description }) {
    const meta = {
        title: title,
        description: 'I am a description, and I can create multiple tags',
        canonical: 'http://example.com/path/to/page',
        meta: {
            charset: 'utf-8',
            name: {
                title: title,
                keywords: keywords,
                description: description,
            },
        },
    };
    return (
        <DocumentMeta {...meta}>
            <article className="">
                <p className="text-center">
                    {moment(postedDate).format('MMMM DD, YYYY')} - {categories?.join?.(', ') || 'HyperText'}
                </p>
                <h2 className="text-center">{title || 'Healthy'}</h2>
                <br></br>
                <br></br>
                <article
                    className=""
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content),
                    }}
                ></article>

                {/* Comment */}
                <div>
                    <h4>Comments</h4>
                    <Row>
                        <Col>
                            <img src="" alt="Avatar"></img>
                        </Col>
                        <Col>
                            <p>{moment(postedDate).format('MMMM D, YYYY')}</p>
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
                </div>
            </article>
        </DocumentMeta>
    );
}

export default Promotion;
