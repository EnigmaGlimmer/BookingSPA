import React from 'react';
import { Form } from 'react-bootstrap';

function StepOne({ validation }) {
    const { values, errors, handleChange } = validation;
    return (
        <Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" value={values.username} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={values.email} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={values.password} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control name="fullName" value={values.fullName} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={values.address} onChange={handleChange}></Form.Control>
            </Form.Group>
        </Form.Group>
    );
}

export default StepOne;
