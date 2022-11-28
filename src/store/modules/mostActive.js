import service from '../../store/httpService.js'
import router from '@/router'

const mostActive = {
    namespaced: true,
    state: {
        mostActiveList: [],
    },
    mutations: {
        SET_MOSTACTIVE_LIST (state, payload) {
            state.mostActiveList = payload
        }
    },
    actions: {
        async getMostActiveData ({ commit }, payload) {
            commit('SET_LOADER', true, { root: true })
            try {
                await service.getMostActiveData().then(response => {
                    if (response) {
                        commit('SET_MOSTACTIVE_LIST', response.data)
                    } else {
                        commit('SET_MOSTACTIVE_LIST', '')
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, { root: true })
                })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_MOSTACTIVE_LIST', '')
            }
        }
    },
    getters: {
        getMostActiveData: state =>  state.mostActiveList
    }
}

export default mostActive