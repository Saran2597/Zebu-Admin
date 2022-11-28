import service from '../../store/httpService.js'
import router from '@/router'

const adminMessage = {
    namespaced: true,
    state: {
        setSubmitLoader: false
    },
    mutations: {
        SET_BTN_LOADER(state, payload) {
            state.setSubmitLoader = payload
        }
    },
    actions: {
        scripAdd({ commit }, payload) {
            service.scripAdd(payload).then(response => {
                if (response.status == 200) {
                    commit('SET_SNAKBAR', { msg: 'Scrip added successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { })
        },
        async setPushNotify({ commit }, payload) {
            try {
                commit('SET_BTN_LOADER', true)
                await service.pushMessage(payload).then(response => {
                    if (response.status == 200 && response.data.message == "SUCCESS") {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    } else {
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                    }
                }).finally(() => { commit('SET_BTN_LOADER', false) })
            } catch (error) {
                commit('SET_BTN_LOADER', false)
            }
        }
    },
    getters: {
        getBtnLoader : (state) => state.setSubmitLoader
    }
}
export default adminMessage;