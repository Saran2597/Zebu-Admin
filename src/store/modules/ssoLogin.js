import service from "../httpService";
import router from "@/router";
const auth = {
  namespaced: true,
  state: {
    
  },
  mutations: {},
  actions: {
    async getData({
      commit
    }) {

      try {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        let authcode = params.get("authCode")
        let userId = params.get('userId')
        console.log(params.get("authCode"));
        console.log(params.get("vendor"));
        console.log(params.get("redirectUrl"));
        // let json = {
        //     brokerName: "Aliceblue",
        //     authCode: params.get("authCode"),
        //     clientId: params.get("userId"),
        // }
        // let json = {
        //   authCode: params.get("authCode"),
        //   vendor: "G9EOSWCEIF9ARCB",
        // };
        let json = {
          "userId": userId,
          "authCode": authcode
        };
        const response = await service.ssoLogin(json);
        if (response.data.stat === "Ok") {
          // localStorage.setItem('userId', response.data.result.clientId);
          // localStorage.setItem('sessionId', response.data.result.sessionId);
          // localStorage.setItem('brokerName', response.data.result.brokerName);
          // commit('SET_LOGINDETAILS', response.data.result, { root: true })
          localStorage.setItem("userId", response.data.result.adminName);
          localStorage.setItem("sessionId", response.data.result.userSessionId);
          commit("SET_LOGINDETAILS", response.data, {
            root: true
          });
          router.push("/dashboard");
        } else {
          commit(
            "SET_SNAKBAR", {
              msg: response.data.message,
              show: true,
              color: "red lighten-1",
              timeout: 2500,
            }, {
              root: true
            }
          );
          setTimeout(() => {
            var appcode = "T8CSVenrtyR6gGs";
            window.location.href = `https://a3.aliceblueonline.com?appcode=${appcode}`;
          }, 3500);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
   
  },
};
export default auth;