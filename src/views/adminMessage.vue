<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">
          Push Notification
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex">
          <v-slide-group v-model="tabSelect" mandatory>
            <v-slide-item v-for="n in tabs" :key="n" :value="n" v-slot="{ active, toggle }">
              <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
            </v-slide-item>
          </v-slide-group>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>

    <v-card class="cardBoxShadow rounded-lg ma-4" v-if="tabSelect == 'Admin Message'">
      <v-form v-model="formValid" ref="msgForm" lazy-validation>
        <v-row no-gutters class="px-4 py-10">
          <v-col cols="12" sm="12" md="6" lg="3">
            <div class="fsize14 font-weight-bold primaryColor pb-4">
              Push Notifications
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="5">
            <div class="d-flex justify-space-between w-100">
              <div class="w-320">
                <div class="primaryColor fsize14 pb-1">Template</div>
                <v-select dense class="mr-3" v-model="template" placeholder="Select User Type" :items="items" outlined
                  autofocus :menu-props="{ bottom: true, offsetY: true }"></v-select>
              </div>
              <div class="w-32">
                <div class="primaryColor fsize14 pb-1">User Type</div>
                <!-- <v-select dense v-model="userType" placeholder="Select template" :items="['All', 'Individual']" outlined
                :menu-props="{ bottom: true, offsetY: true }"></v-select> -->

                <v-radio-group v-model="messageType" row class="mt-0 pt-2">
                  <!-- <v-radio label="All" name="active" value="all"></v-radio> -->
                  <v-radio label="Individual" name="active" value="individual"></v-radio>
                </v-radio-group>
              </div>
            </div>

            <div v-if="messageType == 'individual'">
              <div class="primaryColor fsize14 pb-1">User ID</div>
              <v-text-field dense @input="userId ? (userId = userId.toUpperCase()) : null" v-model="userId"
                placeholder="Enter User Id" outlined :rules="messageType == 'individual' ? userIdRules : null">
              </v-text-field>
            </div>

            <div v-if="template == 'Info with Link'">
              <div class="primaryColor fsize14 pb-1">Bitly URL</div>
              <v-text-field v-model="bitlyLink" outlined dense :rules="template == 'Info with Link' ? urlRules : null">
              </v-text-field>
            </div>

            <div>
              <div class="primaryColor fsize14 pb-1">Heading</div>
              <v-text-field v-model="title" outlined dense :rules="headingRules"></v-text-field>
            </div>

            <div>
              <div class="primaryColor fsize14 pb-1">Message</div>
              <v-textarea outlined v-model="message" name="input-7-4" placeholder="Enter the Template Message"
                :rules="messageRules">
              </v-textarea>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <div class="d-flex w-100 justify-end">
              <a @click="resetForm" class="secondaryColor">Reset</a>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-card class="cardBoxShadow rounded-lg ma-4" v-if="tabSelect == 'Recommendation'">
      <v-row no-gutters class="px-4 py-10">
        <v-col cols="12" sm="12" md="6" lg="3">
          <div class="fsize14 font-weight-bold primaryColor pb-4">
            Order Window
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="5">
          <div class="d-flex">
            <div class="w-100" v-click-outside="onClickOutside">
              <v-form v-model="formValid2" lazy-validation ref="msgForm1">
                <div class="d-flex justify-space-between">
                  <div class="mr-2">
                    <div class="primaryColor fsize14 pb-1">User Type</div>
                    <!-- <v-radio-group v-model="messageType" row class="mt-0 pt-2">
                      <v-radio label="Individual" name="active" value="individual"></v-radio>
                    </v-radio-group> -->
                    <v-select outlined dense height="40" v-model="userType" :items="['Individual', 'User Group']"
                      :menu-props="{ bottom: true, offsetY: true }"></v-select>
                  </div>
                  <div class="w-320">
                    <div v-if="userType == 'Individual'">
                      <div class="primaryColor fsize14 pb-1">User ID</div>
                      <v-text-field :disabled="userType != 'Individual'" dense
                        @input="userId ? (userId = userId.toUpperCase()) : null" v-model="userId"
                        placeholder="Enter User Id" outlined :rules="userType == 'Individual' ? userIdRules : null">
                      </v-text-field>
                    </div>
                    <div v-else>
                      <div class="secondaryColor fsize14 pb-1">User Group</div>
                      <v-autocomplete disabled placeholder="Select User Group" v-model="userGroup" dense outlined
                        :menu-props="{ bottom: true, offsetY: true }">
                      </v-autocomplete>
                    </div>
                  </div>
                </div>
                <div class="primaryColor fsize14 pb-1">Heading</div>
                <v-text-field v-model="title" outlined dense :rules="headingRules"></v-text-field>
                <div style="position:relative">
                  <div class="primaryColor fsize14 pb-1">
                    Search Scrips to Trade
                  </div>
                  <v-text-field height="40" class="fsize13" v-model="search" clearable hide-no-data solo tile flat dense
                    open-on-clear @click:clear="onClickOutside();" outlined @input="
                      search ? (search = search.toString().toUpperCase()) : ''
                    " :rules="scripRules">
                  </v-text-field>
                  <div v-if="searchData.length > 0">
                    <v-sheet transition="fade-transition" tile style="top: 68px;" class="searchContent">
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
                      " v-for="(idx, index) in searchData" :key="index" @click="callOrderWindow('buy', idx)">
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
              </v-form>

            </div>
          </div>
          <!-- orderwindow -->
          <!-- @submit.prevent="setPushNotifyOrderWindow()" -->
          <form v-if="showOrderWindow" class="d-flex flex-column orderwindow mt-5" name="orderwindow">
            <v-sheet class="headerclass" :class="orderType == 'buy' ? 'buyColor' : 'sellColor'" :style="
              $store.state.windowWidth < 330 ? 'height:auto !important' : ''
            ">
              <v-row class="ma-0 align-center">
                <v-col class="pa-0">
                  <div class="white--text fsize14 pb-1 text-capitalize">
                    {{
                        currentInstrument == null
                          ? scriptQuoteDetails.TSymbl
                          : currentInstrument
                    }}
                    <span class="ml-2" v-if="nseBseType">{{
                        getCurrentLtp
                    }}</span>
                  </div>
                  <!-- nse bse Radio switch -->
                  <v-radio-group hide-details="" :disabled="modifyOrder" v-if="nseBseType" v-model="nseBseRadioSwitch"
                    row class="orderWindowRadio pa-0 my-0 ml-0 d-flex align-center" height="24">
                    <span :class="nseBseRadioSwitch == 'NSE' ? 'bb-white' : ''" @click="
  nseBseRadioSwitch = 'NSE';
nseBseSwitch('NSE');
                    " class="
                        fsize12
                        white--text
                        d-flex
                        align-center
                        mr-2
                        cursor
                      ">
                      <!-- <customIcon style="height: 16px" class="mr-2" :name="nseBseRadioSwitch == 'NSE' ? 'radio-check' :'radio-blank'"  :width="'16'" :height="'16'" :color="'#ffffff'"  />  -->
                      NSE: {{ nseSwitchPrice }}
                    </span>
                    <span :class="nseBseRadioSwitch == 'BSE' ? 'bb-white' : ''" @click="
  nseBseRadioSwitch = 'BSE';
nseBseSwitch('BSE');
                    " class="fsize12 white--text d-flex align-center cursor">
                      <!-- <customIcon style="height: 16px" class="mr-2" :name="nseBseRadioSwitch == 'BSE' ? 'radio-check' :'radio-blank'"  :width="'16'" :height="'16'" :color="'#ffffff'"/> -->
                      BSE: {{ bseSwitchPrice }}
                    </span>
                  </v-radio-group>

                  <!-- Check NaN, null, empty, undefined for #### priceRangeDetails.Ltp && getCurrentLtp-->
                  <div v-else class="white--text fsize14 d-flex">
                    {{ getCurrentLtp }}
                  </div>
                </v-col>
                <v-col class="pa-0">
                  <div class="d-flex flex-column align-end">
                    <v-switch v-model="buySellRadio" :disabled="modifyOrder" dense @click="toggleOrderWindow()"
                      hide-details inset class="orderSwitch ma-0" color="white"></v-switch>
                    <!-- Check for both CDS and BCD -->
                    <div class="white--text fsize12 pt-1 font-weight-600" v-if="lowerRange != 0 && upperRange != 0">
                      {{
                          `DPR: ${currentExchange == "CDS" || currentExchange == "BCD"
                            ? parseFloat(lowerRange).toFixed(4)
                            : parseFloat(lowerRange).toFixed(2)
                          } -
                                            ${currentExchange == "CDS" || currentExchange == "BCD"
                            ? parseFloat(upperRange).toFixed(4)
                            : parseFloat(upperRange).toFixed(2)
                          }`
                      }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet class="border-bottom-light">
              <!-- order type tabs -->
              <v-tabs :show-arrows="true" @change="changeOrderTab()" v-model="orderTab"
                :color="orderType == 'buy' ? '#2992ec' : '#d13535'" dense max-width="30"
                class="orderWindowTab border-bottom-light">
                <v-tab class="primaryColor text-capitalize fsize12" :transition="false" :disabled="modifyOrder"
                  @click="selectedIndex(item)" v-for="(item, index) in orderTypeList" :key="index">
                  <span>{{ item }}</span>
                </v-tab>
              </v-tabs>

              <v-tabs-items :transition="false" class="px-2 py-2 border-bottom">
                <v-row class="ma-0 px-2 pb-3">
                  <!-- priceBtns -->

                  <v-col class="pa-0 mt-2">
                    <v-slide-group transition="none" v-model="prodType" mandatory class="pa-0 orderSlideGroup"
                      hide-arrows>
                      <v-slide-item v-for="(item, i) in showproductItems" :key="i" v-bind:value="item"
                        v-slot="{ active, toggle }">
                        <v-btn @change="setProductTab()" depressed :class="modifyOrder ? 'disabledSlideBtn' : ''"
                          :color="
                            active
                              ? orderType == 'buy'
                                ? 'buyColor'
                                : 'sellColor'
                              : 'unActiveColor'
                          " height="26" min-width="54" class="
                            fsize11
                            px-1
                            mr-2
                            rounded-sm
                            orderProdBtn
                            text-capitalize
                            fsize12
                          " @click="toggle">
                          {{ item }}
                        </v-btn>
                      </v-slide-item>
                    </v-slide-group>
                  </v-col>
                  <!-- priceBtns -->
                  <v-col class="pa-0 mt-2 d-flex justify-end">
                    <v-slide-group transition="none" v-model="priceType" mandatory class="pa-0 orderSlideGroup"
                      hide-arrows>
                      <v-slide-item v-for="(item, i) in showPriceItems" :key="i" v-bind:value="item"
                        v-slot="{ active, toggle }">
                        <v-btn @click="toggle" depressed :color="
                          active
                            ? orderType == 'buy'
                              ? 'buyColor'
                              : 'sellColor'
                            : 'unActiveColor'
                        " height="26" min-width="54" class="ml-2 px-1 rounded-sm text-capitalize fsize12">
                          {{
                              item == "L"
                                ? "Limit"
                                : item == "MKT"
                                  ? "Market"
                                  : item
                          }}
                        </v-btn>
                      </v-slide-item>
                    </v-slide-group>
                  </v-col>
                </v-row>

                <!-- input fields common -->
                <v-row class="ma-0">
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">Quantity</label>
                    <div>
                      <v-text-field id="qty" ref="qty" @input="quantityValidation" class="orderInput min-w-150" :min="0"
                        v-model.number="quantity" :step="minlot" @keypress="checkQuantity($event)" height="40" dense
                        type="number" single-line outlined hide-details autocomplete="off"></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">Price</label>
                    <div>
                      <v-text-field id="price" class="orderInput min-w-150" @input="priceValidation"
                        :disabled="!isPrice" :min="0" v-model.number="price" @keypress="decimalAllowed($event)"
                        :step="tickPrice" height="40" dense type="number" single-line outlined hide-details>
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">{{
                        orderTypeList[orderTab] == "Cover"
                          ? "SL Trigger Price"
                          : "Trigger Price"
                    }}</label>
                    <div>
                      <v-text-field id="triggerPrice" class="orderInput min-w-150" @input="triggerPriceValiation"
                        :disabled="!isTrgPrice" :min="0" v-model.number="triggerPrice" :step="tickPrice"
                        @keypress="decimalAllowed($event)" height="40" dense type="number" single-line outlined
                        hide-details></v-text-field>
                    </div>
                  </v-col>
                </v-row>

                <!-- input fields for bracket order -->
                <v-row class="mx-0 mb-0 mt-2" v-if="this.orderTypeList[this.orderTab] == 'Bracket'">
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">Target</label>
                    <div>
                      <v-text-field id="targetPrice" class="orderInput min-w-150" @input="targetPriceValidation"
                        :min="0" v-model="targetPrice" :step="tickPrice" height="40" @keypress="decimalAllowed($event)"
                        dense type="number" single-line outlined hide-details></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">Stoploss</label>
                    <div>
                      <v-text-field id="stopLossPrice" class="orderInput min-w-150" @input="stopLossPriceValidation"
                        :min="0" v-model="stopLossPrice" :step="tickPrice" height="40"
                        @keypress="decimalAllowed($event)" dense type="number" single-line outlined hide-details>
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" class="px-2 py-0">
                    <label class="line-height20 fsize12 primaryColor">Trailing Stoploss</label>
                    <div>
                      <v-text-field id="trailStopLossPrice" class="orderInput min-w-150" @input="trailPriceValidation"
                        :min="0" v-model="trailStopLossPrice" :step="tickPrice" height="40"
                        @keypress="decimalAllowed($event)" dense type="number" single-line outlined hide-details>
                      </v-text-field>
                    </div>
                  </v-col>
                </v-row>

                <div>
                  <div class="error-msg ml-2 mt-2">{{ this.errorMsg }}</div>
                </div>
              </v-tabs-items>
            </v-sheet>
            <!-- footer -->
            <v-sheet class="px-4 py-3 footerOrderWindow">
              <v-row class="ma-0">
                <v-col class="pa-0 d-flex align-center ma-0">
                </v-col>
                <v-col class="pa-0 d-flex justify-end">
                  <!-- <v-btn :loading="loading" type="submit" value="placeOrder" :disabled="loading" depressed height="40"
                    width="100" class="text-capitalize rounded" :class="orderType == 'buy' ? 'buyColor' : 'sellColor'">
                    Submit
                    </v-btn> -->
                  <v-btn @click="hideOrderWindow()" depressed outlined height="40" width="100" color="black"
                    class="text-capitalize rounded-sm-md cancelbtn ml-2">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </form>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <div class="d-flex w-100 justify-end">
            <a @click="resetAllScripForm" class="secondaryColor">Reset</a>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="mt-5 pa-4 d-flex justify-end">
      <v-btn height="40" width="96" depressed outlined color="grey--text" class="mr-3 text-capitalize">Cancel</v-btn>
      <v-btn :loading="btnLoader" @click="tabSelect == 'Recommendation' ? setPushNotifyOrderWindow() : setPushNotify()"
        height="40" width="96" depressed color="primary" class="mr-3 text-capitalize">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import orderWindowjs from "../mixins/orderWindow";
import commonFunc from "../mixins/commonFunctions";
export default {
  mixins: [orderWindowjs, commonFunc],
  // searchScripsInfo
  data: () => ({
    tabSelect: null,
    tabs: ["Admin Message", "Recommendation"],
    loader: false,
    template: "General Info",
    templateMessage: null,
    actualMessage: null,
    userType: 'Individual',
    userGroup: '',
    individualData: "",
    productType: 1,
    userGroup: "",
    allData: "",
    showUser: false,
    stopLoss: true,
    marketStoploss: true,
    limit: true,
    headingName: "",
    search: "",
    items: ["General Info", "Info with Link"],
    active: 0,
    message: "",
    messageType: "individual",
    userId: "",
    bitlyLink: null,
    title: "",
    urlRules: [(v) => !!v || "URL is required"],
    messageRules: [(v) => !!v || "Message is required"],
    headingRules: [(v) => !!v || "Heading is required"],
    userIdRules: [(v) => !!v || "User ID is required"],
    scripRules: [(v) => !!v || "Scrip is required"],
    formValid: true,
    formValid2: true,
  }),
  computed: {
    ...mapState("scripInfo", ["searchScripsInfo"]),
    ...mapGetters("scripInfo", {
      searchData: "scripSearch",
    }),
    ...mapGetters("adminMessage", { btnLoader: "getBtnLoader" }),
  },
  watch: {
    // search(val) {
    //   if (val) {
    //     this.searchScripsInfo.length > 0 ? this.searchScripsInfo.fliter((el) => {
    //       val === el.formattedInsName ? this.$store.commit("scripInfo/SET_SEARCH_SCRIPS", []) : this.$store.dispatch("scripInfo/scripSearch", val)
    //     }) : val && this.searchScripsInfo.length == 0 ? this.$store.dispatch("scripInfo/scripSearch", val) : ''
    //   }
    // },
    search(val) {
      if (val && val?.length > 1) {
        this.$store.dispatch("scripInfo/scripSearch", val);
      }
    },
    tabSelect(currentTab) {
      this.$store.commit("orderWindow/setOrderWindow", false);
      switch (currentTab) {
        case "Admin Message":
          this.onClickOutside();
          this.search = "";
        case "Recommendation":
          this.onClickOutside();
      }
    },
  },
  created() { },
  methods: {
    resetForm() {
      this.userType = null;
      // this.template = null;
      this.templateMessage = null;
      this.actualMessage = null;
      this.message = "";
      this.title = "";
      this.userId = "";
    },
    resetAllScripForm() {
      console.log(reset);
    },
    async callOrderWindow(orderType, value) {
      this.$store.commit("scripInfo/SET_SEARCH_SCRIPS", []);
      this.$store.dispatch("orderWindow/setInitialValues", {
        data: value,
        page: "mkWatch",
      });
      this.$store.commit("orderWindow/setWindowLoading", true);
      this.$store.commit("orderWindow/setCurrentOrder", {
        data: value,
        page: "mkWatch",
      });
      await this.$store.commit("orderWindow/setOrderWindow", true);
      await this.$store.commit("orderWindow/setRemoveCss", true);
      await this.$store.commit("orderWindow/setOrderType", orderType);
      // await this.$store.dispatch("orderWindow/getNewPriceRange");
      // await this.$store.dispatch("orderWindow/getScripQuoteDetails", "");
      await this.changeOrderTab();
    },
    onClickOutside() {
      this.$store.commit("scripInfo/SET_SEARCH_SCRIPS", []);
    },
    changeItem(val) {
      if (val == "coverorder") {
        (this.stopLoss = false), (this.marketStoploss = false);
      } else if (val == "bracketorder") {
        this.stopLoss = true;
      } else if (val == "amo") {
        (this.stopLoss = false), (this.marketStoploss = false);
        this.limit = true;
      }
    },
    hideOrderWindow() {
      this.$store.commit("orderWindow/setOrderWindow", false);
      this.search = " ";
    },
    setPushOrder() {
      console.log("set push notify");
    },

      async setPushNotify() {
      if (this.$refs.msgForm.validate()) {
        let json = {
          message: this.message,
          url: this.template == "Info with Link" ? this.bitlyLink : "",
          title: this.title,
          userType: this.messageType,
          userId: this.messageType == "individual" ? this.userId : "",
          messageType: this.template == "General Info" ? "Info" : "url",
        };
        var tempmsgType = this.template;
        console.log(json);
        await this.$store.dispatch("adminMessage/setPushNotify", json);
        await this.$refs.msgForm.reset();
        this.messageType = "individual";
        this.template = tempmsgType;
      }
    },
    async setPushNotifyOrderWindow() {
      this.search == " " ? (this.search = null) : "";
      if (this.$refs.msgForm1.validate() && this.search) {
        var json = {
          message: "orderWindow",
          url: "",
          title: this.title,
          userType: this.messageType,
          userId: this.messageType == "individual" ? this.userId : "",
          messageType: "Order",
          orderRecommentation: {
            complexty:
              this.orderTypeList[this.orderTab] == "bracket"
                ? "bo"
                : this.orderTypeList[this.orderTab] == "cover"
                  ? "co"
                  : this.orderTypeList[this.orderTab],
            exchange: this.currentOrder.exch,
            exchangeSegment: this.currentOrder.exchange_segment,
            pCode:
              this.orderTypeList[this.orderTab] == "cover"
                ? "CO"
                : this.prodType,
            prctyp: this.priceType,
            price: this.price,
            qty: this.quantity,
            stopLoss: this.stopLossPrice,
            token: this.currentOrder.token,
            target: this.targetPrice,
            tradingSymbol: this.currentOrder.symbol,
            formattedName: this.currentOrder.formattedInsName,
            trailingStopLoss: this.trailStopLossPrice,
            orderType: this.orderType,
            trigPrice: this.triggerPrice,
          },
        };
        console.log(json);
        this.hideOrderWindow();
        this.orderTab = "regular";
        this.price = null;
        this.quantity = null;
      }
    },
  },
};
</script>

<style>
.prodTypeBtn {
  padding: 5px 8px;
  border-radius: 2px;
  font-size: 11px;
  width: 60px;
  height: 26px;
  text-align: center;
  color: #282828 !important;
  background-color: #e6e6e6;
  cursor: pointer;
}

.line-height20 {
  line-height: 20px !important;
}

.line-height24 {
  line-height: 24px !important;
}

.buyColor {
  background-color: #2992ec !important;
}

.sellColor {
  background-color: #d13535 !important;
}

.unActiveColor {
  background-color: #e6e6e6 !important;
}

.v-btn.buyColor,
.v-btn.sellColor {
  color: #ffffff !important;
  text-transform: capitalize !important;
}

/* .orderSlideGroup .v-slide-group__content > .v-btn.v-btn:nth-child(2) {
  margin-left: 8px !important;
} */
.border-a8a8a8 {
  border: solid 1px #a8a8a8;
}

.w-333 {
  width: 333px !important;
}

.orderwindow {
  max-width: 575px !important;
  border: 1px solid #c5c5c5;
  border-radius: 4px;
}

.headerclass {
  padding: 12px 18px !important;
  background: #2992ec;
  height: 74px;
  border-radius: 3px 3px 0 0 !important;
}

.orderWindowRadio .v-icon.v-icon {
  font-size: 16px !important;
  color: #ffffff !important;
}

.orderWindowRadio .v-input--selection-controls .v-input__slot>.v-label,
.v-input--selection-controls .v-radio>.v-label {
  font-size: 12px !important;
}

.orderWindowRadio .v-input--selection-controls__input {
  width: 16px !important;
  height: 16px !important;
}

.orderWindowRadio .v-input--selection-controls__input {
  margin-right: 4px !important;
}

.orderWindowRadio .v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 12px !important;
}

.orderWindowRadio .theme--light.v-label {
  color: #ffffff !important;
}

.orderWindowTab .v-tabs-bar {
  height: 38px !important;
}

.orderWindowTab .v-tab {
  font-size: 12px !important;
  text-transform: inherit !important;
  font-weight: normal !important;
  letter-spacing: inherit !important;
}

.prodTypeBtn {
  padding: 5px 8px;
  border-radius: 2px;
  font-size: 11px;
  width: 60px;
  height: 26px;
  text-align: center;
  color: #282828 !important;
  background-color: #e6e6e6;
  cursor: pointer;
}

.line-height20 {
  line-height: 20px !important;
}

.line-height24 {
  line-height: 24px !important;
}

.buyColor {
  background-color: #2992ec !important;
}

.sellColor {
  background-color: #d13535 !important;
}

.unActiveColor {
  background-color: #e6e6e6 !important;
}

.v-btn.buyColor,
.v-btn.sellColor {
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.v-btn:not(.v-btn--outlined).unActiveColor {
  color: #282828 !important;
  text-transform: inherit !important;
}

.orderSlideGroup .v-slide-group__content>.v-btn.v-btn:nth-child(2) {
  margin-left: 8px !important;
}

.border-a8a8a8 {
  border: solid 1px #a8a8a8;
}

.orderField {
  width: 150px;
  height: 40px;
  outline: none !important;
  box-shadow: none !important;
}

.chevron::before {
  border-style: solid;
  border-width: 0.1em 0.1em 0 0 !important;
  content: "";
  display: inline-block;
  height: 8px;
  left: 2px;
  position: relative;
  top: 2px;
  transform: rotate(-225deg);
  vertical-align: top;
  width: 8px;
  margin-top: 4px;
}

.chevron.bottom:before {
  top: 0;
  transform: rotate(135deg);
}

.orderWindow .v-btn {
  letter-spacing: 0 !important;
}

.v-input--selection-controls__ripple {
  height: 0px !important;
}

.orderSwitch.v-input--switch.v-input--dense.v-input--switch--inset .v-input--switch__track {
  height: 16px !important;
  width: 38px !important;
  top: calc(50% - 12px);
  left: -3px;
}

.orderSwitch.v-input--switch.v-input--dense .v-input--switch__thumb {
  width: 12px !important;
  height: 12px !important;
}

.v-input--is-disabled.orderInput {
  background: url(../assets/images/strip.svg) !important;
  color: #a8a8a8 !important;
}

.v-input--is-focused:focus {
  border: #000000 !important;
}

.footerOrderWindow {
  background: #f3f3f3 !important;
}

.theme--dark .footerOrderWindow {
  background: #1e1e1e !important;
}

.pointer-events-none {
  pointer-events: none;
  cursor: disabled;
}

.orderProdBtn .v-slide-item--active.v-btn--disabled {
  background: #a7d3f9 !important;
  opacity: 0.5 !important;
}

.disabledSlideBtn {
  opacity: 0.5 !important;
  pointer-events: none;
}

button:disabled {
  cursor: not-allowed;
}

.theme--dark.v-sheet.orderwindow {
  background: #686868 !important;
}

.orderWindowTab .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #282828 !important;
}

.slideDownCss {
  transition: transform 0.25s ease-out !important;
  animation-duration: 0.55s;
  -webkit-animation: fadeOutDown;
  animation: fadeOutDown;
  top: auto;
  bottom: 0px;
}

.slideUpCss {
  -webkit-animation: fadeInUp 0.25s ease;
  animation: fadeInUp 0.25s ease;
}

.orderSwitch .v-input--switch--inset .v-input--switch__track,
.v-input--switch--inset .v-input--selection-controls__input {
  width: 24px !important;
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@-webkit-keyframes fadeOutDown {
  0% {
    opacity: 1;
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}

@keyframes fadeOutDown {
  0% {
    opacity: 1;
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.orderWindowTab .v-tabs>.v-tabs-bar .v-tab--disabled .v-tab--active {
  color: unset !important;
}

.min-w-150 {
  min-width: 150px;
}

@media (max-width: 1023px) {
  #draggable-container {
    left: 10% !important;
    top: 0 !important;
    display: block !important;
    width: auto !important;
  }
}

@media (max-width: 629px) {
  #draggable-container {
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    margin: 0;
    width: 100%;
    overflow-y: auto;
  }
}
</style>