export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {

        },
        mutations: {
                _getData(state, payload) {
                        state.list = payload
                },
                _remove(state, payload) {
                        let i = state.list.indexOf(item => item.id = payload)
                        state.list.splice(i, 1);
                },
                _add(state, payload) {
                        state.list.push(payload);
                }
        },
        actions: {
                getData({ rootState, commit }, payload) {
                                return rootState.http({
                                        methods: "post",
                                        url: "/address/list2"
                                })
                                        .then(data => {commit("_getData", data) })
                },
                remove({ rootState, commit }, { id }) {
                        return rootState.http({
                                methods: "post",
                                url: "/address/remove2",
                                data: { id }
                        })
                                .then(() => { commit("_remove", id) })
                },
                add({ rootState, commit }, payload) {
                        return rootState.http({
                                methods: "post",
                                url: "/address/add",
                                data: payload
                        })
                                .then(id => {commit("_add", {id, ...payload})  })
                }
        }
}