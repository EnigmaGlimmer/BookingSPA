import UploadModal from 'components/upload-modal/upload-modal';
import { FieldArray } from 'formik';
import usePrefetchContext from 'hooks/usePrefetchContext';
import React from 'react';
import { Badge, Button, Form, Image } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import LabelListForm from '../label-list-form';
import { toast } from 'react-toastify';

function StepTwo({ validation }) {
    const { values, handleChange, setFieldValue } = validation;
    const { parentServices } = usePrefetchContext();
    const [isUploadModalOpened, setIsUploadModalOpened] = React.useState(false);
    const [selectedServiceIndex, setSelectedServiceIndex] = React.useState(0);

    let serviceList = (parentServices || []).reduce((p, c) => [...p, ...c.childs], []) || [];

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
                <div className="d-flex gap-2">
                    <div className="p-2">
                        <FieldArray
                            name="services"
                            children={(arrayHelper) => {
                                return (
                                    <>
                                        <LabelListForm
                                            labels={values.services.map((s) => {
                                                return {
                                                    name: serviceList.find((sI) => sI.serviceId === s.serviceId)
                                                        ?.serviceName,
                                                    order: s.order,
                                                };
                                            })}
                                            options={serviceList.map((s) => ({
                                                label: s.serviceName,
                                                value: s.serviceId,
                                            }))}
                                            onCreateNewLabel={(e) => {
                                                const isDuplicateServiceValue = values.services.some(
                                                    (s) => s.serviceId === parseInt(e.label),
                                                );
                                                if (isDuplicateServiceValue) {
                                                    toast.error("There're some duplicates in the position list");
                                                    return;
                                                }

                                                arrayHelper.push({
                                                    serviceId: parseInt(e.label),
                                                    order: parseInt(e.number),
                                                });
                                            }}
                                            onDeleteItem={(_, index) => {
                                                arrayHelper.remove(index);
                                            }}
                                            onUpdateItem={(updatedLabel, index) => {
                                                const isDuplicateServiceValue = values.services.some(
                                                    (s) => s.serviceId === parseInt(updatedLabel.label),
                                                );

                                                if (
                                                    isDuplicateServiceValue &&
                                                    updatedLabel.label !== values.services[index].serviceId
                                                ) {
                                                    toast.error("There're some duplicates in the position list");
                                                    return;
                                                }

                                                arrayHelper.replace(index, {
                                                    serviceId: updatedLabel.label,
                                                    order: updatedLabel.number,
                                                });
                                                toast.success('Updated this position');
                                            }}
                                        ></LabelListForm>
                                    </>
                                );
                            }}
                        ></FieldArray>
                    </div>
                </div>
            </Form.Group>
        </Form.Group>
    );
}

export default StepTwo;
