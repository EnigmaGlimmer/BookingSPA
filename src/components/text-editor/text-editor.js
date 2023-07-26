import React from 'react';
// React TextEditor
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './style/text-editor.css';

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
            <EditorContent editor={editor} />
            <h2 class="test-iframe">This is a simple heading outside of iframe</h2>
            <iframe
                srcDoc={htmlCode}
                width="100%"
                height="300"
                style={{
                    border: '1px solid black',
                }}
            ></iframe>
            <input
                onChange={() => {
                    let c = 4;
                    onChange(4);
                }}
            ></input>
        </section>
    );
}

export default TextEditor;
