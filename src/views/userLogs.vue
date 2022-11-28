<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">User Information
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" :value="n" v-slot="{ active, toggle }">
                <span @click="$router.push({ path: 'userLogs', query: { tab: n } }).catch(() => { })">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                    :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>


            <!-- <div style="width:25%">
            <v-text-field dense hide-details="" outlined height="16" prepend-inner-icon="mdi-magnify" placeholder="Search" v-model="search"></v-text-field>
          </div> -->
          </div>
          <div v-if="tabSelect == 'User Based'">
            <v-text-field dense hide-details="" outlined height="16" prepend-inner-icon="mdi-magnify"
              placeholder="Search" v-model="search"></v-text-field>
          </div>



          <!-- <div class="" v-if="tabSelect == 'User Based'">
              <v-text-field  dense v-model="searchData" placeholder="Search" outlined height="20" class="custom-textfield"></v-text-field>
            </div> -->
        </div>




      </div>
    </div>
    <v-divider class="mx-4 mb-2"></v-divider>

    <v-card class="mx-4 cardBoxShadow rounded-lg" v-if="!loader">
      <!-- user Based List -->
      <div v-if="tabSelect == 'User Based'">
        <!-- <v-simple-table id="tableData" class="border-right-left mb-4" v-if="userBasedLogs.length != 0">
          <thead>
            <tr class="tableRow">
              <th class="tableHeader">S.No</th>
              <th class="tableHeader">User Id</th>
              <th class="tableHeader ">IP Address</th>
              <th class="tableHeader text-center">Service Count</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tableRow" v-for="(item,index) in userBasedLogs" :key="index">
              <td class="tableContent">{{index+1}}</td>
              <td class="tableContent">{{item.user}}</td>
              <td class="tableContent">{{item.device_ip}}</td>
              <td class="tableContent text-center">{{item.count}}</td>
            </tr>
          </tbody>
        </v-simple-table> -->
        <!-- <div v-else class="d-flex align-center justify-center min-height-100">
          <span class="secondaryColor">No data found</span>
        </div> -->
        <!-- <v-data-table :search="search" v-if="userBasedLogs.length > 0" :headers="headers" v-bind:items="this.userBasedLogs" :value="this.userBasedLogs" class="my-5"  item-key="name" >
      <template slot="item.sn" scope="props">
            {{ props.index + 1 }}
          </template>
    </v-data-table> -->
        <v-data-table v-if="userBasedLogs.length != 0" :headers="headers" v-bind:items="userBasedLogs" :search="search"
          :value="userBasedLogs" class="my-2" id="table" item-key="name" single-select>
          <template v-slot:item="props">
            <tr>
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item.user }}</td>
              <td>{{ props.item.device_ip }}</td>
              <td>{{ props.item.count }}
              </td>

            </tr>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card class="mx-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Search Logs'">
      <!-- Search -->
      <div>
        <div class="px-4 pt-4 w-100 d-flex align-center justify-space-between">
          <v-form ref="form" v-model="formValid" lazy-validation @submit.prevent="getAccessLogs()">
            <div class="d-flex align-center">
              <div class="px-2 fsize14">
                <div class="pb-1">User ID</div>
                <v-text-field outlined dense placeholder="Enter the UserId" v-model="userId"></v-text-field>
              </div>
              <div class="px-2 fsize14">
                <div class="pb-1">*Log Type</div>
                <v-autocomplete outlined dense @change="isSubmit = false; page = 1"
                  :items="['AccessLog With Input', 'ResponseLog']" placeholder="Select the LogType"
                  :menu-props="{ bottom: true, offsetY: true }" :rules="tableRules" v-model="table"></v-autocomplete>
              </div>

              <div class="px-2 fsize14">
                <div class="pb-1">URL</div>
                <v-autocomplete clearable outlined dense :items="urlPaths" placeholder="Select the URL Path"
                  :menu-props="{ bottom: true, offsetY: true }" v-model="url"></v-autocomplete>
              </div>
              <div class="px-2 fsize14">
                <div class="pb-1">Device IP</div>
                <v-text-field outlined dense placeholder="Enter the DeviceIP" v-model="deviceIp"></v-text-field>
              </div>
              <div class="px-2 fsize14">
                <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="pb-1">*Date</div>
                    <v-text-field @click:append="dateMenu = true" v-model="computedDateFormatted" outlined
                      persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="dateRules"
                      placeholder="Select the Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="date"
                    :min="new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10)"
                    :max="new Date().toISOString().substr(0, 10)" :show-current="true" no-title
                    @input="dateMenu = false"></v-date-picker>
                </v-menu>
              </div>
              <div>
                <div class="pb-1">*Time</div>
                <!-- <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field outlined dense v-model="time" placeholder="Select the time" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker use-seconds format="24hr" v-if="menu2" v-model="time" full-width @click:second="$refs.menu.save(time)"></v-time-picker>
                </v-menu> -->
                <input type="time" class="time-picker" v-model="time">
              </div>
              <div class="px-2 d-flex justify-end">
                <v-btn height="40" type="submit" color="primary" depressed class="text-capitalize fsize14">Submit
                </v-btn>
              </div>
              <div class="loaderPart d-flex align-center">
                <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black">
                </v-progress-circular>
              </div>
            </div>
          </v-form>
        </div>
        <!-- accesslog with input -->
        <v-simple-table class="my-4 border-top"
          v-if="accessLogs.length != 0 && this.table == 'AccessLog With Input' && isSubmit">
          <thead>
            <tr>
              <th class="text-center" width="100px">created Date</th>
              <th class="text-center">userId</th>
              <th class="text-center">DeviceIp</th>
              <th class="text-center">Path</th>
              <th class="text-center">User Agent</th>
              <th class="text-center">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in accessLogs" :key="idx">
              <td class="text-center" style="min-width:200px">{{ i.created_on }}</td>
              <td class="text-center">{{ i.user_id }}</td>
              <td class="text-center">{{ i.device_ip }}</td>
              <td class="text-center">{{ i.path }}</td>
              <td class="text-center">{{ i.user_agent }}</td>
              <td class="input_text text-center" @click="callDialog(i.input ? i.input : i.response_data)">{{ i.input ?
                  i.input : i.response_data
              }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <!-- accesslog without input -->
        <v-simple-table class="my-4 border-top"
          v-if="accessLogs.length != 0 && this.table == 'AccessLog Without Input' && isSubmit">
          <thead>
            <tr>
              <th class="text-center" width="100px">created Date</th>
              <th class="text-center">userId</th>
              <th class="text-center">DeviceIp</th>
              <th class="text-center">Path</th>
              <th class="text-center">User Agent</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in accessLogs" :key="idx">
              <td class="text-center" style="min-width:200px">{{ i.created_on }}</td>
              <td class="text-center">{{ i.user_id }}</td>
              <td class="text-center">{{ i.device_ip }}</td>
              <td class="text-center">{{ i.uri }}</td>
              <td class="text-center">{{ i.user_agent }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <!-- response Table -->
        <v-simple-table class="my-4 border-top"
          v-if="accessLogs.length != 0 && this.table == 'ResponseLog' && isSubmit">
          <thead>
            <tr>
              <th class="text-center" width="100px">created Date</th>
              <th class="text-center">userId</th>
              <th class="text-center">Path</th>
              <th class="text-center">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in accessLogs" :key="idx">
              <td class="text-center" style="min-width:200px">{{ i.created_on }}</td>
              <td class="text-center">{{ i.user_id }}</td>
              <td class="text-center">{{ i.url }}</td>
              <td class="input_text text-center" style="max-width:120px"
                @click="callDialog(i.input ? i.input : i.response_data)">{{ i.input ? i.input : i.response_data }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <div v-else-if="(!loader && accessLogs.length == 0) || !isSubmit"
          class="d-flex align-center justify-center min-height-100 mt-16">
          <div class="text-center">No Logs Found</div>
        </div>
        <div v-if="isSubmit && accessLogs.length != 0" class="d-flex align-center justify-end pa-4">
          <v-pagination v-model="page" :length="accessLogsCount" :total-visible="7" circle></v-pagination>
        </div>

        <v-dialog class="json-dialog" v-model="dialog" max-width="600" style="overflow-x:hidden">
          <v-card>
            <div class="d-flex dialog-header" style="justify-content: space-between;border-bottom:-16px solid black">
              <div class="font-weight-bold fsize14 mx-6">JSON</div>
              <div>
                <v-btn height="28" depressed outlined text class="text-capitalize fsize12"
                  @click="formatFlag ? format() : ''">Format</v-btn>
                <v-btn height="28" depressed outlined text :color="copyText == 'Copy' ? 'black' : 'green'"
                  class="text-capitalize fsize12 mx-4" @click="copyTextFunc()">{{ copyText }}</v-btn>
                <v-icon @click="dialog = false" color="primary">mdi-close-circle</v-icon>
              </div>
            </div>
            <div v-if="formatFlag" class="fsize14 line-height-2 pa-4" id="jsonData" ref="jsonData">{{ currentJson }}
            </div>
            <div v-else>
              <json-viewer :value="currentJson" sort></json-viewer>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-card>

    <div v-if="tabSelect == 'login Based'">
      <div v-if="userLoginDetails.length != 0">
        <v-card class="mx-4 cardBoxShadow rounded-lg">
          <div class="px-2 fsize12 d-flex justify-end">
            <v-radio-group dense class="text-center" v-model="switchChart" row hide-details>
              <v-radio class="fsize12" label="Unique Login" value="unique"></v-radio>
              <v-radio class="fsize12" label="Total Login" value="total"></v-radio>
            </v-radio-group>
            <v-switch :ripple="false" class="pr-4" dense v-model="switchChartData"
              @click="$store.commit('SET_USERLOGSCHARTDATA', switchChartData ? userLoginDetailsWithoutWeekends : userLoginDetails)"
              inset :label="`holidays`"></v-switch>
          </div>
          <v-container fluid>
            <v-chart v-if="switchChart == 'unique'" class="chart" autoresize :options="USERLOGSCHARTDATA" />
            <v-chart v-if="switchChart == 'total'" class="chart" autoresize :options="TOTALUSERLOGSCHARTDATA" />
          </v-container>
        </v-card>

        <v-card class="ma-4 cardBoxShadow rounded-lg">
          <v-simple-table class="border-top" id="tableData">
            <thead>
              <tr class="tableRow">
                <th colspan="2" class="text-center text-uppercase tableHeader blue lighten-5">Date & Time</th>
                <th colspan="4" class="text-center text-uppercase tableHeader blue lighten-5">Unique users</th>
                <th colspan="3" class="text-center text-uppercase tableHeader teal lighten-5">Total users</th>
              </tr>
            </thead>
            <thead>
              <tr class="tableRow bg-lightgrey">
                <th class="tableHeader">S.No</th>
                <th class="tableHeader">Date</th>
                <th class="tableHeader text-right">Mobile</th>
                <th class="tableHeader text-right">Web</th>
                <th class="tableHeader text-right">API</th>
                <th class="tableHeader text-right">Total</th>
                <th class="tableHeader text-right">Mobile</th>
                <th class="tableHeader text-right">Web</th>
                <th class="tableHeader text-right">API</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tableRow" v-for="(item, index) in userLoginDetails" :key="index">
                <td class="tableContent bg-lightgrey">{{ index + 1 }}</td>
                <td class="tableContent bg-lightgrey">{{ getDateString(new Date(item.date), "d-M-y") }}&nbsp;
                  <small>({{ getDayFromDate(item.date) }})</small></td>
                <td class="tableContent text-right">{{ item.uniqueMobileLogin }}</td>
                <td class="tableContent text-right">{{ item.uniqueWebLogin }}</td>
                <td class="tableContent text-right">{{ item.uniqueApiLogin }}</td>
                <td class="tableContent text-right">{{ item.totalLogin }}</td>
                <td class="tableContent text-right">{{ item.totalMobileLogin }}</td>
                <td class="tableContent text-right">{{ item.totalWebLogin }}</td>
                <td class="tableContent text-right">{{ item.totalApiLogin }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </div>
      <div v-else>
        <v-card class="cardBoxShadow rounded-lg mx-4 d-flex align-center justify-center min-height-100">
          <span class="secondaryColor">No data found</span>
        </v-card>
      </div>
    </div>

    <v-card class="mx-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'URL Based'">
      <!-- Search -->
      <div>

        <!-- accesslog with input -->
        <v-simple-table class="my-4 border-top" v-if="urlBasedLogs.length != 0">
          <thead>
            <tr>
              <th class="text-left" width="100px">URL</th>
              <th class="text-center">Count</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in urlBasedLogs" :key="idx">
              <td class="text-left" style="min-width:200px">{{ i.path }}</td>
              <td class="text-center">{{ i.count }}</td>

            </tr>
          </tbody>
        </v-simple-table>

        <div v-else-if="(!loader && urlBasedLogs.length == 0) || !isSubmit"
          class="d-flex align-center justify-center min-height-100 mt-16">
          <div class="text-center">No Logs Found</div>
        </div>



      </div>
    </v-card>


    <v-card class="mx-4 cardBoxShadow rounded-lg">
      <mpin v-if="tabSelect == 'MPIN'" />
      <mwList v-if="tabSelect == 'Market Watch'" />
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import JsonViewer from "vue-json-viewer";
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer);

import VChart from "vue-echarts";
import "@/plugins/echart";
import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
export default {
  mixins: [commonFunc],

  components: {
    VChart,
    mwList: () => import("../views/contents/mwList.vue"),
    mpin: () => import("../views/contents/m-pinReset.vue"),
  },

  props: {

  },
  data: () => ({
    // tabs: ["login Based", "User Based", "URL Based", "Search"],
    tabs: ["login Based", "User Based", "URL Based",],
    tabSelect: "login",
    switchChart: "unique",
    switchChartData: true,
    //
    table: "AccessLog With Input",
    userId: "",
    url: "",
    date: new Date().toISOString().slice(0, 10),
    //
    dateMenu: false,
    formValid: false,
    dateRules: [(v) => !!v || "Date is required"],
    tableRules: [(v) => !!v || "Log type is required"],
    searchRules: [(v) => !!v || "This Field is required"],
    offset: 0,
    currentJson: [],

    dialog: false,
    copyText: "copy",
    //
    time: "08:30",
    menu2: false,
    modal2: false,
    page: 1,
    isSubmit: false,
    length: 10,
    search: "",
    deviceIp: "",
    formatFlag: true,
    searchData: "",
    headers: [
      { text: "S.No", align: "start", sortable: false, value: "sn" },
      {
        text: "User ID",
        align: "left",
        sortable: false,
        value: "user",
      },
      {
        text: "IP-Address",
        align: "left",
        sortable: false,
        value: "device_ip",
      },
      {
        text: "Service Count",
        align: "left",
        sortable: false,
        value: "count",
      },

    ],
    //
    // logtype: {
    //   active: true,
    //   WEB: false,
    //   MOB: false,
    //   API: false,
    // },
  }),
  computed: {
    ...mapGetters({
      loader: "getLoader",
      userLoginDetails: "getUserLoginDetails",
      USERLOGSCHARTDATA: "GETUSERLOGSCHARTDATA",
      TOTALUSERLOGSCHARTDATA: "GETTOTALUSERLOGSCHARTDATA",
      userLoginDetailsWithoutWeekends: "getUserLoginDetailsWithoutWeekends",
      userBasedLogs: "getUserBasedLogs",
      urlBasedLogs: "getUrlBasedLogs",

    }),
    ...mapGetters("logs", {
      accessLogsCount: "getAccessLogsCount",
      accessLogs: "getAccessLogs",
      totalCount: "getTotalCount",
      urlPaths: "getUrlPaths",
      logsLoader: "getLogsLoader",
      userLogCount: "getUserLogCount",
      activeUserData: "getActiveUserData",
      currentUserDetails: "getCurrentUserDetails",
      activeUserCount: "getActiveUserCount",
      webUserCount: "getWebUserCount",
      mobileUserCount: "getMobileUserCount",
      apiUserCount: "getApiUserCount",
    }),
    ...mapGetters("mpin", {
      mpinDetails: "getMpinDetails",
    }),

    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    userId(val) {
      this.userId = val.toUpperCase();
    },
    page: function (val) {
      this.pageRoute(val == 1 ? 0 : (val - 1) * 10);
    },
    tabSelect(currentTab) {
      switch (currentTab) {
        case "login Based":
          this.$store.dispatch("getUserLogDetails");

          break;
        case "User Based":
          this.$store.dispatch("getUserBasedRecords");

          break;
        case "URL Based":
          this.$store.dispatch("getUrlBasedRecords");
          break;
        // case "Search Logs":
        //   this.$store.dispatch("logs/getDistinctUrl");

        //   break;
        // case "Active Users":
        //   this.callTableData("active");
        //   break;

      }

    },
    dialog(val) {
      this.formatFlag = true;
    },
    $route(to, from) {
      this.$store.commit("logs/SET_ACCESS_LOG", '');
    },
  },

  async created() {
    this.tabSelect = (await this.$route.query.tab)
      ? this.$route.query.tab
      : "Login Based";
    // this.$store.dispatch("logs/getActiveUser");
  },

  methods: {
    callDialog(data) {
      this.copyText = "Copy";
      data && data != `""` ? (this.dialog = true) : "";
      this.currentJson = data;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      // return `${year}-${month}-${day}`;
      return `${day}-${month}-${year}`;
    },
    copyTextFunc() {
      navigator.clipboard.writeText(JSON.stringify(this.currentJson));
      this.copyText = "Copied";
      setTimeout(() => {
        this.copyText = "Copy";
      }, 2500);
    },
    getAccessLogs() {
      if (this.$refs.form.validate()) {
        this.isSubmit = true;
        this.page = 1;
        let json = {};
        // if (this.table == "AccessLog Without Input") {
        //   json = {
        //     user_id: this.userId ? this.userId : "%",
        //     uri: this.url ? this.url : "%",
        //     created_on: `${this.date}T${this.time + ":00"}Z`,
        //     offset: this.offset,
        //     device_ip: this.deviceIp ? this.deviceIp : "%",
        //   };
        //   this.$store.dispatch("logs/getAccessLog", json);
        // } else
        if (this.table == "ResponseLog") {
          json = {
            user_id: this.userId ? this.userId.trim() : "%",
            url: this.url ? this.url : "%",
            created_on: `${this.date} ${this.time}`,
            date: this.date,
            offset: this.offset,
          };
          this.$store.dispatch("logs/getResponseLogInput", json);
        } else {
          json = {
            user_id: this.userId ? this.userId.trim() : "%",
            path: this.url ? this.url : "%",
            created_on: `${this.date} ${this.time}`,
            date: this.date,
            offset: this.offset,
            device_ip: this.deviceIp ? this.deviceIp : "%",
          };
          this.$store.dispatch("logs/getAccessLogInput", json);
        }
      }
    },
    pageRoute(idx) {
      let json = {};
      // if (this.table == "AccessLog Without Input") {
      //   json = {
      //     user_id: this.userId ? this.userId : "%",
      //     uri: this.url ? this.url : "%",
      //     created_on: `${this.date}T${this.time + ":00"}Z`,
      //     offset: idx == 0 ? 0 : idx,
      //     device_ip: this.deviceIp ? this.deviceIp : "%",
      //   };
      //   this.$store.dispatch("logs/getAccessLog", json);
      // } else
      if (this.table == "ResponseLog") {
        json = {
          user_id: this.userId ? this.userId.trim() : "%",
          url: this.url ? this.url : "%",
          created_on: `${this.date} ${this.time}`,
          date: this.date,
          offset: idx == 0 ? 0 : idx,
        };
        this.$store.dispatch("logs/getResponseLogInput", json);
      } else {
        json = {
          user_id: this.userId ? this.userId.trim() : "%",
          path: this.url ? this.url : "%",
          created_on: `${this.date} ${this.time}`,
          date: this.date,
          offset: idx == 0 ? 0 : idx,
          device_ip: this.deviceIp ? this.deviceIp : "%",
        };
        this.$store.dispatch("logs/getAccessLogInput", json);
      }
    },
    getAccessLogsInput() {
      let fd = new FormData();
      fd.append("input", this.search);
      this.$store.dispatch("logs/getSearchAccessLogs", fd);
    },
    format() {
      this.formatFlag ? (this.currentJson = JSON.parse(this.currentJson)) : "";
      this.formatFlag = !this.formatFlag;
    },
    // callTableData(source) {
    //   if (source == "active") {
    //     this.$store.dispatch("logs/getActiveUser");
    //     this.logtype.active = true;
    //   } else {
    //     this.$store.dispatch("logs/activeUserBySource", { source: source });
    //   }
    //   if (source == "active") {
    //     this.logtype.active = true;
    //     this.logtype.WEB = false;
    //     this.logtype.MOB = false;
    //     this.logtype.API = false;
    //   } else if (source == "WEB") {
    //     this.logtype.active = false;
    //     this.logtype.WEB = true;
    //     this.logtype.MOB = false;
    //     this.logtype.API = false;
    //   } else if (source == "MOB") {
    //     this.logtype.active = false;
    //     this.logtype.WEB = false;
    //     this.logtype.MOB = true;
    //     this.logtype.API = false;
    //   } else if (source == "API") {
    //     this.logtype.active = false;
    //     this.logtype.WEB = false;
    //     this.logtype.MOB = false;
    //     this.logtype.API = true;
    //   }
    // },
  }
};
</script>

<style>

</style>