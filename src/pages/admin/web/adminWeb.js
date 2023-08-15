import React from 'react';
import { Form } from 'react-bootstrap';

function AdminWeb() {
    return (
        <section>
            <h3>Web Content</h3>
            <ul>
                <li>Homepage</li>
                <li>About us</li>
                <li>Promotion</li>
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
