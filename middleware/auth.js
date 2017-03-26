export default ({store, error}) => {
    if (!store.state.authUser.connected) {
        error({
            message: 'error.not.connected',
            statusCode: 403,
        });
    }
};
