export default async ({store, error}) => {
  if (store.state.player.connected
        && (!store.state.player.auth.guild_player || !store.state.player.auth.guild_player.enabled)
  ) {
    error({
      message: 'error.not.guilded',
      statusCode: 401,
    });
  }
};
