import React from 'react';
import { Form } from 'react-bootstrap';
import { Link, useSearchParams, createSearchParams } from 'react-router-dom';

function AdminWeb() {
    const [params, setParams] = useSearchParams();
    return (
        <section>
            <h3>Web Content</h3>
            <ul>
                <li>
                    <Link to={'?content=home'}>Homepage</Link>
                </li>
                <li>
                    <Link to="?content=about">About us</Link>
                </li>
                <li>
                    <Link to="?content=promotion">Promotion</Link>
                </li>
            </ul>
            <h3>Contact</h3>
            <ul>
                <li>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Whatsapp</Form.Label>
                        <Form.Control></Form.Control>
                    </Form.Group>
                </li>
            </ul>
        </section>
    );
}

export default AdminWeb;
