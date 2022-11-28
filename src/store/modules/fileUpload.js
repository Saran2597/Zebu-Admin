import service from '../../store/httpService.js'
import router from '@/router'

const uploadFile = {
    namespaced: true,
    state: {
        hLoader: false,
        nfoLoader: false,
        cdsLoader: false,
        mcxLoader: false,
        poaLoader: false,
        poaList: [],
        holdingsList: [],
        mwList: null,
        edisList: [],
        positionAvgList: [],
        userDetails: null,
        settlementList: []
    },
    mutations: {
        SET_HOLDING_LOADER (state, payload) {
            state.hLoader = payload
        },
        SET_POA_LOADER (state, payload) {
            state.poaLoader = payload
        },
        SET_NFO_LOADER (state, payload) {
            state.nfoLoader = payload
        },
        SET_CDS_LOADER (state, payload) {
            state.cdsLoader = payload
        },
        SET_MCX_LOADER (state, payload) {
            state.mcxLoader = payload
        },
        SET_POA_LIST (state, payload) {
            state.poaList = payload
        },
        SET_HOLDINGS_LIST (state, payload) {
            state.holdingsList = payload

        },
        SET_MW_LIST (state, payload) {
            state.mwList = payload
            if(payload){
                state.mwList = payload.reduce(function(r, a){
                (r[a.mw_id] = r[a.mw_id] || []).push({...a})
                return r
                }, {})
            }
                console.log(state.mwList);
            
        },
        SET_EDIS_LIST (state, payload) {
            state.edisList = payload
        },
        SET_POSITION_AVG_LIST (state, payload) {
            state.positionAvgList = payload
        },
        SET_USERID (state, payload) {
            state.userDetails = payload
        },
        SET_SETTLEMEMT_DATA (state, payload) {
            state.settlementList = payload
        }

    },
    actions: {
        async uploadFile ({ commit }, payload) {
            function loader (val) {
                if (payload.exch == 'NFO') {
                    commit('SET_NFO_LOADER', val);
                } else if (payload.exch == 'CDS') {
                    commit('SET_CDS_LOADER', val);
                } else if (payload.exch == 'MCX ') {
                    commit('SET_MCX_LOADER', val);
                }
            }
            loader(true)
            await service.uploadFile(payload.formData).then(response => {
                if (response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: 'Please Submit to confirm Upload', show: true, color: "blue darken-3", timeout: 2500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { loader(false) })
        },
        async insertFile ({ commit }) {
            commit('SET_LOADER', true, { root: true });
            await service.insertFile().then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }); })
        },
        async loadHoldingFile ({ commit }, payload) {
            commit('SET_HOLDING_LOADER', true);
            await service.loadHoldingFile(payload).then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: 'Please Submit to confirm Upload', show: true, color: "blue darken-3", timeout: 3500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { commit('SET_HOLDING_LOADER', false) })
        },
        async insertHoldingsFile ({ commit }, payload) {
            commit('SET_LOADER', true, { root: true });
            await service.insertHoldingsFile(payload).then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        async loadPoaFile ({ commit }, payload) {
            commit('SET_POA_LOADER', true);
            await service.loadPoaFile(payload).then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { commit('SET_POA_LOADER', false) })
        },
        async insertPoaFile ({ commit }, payload) {
            commit('SET_LOADER', true, { root: true });
            await service.insertPoaFile(payload).then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: false, color: "teal darken-1", timeout: 2500, }, { root: true });
                } else {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                } (err) => {
                    commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        async getPoaList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.getPoaList(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit("SET_POA_LIST", response.data.result);
                        commit("SET_SNAKBAR", { msg: response.data.message, show: false, color: "teal darken-1", timeout: 2500, }, { root: true });
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                        commit("SET_POA_LIST", []);
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit("SET_POA_LIST", []);
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getHoldingsList ({ state, commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });

                await service.getholdingsList(payload).then(response => {

                    if (response.status == 200 && response.data.result) {
                        commit("SET_HOLDINGS_LIST", response.data.result);
                        commit('SET_USERID', response.data.result);

                        // commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                        commit("SET_HOLDINGS_LIST", []);
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit("SET_HOLDINGS_LIST", []);
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getPostionAvgList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.getpositionList(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit("SET_POSITION_AVG_LIST", response.data.result);
                        commit("SET_SNAKBAR", { msg: response.data.message, show: false, color: "teal darken-1", timeout: 2500, }, { root: true });
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                        commit("SET_POSITION_AVG_LIST", []);
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit("SET_POSITION_AVG_LIST", []);
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getMwList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.getMwList(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit("SET_MW_LIST", response.data.result);
                        commit("SET_SNAKBAR", { msg: response.data.message, show: false, color: "teal darken-1", timeout: 2500, }, { root: true });
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                        commit("SET_MW_LIST", null);
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit("SET_MW_LIST", []);
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getEdisList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.getEdisList(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit("SET_EDIS_LIST", response.data.result);
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                        commit("SET_EDIS_LIST", []);
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit("SET_EDIS_LIST", []);
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async downloadEdis ({ commit }) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.downloadEdisReport().then(response => {
                    if (response.status == 200) {
                    } else {
                        commit("SET_SNAKBAR", { msg: response.data.message, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    } (err) => {
                        commit("SET_SNAKBAR", { msg: err, show: true, color: "red lighten-1", timeout: 2500, }, { root: true });
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },

        async updatePOA ({ commit,dispatch }, payload) {
            try {
                // commit('SET_LOADER', true, { root: true });
              
                await service.updatePoaStatus(payload).then(response => {
                    if (response.status == 200) {
                        commit("SET_SNAKBAR", { msg: "POA-Status Updated Successfully", show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                        dispatch('getHoldingsList')
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { 
                    // commit('SET_LOADER', false, { root: true }) 
                })
            }
            catch (e) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_SNAKBAR', { msg: e, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async updateAuthFlag ({ commit,dispatch }, payload) {
            try {
                // commit('SET_LOADER', true, { root: true });
           
                await service.updateAuthFlag(payload).then(response => {
                    if (response.status == 200) {
                        commit("SET_SNAKBAR", { msg: "Auth-Flag updated successfully", show: true, color: "teal darken-1", timeout: 2500, }, { root: true });
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { 
                    // commit('SET_LOADER', false, { root: true }) 
                })
            }
            catch (e) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_SNAKBAR', { msg: e, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },

        async getSettlementInfo ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.getSettlementData().then(response => {
                    if (response.status == 200) {
                        commit('SET_SETTLEMEMT_DATA', response.data.result)
                        
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                        commit('SET_SETTLEMEMT_DATA', [])
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            }
            catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },

        async insertSettlementData ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.insertSettlementData(payload).then(response => {
                    if (response.status == 200 && response.data.message === 'SUCCESS') {
                        commit('SET_SNAKBAR', { msg: "Settlement Data Inserted Successfully", show: true, color: "teal darken-1", timeout: 2500, }, { root: true })
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                    }
                })
            }
            catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },

        async updateSettlementData ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true });
                await service.updateSettlementData(payload).then(response => {
                    if (response.status == 200 && response.data.message === 'Update Successfully') {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: "teal darken-1", timeout: 2500, }, { root: true })
                    }
                    else {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                    }
                })
            }
            catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        }

    },
    getters: {
        getHLoader: state => state.hLoader,
        getNfoLoader: state => state.nfoLoader,
        getCdsLoader: state => state.cdsLoader,
        getMcxLoader: state => state.mcxLoader,
        getPoaLoader: state => state.poaLoader,
        getPoaList: state => state.poaList,
        getHoldingsList: state => state.holdingsList,
        getMwList: state => state.mwList,
        getEdisList: state => state.edisList,
        getPositionAvgList: state => state.positionAvgList,
        getSettlementInfo: state => state.settlementList

    }
}
export default uploadFile;