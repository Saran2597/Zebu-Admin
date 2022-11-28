<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      <v-col cols="2" class="pa-0">
        <h3 width="100" height="24" class=".text-lg-h6">
          Add News
        </h3>
      </v-col>
    </v-row>
    <div class="mt-1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">News Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <v-row no-gutters>
                <v-col>
                  <div class="pb-1 secondaryColor fsize14">Date</div>
                  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                    max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field @click:append="menu = true" v-model="computedDateFormatted" outlined persistent-hint
                        placeholder="Enter the Date" append-icon="mdi-calendar" class="mr-4" readonly dense
                        :rules="dateRules" v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="eventDate" :show-current="true" no-title @input="menu = false">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <div class="pb-1 secondaryColor fsize14">Source Name</div>
                  <v-text-field dense height="40px" placeholder="Enter the Source name" autocomplete="off" outlined
                    :rules="sourceRules" v-model="sourceName">
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="pb-1 secondaryColor fsize14">Headline *</div>
              <v-text-field dense height="40px" placeholder="Enter the Headline" autocomplete="off" outlined
                v-model="headline" :rules="headLineRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Subject *</div>
              <v-text-field dense height="40px" placeholder="Enter the Subject " autocomplete="off" outlined
                v-model="subjectName" :rules="subjectRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">URL</div>
              <v-textarea auto-grow outlined placeholder="Enter the URL" :rules="decsriptionRules"
                v-model="Description"></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
            <v-divider></v-divider>
            <v-row class="ma-0 mt-6">
              <v-col cols="12" sm="12" md="6" lg="3">
                <span class="fsize14 font-weight-bold primaryColor">News Details</span>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="5">
                <div style="position:relative">
                  <div class="pb-1 secondaryColor fsize14">Stock Name </div>
                  <v-text-field dense height="40px" placeholder="Enter the  Stock Name" autocomplete="off" outlined
                    :rules="stockRules" v-model="stockName" clearable solo tile flat @input="
                    stockName ? (stockName = stockName.toString().toUpperCase()) : ''">
                  </v-text-field>
                  <div v-if="searchData.length > 0" v-click-outside="onClickOutside">
                    <v-card transition="fade-transition" class="searchContent">
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
                    </v-card>
                  </div>
                </div>

                <div class="pb-1 secondaryColor fsize14">Company Name</div>
                <v-text-field dense height="40px" placeholder="Enter the Company Name" autocomplete="off" outlined
                  :rules="companyRules" v-model="companyName">
                </v-text-field>
                <v-row class="d-flex ma-0">
                  <v-col class="pa-0 mr-4">
                    <div class="pb-1 secondaryColor fsize14">Token</div>
                    <v-text-field dense height="40px" placeholder="Enter the Token" autocomplete="off" outlined
                      :rules="tokenRules" v-model="token">
                    </v-text-field>
                  </v-col>
                  <v-col class="pa-0">
                    <div class="pb-1 secondaryColor fsize14">News Type</div>
                    <v-select :items="newsType" placeholder="Select the News Type" outlined v-model="typeOfNews"
                      :rules="newsTypeRules" menu-props="offset-y" dense></v-select>
                  </v-col>
                </v-row>
                <div class="pb-1 secondaryColor fsize14">Industry</div>
                <v-text-field dense height="40px" placeholder="Enter the Industry" autocomplete="off" outlined
                  :rules="industryRules" v-model="IndustryName">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="4"></v-col>
            </v-row>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize"
            min-width="80">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" min-width="80"
            @click="addOrEditNews">
            Save
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import service from "../../../store/httpService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: true,
      menu: false,
      dialog: false,
      eventDate: "",
      time: null,
      menu2: false,
      Description: null,
      newsType: ["Indian markets", "Global Markets", "F&O Stocks "],
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
      companyName: null,
      stockName: null,
      token: null,
      subjectName: null,
      sourceName: null,
      scripName: null,
      IndustryName: null,
      headline: null,
      typeOfNews: null,
      dateRules: [(v) => !!v || "Date is required"],
      stockRules: [(v) => !!v || "Stock Name is required"],
      scripRules: [(v) => !!v || "Scrip Name is required"],
      companyRules: [(v) => !!v || "Company Name is required"],
      tokenRules: [(v) => !!v || "Token is required"],
      decsriptionRules: [(v) => !!v || "Decsription is required"],

      newsTypeRules: [(v) => !!v || "Decsription is required"],
      headLineRules: [(v) => !!v || "Decsription is required"],
      industryRules: [(v) => !!v || "Decsription is required"],
      sourceRules: [(v) => !!v || "Decsription is required"],
      subjectRules: [(v) => !!v || "Decsription is required"],
      newsId: 0,
      nseData: [],
    };
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
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

    addOrEditNews() {
      this.$refs.form.validate();
      let jsonObj = {
        date: this.eventDate,
        newsType: this.typeOfNews,
        headLine: this.headline,
        description: this.Description,
        industry: this.IndustryName,
        source: this.sourceName,
        subject: this.subjectName,
        scripName: this.scripName,
        exch: "",
        token: this.token,
        stockName: this.stockName,
        companyName: this.companyName,
        newsId: this.newsId,
      };

      if (this.$refs.form.validate()) {
        this.$store.dispatch("news/addOrEditNews", jsonObj);
      }
    },

    getList(key) {
      service.getNewsList({}).then((resp) => {
        if (resp.status == 200 && resp.data.stat == "Ok") {
          for (let item of resp.data.result) {
            if (key == item.newsId) {
              this.eventDate = item.date.split(" ")[0];
              this.headline = item.headLine;
              this.typeOfNews = item.newsType;
              this.Description = item.description;
              this.IndustryName = item.industry;
              this.sourceName = item.source;
              this.subjectName = item.subject;
              this.scripName = item.scripName;
              this.token = item.token;
              this.stockName = item.stockName;
              this.companyName = item.companyName;
            }
          }
        }
      });
    },

    searchScrips(payload) {
      let jsonObj = { exchange: ["NSE", "BSE"], symbol: payload };
      service.getSearchData(jsonObj).then((resp) => {
        if (resp.status == 200) {
          resp.data.forEach((el) => {
            if (el.symbol.includes(payload) && el.exch == "NSE") {
              this.token = el.token;
              this.companyName = el.instrument_name;
            }
          });
        }
      });
    },

    // async setStockDeatails() {
    //   this.token = this.nseData.token;
    //   this.scripName = this.nseData.symbol;
    //   this.companyName = this.nseData.instrument_name;
    // },
    setStockDetails(currentData) {
        this.token = currentData.token;
        this.scripName =  this.stockName = currentData.symbol;
        this.companyName = currentData.instrument_name;
        this.exchange = currentData?.exch
        this.onClickOutside();
    },
    onClickOutside() {
      this.$store.commit("scripInfo/SET_SEARCH_SCRIPS", []);
    },
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
    ...mapGetters('news', { newsList: "getNewsData" }),
    ...mapGetters({ searchData: "getSearchData" }),
    ...mapGetters("scripInfo", {
      searchData: "scripSearch",
    }),
  },
  watch: {
    stockName: async function (val) {
      // this.stockName = val.toUpperCase();
      // let jsonObj = { exchange: ["NSE", "BSE"], symbol: val };
      // await this.$store.dispatch("getSearchData", jsonObj);
      // this.nseData = [];
      // this.searchData.forEach((el) => {
      //   if (el.symbol.toUpperCase().includes(this.stockName.toUpperCase()) && el.exch == "NSE") {
      //     this.nseData = el;
      //     this.setStockDeatails();
      //   }
      // });
      if (val && val?.length > 1) {
        this.$store.dispatch("scripInfo/scripSearch", val);
      }
    },
    // exchange: async function (val) {
    //   this.exchange = val.toUpperCase();
    //   this.setStockDeatails();
    // },
  },
  mounted() {
    var checkId = JSON.parse(localStorage.getItem("addOrEditNews"));
    !!checkId && checkId != 0 ? this.getList(checkId) : "";
    !!checkId ? (this.newsId = checkId) : "";
  },
};
</script>