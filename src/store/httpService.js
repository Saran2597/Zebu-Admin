import axios from "axios";

var BASEURL = `https://api.zebull.in/rest/ZebullAdminService/`
// var BASEURL = `http://a3.zerobrokerageonline.com/rest/AliceBlueAdminService/`
//var BASEURL = `https://a3.aliceblueonline.com/rest/AliceBlueAdminService/`
// var BASEURL = `https://a3.aliceblueonline.com/rest/AliceBlueAdminServiceCheck/`
//var BASEURL = `https://abtradelite.adityabirlamoney.com/rest/ABMLAdminService/`
//var BASEURL = `http://192.168.1.10/ABMLAdminService/`
// var BASEURL3 = `http://192.168.1.8:8080/`

const AXIOS = axios.create({
    baseURL: `${BASEURL}`,
});

// var dataBaseURL = `https://api.zebull.in/rest/DataAPIService/`
// var dataBaseURL = `http://a3.zerobrokerageonline.com/rest/DataApiService/`
var dataBaseURL = `https://a3.aliceblueonline.com/rest/AliceBlueAPIService/`
const AXIOS2 = axios.create({
    baseURL: `${dataBaseURL}`,
})

var antWEbBaseURL = `https://antbeta.aliceblueonline.com/rest/AliceBlueAdminService/`
const AXIOS3 = axios.create({
    baseURL: `${antWEbBaseURL}`,
})


var commonURL = `http://api.amoga.tech:8080/AmogaWebService/`
const commonAxios = axios.create({
    baseURL: `${commonURL}`,
})

var amogaCommonUrl = `https://rest.amoga.tech/AmogaCommonService/`
const amogaCommonAxios = axios.create({
    baseURL: `${amogaCommonUrl}`,
})

export default {
    data: () => ({
        headers: {
            "Content-Type": "application/json"
        },
        formHeaders: {
            "Content-Type": "multipart/form-data;"
        },
    }),

    getAuthHeaders() {
        let userId = localStorage.getItem("userId");
        let sessionId = localStorage.getItem("sessionId");
        let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userId + " " + sessionId,
        };
        return headers;
    },

    adminLogin: function (jsonObj) {
        return AXIOS.post(`admin/adminLogin`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    getUserLogDetails: function (jsonObj) {
        return AXIOS.post(`admin/userLogDetails`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    getUserBasedRecords: function (jsonObj) {
        return AXIOS.post(`admin/getUserbasedRecords`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    getUrlBasedRecords: function (jsonObj) {
        return AXIOS.post(`admin/getUrlBasedRecords`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    resetCache: function (jsonObj) {
        return AXIOS2.post(`/v2/exchange/resetCache`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    scripAdd: function (jsonObj) {
        return AXIOS2.post(`admin/addContractMaster`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    adminMessage: function (jsonObj) {
        return AXIOS.post(`admin/adminMessage`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    uploadFile: function (jsonObj) {
        return AXIOS.post(`admin/loadPositionAvgFile`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    insertFile: function (jsonObj) {
        return AXIOS.post(`admin/insertPositionAvgFile`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getHolidays: function (jsonObj) {
        return commonAxios.post(`v2/amoga/getHolidayList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getContractMaster: function (jsonObj) {
        return AXIOS.post(`admin/getContractMasterArchiveCountList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getNewlyAddedList: function (jsonObj) {
        return AXIOS.post(`admin/getNewlyAddedList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getDeactivatedList: function (jsonObj) {
        return AXIOS.post(`admin/getDeactivatedList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getDuplicateSymbols: function (jsonObj) {
        return AXIOS.post(`admin/getDuplicateList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getPositionAvgExcelCountDiff: function (jsonObj) {
        return AXIOS.post(`admin/getPositionAvgExcelCountDiff`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getPositionAvgPrice: function (jsonObj) {
        return AXIOS.post(`admin/getPositionAvgPrice`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getPositionAvgPriceNull: function (jsonObj) {
        return AXIOS.post(`admin/getPositionAvgPriceNull`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getChartOneminCountList: function (jsonObj) {
        return AXIOS.post(`admin/getChartOneminCountList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getChartDayCountList: function (jsonObj) {
        return AXIOS.post(`admin/getChartDayCountList`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getBuySellTradeData: function (jsonObj) {
        return AXIOS.post(`admin/getBuySellTradeData`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    createSector: function (jsonObj) {
        return amogaCommonAxios.post(`admin/createNewSector`, jsonObj, {
            headers: this.formHeaders,
        })
    },
    deleteSector: function (jsonObj) {
        return amogaCommonAxios.post(`admin/deleteSectorName`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },

    getSector: function (jsonObj) {
        return amogaCommonAxios.post(`market/getSectorNames`, {
            headers: this.getAuthHeaders(),
        })
    },
    getSectorMappingDetails: function (jsonObj) {
        return amogaCommonAxios.post(`market/getSectorMappingDetails`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },
    createSectorMapping: function (jsonObj) {
        return amogaCommonAxios.post(`admin/createSectorMapping`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },
    deleteSectorMapping: function (jsonObj) {
        // return amogaCommonAxios.post(`admin/deleteSectorMapping`, jsonObj, {
        //     headers: this.getAuthHeaders(),
        // })
    },
    getSearchData: function (jsonObj) {
        return amogaCommonAxios.post('v2/exchange/getScripForSearch', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    // 
    getEvent: function (jsonObj) {
        return amogaCommonAxios.post(`market/getEventCalender`, jsonObj, {
            headers: this.getAuthHeaders(),
        })
    },
    insertOrUpdateEvent: function (jsonObj) {
        return amogaCommonAxios.post('admin/insertEventCalender', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    deleteEvent: function (jsonObj) {
        return amogaCommonAxios.post('admin/deleteEventCalender', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getNewsList: function (jsonObj) {
        return amogaCommonAxios.post('market/getNews', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    insertOrUpdateNews: function (jsonObj) {
        return amogaCommonAxios.post('admin/insertNewsDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    deleteNews: function (jsonObj) {
        return amogaCommonAxios.post('admin/deleteNewsDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getResultList: function (jsonObj) {
        return amogaCommonAxios.post('market/getResultCalender', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    insertOrUpdateResult: function (jsonObj) {
        return amogaCommonAxios.post('admin/insertResultCalender', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    deleteResult: function (jsonObj) {
        return amogaCommonAxios.post('admin/deleteResultCalender', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getIpo: function (jsonObj) {
        return amogaCommonAxios.post('market/getIpoListing', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getSgb: function (jsonObj) {
        return amogaCommonAxios.post('market/getSgbDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getAccessLogInput: function (jsonObj) {
        return AXIOS.post('admin/getAccessLogInput', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getAccessLog: function (jsonObj) {
        return AXIOS.post('/admin/getAccessLog', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getResponseLog: function (jsonObj) {
        return AXIOS.post('admin/getResponseLog', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getDistinctUrl: function (jsonObj) {
        return AXIOS.post('/admin/getDistinctUrl', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    loadHoldingFile: function (jsonObj) {
        return AXIOS.post('/admin/loadHoldingsFile', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    insertHoldingsFile: function (jsonObj) {
        return AXIOS.post('/admin/insertHoldingsData', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    loadPoaFile: function (jsonObj) {
        return AXIOS.post('/admin/loadNonPoaHoldingsFile', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    insertPoaFile: function (jsonObj) {
        return AXIOS.post('/admin/insertNonPoaHoldingsData', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getApiKeyDetails: function (jsonObj) {
        return AXIOS.post('/admin/getApiSubscriptionDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    apiKeyUpdate: function (jsonObj) {
        return AXIOS.post('/admin/updateExpiryDate', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getAccessLogInputDetails: function (jsonObj) {
        return AXIOS.post('/admin/getAccessLogInputDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getApiSubscriptionDetailsByDate: function (jsonObj) {
        return AXIOS.post('/admin/getApiSubscriptionDetailsByDate', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getPoaList: function (jsonObj) {
        return AXIOS.post('/admin/getNonPoaholdings', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getUserMpinData: function (jsonObj) {
        return AXIOS.post('/admin/getMpinForUser', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    editOrDeleteMpin: function (jsonObj) {
        return AXIOS.post('/admin/updateMpinForUser', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getSearchList: function (jsonObj) {
        return AXIOS.post('/admin/getContractMasterList', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    updateScripDetails: function (jsonObj) {
        return AXIOS.post('/admin/updateContractMaster', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getholdingsList: function (jsonObj) {
        return AXIOS.post('/admin/getHoldingsData', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getpositionList: function (jsonObj) {
        return AXIOS.post('/admin/getPositionAvgUser', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getMwList: function (jsonObj) {
        return AXIOS.post('/admin/getMarketWatchdata', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getEdisList: function (jsonObj) {
        return AXIOS.post('/admin/getEdisReport', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    schedulerOnOff: function (jsonObj) {
        return AXIOS.post('/admin/offScheduler', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getStatusList: function (jsonObj) {
        return AXIOS.post('/admin/getDistinctPaymentStatus', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getPaymentDetails: function (jsonObj) {
        return AXIOS.post('/admin/getPaymentRefreneceDetailsByDate', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getPayoutDetails: function (jsonObj) {
        return AXIOS.post('/admin/getPaymentOutDetailsByDate', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    downloadEdisReport: function (jsonObj) {
        return AXIOS.post('/admin/getEdisReportExcel', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getActiveUserCount: function (jsonObj) {
        return AXIOS.post('/admin/getActiveUser', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getActiveUser: function (jsonObj) {
        return AXIOS.post('/user/getActiveUser', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    activeUserBySource: function (jsonObj) {
        return AXIOS.post('/user/activeUserBySource', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getLast12hourLoginCount: function (jsonObj) {
        return AXIOS.post('/admin/getLast12hourLoginCount', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getVendors: function (jsonObj) {
        return AXIOS.post('/admin/getVendors', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    updateAuthorize: function (jsonObj) {
        return AXIOS.post('/admin/updateAuthorize', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    GetEdisRecord: function (jsonObj) {
        return AXIOS.post('/admin/getEdisReport1', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    updatePoaStatus: function (jsonObj) {
        return AXIOS.post('/admin/updatePoaStatus', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    updateAuthFlag: function (jsonObj) {
        return AXIOS.post('/admin/updateAuthFlag', jsonObj, {
            headers: this.header
        })
    },

    getMasterRecords: function (jsonObj) {
        return AXIOS.post('/admin/getExchangeSegment', jsonObj, {
            headers: this.header
        })
    },

    getSettlementData: function (jsonObj) {
        return AXIOS.post('/admin/getSettlementData', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    insertSettlementData: function (jsonObj) {
        return AXIOS.post('/admin/insertSettlement', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getSearchQuery: function (jsonObj) {
        return AXIOS.post('/admin/getCustomQueryDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    updateSettlementData: function (jsonObj) {
        return AXIOS.post('/admin/updateSettelementData', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getApiKeyDetails: function (jsonObj) {
        return AXIOS.post('/admin/getApiSubscriptionDetails', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getMostActiveData: function (jsonObj) {
        return AXIOS.post('https://v2api.aliceblueonline.com/restpy/nifty100', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    // getScripData: function (jsonObj) {
    //     return AXIOS.post('http://rest.amoga.tech/DataApiService/v2/exchange/getScripForSearch', jsonObj, {
    //         headers: this.getAuthHeaders()
    //     })
    // },
    
     getScripData: function (jsonObj) {
        return AXIOS.post('http://rest.amoga.tech/AmogaCommonService/v2/exchange/getScripForSearch', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    getPayInDownload: function (jsonObj) {
        return AXIOS.post('/admin/downloadPayIn', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    getPayOutDownload: function (jsonObj) {
        return AXIOS.post('/admin/downloadPayOut', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },

    // sso Login
    // async ssoLogin(payload) {
    //     return await AXIOS.post(`/customer/ssoLogin`, payload)
    // },
    
    // async ssoLogin(payload) {
    //     return await AXIOS.post(`https://a3.aliceblueonline.com/rest/AliceBlueAPIService/sso/getUserDetailsByAuth`, payload)
    // },

    async ssoLogin(payload) {
        return await AXIOS.post(`https://a3.aliceblueonline.com/rest/AliceBlueAdminService/customer/getUserDetailsByAuth`, payload)
    },

    getNewPriceRange: function (jsonObj) {
        return axios.post(`https://a3.aliceblueonline.com/rest/AliceBlueAPIService/ScripDetails/getNewPriceRange`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },

    getScripQuoteDetails: function (jsonObj) {
        return axios.post(`https://a3.aliceblueonline.com/rest/AliceBlueAPIService/ScripDetails/getScripQuoteDetails`, jsonObj, {
            headers: this.getAuthHeaders(),
        });
    },
    checkMargin(jsonObj) {
        return AXIOS.post('https://a3.aliceblueonline.com/rest/AliceBlueAPIService/placeOrder/checkMargin', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    pushMessage(jsonObj) {
        return AXIOS.post('/pushNotification/sendRecommendationMessage', jsonObj, {
            headers: this.getAuthHeaders()
        })
    },
    addVendor(jsonObj) {
        return axios.post('http://192.168.1.8:8081/orderDetails/insertVendorDetails', jsonObj, {
            headers: this.headers
        })
    },
    getVendor(jsonObj) {
        return axios.post('http://192.168.1.8:8081/orderDetails/getVendorDetails', jsonObj, {
            headers: this.headers
        })

    },
    updateVendor(jsonObj) {
        return axios.post('http://192.168.1.8:8081/orderDetails/updateVendorDetails', jsonObj, {
            headers: this.headers
        })

    },
    getAuth(jsonObj){
        return axios.post('http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/GetInitialKey', jsonObj,{
            headers:this.headers
        })
    },
    
    getMobileVersionData(jsonObj){
        return AXIOS3.post('ad/getMobVer',jsonObj,{
            headers: this.getAuthHeaders(), 
        })
    },

    addMobileVersionData(jsonObj){
        return AXIOS3.post('ad/newMobVer',jsonObj,{
            headers: this.getAuthHeaders(), 
        }) 
    },

    upDateMobileVersion(jsonObj){
        return AXIOS3.post('ad/updateMobVer',jsonObj,{
           headers: this.getAuthHeaders(), 
        })
    },

    deleteMobileVersion(jsonObj){
        return AXIOS3.post('ad/deleteMobVer',jsonObj,{
            headers: this.getAuthHeaders(), 
         })
    },

    getChartAnlaysis(jsonObj){
        return axios.post('http://192.168.1.3:5000/data', jsonObj,{
            headers:this.headers
        })
    }

    // http://192.168.1.9:8080/AliceBlueAdminService
}