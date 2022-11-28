<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Login
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black"></v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group mandatory>
              <v-slide-item v-slot="{ active,toggle }">
                <v-btn depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">Login</v-btn>
              </v-slide-item>
            </v-slide-group>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4 mb-2"></v-divider>
    <div v-if="userLoginDetails.length != 0 && !loader">
    <v-card class="mx-4 mb-5 cardBoxShadow rounded-lg">
      <div>
        <div>
          <div class="px-2 fsize12 d-flex justify-center">
            <v-radio-group dense class="text-center" v-model="switchChart" row hide-details>
              <v-radio class="fsize12" label="Unique Login" value="unique"></v-radio>
              <v-radio class="fsize12" label="Total Login" value="total"></v-radio>
            </v-radio-group>
            <v-switch :ripple="false" dense v-model="switchChartData" @click="$store.commit('SET_USERLOGSCHARTDATA',switchChartData ? userLoginDetailsWithoutWeekends : userLoginDetails )" inset label="holidays"></v-switch>
          </div>
          <v-container fluid>
            <v-chart v-if="switchChart == 'unique'" class="chart" autoresize :options="USERLOGSCHARTDATA" />
            <v-chart v-if="switchChart == 'total'" class="chart" autoresize :options="TOTALUSERLOGSCHARTDATA" />
          </v-container>
        </div>
      </div>
    </v-card>
    <v-card class="mx-4 mb-5 cardBoxShadow rounded-lg">
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
            <tr class="tableRow" v-for="(item,index) in userLoginDetails" :key="index">
              <td class="tableContent bg-lightgrey">{{index+1}}</td>
              <td class="tableContent bg-lightgrey">{{getDateString(new Date(item.date), "d-M-y")}}&nbsp; <small>({{getDayFromDate(item.date)}})</small></td>
              <td class="tableContent text-right">{{item.uniqueMobileLogin}}</td>
              <td class="tableContent text-right">{{item.uniqueWebLogin}}</td>
              <td class="tableContent text-right">{{item.uniqueApiLogin}}</td>
              <td class="tableContent text-right">{{item.totalLogin}}</td>
              <td class="tableContent text-right">{{item.totalMobileLogin}}</td>
              <td class="tableContent text-right">{{item.totalWebLogin}}</td>
              <td class="tableContent text-right">{{item.totalApiLogin}}</td>
            </tr>
          </tbody>
        </v-simple-table>
    </v-card>
    </div>
    <div v-if="loader" class="d-flex align-center justify-center min-height-100">
        <span class="secondaryColor">No data found</span>
      </div>
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
    switchChart: "unique",
    switchChartData: true,
  }),

  computed: {
    ...mapGetters({
      loader: "getLoader",
      userLoginDetails: "getUserLoginDetails",
      USERLOGSCHARTDATA: "GETUSERLOGSCHARTDATA",
      TOTALUSERLOGSCHARTDATA: "GETTOTALUSERLOGSCHARTDATA",
      userLoginDetailsWithoutWeekends: "getUserLoginDetailsWithoutWeekends",
    }),
  },

  created() {
    this.$store.dispatch("getUserLogDetails");
  },
};
</script>