<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Chart Data
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black"></v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active,toggle }" :value="n">
                <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">{{n}}</v-btn>
              </v-slide-item>
            </v-slide-group>
          </div>
          <div>
            <v-btn min-width="fit-content" @click="downloadCsv('contractMaster',contractMasterData)" depressed height="26" text outlined color="primary" class="text-capitalize">
              <v-icon medium>mdi-cloud-download </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'chart Day List'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'chart Day List' && postionAvgCountDiffData.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Today Count</th>
            <th class="tableHeader text-center">Yesterday Count</th>
            <th class="tableHeader text-center">Difference</th>
            <th class="tableHeader text-center">Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in positionAvgPriceData" :key="index">
            <td class="tableContent py-2"> {{item.exch_segment}}</td>
            <td class="tableContent">{{item.today_count}}</td>
            <td class="tableContent text-center">{{item.yesterday_count }}</td>
            <td class="tableContent text-center">{{item.difference }}</td>
            <td class="tableContent text-center">{{item.percentage }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        No Records Found
      </div>
    </v-card>

    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'chart Oneminute List'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'chart Oneminute List' && positionAvgPriceData.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Today Count</th>
            <th class="tableHeader text-center">Yesterday Count</th>
            <th class="tableHeader text-center">Difference</th>
            <th class="tableHeader text-center">Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in positionAvgPriceData" :key="index">
            <td class="tableContent py-2"> {{item.exch_segment}}</td>
            <td class="tableContent">{{item.today_count}}</td>
            <td class="tableContent text-center">{{item.yesterday_count }}</td>
            <td class="tableContent text-center">{{item.difference }}</td>
            <td class="tableContent text-center">{{item.percentage }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        No Records Found
      </div>
    </v-card>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tabs: [
      "chart Day List",
      "chart Oneminute List",
    ],
    tabSelect: "Contract Master",
  }),
  computed: {
    ...mapGetters("cMaster", {
      postionAvgCountDiffData: "getPositionAvgExcelCountDiff",
      positionAvgPriceData: "getPositionAvgPrice",
    }),
    ...mapGetters({
      loader: "getLoader",
    }),
  },
  created() {
    this.$store.dispatch("cMaster/getChartOneminCountList")
    this.$store.dispatch("cMaster/getChartDayCountList")
    this.$store.dispatch("cMaster/getBuySellTradeData")
  },
};
</script>

<style>
</style>