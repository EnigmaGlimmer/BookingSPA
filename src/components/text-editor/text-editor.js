import React from 'react';
// React TextEditor
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './style/text-editor.css';
import {AiOutlineUnorderedList,AiOutlineOrderedList,AiOutlineUndo,AiOutlineRedo} from 'react-icons/ai';
import {BsEmojiSmile,BsImage} from 'react-icons/bs'

function TextEditor({ onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World!</p>',
    });

    const htmlCode = `<h2 class="test-iframe">
        This is a simple iframe with srcDoc
    </h2>`;

    return (
        <section>
        <div className='t-edit-root'>
            <div className='t-edit-menu'>
                <div className='bold'>B</div>
                <div className='italic'>I</div>
                <div className='under-line'>U</div>
                <div className='block-type'>
                    <select name="type" id="type">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className='font-size'>
                    <select name="size" id="size">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className='font-type'>
                    <select name="font" id="font">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className='unordered'>
                    <AiOutlineUnorderedList></AiOutlineUnorderedList>
                </div>
                <div className='ordered'>
                    <AiOutlineOrderedList></AiOutlineOrderedList>
                </div>
                <div className='emoji'>
                    <BsEmojiSmile></BsEmojiSmile>
                </div>
                <div className='image'>
                    <BsImage></BsImage>
                </div>
                <div className='undo'>
                    <AiOutlineUndo></AiOutlineUndo>
                </div>
                <div className='redo'>
                    <AiOutlineRedo></AiOutlineRedo>
                </div>
            </div>
        </div>
        </section>
    );
}

export default TextEditor;
