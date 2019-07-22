export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {},
        mutations: {
                _updateList(state,payload) { state.list = payload },
                uploadBanner(state, { id, filePath }) {
                        let i = state.list.findIndex(item => item.id === id);
                        let temp = { ...state.list[i] };
                        if(temp.bannerImages !== "") {
                                temp.bannerImages = temp.bannerImages.split(",");
                                temp.bannerImages.push(filePath);
                                temp.bannerImages = temp.bannerImages.join(",");
                        } else temp.bannerImages = filePath;
                        state.list.splice(i, 1, temp);
                },
                _removeBanner(state, { id, newBannerImages }) {
                        let i = state.list.findIndex(item => item.id === id );
                        let temp = { ...state.list[i] };
                        temp.bannerImages = newBannerImages;
                        state.list.splice(i, 1, temp);
                },
                _removeProduct(state, payload) {
                        let i = state.list.findIndex(item => item.id === payload.id);
                        state.list.splice(i, 1);
                },
                _updateProduct(state, payload) {
                        let obj = {
                                id: payload.id,
                                mId: payload.mId,
                                sId: payload.sId,
                                name: payload.name,
                                avatar: payload.oldAvatar === payload.avatar ? payload.avatar : `/image/category/${ payload.avatar }`,
                                remark: payload.remark,
                                price: payload.price
                        };

                        let i = -1;
                        i = state.list.findIndex(item => item.id === payload.id);
                        state.list.splice(i, 1, obj);
                }
        },
        actions: {
                getData({ commit, rootState },payload) {
                        return rootState.http({
                                method: "post",
                                data: payload,
                                url: "/product/admin-list"
                        })
                                .then(data => {
                                        commit("_updateList",data.list);
                                        return data.total;
                                })
                },
                addProduct({ rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/product/add',
                                data: payload
                        })
                                .then(data => {});
                },
                removeBanner({state, rootState, commit}, { id, filePath }) {
                        let oldBannerImages = state.list.find(item => item.id === id).bannerImages;
                        let newBannerImages = '';
                        if(oldBannerImages !== filePath) {
                                let arr = oldBannerImages.split(',');
                                arr.splice(arr.indexOf(filePath), 1);
                                newBannerImages = arr.join(',');
                        }
                        return rootState.http({
                                method: 'post',
                                url: '/product/banner/remove',
                                data: { id, filePath, newBannerImages }
                        })
                                .then(() => commit('_removeBanner', { id, newBannerImages }));
                },
                updateProduct({rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/product/update',
                                data: payload
                        })
                        //调用mutation中的方法更新仓库的数据
                                .then(() => commit('_updateProduct', payload));
                },
                removeProduct({rootState, commit }, { id, avatar, bannerImages }) {
                        return rootState.http({
                                method: 'post',
                                url: '/product/remove',
                                data: { id, avatar, bannerImages }
                        })
                                .then(() => commit('_removeProduct', id))
                }
        }
}