import React, { useEffect } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

// React Bootstrap
import { Form } from 'react-bootstrap';

// React Icons
import { BsReplyAll } from 'react-icons/bs';

// Style
import './style/line.css';

// Resources
import { ModuleTypes, LineInfoBuilder } from './modules';

const Line = ({ initialValue, types, tag, onChange, ...props }) => {
    let [builder, setBuilder] = React.useState(new LineInfoBuilder('p'));

    function transpileComponent() {
        switch (tag) {
            case ModuleTypes.Heading1:
                builder.setTag('h1');
                break;

            case ModuleTypes.Heading2:
                builder.setTag('h2');
                break;

            case ModuleTypes.Heading3:
                builder.setTag('h3');
                break;

            case ModuleTypes.Paragraph:
                builder.setTag('p');
                break;

            default:
                break;
        }
    }

    function transpileStyle() {
        switch (types) {
            case ModuleTypes.Bold:
                builder.setStyles({ fontWeight: 'bold' });
                break;

            case ModuleTypes.Italic:
                builder.setStyles({ fontStyle: 'italic' });
                break;

            case ModuleTypes.Underline:
                builder.setStyles({ textDecoration: 'underline' });
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        transpileComponent();
    }, [tag]);

    useEffect(() => {
        transpileStyle();
    }, [types]);

    return /*#__PURE__*/ _jsx(builder.tag, {
        value: 'Something',
        className: ['w-100'].join(' '),
        children: /*#__PURE__*/ _jsx(Form.Control, {
            // ...controlledProps,
            ...props,
            autoFocus: true,
            className: 'w-100',
            placeholder: 'EDIT THIS CONTENT',
        }),
    });
};

export default Line;
