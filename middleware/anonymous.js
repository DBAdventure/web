export default async ({store, redirect}) => {
    await store.dispatch('fetchGameData');
    await store.dispatch('fetchPlayer');

    if (store.state.player.connected) {
        redirect('/account');
    }
};
