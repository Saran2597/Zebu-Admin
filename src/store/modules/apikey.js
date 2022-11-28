import service from '../../store/httpService.js'
import router from '@/router'

const apiKey = {
    namespaced: true,
    state: {
        apiKeyDetails: null,
        resetBtnLoader: false,
        updateBtnLoader: false,
        ApiKeyExpiryList: [],
    },
    mutations: {
        SET_RESET_LOADER (state, payload) {
            state.resetBtnLoader = payload
        },
        SET_UPDATE_LOADER (state, payload) {
            state.updateBtnLoader = payload
        },
        SET_API_KEY_DETAILS (state, payload) {
            state.apiKeyDetails = payload
        },
        SET_API_KEY_EXPIRY_LIST (state, payload) {
            if (payload) {
                payload.forEach(item => {
                    item.showEdit = false
                })
                state.ApiKeyExpiryList = payload
            }
        }
    },
    actions: {
        async getApiKeyDetails ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                commit('SET_RESET_LOADER', true)
                await service.getApiKeyDetails(payload.data).then(response => {
                    if (response.status == 200 && response.data.result != null) {
                        commit('SET_API_KEY_DETAILS', response.data.result)
                        payload.type != 'update' ? commit('SET_SNAKBAR', { msg: "API Key Details Fetched Sucessfully", show: true, color: 'teal darken-1', timeout: 2500 }, { root: true }) : ''
                    } else {
                        commit('SET_API_KEY_DETAILS', {})
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }); commit('SET_RESET_LOADER', false) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true }); commit('SET_RESET_LOADER', false)
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async updateApiKey ({ commit }, jsonObj) {
            try {
                commit('SET_LOADER', true, { root: true })
                commit('SET_UPDATE_LOADER', true)
                await service.apiKeyUpdate(jsonObj).then(response => {
                    if (response.status == 200 && response.data.message == 'SUCCESS') {
                        commit('SET_SNAKBAR', { msg: "Expiry Date Updated Sucessfully", show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    } else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }); commit('SET_UPDATE_LOADER', false) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true }); commit('SET_UPDATE_LOADER', false)
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getApiExpiryList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.getApiSubscriptionDetailsByDate(payload).then(response => {
                    if (response.status == 200 && response.data.stat == 'Ok') {
                        commit('SET_API_KEY_EXPIRY_LIST', response.data.result)
                    } else {
                        commit('SET_SNAKBAR', { msg: response.data.result ? 'Failed' :'No Record Found', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                        commit('SET_API_KEY_EXPIRY_LIST', [])
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true });
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        }
    },
    getters: {
        getApiKeyDetails: state => state.apiKeyDetails,
        getApiKeyExpiryList: state => state.ApiKeyExpiryList,

    }
}
export default apiKey;