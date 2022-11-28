<template>
  <div>
    <v-form class="d-flex align-center" ref="form" v-model="formValid" @submit.prevent="getEdisList(false)">
      <v-row class="ma-0 pa-4 align-center">
        <v-col></v-col>
        <v-col cols="12" sm="12" md="5" lg="3" class="pa-0">
          <div class="pb-1">Date</div>
          <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
            max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu = true" clearable class="apiKeyInput"
                v-model="computedDateFormatted" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                :rules="fromDateRules" placeholder="Select the From Date" append-icon="mdi-calendar" readonly dense
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="date" :show-current="true" no-title
              @input="dateMenu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12" md="5" lg="7">
          <div class="px-5">
            <v-btn height="40" type="submit" depressed class="text-capitalize fsize12 mx-4" color="primary">Submit
            </v-btn>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>

      <div class="d-flex pa-4" v-if="edisList.length > 0 && edisRecordList != 0">

      
        <v-btn v-if="$store.state.brokerName == 'Aliceblue'" height="32" target="_blank" :href="$store.state.edisdata.dbFormatDownloadlink1"
          min-width="fit-content" color="primary" class="text-capitalize mr-4 outlined" download>
          DB Format {{$store.state.edisdata.dbFormatDownloadlink1}}<v-icon class="mx-2 fsize18">mdi-cloud-download </v-icon>

        </v-btn>
        <!-- <iframe download sandbox="allow-scripts allow-downloads" :src="$store.state.edisdata.dbFormatDownloadlink1" frameborder="1"></iframe> -->
        <!-- <a download="edis" :href="dbdownloadLink">DB Download</a> -->
        <v-btn height="32" @click="downloadUnicodeCSV(edisList)" depressed min-width="fit-content" color="primary"
          class="text-capitalize">
          Download <v-icon class="mx-2 fsize18">mdi-cloud-download </v-icon>
        </v-btn>
      </div>

    </v-form>

    <!-- style="height:calc(100vh - 260px);overflow-y:auto" -->
    <!-- <v-simple-table id="tableData" v-if="edisList.length > 0" class="my-5">
      <thead>
        <tr class="tableRow">
          <th class="text-center fsize12 font-weight-normal tableContent">Bold</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ClientId</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ReqId</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ReqType</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ResId</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ResStatus</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ResTime</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ResError</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Remarks</th>
          <th class="text-center fsize12 font-weight-normal tableContent">TxnReqId</th>
          <th class="text-center fsize12 font-weight-normal tableContent">TxnId</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Status</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ErrorCode</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Quantity</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Isin</th>
          <th class="text-center fsize12 font-weight-normal tableContent min-w-120">PlacedAt</th>
          <th class="text-center fsize12 font-weight-normal tableContent">SettlementNo</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ExecDate</th>

        </tr>
      </thead>
      <tbody>
        <tr class="tableRow" v-for="(i,idex) in edisList" :key="idex">
          <td class="text-center tableContent">{{i.bold}}</td>
          <td class="text-center tableContent">{{i.client_id}}</td>
          <td class="text-center tableContent">{{i.req_id}}</td>
          <td class="text-center tableContent">{{i.req_type}}</td>
          <td class="text-center tableContent">{{i.res_id}}</td>
          <td class="text-center tableContent">{{i.res_status}}</td>
          <td class="text-center tableContent">{{i.res_time}}</td>
          <td class="text-center tableContent">{{i.res_error}}</td>
          <td class="text-center tableContent">{{i.remarks}}</td>
          <td class="text-center tableContent">{{i.txn_req_id}}</td>
          <td class="text-center tableContent">{{i.txn_id}}</td>
          <td class="text-center tableContent">{{i.status}}</td>
          <td class="text-center tableContent">{{i.error_code}}</td>
          <td class="text-center tableContent">{{i.quantity}}</td>
          <td class="text-center tableContent">{{i.isin}}</td>
          <td class="text-center tableContent">{{i.placed_at ? getDateString(new Date(i.placed_at.split(' ')[0]), "d-M-y") : ''}}</td>
          <td class="text-center tableContent">{{i.settelement_id}}</td>
          <td class="text-center tableContent">{{i.exec_date}}</td>
        </tr>
      </tbody>

    </v-simple-table> -->
    <v-data-table id="tableData" v-if="edisList.length > 0" :headers="titlename" :items="edisList" :items-per-page="10"
      class="elevation-1"></v-data-table>
    <div v-else>
      <div class="text-center pa-5">
        <v-icon class="display-2 pb-4">mdi-thought-bubble-outline</v-icon>
        <div class="">Data Not Found</div>
      </div>
    </div>
    <v-dialog class="json-dialog" v-model="dialog" max-width="600" style="overflow-x:hidden">
      <v-card class="">
        <div class="d-flex dialog-header" style="justify-content: space-between;border-bottom:-16px solid black">
          <div class="font-weight-bold fsize14 mx-6">JSON</div>
          <div class="">
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

  name: "EdisList",
  mixins: [commonFunc],

  data: () => ({
    dialog: false,
    currentJson: {},
    formatFlag: true,
    copyText: "Copy",
    //
    date: new Date().toISOString().substr(0, 10),
    dateMenu: false,
    fromDateRules: [(v) => !!v || "From Date is required"],
    formValid: true,

    titlename: [
      { text: 'Bold', align: 'start', sortable: false, value: 'boId', },
      { text: 'ClientId', sortable: false, value: 'userId' },
      { text: 'ReqId', sortable: false, value: 'reqId' },
      { text: 'ReqType', sortable: false, value: 'reqType' },
      { text: 'ResId', sortable: false, value: 'resId' },
      { text: 'ResStatus', sortable: false, value: 'resStatus' },
      { text: 'ResTime', sortable: false, value: 'resTime' },
      { text: 'ResError', sortable: false, value: 'resError' },
      { text: 'Remarks', sortable: false, value: 'remarks' },
      { text: 'TxnReqId', sortable: false, value: 'txnReqId' },
      { text: 'TxnId', sortable: false, value: 'txnId' },
      { text: 'Status', sortable: false, value: 'edisStatus' },
      { text: 'ErrorCode', sortable: false, value: 'errorCode' },
      { text: 'Quantity', sortable: false, value: 'authQty' },
      { text: 'Isin', sortable: false, value: 'isin' },
      { text: 'PlacedAt', sortable: false, value: 'placedAt'.slice(0, 10), width: '110px' },
      { text: 'SettlementNo', sortable: false, value: 'settelId' },
      { text: 'ExecDate', sortable: false, value: 'execDate' },
    ],

    JsonFields: ["Bold", "ClientId", "ReqId", "ReqType", "ResId", "ResStatus", "ResTime", "ResError", "Remarks", "TxnReqId", "TxnId", "Status", "ErrorCode", "Quantity", "Isin", "PlacedAt", "SettlementNo", "ExecDate"],
  }),

  computed: {
    ...mapGetters({
      loading: "getLoader",
      search: "getSearch",
    }),
    ...mapGetters("uploadFile", { edisList: "getEdisList" }),
    ...mapGetters("edisdata", {
      edisRecordList: "getData",
      dbdownloadLink: "getDbDownloadLink",
    }),
    computedDateFormatted: {
      get() {
        return this.formatDate(this.date);
      },
      set() { },
    },
  },

  watch: {
    dialog(val) {
      this.formatFlag = true;
    },
  },

  created() {
    this.getEdisList(true);
    this.downLoadDbFormat();
  },

  methods: {
    async getEdisList(val) {
      if (val || this.$refs.form.validate()) {
        let jsonObj = {
          created_on: this.date,
        };
        this.$store.dispatch("uploadFile/getEdisList", jsonObj);
      }
    },
    callDialog(data) {
      data && data != `""` ? (this.dialog = true) : "";
      this.currentJson = data;
    },
    format() {
      this.formatFlag ? (this.currentJson = JSON.parse(this.currentJson)) : "";
      this.formatFlag = !this.formatFlag;
    },
    
    // saveFile(blob, filename) {
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(blob, filename);
    //   } else {
    //     const a = document.createElement('a');
    //     document.body.appendChild(a);
    //     const url = window.URL.createObjectURL(blob);
    //     a.href = url;
    //     a.download = filename;
    //     a.click();
    //     setTimeout(() => {
    //       window.URL.revokeObjectURL(url);
    //       document.body.removeChild(a);
    //     }, 0)
    //   }
    // },

    downloadTextfile() {
     let jsonObj = {
        created_on: this.date,
      };
      this.$store.dispatch('edisdata/getData', jsonObj)
    },


    copyTextFunc() {
      navigator.clipboard.writeText(JSON.stringify(this.currentJson));
      this.copyText = "Copied";
      setTimeout(() => {
        this.copyText = "Copy";
      }, 2500);
    },

    async downLoadDbFormat() {
      let jsonObj = {
        created_on: this.date,
      };
      await this.$store.dispatch('edisdata/getData', jsonObj)
    },
    
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    functdownloadDbFormat(url) {
      let a = document.createElement('a');
      a.href = 'data:text/plain;charset=UTF-8,' + '' + url;
      a.download = url.substr(url.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  },


};
</script>

