export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {},
        mutations: {
                _getData(state, payload) {
                        state.list = payload
                },
                _remove(state, payload) {
                        let i = state.list.indexOf(item => item.id === payload);
                        state.list.splice(i, 1);
                },
                _addAddress(state, payload) {
                        state.list.push(payload)
                },
                _editAddress(state, payload) {
                        let id = payload.id
                        let i = state.list.findIndex(item => item.id === id);
                        state.list.splice( i, 1, payload)
                }
        },
        actions: {
                getData({rootState, commit}, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/address/list',
                        })
                                .then(data => {commit('_getData', data)});
                },
                remove({rootState, commit}, { id }) {
                        return rootState.http({
                                method: 'post',
                                url: '/address/remove',
                                data: { id }
                        })
                                .then(() => {commit('_remove', id)});
                },
                addAddress({rootState, commit}, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/address/add',
                                data: payload
                        })
                                .then(id => {
                                        commit('_addAddress', { id, ...payload })
                                })
                },
                editAddress({rootState, commit}, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/address/edit',
                                data: payload
                        })
                                .then(id => {
                                        commit('_editAddress', payload)
                                })
                }
        },
};