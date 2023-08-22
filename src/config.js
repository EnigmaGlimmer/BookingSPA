module.exports = {
    api: {
        API_URL: process.env.REACT_APP_RESOURCE_ADDRESS,
    },
    rules: {
        PERMIT_FILE_FORMATS: ['image/jpeg', 'image/png', 'image/jpg'],
        PERMIT_SUBMIT_SIZE: 2, // unit: MB
    },
};
