import service from '../../store/httpService.js'
import router from '@/router'

const scripInfo = {
    namespaced: true,
    state: {
        searchScripsInfo: []
    },
    mutations: {
        SET_SEARCH_SCRIPS(state, payload) {
            state.searchScripsInfo = payload
        }
    },
    actions: {

        resetCache({
            commit
        }, jsonObj) {
            service.resetCache('true').then(response => {
                if (response.status == 200) {
                    commit('SET_SNAKBAR', {
                        msg: 'Reset Cache successfully',
                        show: true,
                        color: 'teal darken-1',
                        timeout: 2500
                    }, {
                        root: true
                    })
                } else {
                    commit('SET_SNAKBAR', {
                        msg: 'Reset Cache failed',
                        show: true,
                        color: 'red darken-1',
                        timeout: 2500
                    }, {
                        root: true
                    })
                }
            }).finally(() => { })
        },

        scripAdd({
            commit
        }, jsonObj) {
            commit('SET_LOADER', true, {
                root: true
            });
            service.scripAdd(jsonObj).then(response => {
                if (response.status == 200 && response.data.message == 'Scrip added sucessfully') {
                    commit('SET_SNAKBAR', {
                        msg: response.data.message,
                        show: true,
                        color: 'teal darken-1',
                        timeout: 2500
                    }, {
                        root: true
                    })
                } else {
                    commit('SET_SNAKBAR', {
                        msg: response.data.message,
                        show: true,
                        color: 'red lighten-1',
                        timeout: 2500
                    }, {
                        root: true
                    })
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                });
            })
        },

        async scripSearch({
            commit
        }, payload) {
            commit('SET_LOADER', true, {
                root: true
            });

            let jsonData = {
                exchange: ["ALL"],
                symbol: payload
            }
            await service.getScripData(jsonData).then(response => {

                if (response.status == 200 && response.data.length > 0) {
                    commit('SET_SEARCH_SCRIPS', response.data)
                } else {
                    commit('SET_SEARCH_SCRIPS', [])
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                });
            })
        }
    },

    getters: {
        scripSearch: (state) => state.searchScripsInfo
    }

}
export default scripInfo;