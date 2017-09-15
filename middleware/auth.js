export default async ({store, error}) => {
    await store.dispatch('fetchGameData');
    await store.dispatch('fetchPlayer');

    if (!store.state.player.connected) {
        error({
            message: 'error.not.connected',
            statusCode: 403,
        });
    }
};
