<template>
  <div>
    <div class="fsize20 primaryColor pa-4 font-weight-bold">
      Add Result Calendar
    </div>

    <div class="mt-1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Stock Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4">
              <div class="pb-1 secondaryColor fsize14">Stock Name</div>
              <v-text-field v-model="stockName" placeholder="Enter the Stock Name" :rules="stockRules" outlined dense></v-text-field>
              <div class="pb-1 secondaryColor fsize14">Company Name</div>
              <v-text-field dense height="40px" placeholder="Enter the Company Name" autocomplete="off" outlined :rules="companyRules" v-model="companyName"></v-text-field>
              <v-row class="d-flex ma-0">
                <v-col class="pa-0 mr-4">
                  <div class="pb-1 secondaryColor fsize14">Token</div>
                  <v-text-field dense height="40px" placeholder="Enter the Token" autocomplete="off" outlined v-model="token" :rules="tokenRules">
                  </v-text-field>
                </v-col>
                <v-col class="pa-0">
                  <div class="pb-1 secondaryColor fsize14">Scrip Name</div>
                  <v-text-field v-model="scripName" placeholder="Enter the Scrip Name" :rules="scripRules" outlined dense></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-0 mt-6">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Result Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4">
              <div class="pb-1 secondaryColor fsize14">Date of Result</div>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field  @click:append="menu = true" v-model="computedDateFormatted" placeholder="Enter the Date" outlined persistent-hint append-icon="mdi-calendar" readonly dense :rules="dateRules" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="eventDate" :show-current="true" no-title @input="menu = false"></v-date-picker>
              </v-menu>
              <div class="pb-1 secondaryColor fsize14">Expected</div>
              <v-select v-model="selectedFruits" placeholder="Select the Sector" :items="selector" :rules="selectorRules" multiple outlined dense menu-props="offset-y">
                <template v-slot:selection="{ item, index }">
                  <span v-if="index === 0">{{ item }}</span>
                  <span v-if="index === 1" class="grey--text text-caption ml-2">
                    (+{{ selectedFruits.length - 1 }} others)
                  </span>
                </template>
                <template v-slot:prepend-item>
                  <v-list-item ripple @mousedown.prevent @click="toggle">
                    <v-list-item-action>
                      <v-icon :color="
                          selectedFruits.length > 0 ? 'indigo darken-4' : ''
                        ">
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> Select All </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
              <div class="pb-1 secondaryColor fsize14">Impact on Indices *</div>
              <v-select :items="impactImplices" placeholder="Select the Impact on Indices" v-model="impactItem" outlined :rules="impactRules" dense menu-props="offset-y"></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed class="text-capitalize" outlined @click="$router.back()">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="addOrEditResult">
            Save
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
// import service from "../js/httpservice";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      menu: false,
      dialog: false,
      eventDate: "",
      time: null,
      menu2: false,
      Description: null,
      countries: [
        "India",
        "United States",
        "Afghanistan",
        "land Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "AndorrA",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo, The Democratic Republic of the",
        "Cook Islands",
        "Costa Rica",
        "Cote DIvoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands (Malvinas)",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and Mcdonald Islands",
        "Holy See (Vatican City State)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "Indonesia",
        "Iran, Islamic Republic Of",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, Democratic People",
        "Korea, Republic of",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libyan Arab Jamahiriya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Macedonia, The Former Yugoslav Republic of",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia, Federated States of",
        "Moldova, Republic of",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestinian Territory, Occupied",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russian Federation",
        "RWANDA",
        "Saint Helena",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan, Province of China",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States Minor Outlying Islands",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Virgin Islands, British",
        "Virgin Islands, U.S.",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      selector: [
        "Nifty",
        "Bank Nifty",
        "Finnifty",
        "Manufacturing",
        "Automobile",
        "All Stocks ",
      ],
      selectedFruits: [],
      rating: 1,
      impactImplices: ["Small", "Medium", "High"],
      scripNameArray: ["Nifty 50", "Nifty Bank", "Nifty Financial Services"],
      stocks: ["NIFTY", "BANKNIFTY", "FINNIFTY"],
      impactItem: null,
      token: null,
      companyName: null,
      scripName: null,
      stockName: null,
      dateRules: [(v) => !!v || "Date is required"],
      stockRules: [(v) => !!v || "Stock Name is required"],
      scripRules: [(v) => !!v || "Scrip Name is required"],
      selectorRules: [(v) => (v && v.length > 0) || "selector is required"],
      companyRules: [(v) => !!v || "Company Name is required"],
      tokenRules: [(v) => !!v || "Token is required"],
      impactRules: [(v) => !!v || "impactOnIndices is required"],
      resultId: 0,
      nseData: [],
    };
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.eventDate);
    },
    likesAllFruit() {
      return this.selectedFruits.length === this.selector.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    ...mapGetters({ searchData: "getSearchData" }),
  },

  watch: {
    stockName: async function (val) {
      this.stockName = val.toUpperCase();
      let jsonObj = { exchange: ["NSE", "BSE"], symbol: val };
      await this.$store.dispatch("getSearchData", jsonObj);
      this.nseData = [];
      this.searchData.forEach((el) => {
        if (el.symbol.toUpperCase().includes(this.stockName.toUpperCase()) && el.exch == "NSE") {
          this.nseData = el;
          this.setStockDeatails();
        }
      });
    },
    exchange: async function (val) {
      this.exchange = val.toUpperCase();
      this.setStockDeatails();
    },
  },

  mounted() {
    var checkId = JSON.parse(localStorage.getItem("addOrEditResultId"));
    !!checkId && checkId != 0 ? this.getList(checkId) : "";
    !!checkId ? (this.resultId = checkId) : "";
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.selector.slice();
        }
      });
    },
    addOrEditResult() {
      this.$refs.form.validate();
      var selectValue = "";
      this.selectedFruits.forEach((elment) => {
        selectValue += elment + ",";
      });
      let jsonObj = {
        date: this.eventDate,
        scripName: this.scripName,
        stockName: this.stockName,
        companyName: this.companyName,
        token: this.token,
        sector: selectValue.substring(0, selectValue.length - 1),
        impactOnIndices: this.impactItem,
        resultId: this.resultId,
      };
      if (this.$refs.form.validate()) {
        this.$store.dispatch("result/addOrEditResult", jsonObj);
      }
    },
    getList(key) {
      service.getResultList({}).then((resp) => {
        if (resp.status == 200) {
          for (let item of resp.data.result) {
            if (key == item.resultId) {
              this.eventDate = item.date.split(" ")[0];
              this.scripName = item.scripName;
              this.stockName = item.stockName;
              this.companyName = item.companyName;
              this.token = item.token;
              this.selectedFruits = item.sector.split(",");
              this.impactItem = item.impactOnIndices;
            }
          }
        }
      });
    },

    // searchScrips(payload) {
    //   let jsonObj = { exchange: ["NSE", "BSE"], symbol: payload };
    //   service.getSearchData(jsonObj).then((resp) => {
    //     if (resp.status == 200) {
    //       resp.data.forEach((el) => {
    //         if (el.symbol.includes(payload) && el.exch == "NSE") {
    //           this.token = el.token;
    //           this.companyName = el.instrument_name;
    //         }
    //       });
    //     }
    //   });
    // },

    async setStockDeatails() {
      this.token = this.nseData.token;
      this.scripName = this.nseData.symbol;
      this.companyName = this.nseData.instrument_name;
    },
  }
};
</script>

