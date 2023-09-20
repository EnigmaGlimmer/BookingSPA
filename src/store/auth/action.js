import React from 'react';
import { toast } from 'react-toastify';

export function login({ username, password }) {
    if (username === 'admin@daisy' && password === '123@123a') {
        localStorage.setItem('signin', '456@456Aa');
        toast.success('Welcome to Administrator');
    } else {
        toast.error('Faild');
    }
}

export function logout() {
    const promise = new Promise((resolve, reject) => {
        resolve(localStorage.setItem('signin', false));
    });
    return promise;
}
