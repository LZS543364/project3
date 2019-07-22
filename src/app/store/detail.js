export default {
        namespaced: true,
        state: {
                product: {},
                banners: [],
        },
        getters: {},
        mutations: {
                _getData(state, payload) {
                        state.product = payload;
                        state.banners = payload.bannerImages.split(',');
                }
        },
        actions: {
                getData({commit, rootState}, payload){
                        return rootState.http({
                                method: 'post',
                                url: '/detail',
                                data: {id: payload},
                        })
                                .then( results => {
                                        commit('_getData', results[0]);
                                })
                },
                _addCart({commit, rootState}, { id, count }) {
                        return rootState.http ({
                                method:'post',
                                url: '/cart/add',
                                data: { id, count}
                        })
                                .then( results => results )
                }
                // getList( { commit, rootState}, payload ) {
                //         return rootState.http({
                //                 method: 'post',
                //                 url: '/product/list',
                //                 data: {id: 14},
                //         })
                //                 .then( results => {
                //                         commit('_getData', results[0]);
                //                 })
                // }
        }

};
