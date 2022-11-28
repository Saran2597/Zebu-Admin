<template>
  <div>
    <v-form ref="form" class="pa-4" v-model="formValid" lazy-validation @submit.prevent="getPaymentDetails">
      <div class="d-flex align-center">
        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">From Date</div>
          <v-menu v-model="dateMenu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu1 = true" clearable class="apiKeyInput" v-model="computedDateFormatted1" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="fromDateRules" placeholder="Select the From Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="fromDate" :show-current="true" no-title @input="dateMenu1 = false"></v-date-picker>
          </v-menu>
        </div>

        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">To Date</div>
          <v-menu v-model="dateMenu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu2 = true" clearable class="apiKeyInput" v-model="computedDateFormatted2" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="toDateRules" placeholder="Select the To Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="toDate" :show-current="true" no-title @input="dateMenu2 = false"></v-date-picker>
          </v-menu>
        </div>

        <div class="mx-3">
          <v-btn :loading="loading" type="submit" depressed height="40" color="primary" class="text-capitalize fsize14">Submit</v-btn>
        </div>
      </div>
    </v-form>
    <div>
      <v-data-table v-if="paymentDetails.length > 0" :headers="headers" :items="this.paymentDetails" :hide-default-footer="true">
        <template v-slot:i="props">
          <tr class="tableRow">
            <td>{{props.i.user_id}}</td>
            <td>{{props.i.payment_status}}</td>
            <td>{{props.i.amount}}</td>
            <td>{{props.i.payment_method}}</td>
            <td>{{props.i.exch_seg}}</td>
            <td>{{props.i.acc_num}}</td>
            <td>{{props.i.order_id}}</td>
            <td>{{props.i.created_on ? getDateString(new Date(props.i.created_on), "d-M-y") : ''}}</td>
            <td class="input_text" @click="callDialog(props.i.request ? props.i.request: '')">{{props.i.request}}</td>
          </tr>
        </template>
      </v-data-table>
      <div v-else class="d-flex justify-center secondaryColor pa-8">
        No Data Found
      </div>
      <div v-if="paymentDetails.length != 0" class="d-flex align-center justify-end pa-4">
        <v-pagination v-model="page" :length="length" :total-visible="7" circle></v-pagination>
      </div>

      <v-dialog class="json-dialog" v-model="dialog" max-width="600" style="overflow-x:hidden">
        <v-card>
          <div class="d-flex dialog-header" style="justify-content: space-between;border-bottom:-16px solid black">
            <div class="font-weight-bold fsize14 mx-6">JSON</div>
            <div>
              <v-btn height="28" depressed outlined text class="text-capitalize fsize12" @click="formatFlag?format():''">Format</v-btn>
              <v-btn height="28" depressed outlined text :color="copyText == 'Copy' ? 'black' : 'green'" class="text-capitalize fsize12 mx-4" @click="copyTextFunc()">{{copyText}}</v-btn>
              <v-icon @click="dialog = false" color="primary">mdi-close-circle</v-icon>
            </div>
          </div>
          <div v-if="formatFlag" class="fsize14 line-height-2 pa-4" id="jsonData" ref="jsonData">{{ currentJson}}</div>
          <div v-else>
            <json-viewer :value="currentJson" sort></json-viewer>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import JsonViewer from "vue-json-viewer";
Vue.use(JsonViewer);

import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  mixins: [commonFunc],
  data: () => ({
    status: "",
    fromDate: null,
    toDate: null,
    dateMenu1: false,
    dateMenu2: false,
    formValid: true,
    page: 1,
    length: 10,
    //
    copyText: "copy",
    currentJson: [],
    dialog: false,
    formatFlag: true,
    //
    fromDateRules: [(v) => !!v || "From Date is required"],
    toDateRules: [(v) => !!v || "To Date is required"],
    statusRules: [(v) => !!v || "Status is required"],

    headers: [
      { text: "User Id", value: "user_id" },
      { text: "Status", value: "payment_status" },
      { text: "Amount", value: "amount" },
      { text: "Payment Mode", value: "payment_method" },
      { text: "Exchange Segment", value: "exch_seg" },
      { text: "AC Number", value: "acc_num" },
      { text: "Order Id", value: "order_id" },
      { text: "Date", value: "created_on" },
      { text: "Request", value: "request", align: " input_text" },
    ],
  }),
  computed: {
    ...mapGetters("payment", {
      statusList: "getStatusList",
      paymentDetails: "getPayoutDetails",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
    computedDateFormatted1: {
      get() {
        return this.formatDate(this.fromDate);
      },
      set() {},
    },
    computedDateFormatted2: {
      get() {
        return this.formatDate(this.toDate);
      },
      set() {},
    },
  },
  watch: {
    page: function (val) {
      this.pageRoute(val == 1 ? 0 : (val - 1) * 10);
    },
    dialog(val) {
      this.formatFlag = true;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async getPaymentDetails() {
      if (this.$refs.form.validate()) {
        this.page = 1;
        let json = {
          from_date: this.fromDate,
          to_date: this.toDate,
          offset: 0,
        };
        this.$store.dispatch("payment/getPayoutDetails", json);
      }
    },
    pageRoute(offset) {
      if (this.$refs.form.validate()) {
        let json = {
          from_date: this.fromDate,
          to_date: this.toDate,
          offset: offset,
        };
        this.$store.dispatch("payment/getPayoutDetails", json);
      }
    },
    callDialog(data) {
      this.copyText = "Copy";
      data && data != `""` ? (this.dialog = true) : "";
      this.currentJson = data;
    },
    format() {
      this.formatFlag ? (this.currentJson = JSON.parse(this.currentJson)) : "";
      this.formatFlag = !this.formatFlag;
    },
    copyTextFunc() {
      navigator.clipboard.writeText(JSON.stringify(this.currentJson));
      this.copyText = "Copied";
      setTimeout(() => {
        this.copyText = "Copy";
      }, 2500);
    },
  },
  mounted() {},
};
</script>