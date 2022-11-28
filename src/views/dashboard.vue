<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Dashboard
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active, toggle }" :value="n">
                <span @click="$router.push({ path: 'dashboard', query: { tab: n } }).catch(() => { })">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>
          </div>
          <div>
          </div>
          <div>
            <span class="ml-2 fsize14"><label class="font-weight-bold mx-4">{{ new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long"}) }}</label></span>
          </div>
        </div>

      </div>
    </div>

    <v-divider class="mx-4"></v-divider>
    <!-- <div class="pa-4" v-if="tabSelect == 'User Status' && !loader">
      <div class="wrapper">
        <v-card flat class="rounded-lg ma-2 box">
          <div class="fsize18 d-flex justify-space-between align-center mx-4 py-2">
            <div title="Today's Total Visitors">
              Today's Total Visitors
            </div>
            <div>
              <v-icon title="Refresh" @click="refreshData('topVisitors')">mdi-refresh</v-icon>
            </div>
          </div>

          <div v-if="!topVisitorsLoading" class="d-flex align-center justify-center count_no fsize24">
            {{ userLogCount.totalUserCount }}
          </div>
          <div v-if="topVisitorsLoading" class="d-flex justify-center align-center" style="height:300px">
            <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
        </v-card>

        <v-card flat class="rounded-lg ma-2 box">
          <div class="fsize18 d-flex justify-space-between align-center mx-4 py-2">
            <div title="Current Active Visitors by Device Type"> Current Active Users by Device Type</div>
            <div>
              <v-icon title="Refresh" @click="refreshData('topVisitorsChart')">mdi-refresh</v-icon>
            </div>
          </div>
          <div v-if="!topVisitorsChartLoading" class="d-flex align-center justify-center fsize24" style="height:80%">
            <v-chart style="height:250px" autoresize :options="DEVICE_TYPE_CHARTDATA" />
          </div>
          <div v-if="topVisitorsChartLoading" class="d-flex justify-center align-center" style="height:300px">
            <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
        </v-card>

        <v-card flat class="rounded-lg ma-2 box">
          <div class="fsize18 d-flex justify-space-between align-center mx-4 py-2">
            <div title="Top Viewed Pages">
              Top Viewed Pages</div>
            <div>
              <v-icon title="Refresh" @click="refreshData('topViewed')">mdi-refresh</v-icon>
            </div>
          </div>
          <div class="d-flex align-center justify-center fsize24">
            <div v-if="topViewsLoader" class="d-flex justify-center align-center" style="height:400px">
              <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
              </v-progress-circular>
            </div>
            <v-simple-table class="w-100 table_cus" v-if="!topViewsLoader">
              <thead>
                <tr>
                  <th class="fsize14 text-left py-2">URL</th>
                  <th class="fsize14 text-left py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in urlBasedLogs" :key="index">
                  <td class="fsize14 text-left py-2">{{ item.path }}</td>
                  <td class="fsize14 text-left py-2">{{ item.count }}</td>
                </tr>
                <tr class="grey lighten-3">
                  <td>Total</td>
                  <td>{{ totalServiceHitCount}}</td>
                </tr>
                <tr class="pa-1 fsize14 text-right w-100">
                  <td></td>
                  <td class="text-center"><a @click="$router.push('/topViewedPages')">More ...</a></td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card>

        <v-card flat class="rounded-lg ma-2 box">
          <div class="fsize18 d-flex justify-space-between align-center mx-4 py-2">
            <div title="Visitors Per Day">Visitors Per Day</div>
          </div>
          <div class="d-flex align-center justify-center fsize24">
            <div class="d-flex justify-center align-center" style="height:400px">
              <v-progress-circular class="ml-2" indeterminate v-if="usersLoader" size="36" :width="4" color="black">
              </v-progress-circular>
            </div>
            <v-chart class="chart" v-if="!usersLoader" autoresize :options="USERLOGSCHARTDATA" />
          </div>
        </v-card>
      </div>
    </div> -->
   
   <div v-if="tabSelect == 'User Status' && !loader">
    <div class="grid-container" >
            <div class="grid-item">
                <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    color: black;
    margin-right: 14px;
    margin-top: 8px;">

               
                <div title="Today's Total Visitors fsize18 clr-000">Today's Total Visitors</div>
                
                <div>
              <v-icon style="float:right" title="Refresh" @click="refreshData('topVisitors')">mdi-refresh</v-icon>
         
            </div>
            
            </div>
            <div v-if="!topVisitorsLoading" class="d-flex align-center justify-center count_no fsize24">
            {{ userLogCount.totalUserCount }}
          </div>
          <div v-if="topVisitorsLoading" class="d-flex justify-center align-center" style="height:300px">
            <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
            </div>
            <div class="grid-item">
                <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    margin-right: 14px;
    color: black;
    margin-top: 8px;">

               
                <div title="Current Active Users by Device Type fsize18 clr-000">Current Active Users by Device Type</div>
                <v-icon title="Refresh" @click="refreshData('topVisitorsChart')">mdi-refresh</v-icon>
            </div>
            <div v-if="!topVisitorsChartLoading" class="d-flex align-center justify-center fsize24" style="height:80%">
            <v-chart style="height:250px" autoresize :options="DEVICE_TYPE_CHARTDATA" />
          </div>
          <div v-if="topVisitorsChartLoading" class="d-flex justify-center align-center" style="height:300px">
            <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
            </div>
            <div class="grid-item">3</div>
            <div class="grid-item">
              <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    color: black;
    margin-right: 14px;
    margin-top: 8px;">

               
                <div title="Current Active Users by Device Type fsize18 clr-000">Visitors Per Day
</div>
              
            </div>
              
            <div class="d-flex justify-center align-center">
              <v-progress-circular class="ml-2" indeterminate v-if="usersLoader" size="36" :width="4" color="black">
              </v-progress-circular>
            </div>
            <v-chart class="chart" v-if="!usersLoader" autoresize :options="USERLOGSCHARTDATA" />

              </div>
            <div class="grid-item">
              <div class="d-flex" style="justify-content: space-between;
    margin-left: 15px;
    margin-right: 14px;
    color: black;
    margin-top: 8px;">

               
                <div title="Current Active Users by Device Type fsize18 clr-000">Top Viewed Pages</div>
                <v-icon title="Refresh" @click="refreshData('topViewed')">mdi-refresh</v-icon>
            </div>

            <div v-if="topViewsLoader" class="d-flex justify-center align-center">
              <v-progress-circular class="ml-2" indeterminate size="36" :width="4" color="black">
              </v-progress-circular>
            </div>
            <v-simple-table class="w-100 table_cus" v-if="!topViewsLoader">
              <thead>
                <tr>
                  <th class="fsize14 text-left py-2">URL</th>
                  <th class="fsize14 text-left py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in urlBasedLogs" :key="index">
                  <td class="fsize14 text-left py-2">{{ item.path }}</td>
                  <td class="fsize14 text-left py-2">{{ item.count }}</td>
                </tr>
                <tr class="grey lighten-3">
                  <td>Total</td>
                  <td>{{ totalServiceHitCount}}</td>
                </tr>
                <tr class="pa-1 fsize14 text-right w-100">
                  <td></td>
                  <td class="text-center"><a @click="$router.push('/topViewedPages')">More ...</a></td>
                </tr>
              </tbody>
            </v-simple-table>

              </div>
        </div>
      </div>
    <div class="pa-4" v-if="tabSelect == 'Engine Status'"></div>

    <div class="ma-4" v-if="tabSelect == 'Active User Details'">
      <div v-if="!isUserCount">
        <v-row class="mx-0 my-4">
          <v-col class="" style="max-width:256px">
            <v-card :class="logtype.active ? 'active_card' : ''" @click="callTableData('active'); isUserCount = true" flat class="rounded-lg" width="200px" height="170">
              <div class="d-flex pa-2 justify-center primaryColor fsize18 text_title">
                Active Users
                <v-icon class="mx-2" color="#174EA6">mdi-link-variant</v-icon>
              </div>
              <div class="d-flex mt-7 justify-center count_no1 secondaryColor">
                {{ userLogCount.activeUserCount ? userLogCount.activeUserCount : 0 }}
              </div>
            </v-card>
          </v-col>
          <v-col class="" style="max-width:256px">
            <v-card :class="logtype.WEB ? 'active_card' : ''" @click="callTableData('WEB'); isUserCount = true" flat class="rounded-lg" width="200px" height="170">
              <div class="d-flex pa-2 justify-center primaryColor fsize18 text_title">
                Web Login
                <v-icon class="mx-2" color="#174EA6">mdi-link-variant</v-icon>
              </div>
              <div class="d-flex mt-7 justify-center count_no1 secondaryColor">
                {{ userLogCount.webUserCount ? userLogCount.webUserCount : 0 }}
              </div>
            </v-card>
          </v-col>
          <v-col class="" style="max-width:256px">
            <v-card :class="logtype.MOB ? 'active_card' : ''" @click="callTableData('MOB'); isUserCount = true" flat class="rounded-lg" width="200px" height="170">
              <div class="d-flex pa-2 justify-center primaryColor fsize18 text_title">
                Mobile Login
                <v-icon class="mx-2" color="#174EA6">mdi-link-variant</v-icon>
              </div>
              <div class="d-flex mt-7 justify-center count_no1 secondaryColor">
                {{ userLogCount.mobileUserCount ? userLogCount.mobileUserCount : 0 }}
              </div>
            </v-card>
          </v-col>
          <v-col class="" style="max-width:256px">
            <v-card :class="logtype.API ? 'active_card' : ''" @click="callTableData('API'); isUserCount = true" flat class="rounded-lg" width="200px" height="170">
              <div class="d-flex pa-2 justify-center primaryColor fsize18 text_title">
                API Login
                <v-icon class="mx-2" color="#174EA6">mdi-link-variant</v-icon>
              </div>
              <div class="d-flex mt-7 justify-center count_no1 secondaryColor">
                {{ userLogCount.apiuserCount ? userLogCount.apiuserCount : 0 }}
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-container fluid>
          <div class="d-flex justify-center align-center" style="height:460px">
            <v-chart v-if="!chartLoading" style="height:450px" autoresize :options="ACTIVE_USER_LOGS_CHARTDATA" />
            <v-progress-circular class="ml-2" indeterminate v-if="chartLoading" size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
        </v-container>
      </div>
      <div v-if="isUserCount">

        <div class="ma-0 d-flex justify-space-between">

          <v-btn depressed outlined text @click="isUserCount = false" color="#174EA6" class="text-capitalize fsize13">
            <v-icon>mdi-menu-left</v-icon>Back
          </v-btn>

          <div class="d-flex">
            <div class="mr-4">
              <v-text-field v-model="search" placeholder="Search" outlined height="20" class="custom-textfield"></v-text-field>
            </div>
            <v-btn height="32" @click="downloadUnicodeCSV(currentUserDetails)" depressed min-width="fit-content" color="primary" class="text-capitalize">
              Download <v-icon class="mx-2 fsize18">mdi-cloud-download </v-icon>
            </v-btn>
          </div>

        </div>

        <v-data-table v-if="currentUserDetails.length > 0" :headers="titlename" :items="currentUserDetails" :search="search" :items-per-page="10" class="elevation-1">
          <template slot="item.sn" scope="props">
            {{ props.index + 1 }}
          </template>
        </v-data-table>
        <div v-else class="d-flex align-center justify-center fsize22 font-weight-bold" style="min-height:40vh">
          No Data Found
        </div>
      </div>
    </div>

    <!-- <v-row>
  <v-col cols="12" md="6" class="py-0">
    <v-row :column="$vuetify.breakpoint.mdAndDown">
      <v-col cols="12" lg="6">
           <v-card flat class="rounded-lg ma-2 box">
          <div title="Today's Total Visitors" class="fsize18 mx-4 py-2">Today's Total Visitors</div>
          <div class="d-flex align-center justify-center count_no fsize24">
            {{ userLogCount.totalUserCount }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
          <v-card flat class="rounded-lg ma-2 box">
          <div title="Current Active Visitors by Device Type" class="fsize18 mx-4 py-2">Current Active Users by Device
            Type</div>
          <div class="d-flex align-center justify-center fsize24" style="height:80%">
            <v-chart style="height:250px" autoresize :options="DEVICE_TYPE_CHARTDATA" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
       <v-col cols="12" lg="8">
         <div title="Visitors Per Day" class="fsize18 mx-4 py-2">Visitors Per Day</div>
          <div class="d-flex align-center justify-center fsize24">
            <v-chart class="chart" autoresize :options="USERLOGSCHARTDATA" />
          </div>
       </v-col>
    </v-row>
  </v-col>
  <v-col cols="12" md="6">
    <div title="Top Viewed Pages" class="fsize18 mx-4 py-2">Top Viewed Pages</div>
          <div class="d-flex align-center justify-center fsize24">
            <v-simple-table class="w-100 table_cus">
              <thead>
                <tr>
                  <th class="fsize14 text-left py-2">URL</th>
                  <th class="fsize14 text-left py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in urlBasedLogs" :key="index">
                  <td class="fsize14 text-left py-2">{{ item.path }}</td>
                  <td class="fsize14 text-left py-2">{{ item.count }}</td>
                </tr>
                <tr class="grey lighten-3">
                  <td>Total</td>
                  <td>{{ totalServiceHitCount }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
  </v-col>
</v-row>  -->
  </div>
</template>

<script>
import VChart from "vue-echarts";
import "@/plugins/echart";

import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
export default {
  mixins: [commonFunc],

  components: {
    VChart,
  },

  data: () => ({
    search: "",
    // tabs: ["User Status", "Active User Details", "Engine Status"],
    tabs: ["User Status", "Active User Details"],
    tabSelect: "User Status",
    logtype: {
      active: true,
      WEB: false,
      MOB: false,
      API: false,
    },
    isUserCount: false,
    titlename: [
      { text: "S.No", align: "start", sortable: false, value: "sn" },
      { text: "User Id", sortable: false, value: "uid" },
      { text: "User Name", sortable: false, value: "unme" },
      { text: "Email Id", sortable: false, value: "uemail" },
      { text: "Branch", sortable: false, value: "ubranc" },
    ],
  }),

  computed: {
    ...mapGetters("logs", {
      userLogCount: "getUserLogCount",
      activeUserData: "getActiveUserData",
      currentUserDetails: "getCurrentUserDetails",
      activeUserCount: "getActiveUserCount",
      webUserCount: "getWebUserCount",
      mobileUserCount: "getMobileUserCount",
      apiUserCount: "getApiUserCount",
      mobileUserData: "getMobileUserData",
      webUserData: "getWebUserData",
      apiUserData: "getApiUserData",
      //
      last12hrActiveUsersCount: "getLast12hrActiveUsersCount",
      //
      DEVICE_TYPE_CHARTDATA: "getDeviceTypeChartData",
      ACTIVE_USER_LOGS_CHARTDATA: "getActiveUserLogsChartData",
      chartLoading: "getChartLoading",
      // refreshLoader: "getRefreshLoader",
      topVisitorsChartLoading: "getTopVisitorsChartLoading",
      topVisitorsLoading: "getTopVisitorsLoading",
    }),
    ...mapGetters({
      loader: "getLoader",
      urlBasedLogs: "getUrlBasedLogs",
      totalServiceHitCount: "getTotalServiceHitCount",
      USERLOGSCHARTDATA: "GET_DASHBOARD_USERLOGS_CHARTDATA",
      topViewsLoader: "getTopViewsLoader",
      usersLoader: "getUsersLoader",
      //
    }),
    filteredList() {
      return this.postList.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  watch: {
    async tabSelect(currentTab) {
      this.isUserCount = false;
      this.tabWiseApiCall(currentTab);
    },
  },

  async created() {
    this.tabSelect = (await this.$route.query.tab)
      ? this.$route.query.tab
      : "User Status";
    if (this.tabSelect == "User Status") {
      this.tabWiseApiCall(this.tabSelect);
    }
  },

  mounted() {},

  methods: {
    goToSection(i) {
      this.$router.push(i.route).catch(() => {});
    },
    callTableData(source, type) {
      if (source == "active") {
        this.$store.dispatch("logs/getActiveUser", type);
        this.$store.commit(
          "logs/SET_CURRENT_USER_DETAILS",
          this.activeUserData
        );
        this.logtype.active = true;
      } else {
        this.$store.dispatch("logs/activeUserBySource", { source: source });
      }
      if (source == "active") {
        this.logtype.active = true;
        this.logtype.WEB = this.logtype.MOB = this.logtype.API = false;
      } else if (source == "WEB") {
        this.logtype.WEB = true;
        this.logtype.MOB = this.logtype.active = this.logtype.API = false;
      } else if (source == "MOB") {
        this.logtype.MOB = true;
        this.logtype.WEB = this.logtype.active = this.logtype.API = false;
      } else if (source == "API") {
        this.logtype.API = true;
        this.logtype.WEB = this.logtype.active = this.logtype.MOB = false;
      }
    },
    async refreshData(type) {
      if (type == "topViewed") {
        this.$store.dispatch("getUrlBasedRecords", "refresh");
      } else if (type == "userLogs") {
        this.$store.dispatch("getUserLogDetails", "refresh");
      } else if (type == "topVisitors") {
        this.$store.dispatch("logs/getActiveUser", "topVisitors");
      } else if (type == "topVisitorsChart") {
        this.$store.dispatch("logs/getActiveUser", "topVisitorsChart");
      }
    },
    async initialCall() {
      this.$store.dispatch("getUrlBasedRecords");
      this.$store.dispatch("getUserLogDetails");
      this.callTableData("active", "topVisitors");
    },
    async tabWiseApiCall(currentTab) {
      switch (currentTab) {
        case "User Status":
          this.initialCall();
          break;
        case "Active User Details":
          this.callTableData("active");
          this.$store.dispatch("logs/getLast12hourLoginCount");
          break;
        case "Engine Status":
          break;
      }
    },
  },
};
</script>

<style>
.custom-textfield.v-text-field.v-text-field--enclosed:not(.v-text-field--dense)
  > .v-input__control
  > .v-input__slot {
  min-height: 33px !important;
}
*{
    box-sizing: border-box;
}

.grid-container {
    margin: 50px auto;
    width: 98%;
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns:  1fr;
    gap: 1em;
    grid-template-areas:
        'one two two five five'
        'four four four five five'
}

.grid-item {
    border-radius: 1em;
    color: white;
}

.grid-item:nth-child(1) {
    grid-area: one;
    border: 1px solid #ddd!important;
    background-color: white;
    padding: 8px;
}

.grid-item:nth-child(2) {
    grid-area: two;
    border: 1px solid #ddd!important;
    background-color: white;
    padding: 8px;
}



.grid-item:nth-child(4) {
    grid-area: four;
    border: 1px solid #ddd!important;
    background-color: white;
    padding: 8px;
}

.grid-item:nth-child(5) {
    grid-area: five;
    border: 1px solid #ddd!important;
    background-color: white;
    padding: 8px;
}


@media (max-width: 940px) {
    .grid-container {
        grid-template-areas:
            'one one two five five'
            'five five'
            'four four four four four'
    }
}

@media (max-width: 640px) {
    .grid-container {
        grid-template-areas:
            'one one two two two'
            ' five five'
            'four four four four four'
    }
}

@media (max-width: 1023px) {
    .grid-container {
        grid-template-areas:
            'one'
            'two'
            'four'
            'five';
    }

}
</style>