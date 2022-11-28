import service from '../../store/httpService.js'
import router from '@/router'

const payment = {
    namespaced: true,
    state: {
        statusList: [],
        paymentDetails: [],
        payoutDetails: [],
        paginationCount: 1,
    },
    mutations: {
        SET_STATUS_LIST (state, payload) {
            state.statusList = payload
            state.statusList.push('All')
        },
        SET_PAYMENT_DETAILS (state, payload) {
            state.paymentDetails = payload
            if (payload.length > 0) {
                this.commit('payment/SET_PAGINATION_COUNT', payload)
            }
        },
        SET_PAYOUT_DETAILS (state, payload) {
            state.payoutDetails = payload
            if (payload.length > 0) {
                this.commit('payment/SET_PAGINATION_COUNT', payload)
            }
        },
        SET_PAGINATION_COUNT (state, payload) {
            if (payload[0].count !== undefined && payload[0].count !== null) {
                var count = Number(payload[0].count)
                if (count > 10) {
                    var d = count / 10
                    state.paginationCount = findIntOrFloat(d) == 'float' ? parseInt(d) + 1 : findIntOrFloat(d) == 'int' ? d : 1
                    // console.log(state.paginationCount);
                } else {
                    state.paginationCount = 1
                }
            }
            function findIntOrFloat (x) {
                if (typeof x == 'number' && !isNaN(x)) {
                    if (Number.isInteger(x)) {
                        return `int`;
                    }
                    else {
                        return `float`;
                    }
                } else {
                    return `number`;
                }
            }
        }
    },
    
    actions: {
        async getStatusList ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.getStatusList(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_STATUS_LIST', response.data.result)
                    } else {
                        commit('SET_STATUS_LIST', [])
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_STATUS_LIST', [])
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getPaymentDetails ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.getPaymentDetails(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_PAYMENT_DETAILS', response.data.result)
                    } else {
                        commit('SET_PAYMENT_DETAILS', [])
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_PAYMENT_DETAILS', [])
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async getPayoutDetails ({ commit }, payload) {
            try {
                commit('SET_LOADER', true, { root: true })
                await service.getPayoutDetails(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_PAYOUT_DETAILS', response.data.result)
                    } else {
                        commit('SET_PAYOUT_DETAILS', [])
                        commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => { commit('SET_LOADER', false, { root: true }) })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                commit('SET_PAYOUT_DETAILS', [])
                commit('SET_SNAKBAR', { msg: error, show: true, color: 'red lighten-1', timeout: 1500 }, { root: true })
            }
        },
        async payInDownload ({ commit }, payload) {
           await service.getPayInDownload(payload).then(response => {
                
            }).catch(error => {})
        },
        async payOutDownload ({ commit }, payload) {
            await service.getPayOutDownload(payload).then(response => {
                 
             }).catch(error => {})
         }
    },
    getters: {
        getStatusList: state => state.statusList,
        getPaymentDetails: state => state.paymentDetails,
        getPayoutDetails: state => state.payoutDetails,
        getPaginationCount: state => state.paginationCount,
    }
}
export default payment;