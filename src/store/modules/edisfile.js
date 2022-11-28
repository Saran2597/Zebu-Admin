import service from '../../store/httpService.js'
import router from '@/router'
import commonFunctions from '../../mixins/commonFunctions.js'


const edisdata = {
    namespaced: true,

    stata: {
        edisData: [],
        dbFormatDownloadlink: '',
        dbFormatDownloadlink1: '',
    },
    mutations: {
        SET_DB_FORMAT_DOWNLOADLINK(state, payload) {
            state.dbFormatDownloadlink = payload
            state.dbFormatDownloadlink1 = payload
        },
        SET_EDIS_DATA(state, payload) {
            state.edisData = payload
        }
    },
    actions: {
        async getData({ commit }, payload) {
            commit('SET_LOADER', true, { root: true })
            try {
                await service.GetEdisRecord(payload).then(response => {
                    if (response.status == 200) {
                        // commit('SET_EDIS_DATA', response.data.result)
                        commit('SET_DB_FORMAT_DOWNLOADLINK', response.data.result)
                        var FILE = window.URL.createObjectURL(new Blob([response.data.result]));
                        var docUrl = document.createElement('x');
                        docUrl.href = FILE;
                        docUrl.setAttribute('download', 'file.txt');
                        document.body.appendChild(docUrl);
                        docUrl.click();
                    } else {
                        // commit('SET_EDIS_DATA', [])
                        commit('SET_DB_FORMAT_DOWNLOADLINK', "")
                    }
                }).finally(() => {
                    commit('SET_LOADER', false, {
                        root: true
                    })
                })
            } catch (error) {
                commit('SET_LOADER', false, { root: true })
                // commit('SET_EDIS_DATA', [])
                commit('SET_DB_FORMAT_DOWNLOADLINK', "")
            }
        },

    },
    getters: {
        getData: state => {
            return state.edisData
        },
        getDbDownloadLink: state => state.dbFormatDownloadlink,
        getDbDownloadLink1: state => state.dbFormatDownloadlink1,
    }

}
export default edisdata