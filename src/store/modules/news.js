import service from '../../store/httpService.js'
import router from '@/router'

const news = {
    namespaced: true,
    state: {
        newsData: [],
    },
    mutations: {
        SET_NEWS_DATA (state, data) {
            state.newsData = data
        }
    },
    actions: {
        getNews ({ commit }) {
            commit('SET_LOADER', true, { root: true })
            service.getNewsList().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_NEWS_DATA', response.data.result)
                } else {
                    commit('SET_NEWS_DATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        addOrEditNews ({ commit, dispatch }, jsonObj) {
            service.insertOrUpdateNews(jsonObj).then(response => {
                if (response.status == 200) {
                    router.push({ path: 'content', query: { tab: 'News' } }).catch(() => { })
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        deleteNews ({ commit, dispatch }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            service.deleteNews(jsonObj).then(response => {
                if (response.status == 200) {
                    commit('SET_SNAKBAR', { msg: 'News deleted successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    dispatch('getNews')
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        }
    },
    getters: {
        getNewsData: state => {
            return state.newsData
        }
    }
}
export default news;