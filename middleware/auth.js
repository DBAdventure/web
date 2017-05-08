export default ({store, error}) => {
    if (!store.state.player.connected) {
        error({
            message: 'error.not.connected',
            statusCode: 403,
        });
    }
};
