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

//6. Setting
import Setting from './settings/reducer';

//7. Category
import Category from './blog category/reducer';

// 8. User
import User from './user/reducer';

const rootReducer = combineReducers({
    Blog,
    Upload,
    Service,
    Customer,
    Booking,
    Setting,
    Category,
    User,
});

export default rootReducer;
