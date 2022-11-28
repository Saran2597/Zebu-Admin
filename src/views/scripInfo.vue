<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Scrip Info
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

    <!-- dialog form reset confirmation -->
    <v-dialog v-model="cacheResetDialog" max-width="350" height="250">
      <v-card class="pa-3 cardBoxShadow rounded-lg">
        <div class="pa-4 fsize13 secondaryColor">
          Are you sure want to reset the caches ?
        </div>
        <div class="d-flex mt-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" text depressed outlined class="text-capitalize mr-2" @click="resetCache()">Confirm</v-btn>
          <v-btn text depressed outlined class="text-capitalize" @click="cacheResetDialog = false;">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    tabSelect: null,
    tabs: ["Add Scrip"],
    loader: false,
    exchange: "NSE",
    exchangeSegment: "",
    symbolName: "",
    lotSize: Number,
    priceRangeTo: Number,
    token: Number,
    tickSize: Number,
    groupName: "",
    companyName: "",
    priceRangeFrom: Number,
    eqItems: ["NSE", "BSE"],
    eqSegItems: ["nse_cm", "bse_cm"],
    cacheResetSwitch: false,
    cacheResetDialog: false,
  }),

  watch: {
    cacheResetDialog(val) {
      this.cacheResetSwitch = false;
    },
  },
  methods: {
    resetAll() {
      this.exchange = "NSE";
      this.exchangeSegment = "";
      this.symbolName = "";
      this.lotSize = null;
      this.priceRangeTo = null;
      this.token = null;
      this.tickSize = null;
      this.groupName = "";
      this.companyName = "";
      this.priceRangeFrom = null;
    },
    isNumberKey(evt) {
      var charCode = evt.which ? evt.which : event.keyCode;
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

      return true;
    },
    restrictDotOperator(evt) {
      evt.key == "." && evt.keyCode == 46 ? evt.preventDefault() : "";
    },
    allowTwoDigitsAfterDecimal(e) {
      var t = e.target.value;
      e.value =
        t.indexOf(".") >= 0
          ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
          : t;
    },
    async resetCache() {
      this.$store.dispatch("scripInfo/resetCache").then((res) => {
        this.cacheResetDialog = false;
      });
    },
    async addScrip() {
      let JsonObj = {
        exch: this.exchange,
        exchSeg: this.exchangeSegment,
        groupName: this.groupName,
        symbol: this.symbolName,
        token: this.token,
        companyName: this.companyName,
        lotSize: this.lotSize,
        tickSize: this.tickSize,
        priceRangeFrom: this.priceRangeFrom,
        priceRangeTo: this.priceRangeTo,
      };
      await this.$store.dispatch("scripInfo/scripAdd", JsonObj).then((res) => {
        this.resetAll();
      });
    },
  },
};
</script>

