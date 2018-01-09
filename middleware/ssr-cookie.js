import axios from 'axios';

export default ({req}) => {
    if (process.server && req.headers.cookie) {
        axios.defaults.headers.common.cookie = req.headers.cookie;
    }
};
