<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Position Average
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
            <v-btn @click="downloadCsv('contractMaster',contractMasterData)" depressed height="26" text outlined color="primary" class="text-capitalize">
               <v-icon medium>mdi-cloud-download </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Position Avg Count'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'positionAvgCount' && postionAvgCountDiffData.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Excel Count</th>
            <th class="tableHeader text-center">Table Count</th>
            <th class="tableHeader text-center">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in postionAvgCountDiffData" :key="index">
            <td class="tableContent py-2">
              {{item.exch_segment}}
            </td>
            <td class="tableContent">{{item.table_count}}</td>
            <td class="tableContent text-center">{{item.excel_count }}</td>
            <td class="tableContent text-center">{{item.difference }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        No Records Found
      </div>
    </v-card>

    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Position Avg Price'">
      <v-form @submit.prevent="getPositionAvg(searchInput)" class="w-100 d-flex align-center justify-center py-4">
        <input type="search" v-model="searchInput" @input="searchInput.toUpperCase()" class="s_input rounded py-2 mr-3 fsize14">
        <v-btn type="submit" depressed text outlined color="black" height="37" class="text-capitalize fsize12">Submit</v-btn>
      </v-form>
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'positionAvgPrice' && positionAvgPriceData.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Group Name</th>
            <th class="tableHeader text-center">Symbol</th>
            <th class="tableHeader text-center">Instrument Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in positionAvgPriceData" :key="index">
            <td class="tableContent py-2"> {{item.exch_segment}}</td>
            <td class="tableContent">{{item.group_name}}</td>
            <td class="tableContent text-center">{{item.symbol }}</td>
            <td class="tableContent text-center">{{item.instrument_name }}</td>
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
    tabs: ["Position Avg Count", "Position Avg Price"],
    tabSelect: "Contract Master",
    searchInput: "",
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
  methods: {
    async getPositionAvg(searchInput) {
      await this.$store.dispatch("cMaster/getPositionAvgPrice", {
        clientId: searchInput.toString().toUpperCase(),
      });
      this.searchInput = null;
    },
  },
  created() {
    this.$store.dispatch("cMaster/getPositionAvgExcelCountDiff");
    this.$store.dispatch("cMaster/getPositionAvgPrice", {
      clientId: this.searchInput.toString().toUpperCase(),
    });
    this.$store.dispatch("cMaster/getPositionAvgPriceNull");
  },
};
</script>

<style>
.s_input {
  outline: 1px solid #ccc;
  width: 20%;
  text-indent: 16px;
  color: #56585a;
}
</style>