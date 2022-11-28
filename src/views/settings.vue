<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Settings
          <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active, toggle }" :value="n">
                <span @click="date = null; userId1 = ''">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                    :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="py-2">
      <div class="px-4" v-if="tabSelect == 'Version'">
        <div class="d-flex justify-end">
          <v-btn depressed color="primary" class="text-capitalize fsize14 my-1" @click="addVersion()">Add Version
          </v-btn>
        </div>
        <v-data-table v-if="getMobileVersionDetails.length != 0" :headers="headers"
          v-bind:items="getMobileVersionDetails" :value="getMobileVersionDetails" class="elevation-1 my-2" id="table"
          item-key="name" single-select>

          <template v-slot:item="props">
            <tr>
              <td>{{ props.index + 1 }}</td>
              <td class="text-center">{{ props.item.version }}</td>
              <td class="text-center">{{ props.item.deviceType }}</td>
              <td class="text-center">
                <v-checkbox class="ml-8" :input-value="props.item.isUpdateAvbl == 1 ? true : false"></v-checkbox>
              </td>
              <td class="text-center">
                <v-icon class="mr-2" @click="updateItem(props.item.version)">mdi-pencil</v-icon>
                <v-icon class="ml-2" @click="deleteItem(props.item.version)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>

        <div v-else class="d-flex align-center justify-center min-height-100">
          <div class="primaryColor fsize20">No Data Found</div>
        </div>
      </div>

      <div class="px-4" v-if="tabSelect == 'Cache Reload'">

        <v-card class="px-8 py-8">
          <div class="fsize14 font-weight-bold primaryColor pb-4">
            Holdings
          </div>
          <div class="row ma-0 pb-0">

            <div class="d-flex flex-wrap">

              <div class="pr-5 fsize14">
                <div class="pb-1">User ID</div>
                <v-text-field hide-details outlined dense placeholder="Enter the UserId" v-model="userId">
                </v-text-field>
              </div>
              <div>
                <div class="pb-1 fsize14">User</div>
                <span class="">
                  <v-btn outlined color="primary" @click="reloadData()">
                    Reload Holdings
                  </v-btn>
                </span>
              </div>
            </div>

          </div>

          <div class="row ma-0">
            <div class="d-flex">

              <div class="mt-4">
                <div class="pb-1 fsize14">All User</div>
                <span class="ml-0">
                  <v-btn outlined color="primary" height="40" style="height:40px" @click="reloadData()">
                    Relaod all holdings
                  </v-btn>
                </span>
              </div>
            </div>
          </div>

          <div class="fsize14 font-weight-bold primaryColor mt-6">
            Positions
          </div>
          <div class="row ma-0 pb-0 pt-6">

            <div class="d-flex flex-wrap">

              <div class="pr-5 fsize14">
                <div class="pb-1">User ID</div>
                <v-text-field hide-details outlined dense placeholder="Enter the UserId" v-model="userId">
                </v-text-field>
              </div>
              <div>
                <div class="pb-1 fsize14">User</div>
                <span class="ml-0">
                  <v-btn outlined color="primary" @click="reloadPositions()">
                    Reload Positions
                  </v-btn>
                </span>
              </div>
            </div>

          </div>
          <div class="row ma-0">
            <div class="d-flex">

              <div class="mt-4">
                <div class="pb-1 fsize14">All User</div>
                <span class="ml-0">
                  <v-btn outlined color="primary" height="40" style="height:40px" @click="reloadPositions()">
                    Relaod all Positions
                  </v-btn>
                </span>
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <div class="px-4" v-if="tabSelect == 'User Counts'">

        <v-card class="px-2 py-0">
          <!-- <div class="fsize14 font-weight-bold primaryColor pb-4">
    Holdings
  </div> -->
          <v-form ref="form" v-model="valid" @submit.prevent="getChartInfo('arg')" lazy-validation>
            <div class="d-flex align-center">
              <div class="pa-4">
                <div class="pb-2 secondaryColor fsize14">*From Date</div>
                <v-menu v-model="dateMenu1" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field @click:append="dateMenu1 = true" class="apiKeyInput" v-model="computedDateFormatted1"
                       outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                      :rules="fromDateRules" placeholder="Select the From Date" append-icon="mdi-calendar" readonly
                      dense v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="fromDate" :show-current="true" no-title @input="dateMenu1 = false">
                  </v-date-picker>
                </v-menu>
              </div>

              <div class="pa-4">
                <div class="pb-2 secondaryColor fsize14">*To Date</div>
                <v-menu v-model="dateMenu2" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field @click:append="dateMenu2 = true" class="apiKeyInput" v-model="computedDateFormatted2"
                       outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }"
                      :rules="toDateRules" placeholder="Select the To Date" append-icon="mdi-calendar" readonly dense
                      v-bind="attrs" v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="toDate" :show-current="true" no-title @input="dateMenu2 = false">
                  </v-date-picker>
                </v-menu>
              </div>
              <div>
                <!-- <div class="pb-1">Choose Type</div>
              <v-select
          :items="items"
          label="Solo field"
          outlined
          solo
        ></v-select> -->
                <div class="pb-2 secondaryColor fsize14">*Choose Type</div>
                <v-select  dense outlined v-model="chartName" :items="chartType" item-value="textid"   item-text="text" menu-props="offset-y" placeholder="Select Exchange" :rules="chartTypeRules" @change="changeSelectedValue($event)"></v-select>
              </div>
              <v-btn type="submit" height="40" depressed color="primary" class="text-capitalize fsize14 ml-4"
               >Submit</v-btn>
            </div>
          </v-form>

        </v-card>
        <v-card class="px-2 py-0 my-4">
          <div v-if="this.chartName == 'Date_Counts'"  class="d-flex align-center justify-center h-450">
            <v-chart class="chart" v-if="!loading" autoresize :options="getList"  style="height:450px"/>
            <v-progress-circular v-if="loading" class="ml-2" indeterminate size="36" :width="4" color="black">
            </v-progress-circular>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'Day_Counts'" class="d-flex align-center justify-center h-450">
            <v-chart class="chart" autoresize :options="getDay"/>
            <!-- <v-progress-circular class="ml-2" indeterminate  size="36" :width="4" color="black">
            </v-progress-circular> -->
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'Exch_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getExchangecount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'pcode_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getpcodeCount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'prc_type_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getpricecount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'trans_type_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="gettanstypecount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'user_wise_order_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getUserwisecount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'date_wise_sumof_order'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getDatewisecount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'trading_symbol_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="gettardingsymbolcount"/>
          </div>
        </v-card>
        <v-card>
          <div  v-if="this.chartName == 'order_type_Counts'" class="d-flex align-center justify-center">
            <v-chart class="chart" autoresize :options="getordertypecount"/>
          </div>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="confirmationDialog" width="370" overlay-color="#84899D">
      <v-card class="pa-4 cardBoxShadow rounded-lg" height="200">
        <v-form lazy-validation ref="formRef" v-model="formValid" @submit.prevent="confirm()">
          <div class="secondaryColor fsize14 d-flex justify-space-between">
            <div>Are you sure want to Reload Contract ?</div>
            <div>
              <v-icon @click="confirmationDialog = false" color="light-blue">mdi-close-circle-outline</v-icon>
            </div>
          </div>

          <div class="red--text mt-5 fsize12">Please type <span class="fsize14">{{ confirmText }}</span> to confirm.
          </div>
          <div class="mt-2">
            <v-text-field outlined dense height="32" v-model="validateText" :rules="validateTextRules"></v-text-field>
          </div>
          <div class="d-flex justify-end">
            <v-btn :disabled="confirmText != validateText" height="32" width="86" type="submit" depressed outlined text
              color="light-blue" class="text-capitalize white--text fsize12 mr-2">
              Confirm
            </v-btn>
            <v-btn height="32" width="86" @click="confirmationDialog = false; $refs.formRef.reset()" depressed
              color="black" outlined text class="text-capitalize fsize12">
              Cancel
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
    <v-layout row justify-center>
      <v-dialog v-model="captchadModel" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
            Are you sure you want to reload holdings?
          </v-card-title>
          <v-card-text>Please type <span style="font-weight: bold; color: black;">{{ this.token }}</span> to confirm ?
          </v-card-text>
          <div class="px-6">
            <v-text-field label="Enter Captcha" v-model="isFormValid"></v-text-field>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="captchadModel = false">
              Close
            </v-btn>
            <v-btn color="red darken-1" text :disabled="!isFormValid" @click="deleteNews()">
              YES, Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="positionDailog" width="370" overlay-color="#84899D">
      <v-card>
        <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
          Are you sure you want to reload positions?
        </v-card-title>
        <v-card-text>Please type <span style="font-weight: bold; color: black;">{{ confirmText }}</span> to confirm ?
        </v-card-text>
        <div class="px-6 mt-1">
          <v-text-field label="Enter Captcha" v-model="isFormValid"></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="positionDailog = false">
            Close
          </v-btn>
          <v-btn color="red darken-1" text :disabled="confirmText != isFormValid" @click="save()">
            YES, Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addMobileVersion" persistent width="370" overlay-color="#84899D">
      <v-card>
        <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
          Add version
        </v-card-title>
        <div class="px-6 mt-1">
          <label class="fsize14" for="">Version ID</label>
          <v-text-field clearable class="apiKeyInput" placeholder="Enter version number" v-model="mobileVersion"
            outlined dense></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addMobileVersion = false">
            Close
          </v-btn>
          <v-btn color="red darken-1" text :disabled="!mobileVersion" @click="saveVesrion()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updataeDailog" persistent width="370" overlay-color="#84899D">
      <v-card>
        <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
          Update version
        </v-card-title>
        <div class="px-6 mt-1">
          <label class="fsize14" for="">Version ID</label>
          <v-text-field clearable class="apiKeyInput" placeholder="Enter version number" v-model="mobileVersion"
            outlined dense></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updataeDailog = false">
            Close
          </v-btn>
          <v-btn color="red darken-1" text :disabled="!mobileVersion" @click="updataVesrion()">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteVersionModel" persistent width="370" overlay-color="#84899D">
      <v-card>
        <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
          Are you sure you want to delete the Mobile Version
        </v-card-title>
        <v-card-text>Please type <span style="font-weight: bold; color: black;">{{ confirmText }}</span> to confirm ?
        </v-card-text>
        <div class="px-6 mt-1">
          <v-text-field label="Enter Captcha" v-model="mobileVersiondelete"></v-text-field>

        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeletdailog()">
            Close
          </v-btn>
          <v-btn color="red darken-1" text :disabled="confirmText != mobileVersiondelete" @click="deleteVesrion()">
            YES, Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
import VChart from "vue-echarts";
import "@/plugins/echart";
export default {
  name: "settings",
  mixins: [commonFunc],

  components: {

    VChart
  },
  data: () => ({
    //tabs: ["Version", "Scheduler", "Cache Reload"],
    tabs: ["Version", "Cache Reload", 'User Counts'],
    tabSelect: "Version",
    isFormValid: "",
    valid: true,
    captcha: "",
    mobileVersion: '',
    mobileVersiondelete: '',
    toDate: null,
    dateMenu2: false,
    userId: '',
    token: "",
    radioGroup: 1,
    headers: [
      { text: "S.NO", align: "start", sortable: false },
      { text: "Version", align: "center", value: "version", sortable: false },
      { text: "Device Type", align: "center", value: "deviceType", sortable: false },
      {
        text: "Update Available",
        align: "",
        value: "isUpdateAvbl",
        sortable: false,
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
      },
    ],

    confirmationDialog: false,
    selectTypeDailog: false,
    captchadModel: false,
    positionDailog: false,
    addMobileVersion: false,
    deleteVersionModel: false,
    fromDate: null,
    updataeDailog: false,
    validateText: "",
    formValid: true,
    dateMenu1: false,
    deleteVersion: '',
    UpdateVersionNumber: '',
    chartName: '',
    defaultData: Boolean,
    constigency: Boolean,
    validateTextRules: [(v) => !!v || "Please enter text"],
    fromDateRules: [(v) => !!v || "From Date is required"],
    toDateRules: [(v) => !!v || "To Date is required"],
    chartTypeRules: [(v) => !!v || "Chart Type is required"],
    schedulerLists: [
      "nfoMap",
      "tokenMap",
      "tokenSymbolMap",
      "userKeyMap",
      "userSHAKeyMap",
      "userEncKeyMap",
      "accessLogRecords",
      "apiRequestCount",
      "user256Cache",
      "apiUser256Cache",
      "superAdminDetails",
      "nseTokenCache",
      "indexSymbolCache",
      "futureTokenCache",
      "marketDataCache",
      "vendorAuthCode",
      "positionTokenMap",
      "pledgeData",
      "payInDetails",
      "poaStatus",
      "isinTokenData",
      "settlementNo",
      "mostActiveStocks",
      "wsSession",
      "isinAvail",
    ],
    //chartType: ['Date-Count', 'Day-Count', 'Exchange-Count', 'Price Type', 'Pcode-Counts', 'Transtype-Counts'],
    chartType: [
      { text: 'Date Count', textid:  'Date_Counts'},
      { text: 'Day Count', textid: 'Day_Counts' },
      { text: 'Exchange Count', textid: 'Exch_Counts' },
      { text: 'Pcode Counts', textid: 'pcode_Counts' },
      { text: 'Transtype Counts', textid: 'trans_type_Counts' },
      { text: 'Price Type', textid: 'prc_type_Counts' },
      { text: 'Order Type', textid: 'order_type_Counts' },
      { text: 'Userwise Order', textid: 'user_wise_order_Counts' },
      { text: 'Datewise Order', textid: 'date_wise_sumof_order' },
      { text: 'Tradingsymbol Counts', textid: 'trading_symbol_Counts' },
    ],

  }),
  computed: {
    ...mapGetters("apiKey", {
      apiKeyDetails: "getApiKeyDetails",
      ApiKeyExpiryList: "getApiKeyExpiryList",
    }),
    ...mapGetters("mobileVersion", {
      getMobileVersionDetails: "getMobileVersion",

    }),
    ...mapGetters("logs", {
      chartLoading: "getChartLoading",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
    ...mapGetters({
      getList: "getUserCount",
      getDay: "getDayCount",
      getExchangecount: "getExchangeCount",
      getOrdercount: "getOrderCounts",
      getpcodeCount:'getpCodeCount',
      getpricecount: 'getpriceCount',
      gettanstypecount : 'getTranstypeCount',
      getUserwisecount: 'getuserwiseTrasntypeCount',
      getDatewisecount: 'getdatewiseCount',
      getordertypecount: 'getordertypeCount',
      gettardingsymbolcount:'gettradingSymbolCount',
      loading: 'getChartcountsLoading'
    }),
    confirmText() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
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

  watch: {},

  created() { },

  mounted() {
    this.randomNumberGenerator()
    this.$store.dispatch('mobileVersion/getMobileVersionInfo')

  },

  methods: {
    async confirm() {
      if (this.validateText == this.confirmText) {
        this.formValid = true;
      } else {
        this.formValid = false;
        return;
      }
      if (this.$refs.formRef.validate()) {
        this.confirmationDialog = false;
        this.$refs.formRef.reset();
      }
    },
    validateTextModel() {
      if (this.validateText == this.confirmText) {
        this.formValid = true;
      } else {
        this.formValid = false;
      }
    },

    reloadData() {
      this.captchadModel = true
    },
    randomNumberGenerator() {
      let randomToken = (Math.random() + 2).toString(36).substring(5);
      this.token = randomToken


    },
    reloadPositions() {
      this.positionDailog = true
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    save() {
      this.positionDailog = false
    },

    deleteNews() {

      if (this.token == this.isFormValid) {
        this.captchadModel = false

      }
      else if (this.token !== this.isFormValid) {
        console.log('wrong')
        this.captchadModel = true
      }
      this.isFormValid = ''
    },
    addVersion() {
      this.addMobileVersion = true

    },


    saveVesrion: function () {
      var jsonObj = {
        "mobileVersion": this.mobileVersion,
        "deviceType": 'MOB'
      }

      this.$store.dispatch('mobileVersion/addMobVersion', jsonObj)
      this.addMobileVersion = false

      this.$store.dispatch('mobileVersion/upDateMobVersion', jsonObj)
      this.addMobileVersion = false

    },


    deleteItem(val) {
      this.deleteVersion = val
      console.log(this.deleteVersion);
      this.deleteVersionModel = true
    },
    closeDeletdailog() {
      this.deleteVersionModel = false
      this.mobileVersiondelete = ''
    },

    deleteVesrion() {
      this.deleteVersionModel = false
      let jsonData = {
        "mobileVersion": this.deleteVersion,
        "deviceType": 'MOB'
      }
      this.$store.dispatch('mobileVersion/deleteMobVersion', jsonData)
      this.mobileVersion = ''
    },
    updateItem(val) {
      this.UpdateVersionNumber = val
      console.log(this.UpdateVersionNumber);
      this.updataeDailog = true
    },
    updataVesrion() {
      this.updataeDailog = false
      let jsonData = {
        "mobileVersion": this.mobileVersion,
        "deviceType": 'MOB'
      }
      this.$store.dispatch('mobileVersion/upDateMobVersion', jsonData)
      this.mobileVersion = ''
    },
   async getChartInfo(type) {
      if (this.$refs.form.validate()) {
        var tempData = {
          "from": this.computedDateFormatted1,
          "to": this.computedDateFormatted2,
          "chart_key": [this.chartName]
        }
        this.$store.dispatch('getPayOffData',tempData)
        // this.$store.dispatch('chartCount',tempData)
        // this.$store.dispatch('exchangeChart', tempData)
     
        // this.$store.dispatch('getExchange')
        
        this.selectTypeDailog = true
       
      }
      console.log(tempData);
   
    },
  //   chartCount(){
  //     var tempData = {
  //         "from": this.computedDateFormatted1,
  //         "to": this.computedDateFormatted2,
  //         "chart_key": [this.chartName]
  //       }
      
  // },
    changeSelectedValue(val,) {
      this.chartName = val
      console.log(this.chartName);
    },
    
    closeailog() {
      this.selectTypeDailog = false
    },
  
    changed(val) {
      console.log('changed')
      if (val == 'dateCount') {
        console.log("direct");
        this.defaultData = true
        this.constigency = false
        console.log(this.defaultData);
      }
      else if (val == 'dayCount') {
        this.constigency = true
        this.defaultData = false
        console.log('contigency');
        console.log(this.constigency);
      }
      let temArray = {
        "date-count": this.defaultData,
        "day-count": this.constigency
      }
      console.log(temArray);
    },
  },
};
</script>

<style>

.v-input--selection-controls {
  margin-top: 10px !important;
  padding-top: 4px !important;
  margin-bottom: -9px !important;
}
.v-input__control {
  width: 261px !important;
}
.h-450{
  height: 450px;
}
</style>