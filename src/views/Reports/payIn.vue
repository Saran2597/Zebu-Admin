<template>
  <div>
    <v-form ref="form" class="pa-4" v-model="formValid" lazy-validation @submit.prevent="getPaymentDetails">
      <div class="d-flex align-center">
        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">UserId</div>
          <v-text-field v-model="userId" dense outlined menu-props="offset-y" placeholder="Enter the UserId">
          </v-text-field>
        </div>
        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">*Type</div>
          <v-autocomplete @change="resetData()" v-model="payType" dense outlined menu-props="offset-y"
            placeholder="select the status" :items="['payIn', 'payOut']" :rules="typeRules"></v-autocomplete>
        </div>

        <div class="mx-3" v-if="payType == 'payIn'">
          <div class="pb-1 fsize14 secondaryColor">*Status</div>
          <v-autocomplete v-model="status" dense outlined menu-props="offset-y" placeholder="select the status"
            :items="statusList" :rules="statusRules"></v-autocomplete>
        </div>

        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">*From Date</div>
          <v-menu v-model="dateMenu1" :close-on-content-click="false" transition="scale-transition" offset-y
            max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu1 = true" clearable class="apiKeyInput"
                v-model="computedDateFormatted1" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                :rules="fromDateRules" placeholder="Select the From Date" append-icon="mdi-calendar" readonly dense
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="fromDate" :show-current="true"
              no-title @input="dateMenu1 = false"></v-date-picker>
          </v-menu>
        </div>

        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">*To Date</div>
          <v-menu v-model="dateMenu2" :close-on-content-click="false" transition="scale-transition" offset-y
            max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu2 = true" clearable class="apiKeyInput"
                v-model="computedDateFormatted2" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                :rules="toDateRules" placeholder="Select the To Date" append-icon="mdi-calendar" readonly dense
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="toDate" :show-current="true" no-title
              @input="dateMenu2 = false"></v-date-picker>
          </v-menu>
        </div>

        <div class="mx-3">
          <v-btn @click="resetData()" type="submit" depressed height="40" color="primary"
            class="text-capitalize fsize14">Submit</v-btn>
        </div>
        <v-spacer></v-spacer>

        <div class="d-flex flex-end pa-4"
          v-if="payType == 'payIn' ? paymentDetails.length > 0 : payOutDetails.length > 0">
          <v-btn height="32" @click="downloadUnicodeCSV(payType == 'payIn' ? paymentDetails : payOutDetails)" depressed
            min-width="fit-content" color="primary" class="text-capitalize">
            Download <v-icon class="mx-2 fsize18">mdi-cloud-download </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex align-center">

        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">From Amount</div>
          <v-text-field v-model="fromAmount" dense outlined menu-props="offset-y" placeholder="E.g:1000"></v-text-field>
        </div>
        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">To Amount</div>
          <v-text-field v-model="toAmount" dense outlined menu-props="offset-y" placeholder="E.g:10000"></v-text-field>
        </div>
        <div class="mx-3" v-if="payType == 'payIn'">
          <div class="pb-1 fsize14 secondaryColor">Payment mode</div>
          <v-text-field v-model="paymentMode" dense outlined menu-props="offset-y" placeholder="E.g:UPI"></v-text-field>
        </div>
        <div class="mx-3">
          <div class="pb-1 fsize14 secondaryColor">Exchange Segment</div>
          <v-text-field v-model="exchangeSegment" dense outlined menu-props="offset-y" placeholder="E.g:NSE">
          </v-text-field>
        </div>

      </div>
    </v-form>
    <div v-if="payType == 'payIn'">
      <v-data-table v-if="paymentDetails.length > 0" :headers="headers" :items="this.paymentDetails"
        :hide-default-footer="true">
        <template v-slot:i="props">
          <tr class="tableRow">
            <td>{{ props.i.user_id }}</td>
            <td>{{ props.i.payment_status }}</td>
            <td>{{ props.i.amount }}</td>
            <td>{{ props.i.payment_method }}</td>
            <td>{{ props.i.exch_seg }}</td>
            <td>{{ props.i.acc_num }}</td>
            <td>{{ props.i.order_id }}</td>
            <td style="min-width:100px">{{ props.i.created_on ? getDateString(new Date(props.i.created_on), "d-M-y") : '' }}</td>
            <td class="input_text" @click="callDialog(props.i.request ? props.i.request : '')">{{ props.i.request }}
            </td>
          </tr>
        </template>
      </v-data-table>
      <div v-else-if="isSubmit" class="d-flex justify-center secondaryColor pa-8">
        No Data Found
      </div>
      <div v-if="paymentDetails.length != 0" class="d-flex align-center justify-end pa-4">
        <v-pagination v-model="page" :length="length" :total-visible="7" circle></v-pagination>
      </div>
    </div>
    <div v-if="payType == 'payOut'">
      <v-data-table id="tableData" v-if="payOutDetails.length > 0" :headers="headers" :items="this.payOutDetails"
        :hide-default-footer="true">
        <template v-slot:i="props">
          <tr class="tableRow">
            <td class="tableContent">{{ props.i.user_id }}</td>
            <td class="tableContent">{{ props.i.payment_status }}</td>
            <td class="tableContent">{{ props.i.amount }}</td>
            <td class="tableContent">{{ props.i.payment_method }}</td>
            <td class="tableContent">{{ props.i.exch_seg }}</td>
            <td class="tableContent">{{ props.i.acc_num }}</td>
            <td class="tableContent">{{ props.i.order_id }}</td>
            <td class="tableContent">{{ props.i.created_on ? getDateString(new Date(props.i.created_on), "d-M-y") : ''
            }}
            </td>
            <td class="tableContent input_text" @click="callDialog(props.i.request ? props.i.request : '')">
              {{ props.i.request }}</td>
          </tr>
        </template>
      </v-data-table>
      <div v-else-if="isSubmit" class="d-flex justify-center secondaryColor pa-8">
        No Data Found
      </div>
      <div v-if="payOutDetails.length != 0" class="d-flex align-center justify-end pa-4">
        <v-pagination v-model="page" :length="length" :total-visible="7" circle></v-pagination>
      </div>
    </div>
    <v-dialog class="json-dialog" v-model="dialog" max-width="600" style="overflow-x:hidden">
      <v-card>
        <div class="d-flex dialog-header" style="justify-content: space-between;border-bottom:-16px solid black">
          <div class="font-weight-bold fsize14 mx-6">JSON</div>
          <div>
            <v-btn height="28" depressed outlined text class="text-capitalize fsize12"
              @click="formatFlag ? format() : ''">
              Format</v-btn>
            <v-btn height="28" depressed outlined text :color="copyText == 'Copy' ? 'black' : 'green'"
              class="text-capitalize fsize12 mx-4" @click="copyTextFunc()">{{ copyText }}</v-btn>
            <v-icon @click="dialog = false" color="primary">mdi-close-circle</v-icon>
          </div>
        </div>
        <div v-if="formatFlag" class="fsize14 line-height-2 pa-4" id="jsonData" ref="jsonData">{{ currentJson }}</div>
        <div v-else>
          <json-viewer :value="currentJson" sort></json-viewer>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import JsonViewer from "vue-json-viewer";
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer);

import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  mixins: [commonFunc],

  data: () => ({
    status: "All",
    fromDate: new Date().toISOString().substr(0, 10),
    toDate: new Date().toISOString().substr(0, 10),
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
    typeRules: [(v) => !!v || "Type is required"],


    headers: [
      { text: "User Id", value: "user_id", align: "tableContent", sortable: false },
      { text: "Status", value: "payment_status", align: "tableContent", sortable: false },
      { text: "Amount", value: "amount", align: "tableContent", sortable: false },
      { text: "Payment Mode", value: "payment_method", align: "tableContent", sortable: false },
      { text: "Exchange Segment", value: "exch_seg", align: "tableContent", sortable: false },
      { text: "AC Number", value: "acc_num", align: "tableContent", sortable: false },
      { text: "Order Id", value: "order_id", align: "tableContent", sortable: false },
      { text: "Date", value: "created_on", align: "tableContent", sortable: false },
      { text: "Request", value: "request", align: " input_text tableContent", sortable: false },
    ],
    payType: "payIn",
    userId: "",
    fromAmount: "",
    toAmount: "",
    paymentMode: "",
    exchangeSegment: "",
    paymentMethod: "",
    isSubmit: false,
  }),

  computed: {
    ...mapGetters("payment", {
      statusList: "getStatusList",
      paymentDetails: "getPaymentDetails",
      payOutDetails: "getPayoutDetails",
      paginationCount: "getPaginationCount",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
    computedDateFormatted1: {
      get() {
        return this.formatDate(this.fromDate);
      },
      set() { },
    },
    computedDateFormatted2: {
      get() {
        return this.formatDate(this.toDate);
      },
      set() { },
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

  created() {
    this.$store.dispatch("payment/getStatusList");
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async getPaymentDetails() {
      if (this.$refs.form.validate()) {
        if (this.payType == "payIn") {
          this.page = 1;
            let json = {
             payment_status: this.status == "All" ? "%" : this.status,
             from_date: this.fromDate,
             to_date: this.toDate,
             off_set: 0,
             user_id: this.userId ? this.userId : "%",
             from_amount: this.fromAmount ? this.fromAmount : '0',
             to_amount: this.toAmount ? this.toAmount : '99999999',
             exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
             payment_method: this.paymentMode ? this.paymentMode : '%'
           };
           let json1 = {
            payment_status: this.status == "All" ? "%" : this.status,
            from_date: this.fromDate,
            to_date: this.toDate,
            user_id: this.userId ? this.userId : "%",
            from_amount: this.fromAmount ? this.fromAmount : '0',
            to_amount: this.toAmount ? this.toAmount : '99999999',
            exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
            payment_method: this.paymentMode ? this.paymentMode : '%'
          };
          this.$store.dispatch("payment/getPaymentDetails", json);
          // this.$store.dispatch("payment/payInDownload", json1);
        } else if (this.payType == "payOut") {
          this.page = 1;
          let jsonData = {
            from_date: this.fromDate,
            to_date: this.toDate,
            offset: 0,
            user_id: this.userId ? this.userId : "%",
            from_amount: this.fromAmount ? this.fromAmount : '0',
            to_amount: this.toAmount ? this.toAmount : '99999999',
            exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
          };
          let jsonData1 = {
            from_date: this.fromDate,
            to_date: this.toDate,
            user_id: this.userId ? this.userId : "%",
            from_amount: this.fromAmount ? this.fromAmount : '0',
            to_amount: this.toAmount ? this.toAmount : '99999999',
            exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
          };
          this.$store.dispatch("payment/getPayoutDetails", jsonData);
          // this.$store.dispatch("payment/payOutDownload", jsonData1);
        }
      }
    },
    pageRoute(offset) {
      if (this.$refs.form.validate()) {
        if (this.payType == "payIn") {
          let json = {
            payment_status: this.status == "All" ? "%" : this.status,
            from_date: this.fromDate,
            to_date: this.toDate,
            off_set: offset,
            user_id: this.userId ? this.userId : "%",
            from_amount: this.fromAmount ? this.fromAmount : '0',
            to_amount: this.toAmount ? this.toAmount : '99999999',
            exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
            payment_method: this.paymentMode ? this.paymentMode : '%'
          };
          this.$store.dispatch("payment/getPaymentDetails", json);
        } else if (this.payType == "payOut") {
          let jsonData = {
            from_date: this.fromDate,
            to_date: this.toDate,
            offset: offset,
            user_id: this.userId ? this.userId : "%",
            from_amount: this.fromAmount ? this.fromAmount : '0',
            to_amount: this.toAmount ? this.toAmount : '99999999',
            exch_seg: this.exchangeSegment ? this.exchangeSegment : '%',
          };
          this.$store.dispatch("payment/getPayoutDetails", jsonData);
        }
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

    resetData() {
      if (this.$refs.form.validate()) {
        this.isSubmit = false;
        this.$store.commit("payment/SET_PAYMENT_DETAILS", []);
        this.$store.commit("payment/SET_PAYOUT_DETAILS", []);
      }
    },
    convertToCSV(objArray) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (let i = 0; i < array.length; i++) { // eslint-disable-line
        let line = '';
        for (const index in array[i]) { // eslint-disable-line
          if (line !== '') line += ',';
          line += array[i][index];
        }
        str += line + '\r\n'; // eslint-disable-line
      }
      return str;
    },

    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers);
      }
      const jsonObject = JSON.stringify(items);
      const csv = convertToCSV(jsonObject);
      const exportedFilenmae = fileTitle + '.csv' || 'export.csv'; // eslint-disable-line
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  }
};
</script>

