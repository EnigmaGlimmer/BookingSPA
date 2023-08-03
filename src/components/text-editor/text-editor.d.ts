import React from 'react';

export type ModuleTypes =
    | 'heading 1'
    | 'heading 2'
    | 'heading 3'
    | 'italic'
    | 'bold'
    | 'underline'
    | 'indent'
    | 'paragraph'
    | 'font-size'
    | 'emoji'
    | 'image'
    | 'video'
    | 'center'
    | 'left'
    | 'right'
    | 'unordered'
    | 'ordered'
    | 'undo'
    | 'redo';

export type Output = {
    type: Array<ModuleTypes>;
    message: string;
    indent: number;
    breaks: number;
    link: string;
};

export interface TextEditorProps {
    onChange: (result: Output[]) => void;
}

declare const TextEditor: React.FunctionComponent<TextEditorProps>;

export default TextEditor;
