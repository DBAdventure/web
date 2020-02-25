export default async ({store, redirect}) => {
  await store.dispatch('game/fetch');
  await store.dispatch('player/fetch');

  if (store.state.player.connected) {
    redirect('/account');
  }
};
