export default async ({store, error}) => {
  await store.dispatch('fetchPlayer');
  await store.dispatch('fetchGameData');

  if (!store.state.player.connected) {
    error({
      message: 'error.not.connected',
      statusCode: 403,
    });
  }
};
