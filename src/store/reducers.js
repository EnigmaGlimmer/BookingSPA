import { combineReducers } from 'redux';

// 1. Blog
import Blog from './blog/saga';

// 2. Upload
import Upload from './upload/saga';

// 3. Service

const rootReducer = combineReducers({
    Blog,
    Upload,
});

export default rootReducer;
