import service from '../../store/httpService.js'
import router from '@/router'

const contractMaster = {
    namespaced: true,
    state: {
        contractMasterData: [],
        newAddedSymbols: [],
        deactivatedList: [],
        duplicateSymbols: [],
        postionAvgDiffrenceList: [],
        positionAvgList: [],
        positionAvgNullList: [],
        oneMinuteChartCount: [],
        chartDayCount: [],
        buySellTradeData: [],
        searchList: [],
        currentScrip: [],
        masterRecords: []
    },
    mutations: {
        SET_CONTRACTMASTERDATA (state, payload) {
            state.contractMasterData = payload
        },
        SET_NEWLYADDEDSYMBOLS (state, payload) {
            state.newAddedSymbols = payload
        },
        SET_DEACTIVATEDLIST (state, payload) {
            state.deactivatedList = payload
        },
        SET_DUPLICATESYMBOLS (state, payload) {
            state.duplicateSymbols = payload
        },
        SET_POSTIONAVGDIFFENCELIST (state, payload) {
            state.postionAvgDiffrenceList = payload
        },
        SET_POSITIONAVGLIST (state, payload) {
            state.positionAvgList = payload
        },
        SET_POSITIONAVGNULLLIST (state, payload) {
            state.positionAvgNullList = payload
        },
        SET_ONEMINUTECHARTCOUNT (state, payload) {
            state.oneMinuteChartCount = payload
        },
        SET_CHARTDAYCOUNT (state, payload) {
            state.chartDayCount = payload
        },
        SET_BUYSELLTRADEDATA (state, payload) {
            state.buySellTradeData = payload
        },
        SET_SEARCHLIST (state, payload) {
            state.searchList = payload
        },
        SET_CURRENTSCRIP (state, payload) {
            state.currentScrip = payload
        },
        SET_MASTERLIST (state, payload) {
            state.masterRecords = payload
        }
    },
    actions: {
        getContractMasterCount ({ commit }) {
            commit('SET_LOADER', true, { root: true })
            service.getContractMaster().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_CONTRACTMASTERDATA', response.data.result)
                } else {
                    commit('SET_CONTRACTMASTERDATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        getNewlyAddedList ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getNewlyAddedList(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_NEWLYADDEDSYMBOLS', response.data.result)
                } else {
                    commit('SET_NEWLYADDEDSYMBOLS', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getDeactivatedList ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getDeactivatedList(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_DEACTIVATEDLIST', response.data.result)
                } else {
                    commit('SET_DEACTIVATEDLIST', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        getDuplicateSymbols ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getDuplicateSymbols(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_DUPLICATESYMBOLS', response.data.result)
                } else {
                    commit('SET_DUPLICATESYMBOLS', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getPositionAvgExcelCountDiff ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getPositionAvgExcelCountDiff(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_POSTIONAVGDIFFENCELIST', response.data.result)
                } else {
                    commit('SET_POSTIONAVGDIFFENCELIST', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getPositionAvgPrice ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getPositionAvgPrice(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_POSITIONAVGLIST', response.data.result)
                } else {
                    commit('SET_POSITIONAVGLIST', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getPositionAvgPriceNull ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getPositionAvgPriceNull(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_POSITIONAVGNULLLIST', response.data.result)
                } else {
                    commit('SET_POSITIONAVGNULLLIST', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getChartOneminCountList ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getChartOneminCountList(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_ONEMINUTECHARTCOUNT', response.data.result)
                } else {
                    commit('SET_ONEMINUTECHARTCOUNT', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getChartDayCountList ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getChartDayCountList(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_CHARTDAYCOUNT', response.data.result)
                } else {
                    commit('SET_CHARTDAYCOUNT', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getBuySellTradeData ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getBuySellTradeData(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_BUYSELLTRADEDATA', response.data.result)
                } else {
                    commit('SET_BUYSELLTRADEDATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        getSearchList ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.getSearchList(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_SEARCHLIST', response.data.result)
                } else {
                    commit('SET_SEARCHLIST', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        updateScripDetails ({ commit }, jsonObj) {
            try {
                commit('SET_LOADER', true, { root: true })
                service.updateScripDetails(jsonObj).then(response => {
                    if (response.status == 200 && response.data.stat == 'Ok') {
                        commit('SET_SNAKBAR', { msg: "Updated Successfully", show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                        commit('SET_SEARCHLIST', [])
                        router.push({ path: 'cMasterData' })
                    } else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            }
        },
        getMasterData ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                service.getMasterRecords(payload).then(response => {
                    if (response.status == 200) {
                        commit('SET_MASTERLIST', response.data.result)
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                        commit('SET_MASTERLIST', [])
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            }
            catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            }
        }
    },
    getters: {

        getNewlyAddedSymbols: state => {
            return state.newAddedSymbols
        },
        getDeactivatedList: state => {
            return state.deactivatedList
        },
        getDuplicateSymbols: state => {
            return state.duplicateSymbols
        },
        // ------------------
        getPositionAvgExcelCountDiff: state => {
            return state.postionAvgDiffrenceList
        },
        getPositionAvgPrice: state => {
            return state.positionAvgList
        },
        getPositionAvgPriceNull: state => {
            return state.positionAvgNullList
        },
        // ------------------
        getChartOneminCountList: state => {
            return state.oneMinuteChartCount
        },
        getChartDayCountList: state => {
            return state.chartDayCount
        },
        // ------------------
        getBuySellTradeData: state => {
            return state.buySellTradeData
        },
        getSearchList: state => state.searchList,
        getcurrentScrip: state => state.currentScrip,
        getMasterData: state => state.masterRecords,


    }
}
export default contractMaster;