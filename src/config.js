module.exports = {
    api: {
        API_URL: process.env.NODE_ENV === 'production' ? 'https://little-spa.online' : 'https://localhost:7034/',
    },
};
