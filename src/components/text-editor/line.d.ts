import { LineInfoBuilder } from './modules';
import { ModuleTypes } from './text-editor';

interface LineProps {
    initialValue: string;
    types: ModuleTypes[];
    tag: Extract<ModuleTypes, 'heading 1' | 'heading 2' | 'heading 3' | 'paragraph'>;
    onChange: (builder: LineInfoBuilder) => void;
}

declare const Line: React.FunctionComponent<LineProps>;

export default Line;
