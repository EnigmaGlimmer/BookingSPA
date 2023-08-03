// import {} from './alignCenter';
// import {} from './alignLeft';
// import {} from './alignRight';
// import {} from './bold';
// import {} from './emoji';
// import {} from './font-size';
// import {} from './heading1';
// import {} from './heading2';
// import {} from './heading3';
// import {} from './image';
// import {} from './italic';
// import {} from './ordered';
// import {} from './redo';
// import {} from './underline';
// import {} from './undo';
// import {} from './unordered';
// import {} from './video';

class LineInfoBuilder {
    constructor(tag = 'div', styles = [], content = '') {
        this.tag = tag;
        this.styles = styles;
        this.content = content;
        this.indent = 0;
        this.breaks = 0;
        this.link = '';

        this.setTag = function (tag) {
            this.tag = tag;
            return this;
        };

        this.setStyles = function (styles) {
            if (typeof styles === 'object') {
                this.styles = {
                    ...this.styles,
                    ...styles,
                };
            }
        };

        this.setContent = function (content) {
            this.content = content;
        };

        this.setIndent = function (indent) {
            this.indent = indent;
        };

        this.setBreaks = function (breaks) {
            this.breaks = breaks;
        };

        this.setLink = function (link) {
            if (this.tag === 'a') {
                this.link = link;
            } else {
                console.error('Builder is not "a" tag');
            }
        };
    }
}

const modules = [];

export { LineInfoBuilder };

export { ModuleTypes } from './module-types';
