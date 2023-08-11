import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login() {
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    });
    return (
        <section>
            <Form onSubmit={() => {}}>
                <Form.Group>
                    <Form.Control
                        name="username"
                        placeholder="Enter admin username"
                        onChange={(e) => {
                            setFormInput((i) => ({
                                ...i,
                                username: e.target.value,
                            }));
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={(e) => {
                            setFormInput((i) => ({
                                ...i,
                                password: e.target.value,
                            }));
                        }}
                    ></Form.Control>
                </Form.Group>
                <Button variant="outline">Login</Button>
            </Form>
        </section>
    );
}

export default Login;
