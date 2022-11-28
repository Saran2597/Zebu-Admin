<template>
  <div>
    <v-row class="ma-0 pa-2 align-center">
      <v-col cols="2" class="pa-0">
      </v-col>
      <v-col class="pa-0" cols="1"></v-col>
      <v-col cols="6" class="pa-0" style="height: 40px">
      </v-col>
      <v-col class="pa-0" cols="1"></v-col>
      <v-col cols="2" class="pa-0 d-flex align-center justify-end">
        <v-btn depressed color="primary" class="text-capitalize fsize14 ma-3" min-width="155px" @click="AddSettlementData('0')">
          Add Settlement
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-simple-table class="my-4" v-if="settlemntDataList.length != 0 && !loader">
        <thead>
          <tr>
            <th>S.No</th>
            <th class="text-center">Settlement No</th>
            <th class="text-center">Settlement Date</th>
            <th class="text-center">Exechange Date</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in settlemntDataList" :key="index">
            <td>{{index+1}}</td>
            <td class="text-center">{{item.settlement_no}}</td>
            <td class="text-center">{{item.settlement_date}}</td>
            <td class="text-center">{{item.exec_date}}</td>
            <td class="text-center">
              <v-icon @click="updateSettlement(item)">mdi-pencil</v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        <div>
          <div class="">Data Not Found</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  mixins: [commonFunc],
  data: () => ({
    response: [
      {
        id: 1,
        user_id: "100028",
        buy_value: "28949.02",
        buy_avg: "933.84",
        isin: "INE335Y01020",
        quantity: 31,
        symbol: "IRCTC",
        bse_code: "542830",
        nse_code: "13611",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "N",
        auth_flag: 0,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 2,
        user_id: "100028",
        buy_value: "23598.70",
        buy_avg: "5.24",
        isin: "INE351F01018",
        quantity: 4500,
        symbol: "JPPOWER",
        bse_code: "532627",
        nse_code: "11763",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "N",
        auth_flag: 0,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 3,
        user_id: "100028",
        buy_value: "166.87",
        buy_avg: "166.87",
        isin: "INE872H01027",
        quantity: 1,
        symbol: "LUMAXTECH",
        bse_code: "532796",
        nse_code: "14014",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "N",
        auth_flag: 0,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 4,
        user_id: "100065",
        buy_value: "17330.00",
        buy_avg: "86.65",
        isin: "INE976G01028",
        quantity: 200,
        symbol: "RBLBANK",
        bse_code: "540065",
        nse_code: "18391",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "Y",
        auth_flag: 1,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 5,
        user_id: "100085",
        buy_value: "155.31",
        buy_avg: "155.31",
        isin: "INE522F01014",
        quantity: 1,
        symbol: "COALINDIA",
        bse_code: "533278",
        nse_code: "20374",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "N",
        auth_flag: 0,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 6,
        user_id: "100085",
        buy_value: "391.60",
        buy_avg: "48.95",
        isin: "INE092T01019",
        quantity: 8,
        symbol: "IDFCFIRSTB",
        bse_code: "539437",
        nse_code: "11184",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "N",
        auth_flag: 0,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 7,
        user_id: "100090",
        buy_value: "5080.08",
        buy_avg: "175.18",
        isin: "INE647O01011",
        quantity: 29,
        symbol: "ABFRL",
        bse_code: "535755",
        nse_code: "30108",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "Y",
        auth_flag: 1,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 8,
        user_id: "100090",
        buy_value: "8707.95",
        buy_avg: "290.27",
        isin: "INE079A01024",
        quantity: 30,
        symbol: "AMBUJACEM",
        bse_code: "500425",
        nse_code: "1270",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "Y",
        auth_flag: 1,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 9,
        user_id: "100090",
        buy_value: "2545.54",
        buy_avg: "1272.77",
        isin: "INE732I01013",
        quantity: 2,
        symbol: "ANGELONE",
        bse_code: "543235",
        nse_code: "324",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "Y",
        auth_flag: 1,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
      {
        id: 10,
        user_id: "100090",
        buy_value: "5791.99",
        buy_avg: "413.71",
        isin: "INE346W01013",
        quantity: 14,
        symbol: "APEX",
        bse_code: "540692",
        nse_code: "21623",
        holdings_type: "NORMAL",
        req_id: null,
        txn_id: null,
        poa_status: "Y",
        auth_flag: 1,
        auth_qty: 0,
        auth_time: null,
        created_on: 1655436757000,
        created_by: null,
        updated_on: null,
        updated_by: null,
        active_status: "1",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      loader: "getLoader",
    }),
    ...mapGetters("uploadFile", {
      settlemntDataList: "getSettlementInfo",
    }),
    header() {
      var headers = Object.keys(this.response[0]);
      return headers;
    },
  },
  created() {
    this.$store.dispatch("uploadFile/getSettlementInfo");
  },
  methods: {
    AddSettlementData() {
      this.$router.push("/addSettlement");
    },

    updateSettlement(value) {
      localStorage.setItem("settlementInfo", JSON.stringify(value));
      this.$router.push(`/addSettlement?id=${value.id}`);
    },
  },
};
</script>

<style>
</style>