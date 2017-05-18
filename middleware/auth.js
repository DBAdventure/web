export default ({store, error}) => {
    store.dispatch('fetchGameData');
    store.dispatch('fetchPlayer');

    if (!store.state.player.connected) {
        error({
            message: 'error.not.connected',
            statusCode: 403,
        });
    }
};
