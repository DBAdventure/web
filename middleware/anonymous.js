export default ({store, redirect}) => {
    store.dispatch('fetchGameData');
    store.dispatch('fetchPlayer');

    if (store.state.player.connected) {
        redirect('/account');
    }
};
