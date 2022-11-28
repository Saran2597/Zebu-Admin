import service from '../../store/httpService.js'
import router from '@/router'
import commonFunc from '../../mixins/commonFunctions';

const logs = {
    namespaced: true,
    state: {
         
        urlPaths: [],
        accessLogs: [],
        accessLogsCount: 1,
        totalCount: 50,
        serachLogs: [],
        logsLoader: false,
        userLogCount: [],
        activeUserData: [],
        currentUserDetails: [],
        activeUserCount: null,
        webUserCount: null,
        mobileUserCount: null,
        apiUserCount: null,
        last12hrActiveUsersCount: null,
        mobileUserData: null,
        webUserData: null,
        apiUserData: null,
    
        // chart state
        DEVICE_TYPE_CHARTDATA: {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
                backgroundColor: '#c7cfd9',
                textStyle: {
                    "color": "#000"
                }
            },
            legend: {
                orient: 'horizontal',
                left: 'left',
                padding: [4, 20],
                data: ['Web', 'Mobile', 'API'],
            },
            series: [{
                name: 'Active Users',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '60%'],
                data: [{
                        value: 0,
                        name: 'Web'
                    },
                    {
                        value: 0,
                        name: 'Mobile'
                    },
                    {
                        value: 0,
                        name: 'API'
                    },
                ]
            }]
        },
        // chart objects
        chartLoading: true,
        ACTIVE_USER_LOGS_CHARTDATA: {
            title: {
                show: true,
                textStyle: {
                    color: "grey",
                    fontSize: 28
                },
                text: "No data found",
                left: "center",
                top: "center"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                backgroundColor: '#c7cfd9',
                textStyle: {
                    "color": "#000"
                }
            },
            legend: {
                show: Boolean,
                data: ["Mobile", "Web", "API", "Total"],
                bottom: 10,
                textStyle: {
                    "color": "#6e6e6e"
                }
            },
            grid: {
                left: "2%",
                right: "2%",
                bottom: 60,
                containLabel: true,
            },
            toolbox: {
                show: Boolean,
                feature: {
                    magicType: {
                        show: true,
                        title: '',
                        type: ["line", "bar", 'pie']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Save'
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: [],
                boundaryGap: false,
            },
            yAxis: [{
                type: 'value',
                name: "Active Users",
                nameLocation: "middle",
                nameGap: 40,
            }],
            series: [{
                    name: 'Mobile',
                    data: [],
                    type: 'line',
                    smooth: true,
                },
                {
                    name: 'Web',
                    data: [],
                    type: 'line',
                    smooth: true,
                },
                {
                    name: 'API',
                    data: [],
                    type: 'line',
                    smooth: true,
                },
                {
                    name: 'Total',
                    data: [],
                    type: 'line',
                    smooth: true,
                }
            ]
        },
        topVisitorsChartLoading: false,
        topVisitorsLoading: false,

    },
    mutations: {

       
        SET_URL_PATHS: (state, payload) => {
            state.urlPaths = payload
        },
        SET_ACCESS_LOG(state, data) {
            state.accessLogs = data
            if (data && data[0].count !== undefined && data[0].count !== null) {
                var count = Number(data[0].count)
                if (count > 10) {
                    var d = count / 10
                    state.accessLogsCount = findIntOrFloat(d) == 'float' ? parseInt(d) + 1 : findIntOrFloat(d) == 'int' ? d : 1
                } else {
                    state.accessLogsCount = 1
                }
            }

            function findIntOrFloat(x) {
                if (typeof x == 'number' && !isNaN(x)) {
                    if (Number.isInteger(x)) {
                        return `int`;
                    } else {
                        return `float`;
                    }
                } else {
                    return `number`;
                }
            }
        },
        SET_TOTAL_COUNT(state, payload) {
            state.totalCount = payload
        },
        SET_SEARCH_LOGS(state, payload) {
            state.serachLogs = payload
        },
        SET_LOGS_LOADER(state, payload) {
            state.logsLoader = payload
        },
        SET_USER_COUNT(state, payload) {
            state.userLogCount = payload
            if (payload) {
                state.DEVICE_TYPE_CHARTDATA.series[0].data[0].value = payload.webUserCount
                state.DEVICE_TYPE_CHARTDATA.series[0].data[1].value = payload.mobileUserCount
                state.DEVICE_TYPE_CHARTDATA.series[0].data[2].value = payload.apiuserCount
                state.DEVICE_TYPE_CHARTDATA.series[0].data[2].value = payload.apiuserCount
            }
        },
        SUM: (state) => {
            return state.webUserCount + state.mobileUserCount + state.apiUserCount;
        },
        SET_ACTIVE_USER_DATA(state, payload) {
            state.activeUserData = payload
            // this.commit('logs/SET_CURRENT_USER_DETAILS', payload)
        },
        SET_CURRENT_USER_DETAILS(state, payload) {
            state.currentUserDetails = payload
        },
        // 
        SET_ACTIVE_USER_COUNT(state, payload) {
            state.activeUserCount = payload
        },
        SET_WEB_USER_COUNT(state, payload) {
            state.webUserCount = payload
            state.DEVICE_TYPE_CHARTDATA.series[0].data[0].value = payload
        },
        SET_MOBILE_USER_COUNT(state, payload) {
            state.mobileUserCount = payload
            state.DEVICE_TYPE_CHARTDATA.series[0].data[1].value = payload
        },
        SET_API_USER_COUNT(state, payload) {
            state.apiUserCount = payload
            state.DEVICE_TYPE_CHARTDATA.series[0].data[2].value = payload
        },
        SET_LAST12HR_ACTIVE_USERS_COUNT(state, payload) {
            state.last12hrActiveUsersCount = payload
            if (payload.length === 0) {
                state.ACTIVE_USER_LOGS_CHARTDATA.title.show = true
                state.ACTIVE_USER_LOGS_CHARTDATA.legend.show = false
                state.ACTIVE_USER_LOGS_CHARTDATA.toolbox.show = false
            } else {
                state.ACTIVE_USER_LOGS_CHARTDATA.title.show = false
                state.ACTIVE_USER_LOGS_CHARTDATA.legend.show = true
                state.ACTIVE_USER_LOGS_CHARTDATA.toolbox.show = true
            }
            this.commit('logs/SET_ACTIVE_USERS_CHART_DATA', payload)
        },
        SET_ACTIVE_USERS_CHART_DATA(state, payload) {
            state.ACTIVE_USER_LOGS_CHARTDATA.xAxis.data = []
            state.ACTIVE_USER_LOGS_CHARTDATA.series[0].data = []
            state.ACTIVE_USER_LOGS_CHARTDATA.series[1].data = []
            state.ACTIVE_USER_LOGS_CHARTDATA.series[2].data = []
            state.ACTIVE_USER_LOGS_CHARTDATA.series[3].data = []
            payload.forEach(element => {
                state.ACTIVE_USER_LOGS_CHARTDATA.xAxis.data.push(element.access_time.slice(11, 16))
                state.ACTIVE_USER_LOGS_CHARTDATA.series[0].data.push(element.active_mob_count);
                state.ACTIVE_USER_LOGS_CHARTDATA.series[1].data.push(element.active_web_count);
                state.ACTIVE_USER_LOGS_CHARTDATA.series[2].data.push(element.active_api_count);
                state.ACTIVE_USER_LOGS_CHARTDATA.series[3].data.push(element.active_count);
            })
        },
        SET_MOBILE_USER_DATA(state, payload) {
            state.mobileUserData = payload
        },
        SET_WEB_USER_DATA(state, payload) {
            state.webUserData = payload
        },
        SET_API_USER_DATA(state, payload) {
            state.apiUserData = payload
        },
        SET_CHART_LOADING(state, payload) {
            state.chartLoading = payload
        },
        SET_TOP_VISITORS_CHART_LOADING(state, payload) {
            state.topVisitorsChartLoading = payload
        },
        SET_TOP_VISITORS_LOADING(state, payload) {
            state.topVisitorsLoading = payload
        },

        /***
         * Order Detail based on Chart
         * Date: 15-10-2022
         * Author Saran 
         */

        SET_USER_COUNT_DATA(state, payload) {
            state.orderAnalysis = payload
            this.commit('COUNT_DETAILS_DATA', state.orderAnalysis)
            console.log(state.orderAnalysis)
          },
          COUNT_DETAILS_DATA(state, payload) {
            state.orderAnalysis = payload
            state.OPTIONS.xAxis.data = []
            state.OPTIONS.series[0].data = []
            state.OPTIONS.series[1].data = []
            state.OPTIONS.series[2].data = []
            state.OPTIONS.series[3].data = []
            state.OPTIONS.series[4].data = []
            state.OPTIONS.series[5].data = []
            state.OPTIONS.series[6].data = []
            state.OPTIONS.series[7].data = []
            console.log(payload)
            state.orderAnalysis.forEach(el => {
            state.OPTIONS.xAxis.data.push(el.DATE)
            state.OPTIONS.series[0].data.push(el.NSE)
            state.OPTIONS.series[1].data.push(el.NFO)
            state.OPTIONS.series[2].data.push(el.BSE)
            state.OPTIONS.series[3].data.push(el.MCX)
            state.OPTIONS.series[4].data.push(el.CDS)
            state.OPTIONS.series[5].data.push(el.BCD)
            state.OPTIONS.series[6].data.push(el.BFO)
            state.OPTIONS.series[7].data.push(el.TOTAL_COUNT)
            })
            console.log(state.orderAnalysis)
          }
    },
    actions: {
        getDistinctUrl({
            commit
        }, payload) {
            commit('SET_LOADER', true, {
                root: true
            })
            service.getDistinctUrl(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit("SET_URL_PATHS", response.data.result)
                } else {
                    commit("SET_URL_PATHS", []);
                }(err) => {
                    commit("SET_SNAKBAR", {
                        msg: response.data.message,
                        show: true,
                        color: "red lighten-1",
                        timeout: 2500,
                    }, {
                        root: true
                    });
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                })
            })
        },
        getAccessLogInput({
            commit
        }, payload) {
            commit('SET_LOADER', true, {
                root: true
            })
            service.getAccessLogInput(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_ACCESS_LOG', response.data.result)
                } else {
                    commit('SET_ACCESS_LOG', '')
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                })
            })
        },
        getAccessLog({
            commit
        }, payload) {
            commit('SET_LOADER', true, {
                root: true
            })
            service.getAccessLog(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_ACCESS_LOG', response.data.result)
                } else {
                    commit('SET_ACCESS_LOG', '')
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                })
            })
        },
        getResponseLogInput({
            commit
        }, payload) {
            commit('SET_LOADER', true, {
                root: true
            })
            service.getResponseLog(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_ACCESS_LOG', response.data.result)
                } else {
                    commit('SET_ACCESS_LOG', '')
                }
            }).finally(() => {
                commit('SET_LOADER', false, {
                    root: true
                })
            })
        },
        getSearchAccessLogs({
            commit
        }, payload) {
            commit('SET_LOGS_LOADER', true, {
                root: true
            })
            service.getAccessLogInputDetails(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('SET_SEARCH_LOGS', response.data.result)
                } else {
                    commit('SET_SEARCH_LOGS', [])
                }
            }).finally(() => {
                commit('SET_LOGS_LOADER', false, {
                    root: true
                })
            })
        },
        async getActiveUser({
            commit
        }, payload) {
            try {
                if (payload == 'topVisitorsChart') {
                    commit('SET_TOP_VISITORS_CHART_LOADING', true)
                } else if (payload == 'topVisitors') {
                    commit('SET_TOP_VISITORS_LOADING', true)
                }
                await service.getActiveUser().then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_USER_COUNT', response.data.result)
                        commit('SET_ACTIVE_USER_DATA', response.data.result.userDetails)
                        commit('SET_ACTIVE_USER_COUNT', response.data.result.activeUserCount)
                    } else {
                        commit('SET_USER_COUNT', [])
                        commit('SET_ACTIVE_USER_DATA', [])
                        commit('SET_ACTIVE_USER_COUNT', null)
                        // commit('SET_SNAKBAR', { msg: `No Data Found`, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
                    }
                }).finally(() => {
                    if (payload == 'topVisitorsChart') {
                        commit('SET_TOP_VISITORS_CHART_LOADING', false)
                    } else if (payload == 'topVisitors') {
                        commit('SET_TOP_VISITORS_LOADING', false)
                    }
                })
            } catch (error) {
                if (payload == 'topVisitorsChart') {
                    commit('SET_TOP_VISITORS_CHART_LOADING', false)
                } else if (payload == 'topVisitors') {
                    commit('SET_TOP_VISITORS_LOADING', false)
                }
                commit('SET_USER_COUNT', [])
                commit('SET_ACTIVE_USER_DATA', [])
                commit('SET_ACTIVE_USER_COUNT', null)
                commit('SET_SNAKBAR', {
                    msg: error,
                    show: true,
                    color: 'red lighten-1',
                    timeout: 1500
                }, {
                    root: true
                })
            }
        },
        async activeUserBySource({
            commit
        }, payload) {
            try {
                commit('SET_LOADER', true, {
                    root: true
                })
                await service.activeUserBySource(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_CURRENT_USER_DETAILS', response.data.result.userDetails)
                        setCount(response.data.result.userCount, response.data.result.userDetails)
                    } else {
                        commit('SET_CURRENT_USER_DETAILS', [])
                        setCount(null)
                        commit('SET_SNAKBAR', {
                            msg: `No Data Found`,
                            show: true,
                            color: 'red lighten-1',
                            timeout: 3000
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
                commit('SET_LOADER', false, {
                    root: true
                })
                commit('SET_CURRENT_USER_DETAILS', [])
                setCount(null)
                commit('SET_SNAKBAR', {
                    msg: error,
                    show: true,
                    color: 'red lighten-1',
                    timeout: 1500
                }, {
                    root: true
                })
            }

            function setCount(count, data) {
                if (payload.source == 'WEB') {
                    commit('SET_WEB_USER_COUNT', count)
                    commit('SET_WEB_USER_DATA', data)
                } else if (payload.source == 'MOB') {
                    commit('SET_MOBILE_USER_COUNT', count)
                    commit('SET_MOBILE_USER_DATA', data)
                } else if (payload.source == 'API') {
                    commit('SET_API_USER_COUNT', count)
                    commit('SET_API_USER_DATA', data)
                }
            }
        },
        async getLast12hourLoginCount({
            commit
        }, payload) {
            commit('SET_CHART_LOADING', true)
            try {
                await service.getLast12hourLoginCount(payload).then(response => {
                    if (response.status == 200 && response.data.result) {
                        commit('SET_LAST12HR_ACTIVE_USERS_COUNT', response.data.result)
                    } else {
                        commit('SET_LAST12HR_ACTIVE_USERS_COUNT', [])
                    }
                }).finally(() => {
                    commit('SET_CHART_LOADING', false)
                })
            } catch (error) {
                commit('SET_CHART_LOADING', false)
                commit('SET_LAST12HR_ACTIVE_USERS_COUNT', [])
                commit('SET_SNAKBAR', {
                    msg: error,
                    show: true,
                    color: 'red lighten-1',
                    timeout: 1500
                }, {
                    root: true
                })
            }
        },
      
    },
    getters: {
        getUrlPaths: state => {
            return state.urlPaths
        },
        getAccessLogs: state => {
            return state.accessLogs
        },
        getTotalCount: state => {
            return state.totalCount
        },
        getLogsLoader: state => state.logsLoader,
        getUserLogCount: state => state.userLogCount,
        getActiveUserData: state => state.activeUserData,
        getCurrentUserDetails: state => state.currentUserDetails,
        // 
        getActiveUserCount: state => state.activeUserCount,
        getWebUserCount: state => state.webUserCount,
        getMobileUserCount: state => state.mobileUserCount,
        getMobileUserData: state => state.mobileUserData,
        getWebUserData: state => state.webUserData,
        getApiUserData: state => state.apiUserData,
        // 
        getApiUserCount: state => state.apiUserCount,
        getDeviceTypeChartData: state => state.DEVICE_TYPE_CHARTDATA,
        getLast12hrActiveUsersCount: state => state.last12hrActiveUsersCount,
        getActiveUserLogsChartData: state => state.ACTIVE_USER_LOGS_CHARTDATA,
        getChartLoading: state => state.chartLoading,
        getAccessLogsCount: state => state.accessLogsCount,
        // 
        getTopVisitorsChartLoading: state => state.topVisitorsChartLoading,
        getTopVisitorsLoading: state => state.topVisitorsLoading,
      
       
    }
}
export default logs;