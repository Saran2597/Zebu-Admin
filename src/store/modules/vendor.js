import service from '../httpService'

const vendor = {
    namespaced: true,
    state: {
        vendors: [],
        vendordata:[],
        getVendorRecord:[],
        updateVendorRecord:[],
    },
    mutations: {
        SET_VENDORS: (state, vendors) => {
            state.vendors = vendors
        },
        ADD_VENDOR:(state, vendordata) => {
            state.vendordata = vendordata
        },
        GET_VENDOR_DATA:(state, getVendorRecord) => {
            state.getVendorRecord = getVendorRecord
        },
        UPDATE_VENDOR:(state, updateVendorRecord) => { 
            state.updateVendorRecord = updateVendorRecord
        }
    },
    actions: {
        async fetchVendors({
            commit
        }, payload) {
            try {
                commit('SET_LOADER', true, {
                    root: true
                })
                await service.getVendors(payload).then(response => {
                    if (response.status === 200 && response.data.result) {
                        commit('SET_VENDORS', response.data.result)
                    } else {
                        commit('SET_VENDORS', [])
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, {
                        root: true
                    })
                })
            } catch (error) {
                commit('SET_VENDORS', [])
                commit('SET_LOADER', true, {
                    root: true
                })
            }
        },
        async updateAuthorize({
            commit,
            dispatch
        }, payload) {
            try {
                commit('SET_LOADER', true, {
                    root: true
                })
                await service.updateAuthorize(payload.data).then(response => {
                    if (response.status === 200 && response.data.message == 'SUCCESS') {
                        commit('SET_SNAKBAR', {
                            msg: `${payload.data.authorization_status == 0 ? 'Un Authorized' : 'Authorized'} Successfully`,
                            show: true,
                            color: 'teal darken-1',
                            timeout: 2500
                        }, {
                            root: true
                        })
                        dispatch('fetchVendors', {
                            client_id: payload.client_id
                        })
                    } else {
                        commit('SET_SNAKBAR', {
                            msg: response.data.stat,
                            show: true,
                            color: 'teal darken-1',
                            timeout: 2500
                        }, {
                            root: true
                        })
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, {
                        root: true
                    })
                })
            } catch (error) {
                commit('SET_SNAKBAR', {
                    msg: error,
                    show: true,
                    color: 'teal darken-1',
                    timeout: 2500
                }, {
                    root: true
                })
                commit('SET_LOADER', true, {
                    root: true
                })
            }
        },
        async insertVendor({
            commit
        }, payload) {
            try {
                commit('SET_LOADER', true, {
                    root: true
                })
                await service.addVendor(payload).then(response => {
                    if (response.status == 200) {
                   
                     commit('ADD_VENDOR',)
                     commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                    }
                    else{
                        commit('SET_VENDORS', [])
                        commit('SET_SNAKBAR', {
                            msg: response.data.message,
                            show: true,
                            color: 'red lighten-1',
                            timeout: 2500
                        }, {
                            root: true
                        })
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, {
                        root: true
                    })
                })
            } catch (error) {
                commit('SET_SNAKBAR', {
                    msg: error,
                    show: true,
                    color: 'red lighten-1',
                    timeout: 2500
                }, {
                    root: true
                })
                commit('SET_LOADER', true, {
                    root: true
                })
            }
        },
        
        async getVendor({ commit }, payload){
          try {
            commit('SET_LOADER', true, {
                root: true
            })
            await service.getVendor(payload).then((response) => {
               if(response.status == 200){
                 commit('GET_VENDOR_DATA', response.data.result[0]);

                 if (response.status == 0) {
                    commit('SET_SNAKBAR', { msg: "Invalid Vendor", show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                 }
                 commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
               
            }
               else{
                commit('GET_VENDOR_DATA', []);
                commit('SET_SNAKBAR', {
                    msg: response.data.message,
                    show: true,
                    color: 'red lighten-1',
                    timeout: 2500
                }, {
                    root: true
                })
               }
            })
          } catch (error) {
            commit('SET_SNAKBAR', {
                msg: error,
                show: true,
                color: 'red darken-1',
                timeout: 2500
            }, {
                root: true
            })
          }
        },

        async updateVendorData({ commit }, payload){
            try {
              commit('SET_LOADER', true, {
                  root: true
              })
              await service.updateVendor(payload).then((response) => {
                 if(response.status == 200){
                   commit('UPDATE_VENDOR', '');
                   commit('SET_SNAKBAR', { msg: response.data.message, show: true, color: 'teal darken-1', timeout: 2500 }, { root: true })
                 }
                 else{
                  commit('UPDATE_VENDOR', []);
                  commit('SET_SNAKBAR', {
                      msg: response.data.message,
                      show: true,
                      color: 'red lighten-1',
                      timeout: 2500
                  }, {
                      root: true
                  })
                 }
              })
            } catch (error) {
              commit('SET_SNAKBAR', {
                  msg: error,
                  show: true,
                  color: 'red lighten-1',
                  timeout: 2500
              }, {
                  root: true
              })
            }
          }
    },
    getters: {
        getVendors: state => state.vendors,
        getVendorList : state => state.getVendorRecord
    }
}

export default vendor