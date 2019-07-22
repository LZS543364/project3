export default {
        namespaced: true,
        state: {
                list: [],
                pageSize: 6
        },
        getters: {},
        mutations: {
                _resetData(state) {
                        state.list = [];
                },
                _endAjax(state, payload) {
                        if(payload.length > 0) {
                                state.list = state.list.concat(payload);
                        }
                }
        },
        actions: {
                getData({ state,commit, rootState }, { subId, loadMore }) {
                        if(!loadMore) commit("_resetData");
                        return rootState.http({
                                method: "post",
                                data: {
                                        cid: subId,
                                        begin: state.list.length,
                                        count: state.pageSize
                                },
                                url: "product/list"
                        })
                                .then(data => {
                                        commit("_endAjax",data);
                                        return data.length = state.pageSize;
                                });
                }
        }
}