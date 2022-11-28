<template>
  <div>
    <v-form class="d-flex align-center" ref="form" v-model="formValid" @submit.prevent="getHoldingsList()">
      <v-row class="ma-0 pa-4 align-center">
        <v-col cols="12" sm="2" lg="2">
          <div class="pb-2 fsize14">User Id</div>
          <v-text-field dense outlined v-model="userId" @input="userId = userId.toUpperCase()"
            placeholder="Enter User Id" :rules="userIdRules"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" lg="2">
          <div class="pb-1">Date</div>
          <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
            max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field @click:append="dateMenu = true" @click:clear="expiryDate = ''" clearable
                v-model="computedDateFormatted" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                placeholder="Select the To Date" append-icon="mdi-calendar" dense v-bind="attrs" v-on="on">
              </v-text-field>
            </template>
            <v-date-picker v-model="expiryDate" :max="nowDate" :show-current="true" no-title @input="dateMenu = false">
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="2" lg="2">
          <div>
            <v-btn :loading="loading" height="40" depressed type="submit" color="primary"
              class="fsize12 text-capitalize">Submit</v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="d-flex justify-end" v-if="holdingsList.length > 0">
            <v-btn height="32" class="ma-2 text-capitalize" outlined large color="#2196F3FF" @click="editItem()">
              <v-icon class="mr-2" small>mdi-pencil</v-icon>
              Edit
            </v-btn>
            <div class="pr-4 pl-0 mt-2">
              <v-btn height="32" @click="downloadUnicodeCSV(holdingsList)" depressed min-width="fit-content"
                color="primary" class="text-capitalize">
                Download <v-icon class="mx-2 fsize18">mdi-cloud-download </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>

    <!-- update auth flag -->
    <v-row class="ma-0 pa-4 align-center" v-if="holdingsList.length > 0 && holdingsDetails">
      <v-col cols="12" sm="2" lg="2">
        <div>
          <label class="fsize14">Update Auth Flag</label>
          <v-select dense height="40" class="select mt-2" :items="authflagid" label="" v-model="authflag" outlined>
          </v-select>
        </div>
      </v-col>
      <v-col cols="12" sm="2" lg="1">
        <div class="px-5">
          <v-btn height="40" depressed type="submit" color="primary" class="fsize12 text-capitalize"
            @click="getUpdateAuthflag()">Update</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="2" lg="2">
        <div>
          <label class="fsize14">Update POA Status</label>
          <v-select dense height="40" class="select mt-2" :items="poastatus" v-model="poaStatus" outlined></v-select>
        </div>
      </v-col>
      <v-col cols="12" sm="2" lg="2">
        <div class="px-5">
          <v-btn height="40" depressed type="submit" color="primary" class="fsize12 text-capitalize"
            @click="getPoaUpdate()">Update</v-btn>
        </div>
      </v-col>

    </v-row>
    <v-simple-table id="tableData" v-if="holdingsList.length > 0" class="my-5">
      <thead>
        <tr class="tableRow">
          <th class="fsize12 font-weight-normal tableContent">Symbol</th>
          <th class="text-center fsize12 font-weight-normal tableContent">QTY.</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Buy Average</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Buy Value</th>
          <th class="text-center fsize12 font-weight-normal tableContent">POA Status</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Auth Flag</th>
          <th class="text-center fsize12 font-weight-normal tableContent">ISIN Number</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Holdings Type</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Req ID</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Txn ID</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Created On</th>
          <th class="text-center fsize12 font-weight-normal tableContent">Updated On</th>
        </tr>

      </thead>
      <tbody>
        <tr class="tableRow" v-for="(i, idex) in holdingsList" :key="idex">
          <td class="tableContent">{{ i.symbol }}</td>
          <td class="text-center tableContent">{{ i.quantity }}</td>
          <td class="text-center tableContent">{{ i.buy_avg }}</td>
          <td class="text-center tableContent">{{ i.buy_value }}</td>
          <td class="text-center tableContent">{{ i.poa_status }}</td>
          <td class="text-center tableContent">{{ i.auth_flag }}</td>
          <td class="text-center tableContent">{{ i.isin }}</td>
          <td class="text-center tableContent">{{ i.holdings_type }}</td>
          <td class="text-center tableContent">{{ i.req_id }}</td>
          <td class="text-center tableContent">{{ i.txn_id }}</td>
          <td class="text-center tableContent">{{ i.created_on ? getDateString(new Date(i.created_on.split(' ')[0]),
              "d-M-y") : ''
          }}</td>
          <td class="text-center tableContent">{{ i.updated_on }}</td>
        </tr>
      </tbody>

    </v-simple-table>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  name: "holdingsList",
  mixins: [commonFunc],
  data: () => ({
    userId: "",
    authflag: "",
    poaStatus: "",
    holdingsDetails: false,
    poastatus: ["Y", "N"],
    authflagid: [0, 1],
    headers: [
      {
        text: "Symbol",
        align: "left",
        sortable: false,
        value: "symbol",
      },
      {
        text: "QTY.",
        align: "center",
        sortable: false,
        value: "quantity",
      },
      {
        text: "Created On",
        align: "center",
        sortable: false,
        value: "created_on",
      },
      {
        text: "Buy Average",
        align: "center",
        sortable: false,
        value: "buy_avg",
      },
      {
        text: "Buy Value",
        align: "center",
        sortable: false,
        value: "buy_value",
      },
      {
        text: "POA Status",
        align: "center",
        sortable: false,
        value: "poa_status",
      },
      {
        text: "Auth Flag",
        align: "center",
        sortable: false,
        value: "auth_flag",
      },
      {
        text: "ISIN No",
        align: "center",
        sortable: false,
        value: "isin",
      },
      {
        text: "Holdings Type",
        align: "center",
        sortable: false,
        value: "holdings_type",
      },
    ],
    formValid: true,
    expiryDate: "",
    dateMenu: false,
    userIdRules: [
      (v) => !!v || "User Id is required",
      (v) =>
        (v && v.length >= 2) || "User Id must be greater than 2 characters",
    ],
    nowDate: new Date().toISOString().slice(0, 10),
    date: new Date(),
    picker: new Date().toISOString().substr(0, 10),
    landscape: false,
    reactive: false,
  }),
  computed: {
    ...mapGetters({
      loading: "getLoader",
      search: "getSearch",
    }),
    ...mapGetters(
      "uploadFile",
      { holdingsList: "getHoldingsList" },
      { userid: "userDetails" }
    ),
    computedDateFormatted: {
      get() {
        return this.formatDate(this.expiryDate);
      },
      set() { },
    },
  },
  mounted() { },
  methods: {
    getHoldingsList() {
      if (this.$refs.form.validate()) {
        let jsonObj = {
          userId: this.userId,
          createdOn: this.expiryDate,
        };
        this.$store.dispatch("uploadFile/getHoldingsList", jsonObj);
      }
    },
    getPoaUpdate() {
      let json = {
        userId: this.userId,
        Poastatus: this.poaStatus,
      };
      this.$store.dispatch("uploadFile/updatePOA", json);
    },
    getUpdateAuthflag() {
      let jsonObj = {
        userId: this.userId,
        authFlag: this.authflag,
      };
      this.$store.dispatch("uploadFile/updateAuthFlag", jsonObj);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    editItem() {
      this.holdingsDetails = !this.holdingsDetails;
    },
  },
};
</script>

