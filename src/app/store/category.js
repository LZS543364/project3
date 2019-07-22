export default {
        namespaced: true,
        state: {
                mainList: [],
                subLists: [],
                curCid: 0
        },
        getters: {
                subList(state, getters) {
                        return state.subLists[state.curCid] || [];
                }
        },
        mutations: {
                _initMainList(state, payload) {
                        state.mainList = payload;
                },
                _changeCurCid(state, payload) {
                        state.curCid = payload;
                },
                _initSubLists(state, payload) {
                        let temp = {};
                        temp[state.curCid] = payload;
                        state.subLists = {
                                ...temp,
                                ...state.subLists
                        };
                }
        },
        actions: {
                initMainList({ commit, dispatch, rootState }) {
                        rootState.http({
                                url: "category/main"
                        })
                                .then(data => {
                                        commit("_initMainList", data);
                                        dispatch("initSubLists",data[0].id)
                                });
                },
                initSubLists({ state, commit, rootState }, payload) {
                        commit("_changeCurCid", payload);
                        if(typeof state.subLists[payload] !== "undefined") return;
                        rootState.http({
                                params: { id: payload },
                                url: "category/sub",
                        })
                                .then(data => commit("_initSubLists", data));
                }
        }

}