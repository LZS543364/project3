export default {
        namespaced: true,
        state: {
                isShow: false,
                message: "用户名不存在"
        },
        getters: {},
        mutations: {
                open(state, payload) {
                        state.isShow = true;
                        state.message = payload;
                },
                close(state) {
                        state.isShow = false;
                        state.message = "";

                }
        },
        actions: {}
}