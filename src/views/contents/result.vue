<template>
  <div>

    <v-dialog v-model="dialog" width="800">
      <v-card class="cardBoxShadow rounded-lg">
        <v-card-title class="text-h5">Add a new Result</v-card-title>
        <div class="row ma-0 pa-4 d-flex justify-center">

          <div class="w-230">
            <v-select :items="countries" label="Stock name" outlined dense></v-select>
          </div>
          <div class="ml-4 w-230">
            <v-select :items="countries" label="Scrip Name " outlined dense></v-select>
          </div>
          <div class="ml-4 w-230">
            <v-select v-model="selectedFruits" :items="selector" label="Sector" multiple outlined dense>
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
          </div>
        </div>
        <div class="row ma-0 pa-4 d-flex justify-center">
          <div class="w-230">
            <v-text-field dense height="40px" label="Company Name " autocomplete="off" outlined>
            </v-text-field>
          </div>
          <div class="ml-4 w-230">
            <v-text-field dense height="40px" label="Token" autocomplete="off" outlined>
            </v-text-field>
          </div>
          <div class="ml-4 w-230">
            <div class="w-230">
              <v-select :items="impactImplices" label="Impact on Indices" outlined dense></v-select>
            </div>
          </div>

        </div>

        <div class="row ma-0 pa-4 d-flex justify-end">
          <v-btn @click="dialog = false" class="text-capitalize" depressed outlined>Cancel</v-btn>
          <v-btn depressed outlined class="ml-4 text-capitalize">Save</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" v-bind:items="resultList" :search="search" :value="resultList" class="my-2" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td>{{ props.index + 1 }}</td>
          <td>{{ props.item.companyName }}</td>
          <td>{{ props.item.scripName }}</td>
          <td>{{ props.item.stockName }}</td>
          <td>{{ props.item.sector }}</td>
          <td>{{ props.item.impactOnIndices }}</td>
          <td>{{ props.item.token }}</td>
          <td>{{ props.item.date.split(' ')[0] }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      dialog: false,
      eventDate: "",
      time: null,
      menu2: false,
      Description: null,
      countries: [
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
        "India",
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
        "United States",
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
        "FIN Nifty",
        "Manufacturing",
        "Automobile",
        "All Stocks ",
      ],
      selectedFruits: [],
      rating: 1,
      impactImplices: ["Small", "Medium", "High"],
      headers: [
        { text: "S.NO", align: "start", sortable: false },
        { text: "Company Name", value: "companyName", sortable: false },
        { text: "Scrip Name", value: "scripName", sortable: false },
        { text: "Stock Name", value: "stockName", sortable: false },
        { text: "sector", value: "sector", sortable: false },
        {
          text: "Impact On Indices",
          value: "impactOnIndices",
          sortable: false,
        },
        { text: "Token", value: "token", sortable: false },
        { text: "Date", value: "date", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      search: "getSearch",
    }),
    ...mapGetters('result',{
      resultList: "getResultData",
    }),
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
  },

  created() {
    this.$store.dispatch("result/getResult");
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
    addOrEditResult(key) {
      localStorage.setItem("addOrEditResultId", JSON.stringify(key));
      this.$router.push("/addOrEditResult");
    },
    deleteResult(key) {
      let jsonobj = {
        resultId: key,
      };
      this.$store.dispatch("result/deleteResult", jsonobj);
    },
  }
};
</script>

