import { MultiSelect } from 'react-multi-select-component';

import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { useFormik } from 'formik';

function FilterBookingBox({ onFilterChange, onSortChange, onSortTypeChange, onSearchChange }) {
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
    const sortTypeOptions = [
        { label: 'Asc', value: 'asc' },
        { label: 'Desc', value: 'desc' },
    ];
    const searchByOptions = [
        { label: 'Service Name', value: 'serviceName' },
        { label: 'Staff Name', value: 'staffName' },
    ];
    const validation = useFormik({
        initialValues: { searchKeywords: '', searchBy: '', filterValue: '', orderType: '', sortType: '' },
        onSubmit: (values) => {},
    });

    return (
        <Row className="justify-content-between gap-3">
            <Col sm="12" lg="4">
                <Form.Group>
                    <Form.Label>Search By:</Form.Label>
                    <Row className="mb-3">
                        <Col sm="12" md="6" lg="8">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                name="searchKeywords"
                                value={validation.values.searchKeywords}
                                onChange={validation.handleChange}
                            ></Form.Control>
                        </Col>
                        <Col sm="12" md="6" lg="4">
                            <Form.Select
                                onChange={(e) => {
                                    validation.setFieldValue('sortType', e.currentTarget.value);
                                }}
                            >
                                {searchByOptions.map((opt) => (
                                    <option value={opt.value}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button
                        variant="outline"
                        className="btn-outline-primary"
                        onClick={() => {
                            onSearchChange(validation.values.searchKeywords, validation.values.sortType);
                        }}
                    >
                        Search
                    </Button>
                </Form.Group>
            </Col>

            <Col sm="12" lg="4">
                <Form.Group className="mb-3 ">
                    <Form.Label>Sort By:</Form.Label>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
                            <Form.Select
                                onChange={(e) => {
                                    onSortTypeChange(e.currentTarget.value);
                                    console.log(e.currentTarget.value);
                                }}
                            >
                                {sortTypeOptions.map((sort) => {
                                    return <option value={sort.value}>{sort.label}</option>;
                                })}
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
            </Col>

            <Col sm="12" lg="4">
                <Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Filter By:</Form.Label>
                        <Row>
                            <Col sm="10">
                                <MultiSelect
                                    value={filters}
                                    options={filterOptions}
                                    labelledBy=""
                                    hasSelectAll={false}
                                    onChange={(values) => setFilters(values)}
                                ></MultiSelect>
                            </Col>
                            <Col sm="2">
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
                        </Row>
                    </Form.Group>
                </Form.Group>
            </Col>
        </Row>
    );
}

export default FilterBookingBox;
