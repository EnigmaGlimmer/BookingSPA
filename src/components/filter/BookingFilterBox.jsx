import { MultiSelect } from 'react-multi-select-component';
import moment from 'moment';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function FilterBookingBox({ onFilterChange }) {
    const [filters, setFilters] = React.useState([]);

    const options = [
        {
            label: 'date',
            value: 'date',
        },
        {
            label: 'month',
            value: 'month',
        },
        {
            label: 'year',
            value: 'year',
        },
    ];
    return (
        <>
            <Form.Group>
                <Form.Label>Filter By:</Form.Label>

                <MultiSelect options={options} onChange={(values) => setFilters(values)}></MultiSelect>
            </Form.Group>

            <Form.Group>
                <Row>
                    {filters.map((filter, k) => {
                        return (
                            <Col sm="auto" key={k}>
                                {filter === 'month' && <MonthInput onSelectMonth={(month) => {}}></MonthInput>}
                                {filter === 'date' && <DateInput onSelectDate={(date) => {}}></DateInput>}
                                {filter === 'year' && <YearInput onSelectYear={(year) => {}}></YearInput>}
                            </Col>
                        );
                    })}
                    <Col></Col>
                </Row>
            </Form.Group>
        </>
    );
}

function DateInput({ onSelectDate }) {
    return (
        <Form.Select>
            {moment.months().map((month, key) => {
                return (
                    <option value={month} key={key}>
                        {month}
                    </option>
                );
            })}
        </Form.Select>
    );
}

function MonthInput({ onSelectMonth }) {
    return (
        <Form.Select>
            {moment.months().map((month, key) => {
                return (
                    <option value={month} key={key}>
                        {month}
                    </option>
                );
            })}
        </Form.Select>
    );
}

function YearInput({ onSelectYear }) {
    return (
        <Form.Select>
            {Array.from(Array(2099 - 2023)).map(([year], key) => {
                return (
                    <option value={year + 2023} key={key}>
                        {year + 2023}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default FilterBookingBox;
