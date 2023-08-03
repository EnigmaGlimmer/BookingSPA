import * as React from 'react';

// React Bootstrap
import {} from 'react-bootstrap';

// In-Page Styles
import './style/text-editor.css';
import {AiOutlineUnorderedList,AiOutlineOrderedList,AiOutlineUndo,AiOutlineRedo} from 'react-icons/ai';
import {BsEmojiSmile,BsImage} from 'react-icons/bs'

// Types of Component
import { ModuleTypes } from './modules';
import Line from './line';

// React-Icons
import { AiFillPlusCircle } from 'react-icons/ai';

const TextEditor = ({ onChange }) => {
    const [output, setOutput] = React.useState([]);

    // line ref
    const lineRef = React.useRef(null);

    // Catch onChange
    React.useEffect(() => {
        onChange();
    }, [output]);

    function insertNewLine(newOpt) {
        setOutput((output) => {
            return [...output, newOpt];
        });
    }

    function addMedia() {}

    return (
        <section className="w-100">
            <h2 className="test-iframe">This is a simple heading outside of iframe</h2>

            <button onClick={() => addMedia()}>Add Media</button>
            <div
                className="text-center"
                style={{
                    border: '1px solid #010101',
                    borderRadius: '1rem',
                    padding: '1.2rem',
                    minHeight: '380px',
                }}
            >
                {/**
                 *** the list of output
                 **/}
                {output.map((opt, index) => {
                    return (
                        <Line
                            key={index}
                            ref={lineRef.current}
                            types={['bold']}
                            initialValue={''}
                            tag={'heading 1'}
                        ></Line>
                    );
                })}

                <AiFillPlusCircle
                    className="mx-auto"
                    style={{
                        fontSize: '2rem',
                    }}
                    onClick={() =>
                        insertNewLine({
                            type: ModuleTypes.Paragraph,
                            message: '',
                            indent: 0,
                            breaks: 0,
                        })
                    }
                ></AiFillPlusCircle>
            </div>
        </section>
    );
};

export default TextEditor;
