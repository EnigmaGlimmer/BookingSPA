import { combineReducers } from 'redux';

// 1. Blog
import Blog from './blog/reducer';

// 2. Upload
import Upload from './upload/reducer';

// 3. Service
import Service from './service/reducer';

//4. Customer
import Customer from './customer/reducer';

// 5. Booking
import Booking from './booking/reducer';

const rootReducer = combineReducers({
    Blog,
    Upload,
    Service,
    Customer,
    Booking,
});

export default rootReducer;
