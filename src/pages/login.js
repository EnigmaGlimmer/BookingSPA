import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './style/login.css';
import logo from '../images/logo/index.svg';
import { login } from '../store/auth/action';

function Login() {
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    });
    const handleSubmit = (formInput) => {
        login(formInput);
    };
    return (
        <section>
            <Form
                onSubmit={() => {
                    handleSubmit(formInput);
                }}
                className="login-form"
            >
                <Form.Group className="login-logo-img">
                    <img src={logo} />
                </Form.Group>
                <Form.Group className="login-form-group">
                    <Form.Control
                        name="username"
                        placeholder="Enter admin's account"
                        onChange={(e) => {
                            setFormInput((i) => ({
                                ...i,
                                username: e.target.value,
                            }));
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="login-form-group">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter admin's password"
                        onChange={(e) => {
                            setFormInput((i) => ({
                                ...i,
                                password: e.target.value,
                            }));
                        }}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="outline"
                    className="my-btn text-uppercase px-5  btn-primary-outline btn btn-outline"
                >
                    Login
                </Button>
            </Form>
        </section>
    );
}

export default Login;
