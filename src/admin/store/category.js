export default {
        namespaced: true,
        state: {
                isMainListInit: false,     //标识一级分类信息有没有初始化过
                mainList: [],                   //分类页面所有分类列表
                subLists: {},                   //所有用户看过的二级分类列表
                // curCid: 0                       //当前激活的一级分类的id值
        },
        getters: {
                // subList(state, getters) {               //当前用户正在看的二级分类的列表
                //         return state.subLists[state.curCid] || [];
                // }
        },
        mutations: {
                _initMainList(state, payload){
                        state.isMainListInit = true;
                        state.mainList = payload;
                },
                // _changeCurCid(state, payload) { state.curCid = payload; },
                _initSubLists(state, payload){
                        state.subLists = {
                                ...payload,
                                ...state.subLists
                        };
                },
                _removeCategory(state, payload){
                        let i = state.mainList.findIndex(item => item.id === payload)
                        if(i !== -1){
                                state.mainList.splice(i, 1);
                                return;
                        }
                        for(let key in state.subLists){
                                i = state.subLists[key].findIndex(item => item.id === payload)
                                if(i !== -1){
                                        state.subLists[key].splice(i, 1);
                                        break;
                                }
                        }
                },
                _addCategory(state, payload){
                        if(payload.fid === 0)
                                state.mainList.push(payload);
                        if(payload.fid !== 0 && typeof state.subLists[payload.fid] !== "undefined")
                                state.subLists[payload.fid].push(payload);
                },
                _updateCategory(state, payload){
                        if(payload.avatar !== payload.oldAvatar){
                                let obj = {
                                        id: payload.id,
                                        fid: payload.fid,
                                        name: payload.name,
                                        avatar: payload.oldAvatar === payload.avatar?payload.avatar:"/images/category/${ payload.avatar }"
                                };
                                let i = -1;
                                if(payload.fid === 0){
                                        i = state.mainList.findIndex(item => item.id = payload.id);
                                        state.mainList[i] = obj;
                                }else{
                                        for(let key in state.subLists){
                                                i = state.subLists[key].findIndex(item => item.id === payload.id);
                                                if(i != -1){
                                                        if(payload.fid.toString() === key) state.subLists[key][i] = obj;
                                                        else{
                                                                state.subLists[key].splice(i, 1);
                                                                if(typeof state.subLists[payload.fid] !== "undefined") state.subLists[payload.fid].push(obj);
                                                        }
                                                        break;
                                                }
                                        }
                                }
                        }
                }
        },
                actions: {
                        initMainList({state, commit, dispatch, rootState}){
                                if(state.isMainListInit) return Promise.resolve();
                                return rootState.http({url: 'category/main'})
                                        .then(data =>{
                                                commit('_initMainList', data);
                                                // dispatch('initSubLists', data[0].id)
                                        });
                        },
                        initSubLists({state, commit, rootState}, payload){
                                // commit('_changeCurCid', payload);
                                if(typeof state.subLists[payload] !== 'undefined') return Promise.resolve();
                                else return rootState.http({
                                        params: {id: payload},
                                        url: 'category/sub',            //请求的路由地址
                                })
                                        .then(data =>{
                                                let temp = {};
                                                temp[payload] = data;
                                                commit("_initSubLists", temp);
                                        });
                        },
                        removeCategory({rootState, commit}, {id, avatar}){
                                return rootState.http({
                                        method: "post",
                                        data: {id, avatar},
                                        url: "/category/remove"
                                })
                                        .then(data => commit("_removeCategory", id));
                        },
                        addCategory({rootState, commit}, payload){
                                return rootState.http({
                                        method: "post",
                                        url: "/category/add",
                                        data: payload
                                })
                                        .then(data =>{
                                                let temp = {};
                                                temp.id = data;
                                                temp.name = payload.name;
                                                temp.fid = payload.fid;
                                                temp.avatar = `/images/category/${ payload.avatar }`
                                                //调用mutations中的方法更新仓库的数据
                                                commit("_addCategory", temp);
                                                //给组件返回一个结果
                                                return temp;
                                        });
                        },
                        updateCategory({rootState, commit}, payload){
                                return rootState.http({
                                        method: "post",
                                        url: "/category/update",
                                        data: payload
                                })
                                //调用mutations中的方法更新仓库的数据
                                        .then(() => commit("_updateCategory", payload));
                        }
                }
        }