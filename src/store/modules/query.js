import service from '../../store/httpService.js'
import router from '@/router'

const query = {
    namespaced: true,

    state: {
        queryList: [],
        headers: []
    },
    mutations: {
        SET_QUERY_LIST(state, payload) {
            state.queryList = payload
        },
        SET_HEADERS(state, payload) {
            state.headers = payload
            state.headers = Object.keys(Object.assign({}, ...state.queryList))
        }
    },
    actions: {
        async getQueryData({
            commit
        }, payload) {

            try {
                commit('SET_LOADER', true, {
                    root: true
                })
                let jsonData = {
                    query: payload.queryData
                }
                await service.getSearchQuery(jsonData).then(response => {
                    if (response.status == 200) {

                        commit('SET_QUERY_LIST', response.data.result.json)
                        commit('SET_HEADERS', response.data.result.json)
                    } else {
                        commit("SET_SNAKBAR", {
                            msg: response.data.message,
                            show: true,
                            color: "red lighten-1",
                            timeout: 2500,
                        }, {
                            root: true
                        });
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, {
                        root: true
                    })

                })
            } catch (error) {
                commit("SET_SNAKBAR", {
                    msg: error,
                    show: true,
                    color: "red lighten-1",
                    timeout: 2500,
                }, {
                    root: true
                });
                commit('SET_LOADER', false, {
                    root: true
                })
            }
        }
    },
    getters: {
        getQueryData: state => state.queryList,
        getHeaders: (state) => {
            return state.headers
        }
    }
}

export default query