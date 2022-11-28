<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      <v-col cols="2" class="pa-0">
        <h3 width="100" height="24" class=".text-lg-h6">
          Sector Details
        </h3>
      </v-col>
    </v-row>

    <div class="mt-1">
      <v-form ref="form" v-model="form" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Sector Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Stock Name</div>
              <!-- <v-text-field autofocus dense height="40px" v-model="stockName" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="stockNameRules">
              </v-text-field> -->
              <div style="position:relative">
              <v-text-field autofocus height="40" class="fsize13" placeholder="Enter the Sector Name" v-model="stockName" clearable hide-no-data solo tile flat dense
                  open-on-clear @click:clear="onClickOutside();" outlined @input="
                    stockName ? (stockName = stockName.toString().toUpperCase()) : ''
                  " :rules="stockNameRules">
                </v-text-field>
                <div v-if="searchData.length > 0" v-click-outside="onClickOutside">
                <v-sheet transition="fade-transition" tile style="top: 45px;" class="searchContent">
                  <ul class="pl-0 borderbox">
                    <li class="
                        searchlist
                        px-2
                        py-3
                        body-2
                        border-bottom-light
                        d-flex
                        align-center
                        pointer
                      " v-for="(idx, index) in searchData" :key="index" @click="setStockDetails(idx)">
                      <div>
                        {{
                            idx.exch == "NSE" || idx.exch == "BSE"
                              ? idx.symbol
                              : idx.formattedInsName
                        }}
                      </div>
                      <v-spacer></v-spacer>
                      <p class="ma-0">
                        {{ idx.exch == "NFO" ? "" : idx.instrument_name }}
                      </p>
                      <label for="" class="fsize10 rounded min-width-40 pa-0 ml-3"><span :class="
                        idx.exch == 'NSE'
                          ? 'searchbuyColor'
                          : idx.exch == 'BSE'
                            ? 'searchsellColor'
                            : idx.exch == 'NFO'
                              ? 'cancelledColor'
                              : 'cancelledColor'
                      ">{{ idx.exch }}</span></label>
                    </li>
                  </ul>
                </v-sheet>
              </div>
              </div>
              <div class="pb-1 secondaryColor fsize14">Scrip Name</div>
              <v-text-field  dense height="40px" v-model="scripName" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="scripNameRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Exchange</div>
              <v-text-field dense height="40px" v-model="exchange" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="exchangeRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Token</div>
              <v-text-field dense height="40px" v-model="token" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="tokenRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Company Name</div>
              <v-text-field dense height="40px" v-model="companyName" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="companyRules">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize" min-width="80">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="createMappedSector" min-width="80">
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
  data: () => ({
    scripName: "",
    stockName: "",
    exchange: "NSE",
    token: "",
    companyName: "",
    scripNameRules: [(v) => !!v || "Scrip Name is required"],
    stockNameRules: [(v) => !!v || "Stock Name is required"],
    exchangeRules: [(v) => !!v || "Exchange is required"],
    tokenRules: [(v) => !!v || "Token is required"],
    companyRules: [(v) => !!v || "Company Name is required"],
    form: true,
    nseData: [],
    bseData: [],
  }),
  methods: {
    resetForm() {
      this.scripName = "";
      this.stockName = "";
      this.exchange = "";
      this.token = "";
      this.companyName = "";
    },
    async createMappedSector() {
      let sectorId = localStorage.getItem("sectorId");
      let jsonObj = {
        sectorId: sectorId,
        scripName: this.scripName,
        stockName: this.stockName,
        exch: this.exchange,
        token: this.token,
        companyName: this.companyName,
      };
      await this.$store.dispatch("sector/createSectorMapping", jsonObj);
      this.resetForm();
    },
    setStockDetails(currentData) {
      console.log(currentData);
      // if (currentData.exch.toUpperCase() === "NSE" || currentData.exch === "") {
      //   this.token = this.nseData.token;
      //   this.scripName = this.nseData.symbol;
      //   this.companyName = this.nseData.instrument_name;
      // } else if(this.exchange.toUpperCase() === "BSE") {
      //   this.token = this.bseData.token;
      //   this.scripName = this.bseData.symbol;
      //   this.companyName = this.bseData.instrument_name;
      // }
        this.token = currentData.token;
        this.scripName =  this.stockName = currentData.symbol;
        this.companyName = currentData.instrument_name;
        this.exchange = currentData.exch
        this.onClickOutside();
    },
    onClickOutside() {
      this.$store.commit("scripInfo/SET_SEARCH_SCRIPS", []);
    },
  },
  computed: {
    ...mapGetters({
      searchData: "getSearchData",
    }),
    ...mapGetters("scripInfo", {
      searchData: "scripSearch",
    }),
  },
  watch: {
    // stockName: async function (val) {
    //   this.stockName = val.toUpperCase();
    //   let jsonObj = { exchange: ["NSE", "BSE"], symbol: val };
    //   await this.$store.dispatch("getSearchData", jsonObj);
    //   this.nseData = [];
    //   this.bseData = [];
    //   this.searchData.forEach((el) => {
    //     if (el.symbol.toUpperCase().includes(this.stockName.toUpperCase()) && el.exch == "NSE") {
    //       this.nseData = el;
    //       this.setStockDeatails();
    //     } else if(el.symbol.toUpperCase().includes(this.stockName.toUpperCase()) && el.exch == "BSE"){
    //       this.bseData = el;
    //       this.setStockDeatails();
    //     }
    //   });
    // },
     stockName(val) {
      if (val && val?.length > 1) {
        this.$store.dispatch("scripInfo/scripSearch", val);
      }
    },
    // exchange: async function (val) {
    //   this.exchange = val.toUpperCase();
    //   this.setStockDeatails();
    // }
  },
  mounted() {},
};
</script>