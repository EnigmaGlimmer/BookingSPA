import React from 'react';
import { Form } from 'react-bootstrap';

function BreakForm() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Break-time start</Form.Label>
            </Form.Group>

            <Form.Group>
                <Form.Label>Break-time end</Form.Label>
            </Form.Group>
        </Form>
    );
}

export default BreakForm;
