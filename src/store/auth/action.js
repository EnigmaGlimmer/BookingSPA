import React from 'react';
import { toast } from 'react-toastify';

export default function login({ username, password }) {
    if (username === 'admin@daisy' && password === '123@123a') {
        localStorage.setItem('signin', true);
        toast.success('Welcome to Administrator');
    } else {
        toast.error('Faild');
    }
}

// export default function logout(account, password) {
//     return {
//         payload: {
//             account,
//             password,
//         },
//     };
// }
