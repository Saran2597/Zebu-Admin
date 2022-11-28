<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      <v-col cols="12" class="pa-0">
        <h3 width="100" height="24" class=".text-lg-h6">
          Edit Scrip
        </h3>
      </v-col>
    </v-row>

    <div class="mt-1">
      <v-form @submit.prevent="editForm" ref="form" v-model="form" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Scrip Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Symbol Name</div>
              <v-text-field autofocus dense height="40px" v-model="symbolName" placeholder="Enter the Symbol Name" autocomplete="off" outlined></v-text-field>
              <v-row no-gutters>
                <v-col class="pr-2">
                  <div class="pb-1 secondaryColor fsize14">Expiry Date</div>
                  <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field  @click:append="dateMenu = true" v-model="computedDateFormatted" outlined persistent-hint placeholder="Enter the Expiry Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="expiryDate" :show-current="true" no-title @input="dateMenu = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col class="pl-2">
                  <div class="pb-1 secondaryColor fsize14">Token</div>
                  <v-text-field dense height="40px" v-model="token" placeholder="Enter the Token" autocomplete="off" outlined></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="pr-2">
                  <div class="pb-1 secondaryColor fsize14">Group Name</div>
                  <v-text-field dense height="40px" v-model="groupName" placeholder="Enter the Group Name" autocomplete="off" outlined></v-text-field>
                </v-col>
                <v-col class="pl-2">
                  <div class="pb-1 secondaryColor fsize14">Exchange Segment</div>
                  <v-select dense outlined v-model="exchSegment" :items="exchList" menu-props="offset-y" placeholder="Select Exchange"></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="pr-2">
                  <div class="pb-1 secondaryColor fsize14">Tick Size</div>
                  <v-text-field dense height="40px" v-model="tickSize" placeholder="Enter the Tick Size" autocomplete="off" outlined></v-text-field>
                </v-col>
                <v-col class="pl-2">
                  <div class="pb-1 secondaryColor fsize14">Lot Size</div>
                  <v-text-field dense height="40px" v-model="lotSize" placeholder="Enter the Lot Size" autocomplete="off" outlined></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="pr-2">
                  <div class="pb-1 secondaryColor fsize14">Strike Price</div>
                  <v-text-field dense height="40px" v-model="strikePrice" placeholder="Enter the Strike Price" autocomplete="off" outlined></v-text-field>
                </v-col>
                <v-col class="pl-2">
                  <div class="pb-1 secondaryColor fsize14">Option Type</div>
                  <v-text-field dense height="40px" v-model="optionType" placeholder="Enter the Option Type" autocomplete="off" outlined></v-text-field>
                </v-col>
              </v-row>
              <div class="pb-1 secondaryColor fsize14">Instrument Type</div>
              <v-text-field dense height="40px" v-model="insType" placeholder="Enter the Instrument Type" autocomplete="off" outlined></v-text-field>
              <div class="pb-1 secondaryColor fsize14">Trading Symbol</div>
              <v-text-field dense height="40px" v-model="tradSymbol" placeholder="Enter the Trading Symbol" autocomplete="off" outlined></v-text-field>
              <div class="pb-1 secondaryColor fsize14">Formated Instrument Name</div>
              <v-text-field dense height="40px" v-model="formatedInsName" placeholder="Enter the Formated Instrument Name" autocomplete="off" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize" min-width="80">Cancel</v-btn>
          <v-btn type="submit" height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" min-width="80">
            Save
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  data: () => ({
    symbolName: "",
    expiryDate: null,
    insType: "",
    groupName: "",
    dateMenu: false,
    token: "",
    strikePrice: "",
    optionType: "",
    lotSize: "",
    tradSymbol: "",
    tickSize: "",
    exchSegment: "",
    formatedInsName: "",
    form: true,
    currentData: [],
    exchList: [
      "NSE_CM",
      "BSE_CM",
      "NSE_FO",
      "BSE_FO",
      "CDS",
      "BCD",
      "MCX",
      "NSE_COM",
      "BSE_COM",
      "NSE Indices",
      "BSE Indices",
      "MCX Indices",
    ],
  }),
  methods: {
    resetForm() {
      this.symbolName = "";
      this.expiryDate = null;
    },
    async editForm() {
      let json = {
        symbol: this.symbolName,
        group_name: this.groupName,
        option_type: this.optionType,
        expiry_date: this.expiryDate,
        instrument_type: this.insType,
        exchange_segment: this.exchSegment.toLowerCase(),
        formatted_ins_name: this.formatedInsName,
        tick_size: this.tickSize,
        token: this.token,
        trading_symbol: this.tradSymbol,
        // instrument_name: this.,
        lot_size: this.lotSize,
        id: this.currentData.id,
        // isin: null,
        strike_price: this.strikePrice,
      };
      await this.$store.dispatch("cMaster/updateScripDetails", json);
      this.resetForm();
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  computed: {
    ...mapGetters("cMaster", {
      currentScrip: "getcurrentScrip",
    }),
    getcurrentScrip: {
      get() {
        return this.$store.getters.getcurrentScrip;
      },
      set(value) {},
    },
    computedDateFormatted() {
      return this.formatDate(this.expiryDate);
    },
  },
  watch: {},
  mounted() {
    this.currentData = JSON.parse(localStorage.getItem("currentScrip"));
    this.symbolName = this.currentData.symbol;
    this.insType = this.currentData.instrument_type;
    this.groupName = this.currentData.group_name;
    this.expiryDate = this.currentData.expiry_date;
    this.token = this.currentData.token;
    this.strikePrice = this.currentData.strike_price;
    this.optionType = this.currentData.option_type;
    this.lotSize = this.currentData.lot_size;
    this.tradSymbol = this.currentData.trading_symbol;
    this.tickSize = this.currentData.tick_size;
    this.exchSegment = this.currentData.exchange_segment.toUpperCase();
    this.formatedInsName = this.currentData.formatted_ins_name;
  },
};
</script>