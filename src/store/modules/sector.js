import service from '../../store/httpService.js'
import router from '@/router'

const sector = {
    namespaced: true,
    state: {
        sectorData: [],
        sectorMappedData: [],
    },
    mutations: {
        SET_SECTORDATA: (state, data) => {
            state.sectorData = data
        },
        SET_SECTORMAPPEDDATA: (state, data) => {
            state.sectorMappedData = data
        }
    },
    actions: {
        async createSector ({ commit }, jsonObj) {
            await service.createSector(jsonObj).then(response => {
                if (response.status == 200 && response.data.message == 'Success') {
                    commit('SET_SNAKBAR', { msg: 'sector created successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    router.push({ path: 'content', query: { tab: 'Sector' } }).catch(() => { })
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { })
        },
        async getSector ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            await service.getSector().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_SECTORDATA', response.data.result)
                } else {
                    commit('SET_SECTORDATA', [])
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },
        async deleteSector ({ commit, dispatch }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            await service.deleteSector(jsonObj).then(response => {
                if (response.status == 200) {
                    commit('SET_SNAKBAR', { msg: 'sector deleted successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    dispatch('getSector')
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        async getSectorMappedData ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            await service.getSectorMappingDetails(jsonObj).then(response => {
                if (response.status == 200 && response.data.message == 'Success' && response.data.result) {
                    commit('SET_SECTORMAPPEDDATA', response.data.result)
                } else {
                    commit('SET_SECTORMAPPEDDATA', [])
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        async createSectorMapping ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            await service.createSectorMapping(jsonObj).then(response => {
                if (response.status == 200 && response.data.message == 'Success') {
                    commit('SET_SNAKBAR', { msg: 'sector mapping created successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    router.push('/sectorDetails').catch(() => { })
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-5', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        },

        async deleteSectorMapping ({ commit }, jsonObj) {
            commit('SET_LOADER', true, { root: true })
            await service.deleteSectorMapping(jsonObj).then(response => {
                if (response.status == 200) {
                    commit('SET_SNAKBAR', { msg: 'Sector deleted successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    router.push('/sectorDetails').catch(() => { })
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-5', timeout: 2500 }, { root: true })
                }
            }).finally(() => { commit('SET_LOADER', false, { root: true }) })
        }
    },
    getters: {
        getSectorData: state => {
            return state.sectorData
        },
        getSectorMappedData: state => {
            return state.sectorMappedData
        }
    }
}
export default sector;