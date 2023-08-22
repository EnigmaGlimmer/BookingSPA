import { all, fork } from 'redux-saga/effects';

// Blog
import BlogSaga from './blog/saga';
// Upload
import UploadSaga from './upload/saga';

import AnimalSaga from './animal/saga';

export default function* rootSaga() {
    yield all([fork(BlogSaga), fork(UploadSaga), fork(AnimalSaga)]);
}
