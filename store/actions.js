import * as types from './mutation-types';

/* eslint-disable import/prefer-default-export */
export const nuxtServerInit = ({commit, dispatch}, {req}) => {
  commit(types.PLAYER, req.session.authPlayer);
  dispatch('setStyle');
  dispatch('fetchGameData');
};
/* eslint-enable import/prefer-default-export */
