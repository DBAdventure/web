export default async ({store, error}) => {
  await store.dispatch('player/fetch');
  await store.dispatch('game/fetch');

  if (!store.state.player.connected) {
    error({
      message: 'error.not.connected',
      statusCode: 403,
    });
  }
};
