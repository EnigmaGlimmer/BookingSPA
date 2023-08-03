const { LineInfoBuilder } = require('..');

class Heading1InfoBuilder extends LineInfoBuilder {
    constructor(styles = [], content = '') {
        this.tag = 'h1';
    }
}
