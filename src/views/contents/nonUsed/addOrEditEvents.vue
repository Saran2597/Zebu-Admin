<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      <v-col cols="2" class="pa-0">
        <h3 width="100" height="24" class=".text-lg-h6">
          Add a New Events
        </h3>
      </v-col>
    </v-row>

    <div class="mt-4">
      <v-card class="mx-4 cardBoxShadow rounded-lg">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">New Event</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Date of Event</div>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field @click:append="menu = true" v-model="computedDateFormatted" outlined persistent-hint placeholder="Enter the Date of Event " append-icon="mdi-calendar" readonly dense :rules="dateRules" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="eventDate" :show-current="true" no-title @input="menu = false"></v-date-picker>
              </v-menu>
               <div class="pb-1 secondaryColor fsize14">Time of Event</div>
              <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="eventTime" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="eventTime" placeholder="Enter the Time of Event" append-icon="mdi-clock-time-four-outline" readonly dense outlined :rules="timeRules" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="menu2" v-model="eventTime" full-width @click:minute="$refs.menu.save(eventTime)"></v-time-picker>
              </v-menu>
              <div class="pb-1 secondaryColor fsize14">Event Name</div>
              <v-text-field v-model="eventName" dense height="40px" placeholder="Enter the Event Name" autocomplete="off" outlined :rules="NameRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Geography</div>
              <v-select v-model="geoGraphy" :items="countries" placeholder="Enter the Geography" :rules="geoGraphyRules" outlined dense></v-select>
              <div class="pb-1 secondaryColor fsize14">Expected</div>
              <v-text-field dense height="40px" placeholder="Enter the Expected" autocomplete="off" outlined v-model="expectedValue">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Actual</div>
              <v-text-field dense height="40px" placeholder="Enter the Actual" autocomplete="off" outlined v-model="actualValue">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Previous</div>
              <v-text-field dense height="40px" placeholder="Enter the Previous" autocomplete="off" outlined v-model="previousValue">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Sector</div>
              <v-select v-model="selectedFruits" :items="selector" placeholder="Enter the Sector" :rules="selectorRules" multiple outlined dense>
                <template v-slot:selection="{ item, index }">
                  <span v-if="index === 0">{{ item }}</span>
                  <span v-if="index === 1" class="grey--text text-caption ml-2">
                    (+{{ selectedFruits.length - 1 }} others)
                  </span>
                </template>
                <template v-slot:prepend-item>
                  <v-list-item ripple @mousedown.prevent @click="toggle">
                    <v-list-item-action>
                      <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Select All
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
              <div class="pb-1 secondaryColor fsize14">Event Description</div>
              <v-textarea auto-grow outlined rows="1" row-height="15" :rules="descriptionRules" placeholder="Enter the Description" v-model="Description"></v-textarea>
              <div class="pb-1 secondaryColor fsize14">Importance</div>
              <v-rating color="red" v-model="rating" icon-label="custom icon label text {0} of {1}"></v-rating>
              <div style="line-height: 12px">
                <span v-if="showRatingError" class="error--text fsize12">Importance is required</span>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
        </v-form>
      </v-card>
      <div class="pa-4 d-flex justify-end">
        <v-btn height="40" width="96" depressed outlined class="text-capitalize" @click="$router.back()">Cancel</v-btn>
        <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="addOrEditEvents">
          Save
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// import service from "../js/httpservice";
export default {
  data() {
    return {
      valid: false,
      menu: false,
      dialog: false,
      eventDate: "",
      time: null,
      menu2: false,
      Description: null,
      showRatingError: false,
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
      rating: null,
      eventTime: null,
      eventName: null,
      geoGraphy: null,
      expectedValue: "",
      actualValue: "",
      previousValue: "",
      dateRules: [(v) => !!v || "Date is required"],
      timeRules: [(v) => !!v || "time is required"],
      NameRules: [(v) => !!v || "Name is required"],
      geoGraphyRules: [(v) => !!v || "geoGraphy is required"],
      selectorRules: [(v) => (v && v.length > 0) || "selector is required"],
      descriptionRules: [(v) => !!v || "description is required"],
      eventId: 0,
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
  },

  watch: {
    rating: function (newValue) {
      !!newValue ? (this.showRatingError = false) : "";
    },
  },

  mounted() {
    var checkId = JSON.parse(localStorage.getItem("addOrEditEvent"));
    // !!checkId ? this.getList(checkId) : "";
    !!checkId ? (this.eventId = checkId) : "";
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
    addOrEditEvents() {
      this.rating == null ? (this.showRatingError = true) : "";
      this.$refs.form.validate();

      if (this.valid && this.showRatingError == false) {
        var selectorValue = "";
        this.selectedFruits.forEach((Element) => {
          selectorValue += Element + ",";
        });
        let jsonobj = {
          eventId: this.eventId,
          date: this.eventDate,
          time: this.eventTime,
          indiaDate: this.eventDate,
          indiaTime: this.eventTime,
          eventName: this.eventName,
          eventDescription: this.Description,
          geography: this.geoGraphy,
          significance: this.rating.toString(),
          expectedOutcome: this.expectedValue,
          actualOutcome: this.actualValue,
          previousOutcome: this.previousValue,
          sector: selectorValue.substring(0, selectorValue.length - 1),
        };
        this.$store.dispatch('event/addOrEditEvent', jsonobj);
      }
    },
    getList(key) {
      service.getEventList({}).then((resp) => {
        if (resp.status == 200) {
          for (let item of resp.data.result) {
            if (key == item.eventId) {
              this.eventDate = item.indiaDate;
              this.eventTime = item.indiaTime;
              this.eventName = item.eventName;
              this.Description = item.eventDescription;
              this.geoGraphy = item.geography;
              this.rating = Number(item.significance);
              this.expectedValue = item.expectedOutcome;
              this.actualValue = item.actualOutcome;
              this.previousValue = item.previousOutcome;
              this.selectedFruits = item.sector.split(",");
            }
          }
        }
      });
    },
  }
};
</script>

