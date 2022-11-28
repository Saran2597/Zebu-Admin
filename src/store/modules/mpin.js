import service from '../../store/httpService.js'
import router from '@/router'

const mpin = {
    namespaced: true,
    state: {
        mpinData:{},
    },
    mutations: {
        SET_MPIN_DATA (state, payload) {
            state.mpinData = payload
        },
    },
    actions: {
        async getMpinDetails ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.getUserMpinData(payload.data).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_MPIN_DATA', response.data.result)
                        payload.type != 'update' ? commit('SET_SNAKBAR', { msg: "Data Fetched Sucessfully", show: false, color: 'teal darken-1', timeout: 2500 }, { root: true }) : ''
                    } else {
                        commit('SET_MPIN_DATA', [])
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_MPIN_DATA', [])
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async editOrDeleteMpin ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.editOrDeleteMpin(payload.data).then(response => {
                    if (response.status == 200 && response.data.message == 'SUCCESS') {
                        commit('SET_SNAKBAR', { msg: payload.type == 'delete' ? 'M-PIN Deleted Successfully' : 'M-PIN Updated Successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    } else {
                        commit('SET_SNAKBAR', { msg: 'Failed', show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true })})
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
    },
    getters: {
        getMpinDetails: state => state.mpinData,
    }
}
export default mpin;