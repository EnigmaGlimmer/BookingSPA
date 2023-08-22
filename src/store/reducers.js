import { combineReducers } from 'redux';

// 1. Blog
import Blog from './blog/reducer';

// 2. Upload
import Upload from './upload/reducer';

// 3. Service

import Animal from './animal/reducer';

const rootReducer = combineReducers({
    Blog,
    Upload,
    Animal,
});

export default rootReducer;
