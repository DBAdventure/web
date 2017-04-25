export default ({store, redirect}) => {
    if (store.state.player.auth.connected) {
        redirect('/account');
    }
};
