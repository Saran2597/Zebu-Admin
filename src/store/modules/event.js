import service from '../../store/httpService.js'
import router from '@/router'

const event = {
    namespaced: true,
    state: {
        eventData: [],
    },
    mutations: {
        SET_EVENT_DATA (state, data) {
            state.eventData = data
        }
    },
    actions: {
        getEvents ({ commit }) {
            commit('SET_LOADER', true, { root: true })
            service.getEvent().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_EVENT_DATA', response.data.result)
                } else {
                    commit('SET_EVENT_DATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
    },
    getters: {
        getEventData: state => {
            return state.eventData
        }
    }
}
export default event;