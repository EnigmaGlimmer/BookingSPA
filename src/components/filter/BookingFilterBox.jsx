import { MultiSelect } from 'react-multi-select-component';

import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { useFormik } from 'formik';

function FilterBookingBox({ onFilterChange, onSortChange, onSearchChange }) {
    const [filters, setFilters] = React.useState([]);
    const filterOptions = [
        {
            label: 'day',
            value: 'day',
            disabled: filters.some((f) => f.value === 'month' || f.value === 'year'),
        },
        {
            label: 'month',
            value: 'month',
            disabled: filters.some((f) => f.value === 'day' || f.value === 'year'),
        },
        {
            label: 'year',
            value: 'year',
            disabled: filters.some((f) => f.value === 'day' || f.value === 'month'),
        },
    ];
    const sortOptions = [
        { label: 'check-in date', value: 'CheckinDate' },
        { label: 'created date', value: 'CreatedDate' },
    ];
    const validation = useFormik({
        initialValues: { searchKeywords: '', searchBy: '', filterValue: '', sortType: '' },
        onSubmit: (values) => {},
    });

    return (
        <Row>
            <Col>
                <Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Filter By:</Form.Label>

                        <MultiSelect
                            value={filters}
                            options={filterOptions}
                            labelledBy=""
                            hasSelectAll={false}
                            onChange={(values) => setFilters(values)}
                        ></MultiSelect>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            {filters.map((filter, k) => {
                                return (
                                    <Col sm="auto" key={k}>
                                        {filter.value === 'day' && (
                                            <DatePicker
                                                onChange={(_, dateStr) => {
                                                    validation.setValues((values) => ({
                                                        ...values,
                                                        filterValue: dateStr,
                                                        searchBy: 'Date',
                                                    }));
                                                }}
                                            ></DatePicker>
                                        )}
                                        {filter.value === 'month' && (
                                            <DatePicker
                                                picker="month"
                                                onChange={(_, dateStr) => {
                                                    validation.setValues((values) => ({
                                                        ...values,
                                                        filterValue: dateStr,
                                                        searchBy: 'Month',
                                                    }));
                                                }}
                                            ></DatePicker>
                                        )}
                                        {filter.value === 'year' && (
                                            <DatePicker
                                                picker="year"
                                                onChange={(_, dateStr) => {
                                                    validation.setValues((values) => ({
                                                        ...values,
                                                        filterValue: dateStr,
                                                        searchBy: 'Year',
                                                    }));
                                                }}
                                            ></DatePicker>
                                        )}
                                    </Col>
                                );
                            })}
                            <Col>
                                <Button
                                    onClick={() => {
                                        onFilterChange(validation.values.filterValue, validation.values.searchBy);
                                    }}
                                >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3 ">
                    <Form.Label>Sort By:</Form.Label>

                    <Form.Select
                        className="mb-3"
                        onChange={(e) => {
                            onSortChange(e.currentTarget.value);
                        }}
                    >
                        {sortOptions.map((sort) => {
                            return <option value={sort.value}>{sort.label}</option>;
                        })}
                    </Form.Select>
                    {/* <Button variant="outline" className="btn-primary-outline">
                        Sort
                    </Button> */}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Search By:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        name="searchKeywords"
                        value={validation.values.searchKeywords}
                        onChange={validation.handleChange}
                    ></Form.Control>
                    <Button
                        variant="outline"
                        className="btn-outline-primary"
                        onClick={() => {
                            console.log(validation.values);
                            onSearchChange(validation.values.searchKeywords);
                        }}
                    >
                        Search
                    </Button>
                </Form.Group>
            </Col>
        </Row>
    );
}

export default FilterBookingBox;
