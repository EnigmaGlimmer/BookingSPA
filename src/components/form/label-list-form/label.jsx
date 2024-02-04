import { Badge } from 'antd';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaSquareCaretDown } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

export const colors = ['red', 'yellow', 'blue', 'green', 'brown'];

function Label({ text, order, color, options, onClickDelete, onClickUpdate }) {
    const [dropdownOpened, setDropdownOpened] = React.useState(false);
    const [showEditIcon, setShowEditIcon] = React.useState(false);
    const selectInputElement = React.useRef(null);
    const numberInputElement = React.useRef(null);

    return (
        <div className="label" data-color={color}>
            <div className="d-flex gap-2">
                {!showEditIcon ? (
                    <>
                        <p className="label__text">{text}</p>
                        <Badge className="label__badge">{order}</Badge>
                    </>
                ) : (
                    <div className="label-input">
                        <Form.Select ref={selectInputElement} value={options.find((opt) => opt.label === text).value}>
                            {options.map((opt, index) => (
                                <option value={opt.value} key={index}>
                                    {opt.label}
                                </option>
                            ))}
                        </Form.Select>
                        <Badge className="label-input__badge">
                            <input type="number" ref={numberInputElement} min={0} defaultValue={order}></input>
                        </Badge>
                    </div>
                )}
            </div>
            {showEditIcon && (
                <FaRegEdit
                    onClick={() => {
                        onClickUpdate({
                            label: parseInt(selectInputElement.current.value),
                            number: parseInt(numberInputElement.current.value),
                        });
                        setShowEditIcon(false);
                    }}
                    style={{ cursor: 'pointer' }}
                ></FaRegEdit>
            )}

            <div className="position-relative">
                <FaSquareCaretDown
                    onClick={() => setDropdownOpened(!dropdownOpened)}
                    style={{ cursor: 'pointer' }}
                ></FaSquareCaretDown>
                <ul className="label__dropdown" data-opened={dropdownOpened}>
                    <li
                        onClick={() => {
                            setShowEditIcon(true);
                            setDropdownOpened(false);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <FaRegEdit></FaRegEdit> <span>Edit</span>
                    </li>
                    <li onClick={onClickDelete} style={{ cursor: 'pointer' }}>
                        <FaTimes></FaTimes> <span>Delete</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Label;
