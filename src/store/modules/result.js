import service from '../../store/httpService.js'
import router from '@/router'

const result = {
    namespaced: true,
    state: {
        resultData: [],
    },
    mutations: {
        SET_RESULT_DATA (state, data) {
            state.resultData = data
        }
    },
    actions: {
        getResult ({ commit }) {
            commit('SET_LOADER', true, { root: true })
            service.getResultList().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_RESULT_DATA', response.data.result)
                } else {
                    commit('SET_RESULT_DATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
    },
    getters: {
        getResultData: state => {
            return state.resultData
        }
    }
}
export default result;