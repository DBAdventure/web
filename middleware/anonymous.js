export default ({store, redirect}) => {
    if (store.state.player.connected) {
        redirect('/account');
    }
};
