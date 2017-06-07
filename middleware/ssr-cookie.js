import axios from 'axios';

export default ({isServer, req}) => {
    if (isServer) {
        axios.defaults.headers.common.cookie = req.headers.cookie;
    }
};
