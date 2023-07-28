import * as React from 'react';

// In-Page Styles
import './style/text-editor.css';

// Types of Component
import { moduleTypes } from './modules/module-types';

const TextEditor = ({ onChange }) => {
    const [output, setOutput] = React.useState([]);

    // Catch onChange
    React.useEffect(() => {
        onChange(output);
    }, [output]);

    function addLine(newOpt) {
        setOutput((output) => {
            return [...output, newOpt];
        });
    }

    function addMedia() {}

    return (
        <section>
            <h2 className="test-iframe">This is a simple heading outside of iframe</h2>
            <button
                onClick={() =>
                    addLine({
                        message: 'Edit this text',
                        breaks: 0,
                        indent: 0,
                        link: '',
                        type: 'heading1',
                    })
                }
            >
                Add Line
            </button>
            <button onClick={() => addMedia()}>Add Media</button>
            <div
                style={{
                    border: '1px solid #010101',
                    borderRadius: '1rem',
                    padding: '0.5rem',
                }}
            >
                {output.map((opt) => {
                    return <div>{opt.message}</div>;
                })}
            </div>
        </section>
    );
};

export default TextEditor;
