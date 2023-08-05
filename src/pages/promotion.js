import React from 'react';

// React Bootstrap
import { Col, Container, Row, Breadcrumb, Form, Button } from 'react-bootstrap';

// momentjs
import moment from 'moment';

// Css
import './styles/promotion.css';

// Assets
import headerBackground from '../images/promotion/header.svg';
import { Pagination } from '../components';

function Promotion() {
    const [latestPosts, setLatestPosts] = React.useState([
        {
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
        {
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
        {
            presentImage:
                'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg',
            postedDate: new Date(),
            title: 'Lorem ipsum dolor sit amet',
        },
    ]);
    const [posts, setPosts] = React.useState([
        {
            presentImage: 'https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-img-1.jpg',
            postedDate: new Date(),
            title: 'Love Your Skin',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices. Nunc lobortis mattis aliquam faucibus. Habitasse platea dictumst vestibulum rhoncus. Id porta nibh venenatis cras sed. Nunc consequat interdum varius si',
            categories: ['CAREHYDRATION'],
        },
        {
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

            {/*  */}
            <Container>
                <Row
                    className="gap-5"
                    style={{
                        padding: '3.5rem 0',
                    }}
                    id=""
                >
                    {/* Left side */}
                    <Col sm="3">
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
                            <h3>Latest Posts</h3>
                            <div>
                                {latestPosts.map((post, index) => {
                                    return (
                                        <article key={index} className="mb-4">
                                            <Row>
                                                <Col sm="auto">
                                                    <img src="https://leonie.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-feature-img-3-1-92x105.jpg"></img>
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
                    <Col sm="8">
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
                                        >
                                            Read More
                                        </Button>
                                    </div>
                                </article>
                            );
                        })}
                        <Pagination
                            containerClass="mx-auto text-center"
                            hoverClass="pagination-hover"
                            pageNumbers={5}
                            limited={3}
                        ></Pagination>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Promotion;
