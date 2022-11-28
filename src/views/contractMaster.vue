<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Contract Master & Instrument Details
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
          </div>
        </div>
        
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Contractmaster Dashboard'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'Contractmaster Dashboard' && masterList.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Today's Count</th>
            <th class="tableHeader">Yesterday's Count</th>

          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(idx,index) in masterList" :key="index">
            <td class="tableContent py-2 "> {{idx.exchange_segment}}</td>
            <td class="tableContent ">{{idx.countMast}}</td>
            <td class="tableContent">{{idx.countArch }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Contract Master'">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="searchContractMaster()">
        <v-row class="ma-0 align-center">
          <v-col>
            <div class="pb-2 secondaryColor fsize14">*Symbol Name</div>
            <v-text-field clearable v-model="symbolName" @input="symbolName ? symbolName = symbolName.toUpperCase() : ''" dense outlined placeholder="Enter Symbol Name" :rules="symbolRules"></v-text-field>
          </v-col>
          <v-col>
            <div class="pb-2 secondaryColor fsize14">*Exchange</div>
            <v-select clearable dense outlined v-model="exchange" :items="exchList" menu-props="offset-y" placeholder="Select Exchange" :rules="exchangeRules"></v-select>
          </v-col>
          <v-col>
            <div class="pb-2 secondaryColor fsize14">Group Name</div>
            <v-text-field clearable v-model="groupName" @input="groupName ? groupName = groupName.toUpperCase() : ''" dense outlined placeholder="Enter Group Name"></v-text-field>
          </v-col>
          <v-col>
            <div class="pb-2 secondaryColor fsize14">Expiry Date</div>
            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field @click:append="dateMenu = true" @click:clear="expiryDate = ''" clearable v-model="computedDateFormatted" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" placeholder="Select the To Date" append-icon="mdi-calendar" dense v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="expiryDate" :show-current="true" no-title @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-btn type="submit" depressed height="40" color="primary" class="text-capitalize fsize12">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-data-table :loading="loader" v-if="searchList.length > 0" :headers="headers" v-bind:items="this.searchList" :value="this.searchList" class="my-5" id="table" item-key="name" single-select>
        <template v-slot:item="props">
          <tr>
            <td>{{props.item.symbol}}</td>
            <td class="text-center">{{props.item.expiry_date ? getDateString(new Date(props.item.expiry_date.split(' ')[0]), "d-M-y") : ''}}</td>
            <td class="text-center">{{props.item.tick_size}}</td>
            <td class="text-center">{{props.item.trading_symbol}}</td>
            <td class="text-center">{{props.item.instrument_type}}</td>
            <td class="text-center">{{props.item.lot_size}}</td>
            <td class="text-center">{{props.item.strike_price}}</td>
            <td class="text-center">
              <v-icon @click="editScrip(props.item)">mdi-pencil</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div v-else class="d-flex align-center justify-center min-height-100">
        <span class="secondaryColor">No Data Found</span>
      </div>
    </v-card>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Newly Added Symbols'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'Newly Added Symbols' && newlyAddedSymbols.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Group Name</th>
            <th class="tableHeader">Symbol</th>
            <th class="tableHeader">Instrument Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in newlyAddedSymbols" :key="index">
            <td class="tableContent py-2 "> {{item.exch_segment}}</td>
            <td class="tableContent ">{{item.group_name}}</td>
            <td class="tableContent">{{item.symbol }}</td>
            <td class="tableContent">{{item.instrument_name }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        No Records Found
      </div>
    </v-card>

    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Deactivated Symbols'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'Deactivated Symbols' && deactivatedSymbols.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Group Name</th>
            <th class="tableHeader">Symbol</th>
            <th class="tableHeader">Instrument Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in deactivatedSymbols" :key="index">
            <td class="tableContent py-2"> {{item.exch_segment}}</td>
            <td class="tableContent">{{item.group_name}}</td>
            <td class="tableContent">{{item.symbol }}</td>
            <td class="tableContent">{{item.instrument_name }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        No Records Found
      </div>
    </v-card>

    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Duplicate Symbols'">
      <v-simple-table id="tableData" class="border-right-left" v-if="tabSelect == 'Duplicate Symbols' && duplicateSymbols.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader">Exchange Segment</th>
            <th class="tableHeader">Duplicate Symbols</th>
            <th class="tableHeader text-center">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(item,index) in duplicateSymbols" :key="index">
            <td class="tableContent py-2"> {{item.exch_segment}}</td>
            <td class="tableContent">{{item.duplicate_symbols}}</td>
            <td class="tableContent text-center">{{item.count }}</td>
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
import commonFunc from "../mixins/commonFunctions";
export default {
  mixins: [commonFunc],

  data: () => ({
    // tabs: [
    //   "Contractmaster Dashboard",
    //   "Contract Master",
    //   "Newly Added Symbols",
    //   "Deactivated Symbols",
    //   "Duplicate Symbols",
    // ],
    tabs: [
      // "Contractmaster Dashboard",
      "Contract Master",
      "Newly Added Symbols",
      "Deactivated Symbols",
      "Duplicate Symbols",
    ],
    tabSelect: "Contractmaster Dashboard",
    symbolName: "",
    exchange: "",
    groupName: "",
    exchList: [
      "NSE_CM",
      "BSE_CM",
      "NSE_FO",
      "BSE_FO",
      "CDS",
      "BCD",
      "bcs_fo",
      "MCX",
      "NSE_COM",
      "BSE_COM",
      "NSE Indices",
      "BSE Indices",
      "MCX Indices",
    ],
    expiryDate: "",
    dateMenu: false,
    symbolRules: [(v) => !!v || "Symbol is required"],
    exchangeRules: [(v) => !!v || "Exchange is required"],
    valid: true,
    headers: [
      { text: "Symbol Name", value: "symbol", sortable: true },
      {
        text: "Expiry date",
        align: "center",
        value: "expiry_date",
        sortable: false,
      },
      {
        text: "Tick size",
        value: "tick_size",
        align: "center",
        sortable: false,
      },
      {
        text: "Token",
        value: "token",
        align: "center",
        sortable: false,
      },
      {
        text: "Exchange Segment",
        value: "exchange_segment",
        align: "center",
        sortable: false,
      },
      {
        text: "Trading symbol",
        value: "trading_symbol",
        align: "center",
        sortable: false,
      },
      {
        text: "Instrument type",
        value: "instrument_type",
        align: "center",
        sortable: false,
      },
      {
        text: "Lot size",
        value: "lot_size",
        align: "center",
        sortable: false,
      },
      {
        text: "Strike price",
        value: "strike_price",
        align: "center",
        sortable: false,
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapGetters("cMaster", {
      contractMasterData: "getContractMasterData",
      newlyAddedSymbols: "getNewlyAddedSymbols",
      deactivatedSymbols: "getDeactivatedList",
      duplicateSymbols: "getDuplicateSymbols",
      searchList: "getSearchList",
      masterList: "getMasterData",
      // contractmasterList: "contractmasterRecords"
    }),
    ...mapGetters({
      loader: "getLoader",
    }),
    computedDateFormatted: {
      get() {
        return this.formatDate(this.expiryDate);
      },
      set() {},
    },
  },

  watch: {
    tabSelect(currentTab) {
      switch (currentTab) {
        case "Newly Added Symbols":
          this.$store.dispatch("cMaster/getNewlyAddedList");
          break;
        case "Deactivated Symbols":
          this.$store.dispatch("cMaster/getDeactivatedList");
          break;
        case "Duplicate Symbols":
          this.$store.dispatch("cMaster/getDuplicateSymbols");
          break;
        case "Contractmaster Dashboard":
          this.$store.dispatch("cMaster/getMasterData");
          break;
      }
    },
  },

  mounted() {
    this.tabSelect = "Contractmaster Dashboard";
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    searchContractMaster() {
      if (this.$refs.form.validate()) {
        let fd = new FormData();
        fd.append("symbol", `%${this.symbolName}%`);
        fd.append("group", this.groupName ? this.groupName : "%");
        fd.append(
          "exch",
          this.exchange == "CDS"
            ? "cde_fo"
            : this.exchange == "BCD"
            ? "bcs_fo"
            : this.exchange == "MCX"
            ? "mcx_fo"
            : this.exchange.toLowerCase()
        );
        fd.append("expiry", this.expiryDate ? this.expiryDate : "%");
        this.$store.dispatch("cMaster/getSearchList", fd);
      }
    },
    async editScrip(item) {
      this.$store.commit("cMaster/SET_CURRENTSCRIP", item);
      localStorage.setItem("currentScrip", JSON.stringify(item));
      this.$router.push({ path: "editScrip", params: { data: item } });
    },
  }
};
</script>

<style>
</style>