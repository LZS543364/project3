export default {
        namespaced : true,
        state: {
                list: [],
                activeName: ""
        },
        getters: {},
        mutations: {
                addTab(state, payload) {
                        if(state.list.indexOf(payload) === -1) state.list.push(payload);
                        state.activeName = payload;
                },
                toggleTab(state, payload) {
                        state.activeName = payload;
                },
                removeTab(state, payload) {
                        state.list.splice(state.list.indexOf(payload), 1);
                        state.activeName = state.list[0] || "";
                }
        },
        actions: {}
}