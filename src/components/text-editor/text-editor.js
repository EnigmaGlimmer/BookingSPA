import * as React from 'react';

// In-Page Styles
import './style/text-editor.css';
import {AiOutlineUnorderedList,AiOutlineOrderedList,AiOutlineUndo,AiOutlineRedo} from 'react-icons/ai';
import {BsEmojiSmile,BsImage} from 'react-icons/bs'

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
            <button id='button-input' onClick={() => addMedia()}>Add Media</button>
            <div
                id='input-form'
            >
                {output.map((opt) => {
                    return <div>{opt.message}</div>;
                })}
            </div>
        </section>
    );
};

export default TextEditor;
