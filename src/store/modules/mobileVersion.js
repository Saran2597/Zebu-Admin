import service from '../../store/httpService.js'
import router from '@/router'


const mobileVersion = {
    namespaced: true,
    state: {
        getMobileVersionDetails: []
    },
    mutations: {
        GET_MOBILE_DETAILS(state, payload) {
            state.getMobileVersionDetails = payload
        }
    },
    actions: {

        async getMobileVersionInfo({
            state,
            commit
        }, payload) {
            await service.getMobileVersionData(payload).then(response => {
                if (response.status == 200) {
                    if (response.data.stat == 'Ok') {
                        for (let idx of response.data.result) {
                            if (idx['deviceType'] == idx['deviceType']) {
                                commit('GET_MOBILE_DETAILS', response.data.result)
                            }
                        }
                    }
                } else {
                    commit('GET_MOBILE_DETAILS', [])
                }
            }, (err) => {
                console.log(err);
            }).finally(({

            }))
        },

        async addMobVersion({
            state,
            commit,
            dispatch
        }, payload) {
            await service.addMobileVersionData(payload).then(response => {
                if (response.status == 200) {
                    if (response.data.stat == 'Ok') {
                        dispatch('getMobileVersionInfo')
                    }
                } else {
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })  
                }
            }, (err) => {
                console.log(err);
            }).finally(({

            }))
        },

        async deleteMobVersion({
            state,
            commit,
            dispatch,
        }, payload) {
            await service.deleteMobileVersion(payload).then(response => {
                if (response.status == 200) {
                    if (response.data.stat == 'Ok') {
                        commit('SET_SNAKBAR', { msg: 'Deleted Successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                        dispatch('getMobileVersionInfo')
                    }
                }
                else{
                    commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })  
                }
            }, (error) => {
                console.log(error);
            }).finally(({

            }))
        },
        
        async upDateMobVersion({state, commit,dispatch},payload){
            await service.upDateMobileVersion(payload).then(response => {
                if (response.status == 200 && response.data.stat == 'Ok') {
                        commit('SET_SNAKBAR', { msg: 'Updated Successfully', show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                        dispatch('getMobileVersionInfo')
                  }
                    else{
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 2500 }, { root: true })    
                }
            }, (error) => {
                console.log(error);
            }).finally(({

            }))
        }

    },
    getters: {
        getMobileVersion: (state) => {
            return state.getMobileVersionDetails
        }
    }

}

export default mobileVersion