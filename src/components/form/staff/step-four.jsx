import React from 'react';
import { Form } from 'react-bootstrap';

function StepFour() {
    return (
        <div className="w-100 text-center">
            <h2 className="mb-3 ">Please checking the information of staff for confirmation</h2>
            <Form.Control
                type="submit"
                className="mb-3 m-auto"
                value={'Generate staff account'}
                style={{ maxWidth: '220px' }}
            ></Form.Control>
        </div>
    );
}

export default StepFour;
