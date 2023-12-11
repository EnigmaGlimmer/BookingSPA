import UploadModal from 'components/upload-modal/upload-modal';
import usePrefetchContext from 'hooks/usePrefetchContext';
import React from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';

function StepTwo({ validation }) {
    const { values, handleChange, setFieldValue } = validation;
    const { parentServices, services } = usePrefetchContext();
    const [isUploadModalOpened, setIsUploadModalOpened] = React.useState(false);
    return (
        <Form.Group>
            <Form.Group className="mb-3">
                <Image
                    src={values.avatar}
                    alt={values.username}
                    className="mb-3"
                    style={{ border: '1px solid #010101', width: '160px', height: '220px' }}
                ></Image>
                <div className="mb-3">
                    <Form.Label className="me-2">Avatar</Form.Label>
                    <Button
                        className="btn-primary-outline"
                        variant="outline"
                        onClick={() => setIsUploadModalOpened(true)}
                    >
                        Upload Avatar
                    </Button>
                    <UploadModal
                        show={isUploadModalOpened}
                        onCopyLink={(link) => {}}
                        onSelected={(link) => {
                            setFieldValue('avatar', link);
                        }}
                        onHide={() => setIsUploadModalOpened(false)}
                    ></UploadModal>
                </div>
                <Form.Control name="avatar" value={values.avatar} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control name="age" value={values.age} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control name="experience" value={values.experience} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Field</Form.Label>
                <Form.Control name="field" value={values.field} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <MultiSelect
                    name="serviceId"
                    value={values?.serviceIds || []}
                    options={parentServices
                        .reduce((p, c) => [...p, ...c.childs], [])
                        .map((s) => {
                            return {
                                label: s.serviceName,
                                value: s.serviceId,
                            };
                        })}
                    onChange={(option) => {
                        setFieldValue('serviceIds', option);
                    }}
                ></MultiSelect>
            </Form.Group>
        </Form.Group>
    );
}

export default StepTwo;
