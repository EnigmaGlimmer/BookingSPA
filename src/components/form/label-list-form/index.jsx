import React from 'react';
import Label from './label';
import './style.css';

import { colors } from './label';
import { Badge, Button, Form } from 'react-bootstrap';

function LabelListForm({ labels = [], options = [], onCreateNewLabel, onUpdateItem, onDeleteItem }) {
    const selectInputElement = React.useRef(null);
    const numberInputElement = React.useRef(null);

    return (
        <div className="label-list__form">
            {labels.map((label, index) => {
                return (
                    <Label
                        key={index}
                        text={label.name}
                        order={label.order}
                        color={colors[index % (colors.length - 1)]}
                        options={options}
                        onClickDelete={() => onDeleteItem(label, index)}
                        onClickUpdate={(e) => onUpdateItem(e, index)}
                    ></Label>
                );
            })}

            <div className="label-input">
                <Form.Select ref={selectInputElement}>
                    {options.map((opt, index) => (
                        <option value={opt.value} key={index}>
                            {opt.label}
                        </option>
                    ))}
                </Form.Select>
                <Badge className="label-input__badge">
                    <input type="number" ref={numberInputElement} min={0} defaultValue={0}></input>
                </Badge>
                <Button
                    onClick={() => {
                        if (selectInputElement.current.value && numberInputElement.current.value) {
                            onCreateNewLabel({
                                label: selectInputElement.current.value,
                                number: numberInputElement.current.value,
                            });
                        }
                    }}
                >
                    +
                </Button>
            </div>
        </div>
    );
}

export default LabelListForm;
