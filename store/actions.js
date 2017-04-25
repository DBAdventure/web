import * as types from './mutation-types'

export const nuxtServerInit = ({commit, dispatch}, {req}) => {
    commit(types.PLAYER, req.session.authPlayer);
    dispatch('setStyle');
    dispatch('fetchGameData');
};
