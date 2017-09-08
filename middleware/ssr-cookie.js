import axios from 'axios';

export default ({isServer, req}) => {
    if (isServer && req.headers.cookie) {
        axios.defaults.headers.common.cookie = req.headers.cookie;
    }
};
