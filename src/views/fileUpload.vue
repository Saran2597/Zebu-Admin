<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">File Upload
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black"></v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory show-arrows>
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

    <!-- POSITIONS UPLOAD -->
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Positions Upload'">
      <v-row no-gutters class="px-4 py-10">
        <v-col cols="12" sm="12" md="6" lg="3">
          <div class="fsize14 font-weight-bold primaryColor pb-4">Positions File Upload</div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <div class="primaryColor fsize14 pb-1">NSE Futures & Options</div>
          <v-file-input :loading="nfoLoader" class="fileInput" max-width="450px" autofocus id="file" type="file" placeholder="Select file" ref="nseFoFile" @click:clear="uploadDoc('clear')" @change="uploadDoc(nseFoFile,'NFO')" :multiple="false" v-model="nseFoFile" accept=".xls" outlined dense append-icon="mdi-folder-open" prepend-icon=""></v-file-input>
          <div class="primaryColor fsize14 pb-1">NSE CDS</div>
          <v-file-input :loading="cdsLoader" class="fileInput" max-width="450px" id="file" type="file" placeholder="Select file" ref="cdsFile" @click:clear="uploadDoc('clear')" @change="uploadDoc(cdsFile,'CDS')" :multiple="false" v-model="cdsFile" accept=".xls" outlined dense append-icon="mdi-folder-open" prepend-icon=""></v-file-input>
          <div class="primaryColor fsize14 pb-1">MCX</div>
          <v-file-input :loading="mcxLoader" class="fileInput" max-width="450px" id="file" type="file" placeholder="Select file" ref="mcxFile" @click:clear="uploadDoc('clear')" @change="uploadDoc(mcxFile,'MCX')" :multiple="false" v-model="mcxFile" accept=".xls" outlined dense append-icon="mdi-folder-open" prepend-icon=""></v-file-input>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        </v-col>
      </v-row>
    </v-card>

    <!-- HOLDINGS UPLOAD -->
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Holdings Upload'">
      <v-row no-gutters class="px-4 py-10">
        <v-col cols="12" sm="12" md="6" lg="3">
          <div class="fsize14 font-weight-bold primaryColor pb-4">Holdings File Upload</div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <div class="primaryColor fsize14 pb-1">Holdings Price and Qty Upload</div>
          <v-file-input :loading="hLoader" class="fileInput" max-width="450px" autofocus type="file" placeholder="Select file" ref="holdingFile" @click:clear="uploadHoldingsDoc('clear')" @change="uploadHoldingsDoc(holdingFile)" v-model="holdingFile" :multiple="false" accept=".xlsx" outlined dense append-icon="mdi-folder-open" prepend-icon=""></v-file-input>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        </v-col>
      </v-row>
    </v-card>

    <!-- NON POA -->
     <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'POA / Non POA'">
      <v-row no-gutters class="px-4 py-10">
        <v-col cols="12" sm="12" md="6" lg="3">
          <div class="fsize14 font-weight-bold primaryColor pb-4">POA / Non POA File Upload</div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <div class="primaryColor fsize14 pb-1">POA / Non POA</div>
          <v-file-input :loading="poaLoader" class="fileInput" max-width="450px" type="file" placeholder="Select file" ref="poaFile" @click:clear="uploadPoaDoc('clear')" @change="uploadPoaDoc(poaFile)" v-model="poaFile" :multiple="false" accept=".xlsx" outlined dense append-icon="mdi-folder-open" prepend-icon=""></v-file-input>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        </v-col>
      </v-row>
    </v-card>

    <!-- ADD NEW SCRIP -->
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'Add New Scrip'">
      <v-row no-gutters class="px-4 py-10">
        <v-col cols="12" sm="12" md="6" lg="3">
          <div class="fsize14 font-weight-bold primaryColor pb-4">Add Scrip</div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <div class="d-flex">
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Symbol Name</div>
              <v-text-field dense v-model='symbolName' placeholder="Enter Symbol" outlined autofocus></v-text-field>
            </div>
            <div class="w-100 d-none">
              <div class="primaryColor fsize14 pb-1">Exchange Segment</div>
              <v-select dense disabled v-model="exchangeSegment" :value="exchange == 'NSE' ? exchangeSegment = 'nse_cm' : exchange == 'BSE' ?  exchangeSegment = 'bse_cm' : ''" :items="eqSegItems" outlined :menu-props="{ bottom: true, offsetY: true }"></v-select>
            </div>
          </div>
          <div class="d-flex">
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Token</div>
              <v-text-field class="mr-3" dense type="number" v-model.number="token" @keypress="restrictDotOperator($event)" placeholder="Enter Token" outlined></v-text-field>
            </div>
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Select Exchange</div>
              <v-select class="" dense v-model="exchange" :items="eqItems" outlined :menu-props="{ bottom: true, offsetY: true }"></v-select>
            </div>
          </div>
          <div class="d-flex">
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Price Range From</div>
              <v-text-field class="mr-3" dense type="number" v-model.number="priceRangeFrom" @keypress="allowTwoDigitsAfterDecimal($event)" placeholder="Enter Price Range From" outlined></v-text-field>
            </div>
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Price Range To</div>
              <v-text-field dense type="number" v-model.number="priceRangeTo" :data-toFixed="2" placeholder="Enter Price Range To" outlined></v-text-field>
            </div>
          </div>
          <div class="d-flex">
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Lot size</div>
              <v-text-field class="mr-3" dense type="number" v-model="lotSize" pattern="^[^.]*$" @keypress="restrictDotOperator($event)" placeholder="Enter LotSize" outlined></v-text-field>
            </div>
            <div class="w-100">
              <div class="primaryColor fsize14 pb-1">Ticksize</div>
              <v-text-field dense type="number" v-model.number="tickSize" placeholder="Enter Ticksize" outlined></v-text-field>
            </div>
          </div>
          <div class="primaryColor fsize14 pb-1">Group Name</div>
          <v-text-field dense v-model='groupName' placeholder="Enter Group Name" outlined></v-text-field>
          <div class="primaryColor fsize14 pb-1">Company Name</div>
          <v-text-field dense v-model="companyName" placeholder="Enter Company Name" outlined></v-text-field>

          <div class="d-flex justify-center align-center mt-4">
            <v-checkbox v-model="cacheResetSwitch" color="black"></v-checkbox>
            <div class="red--text fsize14 mr-4">USE WITH CAUTION - Reload Contract / Scrip Cache</div>
            <v-btn :disabled="!cacheResetSwitch" @click="cacheResetDialog = true" class="text-capitalize" color="success" text outlined width="150">Reset</v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <div class="d-flex w-100 justify-end"><a @click="resetAllScripForm" class="secondaryColor">Reset</a></div>
        </v-col>
      </v-row>
    </v-card>

    <div class="mt-5 pa-4 d-flex justify-end" v-if="tabSelect == 'Add New Scrip'">
      <v-btn height="40" width="96" depressed outlined color="grey--text" class=" mr-3 text-capitalize">Cancel</v-btn>
      <v-btn :loading="loading" height="40" width="96" depressed color="primary" @click="addScrip()" class="mr-3 text-capitalize">Submit</v-btn>
    </div>

    <div class="mt-5 pa-4 d-flex justify-end" v-if="tabSelect == 'Holdings Upload'">
      <v-btn height="40" width="96" depressed outlined color="grey--text" class=" mr-3 text-capitalize">Cancel</v-btn>
      <v-btn :loading="loading" height="40" width="96" depressed color="primary" @click="insertHoldingsFile()" class="mr-3 text-capitalize">Submit</v-btn>
    </div>

     <div class="mt-5 pa-4 d-flex justify-end" v-if="tabSelect == 'POA / Non POA'">
      <v-btn height="40" width="96" depressed outlined color="grey--text" class=" mr-3 text-capitalize">Cancel</v-btn>
      <v-btn :loading="loading" height="40" width="96" depressed color="primary" @click="insertPoaFile()" class="mr-3 text-capitalize">Submit</v-btn>
    </div>

    <div class="mt-5 pa-4 d-flex justify-end" v-if="tabSelect == 'Positions Upload'">
      <v-btn height="40" width="96" depressed outlined color="grey--text" class=" mr-3 text-capitalize">Cancel</v-btn>
      <v-btn :loading="loading" height="40" width="96" depressed color="primary" @click="insertFile()" class="text-capitalize fsize16">Submit</v-btn>
    </div>

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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loader: false,
    cdsFile: null,
    nseFoFile: null,
    mcxFile: null,
    tabs: ["Positions Upload", "Holdings Upload", "Add New Scrip"],
    tabSelect: "Positions Upload",

    // add script models
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
    eqItems: ["NSE", "BSE" , "NFO" ,"BFO" ,"MCX", "CDS", "BCD"],
    eqSegItems: ["nse_cm", "bse_cm"],
    cacheResetSwitch: false,
    cacheResetDialog: false,

    //
    holdingFile: null,
    poaFile: null,
  }),
  computed: {
    ...mapGetters({ loading: "getLoader" }),
    ...mapGetters("uploadFile", {
      hLoader: "getHLoader",
      nfoLoader: "getNfoLoader",
      cdsLoader: "getCdsLoader",
      mcxLoader: "getMcxLoader",
      poaLoader: "getPoaLoader",
    }),
  },
  watch: {
    cacheResetDialog(val) {
      this.cacheResetSwitch = false;
    },
  },
  methods: {
    resetAll() {
      this.cdsFile = null;
      this.nseFoFile = null;
      this.mcxFile = null;
      this.holdingFile = null;
      this.poaFile = null;
    },
    uploadDoc(file, exch) {
      if (file == "clear" || file == null) return;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("exch", exch);
      this.$store.dispatch("uploadFile/uploadFile", {
        formData: formData,
        exch: exch,
      });
    },
    uploadHoldingsDoc(file) {
      if (file == "clear" || file == null) return;
      let formData = new FormData();
      formData.append("file", file);
      this.$store.dispatch("uploadFile/loadHoldingFile", formData);
    },
    uploadPoaDoc(file) {
      if (file == "clear" || file == null) return;
      let formData = new FormData();
      formData.append("file", file);
      this.$store.dispatch("uploadFile/loadPoaFile", formData);
    },
    async insertFile(data, exch) {
      if (
        this.cdsFile != null &&
        this.nseFoFile != null &&
        this.mcxFile != null
      ) {
        await this.$store.dispatch("uploadFile/insertFile");
        this.cdsFile = null;
        this.nseFoFile = null;
        this.mcxFile = null;
      } else {
        this.$store.commit("SET_SNAKBAR", {
          msg: "Please Upload All Documents",
          show: true,
          color: "red lighten-1",
          timeout: 2500,
        });
      }
    },
    async insertHoldingsFile() {
      if (this.holdingFile != null) {
        await this.$store.dispatch("uploadFile/insertHoldingsFile");
        this.holdingFile = null;
      } else {
        this.$store.commit("SET_SNAKBAR", {
          msg: "Please Upload Document",
          show: true,
          color: "red lighten-1",
          timeout: 2500,
        });
      }
    },
    async insertPoaFile() {
      if (this.poaFile != null) {
        await this.$store.dispatch("uploadFile/insertPoaFile");
        this.poaFile = await [];
      } else {
        this.$store.commit("SET_SNAKBAR", {
          msg: "Please Upload Document",
          show: true,
          color: "red lighten-1",
          timeout: 2500,
        });
      }
    },
    resetAllScripForm() {
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
    async insertPOAFile() {
      this.$store.dispatch("scripInfo/insertPoaFile").then((res) => {
        this.resetAll();
      });
    }
  },
};
</script>

