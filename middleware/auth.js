export default ({store, error}) => {
    if (!store.state.player.auth.connected) {
        error({
            message: 'error.not.connected',
            statusCode: 403,
        });
    }
};
