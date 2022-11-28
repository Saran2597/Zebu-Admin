import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data () {
    return {
      nseKey: "123.45",
      text: "center",
      priceItems: ["L", "MKT", "SL", "SL-M"],
      productItems: ["MIS", "NRML"],
      showMore: false,
      coverOrBracketValidityItems: ["DAY"],
      coverOrBracketProductItems: ["MIS"],
      targetPrice: 0,
      stopLossPrice: 0,
      trailStopLossPrice: 0,

      //input field hide show
      currentOrderTab: "regular",
      errorMsg: "",
      isFormSubmit: false,
    };
  },

  computed: {
    ...mapState("marketWatch", ["marketDepthData"]),
    ...mapState("orderWindow", [
      "showOrderWindow",
      "orderType",
      "toggleOrder",
      "priceRangeDetails",
      "nsePriceRangeData",
      "bsePriceRangeData",
      "scriptQuoteDetails",
      "currentOrder",
      "minlot",
      "ltp",
      "tickPrice",
      "currentOrder",
      "nseBseType",
      "currentInstrument",
      "currentExchange",
      "currentPage",
      "modifyOrder",
      "loading",
      "windowLoading",
      "isNfo",
      "orderTypeList",
      "validityItems",
      "bracketPriceItems",
      "coverPriceItems",
      "lowerRange",
      "upperRange",
      "removeCss",
      "isPrice",
      "isTrgPrice",
      "isDisclosedQty",
      "nseSwitchPrice",
      "bseSwitchPrice",
      "currentToken",
      "marginLoader"
    ]),
    ...mapGetters("orderWindow", [
      "getPriceType",
      "getProdType",
      "getOrderTab",
      "getValidityType",
      "getTriggerPrice",
      "getCurrentLtp",
      "getAvailableMargin",
    ]),
    ...mapGetters("authtication", [
      "getUserId",
    ]),

    showproductItems: {
      get () {
        return this.$store.state.orderWindow.showproductItems;
      },
      set (newValue) {
        this.$store.commit("orderWindow/setProductItems", newValue);
      },
    },

    showPriceItems: {
      get () {
        return this.$store.state.orderWindow.showPriceItems;
      },
      set (newValue) {
        this.$store.commit("orderWindow/setPriceItems", newValue);
      },
    },

    quantity: {
      get () {
        return this.$store.state.orderWindow.quantity;
      },
      set (value) {
        this.$store.commit("orderWindow/setCurrentQty", value);
      },
    },

    price: {
      get () {
        return this.isPrice ? this.$store.state.orderWindow.price : 0
      },
      set (value) {
        this.$store.commit("orderWindow/setCurrentPrice", value);
      },
    },

    triggerPrice: {
      get () {
        return this.isTrgPrice ? this.$store.state.orderWindow.triggerPrice : 0
      },
      set (value) {
        this.$store.commit("orderWindow/setCurrentTrgPrice", value);
      },
    },

    disclosedQuantity: {
      get () {
        return this.isDisclosedQty ? this.$store.state.orderWindow.disclosedQuantity : 0
      },
      set (value) {
        this.$store.commit("orderWindow/setDisclosedQty", value);
      }
    },

    nseBseRadioSwitch: {
      get () {
        return this.currentExchange;
      },
      set (value) {
        return value;
      },
    },

    buySellRadio: {
      get () {
        return this.orderType == 'buy' ? true : false
      },
      set (value) {
        return value;
      }
    },

    priceType: {
      get () {
        return this.getPriceType;
      },
      set (value) {
        this.$store.commit("orderWindow/setPriceType", value);
      //  !this.marginLoader ?  this.$store.dispatch('orderWindow/getMarginAvailable', 'priceType')  : ''
      },
    },

    prodType: {
      get () {
        return this.getProdType;
      },
      set (value) {
        this.$store.commit("orderWindow/setProdType", value);
        // !this.marginLoader ? this.$store.dispatch('orderWindow/getMarginAvailable', 'prodType') : ''
      },
    },

    orderTab: {
      get () {
        return this.getOrderTab;
      },
      set (value) {
        this.$store.commit("orderWindow/setOrderTab", value);
        // !this.marginLoader ? this.$store.dispatch('orderWindow/getMarginAvailable', 'orderTab') : ''
      },
    },

    validityType: {
      get () { return this.getValidityType },
      set (value) {
        this.$store.commit("orderWindow/setValidityType", value);
      }
    },

    showValidityItems: {
      get () {
        return this.validityItems;
      },
      set (value) {
        this.$store.commit("orderWindow/setValidityItems", value);
      }
    }
  },

  methods: {
    // change tab hide show function
    changeOrderTab () {
      this.errorMsg = "";
      if (this.orderTypeList[this.orderTab] == 'Cover') {
        this.showproductItems = this.coverOrBracketProductItems;
        this.showPriceItems = this.coverPriceItems;
        // this.showValidityItems = this.coverOrBracketValidityItems;
        this.$store.commit("orderWindow/setValidityItems", this.coverOrBracketValidityItems);
      } else if (this.orderTypeList[this.orderTab] == 'Bracket') {
        this.showproductItems = this.coverOrBracketProductItems;
        this.showPriceItems = this.bracketPriceItems;
        // this.showValidityItems = this.coverOrBracketValidityItems;
        this.$store.commit("orderWindow/setValidityItems", this.coverOrBracketValidityItems);
      }else if (this.orderTypeList[this.orderTab] == 'AMO') {
        this.showproductItems =
          this.currentExchange == "NSE" || this.currentExchange == "BSE"
            ? this.$store.state.orderWindow.eqProductItems
            : this.$store.state.orderWindow.allProductItems;
        // this.showproductItems = this.coverOrBracketProductItems;
        this.showPriceItems = ["L"]
        this.$store.commit("orderWindow/setValidityItems", this.coverOrBracketValidityItems);
      } else if (this.orderTypeList[this.orderTab]) {
        this.showPriceItems =  this.isNfo
          ? this.$store.state.orderWindow.allPriceItems
          : this.$store.state.orderWindow.postionPriceItems;
        this.showproductItems =
          this.currentExchange == "NSE" || this.currentExchange == "BSE"
            ? this.$store.state.orderWindow.eqProductItems
            : this.$store.state.orderWindow.allProductItems;
        // this.showValidityItems = this.validityItems;
        this.$store.commit("orderWindow/setValidityItems", ['DAY', 'IOC']);
      }
      this.$store.commit('orderWindow/changeOrderType', this.getOrderTabValue())
      // this.$store.dispatch('common/setProdTypeCommon' , '')
    },

    // find select order type like regular Or amo
    selectedIndex (selectedOrder) {
      this.currentOrderTab = selectedOrder.toLowerCase();
      this.$store.commit('orderWindow/changeOrderType', this.getOrderTabValue())
    },

    //Toggle orderWindow
    async toggleOrderWindow () {
     var order = this.orderType == "buy" ? "sell" : "buy";
     await this.$store.commit("orderWindow/setOrderType", order);
     await this.$store.commit("orderWindow/valiDateQty", "");
    },

    //call orderWindow
    async hideOrderWindow () {
      !this.modifyOrder ? this.$store.commit("orderWindow/setOrderWindow", false) : this.$store.commit("orderWindow/setOrderWindowModify", false)
    },

    // order place
    async placeOrder () {
      this.isFormSubmit = true;
      let json = {
        qty: this.quantity,
        complexity: this.getOrderTabValue(this.ordertab),
        pcode: this.prodType.toLowerCase(),
        priceType: this.priceType,
        price: this.price,
        trgPrice: this.triggerPrice,
        stopLoss: this.stopLossPrice,
        trailStopLoss: this.trailStopLossPrice,
        discQty: this.disclosedQuantity,
        validity: this.validityType,
      };
      var qtyInputBox = document.querySelector("#qty");
      var priceInputBox = document.querySelector("#price");
      var trgPriceInputBox = document.querySelector("#triggerPrice");
      var targetPriceInputBox = document.querySelector("#triggerPrice");
      var stopLossPriceInputBox = document.querySelector("#stopLossPrice");
      var trailStopLossPriceInputBox = document.querySelector("#trailStopLossPrice");
      var discQtyInputBox = document.querySelector("#discQty");
      this.quantityValidation();
      this.priceValidation();
      this.triggerPriceValiation();
      if (this.orderTypeList[this.orderTab] === 'Bracket') {
        this.targetPriceValidation();
        this.stopLossPriceValidation();
        this.trailPriceValidation();  
      }
      if (this.showMore) {
        this.discQtyValidation();
      }
      if (this.orderTypeList[this.orderTab] == 'Bracket' ? targetPriceInputBox.checkValidity() && stopLossPriceInputBox.checkValidity() && trailStopLossPriceInputBox.checkValidity() : true && qtyInputBox.checkValidity() && this.isPrice ? priceInputBox.checkValidity() : true && this.isTrgPrice ? trgPriceInputBox.checkValidity() : true &&
        this.showMore ? discQtyInputBox.checkValidity() : true) {
        this.hideOrderWindow();
        this.modifyOrder
          ? await this.$store.dispatch("orderWindow/modifyOrder", json)
          : await this.$store.dispatch("orderWindow/placeOrder", json);
      }
      this.isFormSubmit = false;
    },

    checkQuantity (event) {
      if (event.keyCode != 13) {
        this.showError = true;
        var inp = String.fromCharCode(event.keyCode);
        if (/[0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
    },

    decimalAllowed (event) {
      if (event.keyCode != 13) {
        this.showError = true;
        var inp = String.fromCharCode(event.keyCode);
        if (/[0-9.]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
    },

    // quantity validation
    quantityValidation () {
      var qtyVal = parseFloat(this.quantity);
      var qtyLot = this.floatSafeRemainder(qtyVal, this.minlot);
      const qtyInputBox = document.querySelector("#qty");
      if (this.quantity.toString() == "") {
        return qtyInputBox.setCustomValidity("Quantity cannot not be empty")
      } else if (qtyVal == 0) {
        return qtyInputBox.setCustomValidity("Quantity cannot be zero")
      } else if (qtyLot != 0 && this.minlot > 0) {
        return qtyInputBox.setCustomValidity("Quantity should be multiple of lot size. (" + this.minlot + ")")
      } else {
        qtyInputBox.setCustomValidity('')
      }
    },

    // price validation
    priceValidation () {
      const priceInputBox = document.querySelector("#price");
      var priceVal = parseFloat(this.price);
      var lowerRangeVal = parseFloat(this.lowerRange);
      var upperRangeVal = parseFloat(this.upperRange);
      var checkDprVal = this.checkDpr(priceVal, upperRangeVal, lowerRangeVal)
      var priceTick = this.floatSafeRemainder(priceVal, this.tickPrice);

      if (this.price.toString() == "") {
        priceInputBox.setCustomValidity('Price cannot be Empty')
        return;
      } else if (priceVal == 0) {
        priceInputBox.setCustomValidity(`Price cannot be zero`);
        this.isFormSubmit ? priceInputBox.reportValidity() : ''
        return;
      } else if (priceTick != 0) {
        priceInputBox.setCustomValidity(`Price Should be multiple of Tick size ${this.tickPrice}`)
        return;
      } else if (
        !checkDprVal && this.ltp != 0 && Number(this.ltp) >= lowerRangeVal && Number(this.ltp) <= upperRangeVal &&
        this.priceType != "market" &&
        this.priceType != "sl-m"
      ) {
        priceInputBox.setCustomValidity(`Price Should be within the DPR range`)
        return;
      } else {
        priceInputBox.setCustomValidity('')
      }
    },

    // stoploss price validation
    triggerPriceValiation () {
      const trgPriceInputBox = document.querySelector("#triggerPrice");
      var trigPriceVal = parseFloat(this.triggerPrice);
      var trigTick = this.floatSafeRemainder(trigPriceVal, this.tickPrice);
      if (this.triggerPrice.toString() == "") {
        trgPriceInputBox.setCustomValidity('Trigger Price cannot be Empty');
        return;
      } else if (trigPriceVal == 0) {
        trgPriceInputBox.setCustomValidity('Trigger Price cannot be zero');
        return;
      } else if (trigTick != 0) {
        trgPriceInputBox.setCustomValidity(`Trigger Price Should be multiple of Ticks ${this.tickPrice}`);
        return;
      } else {
        trgPriceInputBox.setCustomValidity('');
      }
    },

    //targetPrice based on Exchange
    targetPriceValidation () {
      const targetPriceInputBox = document.querySelector("#targetPrice");
      var value = parseFloat(this.targetPrice);
      var targetTick = this.floatSafeRemainder(value, this.tickPrice);
      if (this.targetPrice.toString() == "") {
        targetPriceInputBox.setCustomValidity('Target Price Cannot be Empty')
        return
      } else if (value == 0) {
        targetPriceInputBox.setCustomValidity('Target Price should be greater than 0')
        this.isFormSubmit ? targetPriceInputBox.reportValidity() : ''
        return
      } else if (targetTick != 0) {
        targetPriceInputBox.setCustomValidity(`Target Price should be multiple of " + ${this.tickPrice}`)
        return
      } else {
        targetPriceInputBox.setCustomValidity('')
        return
      }
    },

    //stopLossPrice based on Exchange
    stopLossPriceValidation () {
      const stopLossPriceInputBox = document.querySelector("#stopLossPrice");
      var value = parseFloat(this.stopLossPrice);
      var slTick = this.floatSafeRemainder(value, this.tickPrice);
      if (this.stopLossPrice.toString() == "") {
        stopLossPriceInputBox.setCustomValidity('Stoploss Price Cannot be Empty')
        return;
      } else if (value <= 0) {
        stopLossPriceInputBox.setCustomValidity('Stoploss Price Cannot be less then 0')
        this.isFormSubmit ? stopLossPriceInputBox.reportValidity() : ''
        return;
      } else if (slTick != 0 && slTick != "0") {
        stopLossPriceInputBox.setCustomValidity(`Stoploss Price Should be multiple of " + ${this.tickPrice}`)
        return;
      } else {
        return stopLossPriceInputBox.setCustomValidity('')
      }
    },

    //trailPrice based on Exchange
    trailPriceValidation () {
      const trailStopLossPriceInputBox = document.querySelector("#trailStopLossPrice");
      var value = parseFloat(this.trailStopLossPrice);
      var trailTick = this.floatSafeRemainder(
        this.trailStopLossPrice,
        this.tickPrice
      );
      var targetVal = parseFloat(this.targetPrice);
      if (this.trailStopLossPrice.toString() == "") {
        trailStopLossPriceInputBox.setCustomValidity('TrailStoploss Price Cannot be Empty')
        return;
      } else if (trailTick != 0) {
        trailStopLossPriceInputBox.setCustomValidity(`TrailStoploss Should be multiple of " + (${this.tickPrice})`)
        return;
      } else if (this.priceType == "L" && value < this.tickPrice && value != 0) {
        trailStopLossPriceInputBox.setCustomValidity(`Trailing Stoploss should be minimum of TickPrice`)
        return;
      } else if (targetVal < value && value != 0) {
        trailStopLossPriceInputBox.setCustomValidity(`TrailStoploss Should be Less than " + (${targetVal})`)
        this.isFormSubmit ? trailStopLossPriceInputBox.reportValidity() : ''
        return;
      } else {
        trailStopLossPriceInputBox.setCustomValidity('')
      }
    },

    //Disclosed qty based on Exchange
    discQtyValidation () {
      const discQtyInputBox = document.querySelector("#discQty");
      let dicPercentage;
      var disclosedQty = parseFloat(this.disclosedQuantity);
      var qty = parseFloat(this.currentQty);
      if (this.currentExchange == "MCX") {
        dicPercentage = 25 / this.Qty;
      } else {
        dicPercentage = 10 / this.Qty;
      }
      var disCheck = parseFloat(disclosedQty / qty);
      this.discQtytik = Math.ceil(disCheck);

      /** Disclosed quantity */
      if (this.currentExchange != "NFO" && this.currentExchange != "BFO") {
        if (this.disclosedQuantity.toString() == "") {
          discQtyInputBox.setCustomValidity('Disc.Qty should not be empty')
          return;
        } else if (disclosedQty < this.discQtytik && disclosedQty != 0) {
          if (this.currentExchange == "MCX") {
            discQtyInputBox.setCustomValidity('Disc.Qty should be either 0 or 25% to 100% of quantity')
            return;
          } else if (this.currentExchange != "MCX") {
            discQtyInputBox.setCustomValidity('Disc.Qty should be either 0 or 10% to 100% of quantity')
            return;
          } else {
            discQtyInputBox.setCustomValidity('')
          }
        } else if (disclosedQty > qty) {
          discQtyInputBox.setCustomValidity('Disc.Qty cannot be greater than Qty')
          return;
        } else {
          discQtyInputBox.setCustomValidity('')
        }
      }
      discQtyInputBox.reportValidity()
    },

    //Float Safe Remainder of last 2 digits or 4 digits
    floatSafeRemainder (val, step) {
      val = val.toString();
      step = step.toString();
      var valDecCount = val.includes(".")
        ? val.split(".")[1].length != null
          ? val.split(".")[1].length
          : 0
        : val.length;
      var stepDecCount = step.includes(".")
        ? step.split(".")[1].length != null
          ? step.split(".")[1].length
          : 0
        : step.length;
      var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
      var valInt = parseFloat(
        parseFloat(val).toFixed(decCount).toString().replaceAll(".", "")
      );
      var stepInt = parseFloat(
        parseFloat(step).toFixed(decCount).toString().replaceAll(".", "")
      );
      return (valInt % stepInt) / Math.pow(10, decCount);
    },

    getOrderTabValue () {
      return this.orderTypeList[this.orderTab] == 'Regular'
        ? "regular"
        : this.orderTypeList[this.orderTab] == 'Cover'
          ? "cover"
          : this.orderTypeList[this.orderTab] == 'Bracket'
            ? "bracket"
            : this.orderTypeList[this.orderTab] == 'AMO'
              ? "amo"
              : "regular";
    },

    // capitalize first letter
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    async nseBseSwitch (exch) {
      await this.$store.commit('orderWindow/makeActive', exch)
      this.priceValidation()
    },

    checkDpr (price, uc, lc) {
      return uc !== 0 && price >= lc && price <= uc
    },
  },

  watch: {
    priceType: function (val) {
      this.$store.commit('orderWindow/changeOrderType', this.getOrderTabValue())
      if (
        (this.currentPage == "mkWatch" || this.currentPage == "orders" || this.currentPage == "analytics") &&
        this.modifyOrder == false
      ) {
        localStorage.setItem(
          "orderPreference",
          JSON.stringify({
            product: this.prodType,
            validity: this.validityType,
            variety: this.getOrderTabValue(this.orderType),
            orderType: this.priceType,
          })
        );
      }
      if (val == 'L') {
        this.price ? this.priceValidation() : ''
      }
      if (val == 'SL') {
        this.price ? this.priceValidation() : ''
        this.triggerPrice ? this.triggerPriceValiation() : ''
      }
      if (val == 'SL-M') {
        this.triggerPrice ? this.triggerPriceValiation() : ''
      }
    },

    prodType: function (val) {
      if (
        (this.currentPage == "mkWatch" || this.currentPage == "orders" || this.currentPage == "analytics") &&
        this.modifyOrder == false
      ) {
        localStorage.setItem(
          "orderPreference",
          JSON.stringify({
            product: this.prodType,
            validity: this.validityType,
            variety: this.getOrderTabValue(this.orderTab),
            orderType: this.priceType,
          })
        );
      }
    },

    orderTab: function (val) {
      if (
        (this.currentPage == "mkWatch" || this.currentPage == "orders" || this.currentPage == "analytics") &&
        this.modifyOrder == false
      ) {
        localStorage.setItem(
          "orderPreference",
          JSON.stringify({
            product: this.prodType,
            validity: this.validityType,
            variety: this.getOrderTabValue(this.orderTab),
            orderType: this.priceType,
          })
        );
      }
    },

    validityType: function (val) {
      if (
        (this.currentPage == "mkWatch" || this.currentPage == "orders" || this.currentPage == "analytics") &&
        this.modifyOrder == false
      ) {
        localStorage.setItem(
          "orderPreference",
          JSON.stringify({
            product: this.prodType,
            validity: this.validityType,
            variety: this.getOrderTabValue(this.orderTab),
            orderType: this.priceType,
          })
        );
      }
    },
  },

  created () {
    if (localStorage.getItem("orderPreference") == null || localStorage.getItem("orderPreference") == undefined) {
      localStorage.setItem(
        "orderPreference",
        JSON.stringify({
          product: this.prodType,
          validity: this.validityType,
          variety: this.getOrderTabValue(this.orderTab),
          orderType: this.priceType,
        })
      );
    }
  },
};