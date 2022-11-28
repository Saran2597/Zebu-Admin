<template>
  <!-- <div>
        <v-row class="ma-0 pa-2 align-center">
            <v-col cols="2" class="pa-0">
            </v-col>
            <v-col class="pa-0" cols="1"></v-col>
            <v-col cols="6" class="pa-0" style="height: 40px">
            </v-col>
            <v-col class="pa-0" cols="1"></v-col>
            <v-col cols="2" class="pa-0 d-flex justify-end">
              
            </v-col>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
                <v-row class="ma-0">
                   <v-col cols="12" sm="12" md="6" lg="2"></v-col>
                    <v-col cols="12" sm="12" md="6" lg="8">
                        <v-row>
                            <v-col>
                                <div class="pb-1 secondaryColor fsize14">Settlement No</div>
                                <v-text-field dense height="40px" placeholder="Enter the Source name" autocomplete="off"
                                    outlined :rules="settlementName" v-model="settlementNumber">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <div class="pb-1 secondaryColor fsize14">Active Status</div>
                                  <v-select  height=40 class="select" :items="activeStatusList"  v-model="activeStatus" :rules="activeStatusid" outlined></v-select>
                            </v-col>
                            <v-col>
                                <div class="pb-1 secondaryColor fsize14">Settlement Date</div>
                                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition"
                                    offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field @click:append="menu = true" v-model="computedDateFormatted"
                                            outlined persistent-hint placeholder="Enter the Date"
                                            append-icon="mdi-calendar" class="mr-4" readonly dense :rules="dateRules"
                                            v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="settlementDate" :show-current="true" no-title
                                        @input="menu = false"></v-date-picker>
                                </v-menu>

                            </v-col>
                            <v-col>
                                <div class="pb-1 secondaryColor fsize14">Execution Date</div>
                                <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                                    offset-y max-width="290px" min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field @click:append="menu2 = true" v-model="computedDateFormatted1"
                                            outlined persistent-hint placeholder="Enter the Date"
                                            append-icon="mdi-calendar" class="mr-4" readonly dense :rules="dateRules"
                                            v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="executionDate" :show-current="true" no-title
                                        @input="menu2= false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>

                    </v-col>
  <v-col cols="12" sm="12" md="6" lg="2"></v-col>
                </v-row>
                <div>

                </div>
            </v-card>

            <div class="mt-5 pa-4 d-flex justify-end">
                <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize"
                    min-width="80">Cancel</v-btn>
                <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" min-width="80"
                    @click="addSettlement()">
                    Save
                </v-btn>
            </div>
        </v-form>
    </div> -->

  <div>
    <v-row class="ma-0 pa-4 align-center"> Add Settlement Info </v-row>
    <div class="mt-1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Settlement Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Settlement No</div>
              <v-text-field dense height="40px" placeholder="Enter the Source name" autocomplete="off" outlined :rules="settlementName" v-model="settlementNumber">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Settlement Date</div>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field clearable @click:append="menu = true" v-model="computedDateFormatted" outlined persistent-hint placeholder="Enter the Date" append-icon="mdi-calendar" readonly dense :rules="dateRules" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="settlementDate" :show-current="true" no-title @input="menu = false"></v-date-picker>
              </v-menu>
              <div class="pb-1 secondaryColor fsize14">Execution Date</div>
              <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field clearable @click:append="menu2 = true" v-model="computedDateFormatted1" outlined persistent-hint placeholder="Enter the Date" append-icon="mdi-calendar" readonly dense :rules="dateRules" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="executionDate" :show-current="true" no-title @input="menu2= false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize" min-width="80">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="addSettlement" min-width="80">
            Save
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    menu: false,
    menu2: false,
    settlementDate: "",
    executionDate: "",
    activeStatus: "",
    settlementNumber: "",
    dateRules: [(v) => !!v || "Date is required"],
    settlementName: [(v) => !!v || "Name is required"],
    activeStatusid: [(v) => !!v || "Active Status is required"],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.settlementDate);
    },
    computedDateFormatted1() {
      return this.formatDate(this.executionDate);
    },
  },

  watch: {},

  created() {
    if (this.$route.query.id) {
      var data = JSON.parse(localStorage.getItem("settlementInfo"));
      this.settlementNumber = data.settlement_no;
      this.settlementDate = data.settlement_date;
    //   this.executionDate = this.formatDate1(data.exec_date);
      this.activeStatus = parseInt(data.active_status);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },

    formatDate1(date) {
      var tempDate = [date.slice(0, 2), "-", date.slice(2)].join("");
      return this.formatDate(
        [tempDate.slice(0, 5), "-", tempDate.slice(5)].join("")
      );
    },

    formatDate2(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}${month}${year}`;
    },

    async addSettlement() {
      if (this.$refs.form.validate()) {
        if (this.$route.query.id) {
          let json = {
            settlementNo: this.settlementNumber,
            execDate: this.formatDate2(this.executionDate),
            settlementID: this.$route.query.id,
          }
          await this.$store.dispatch("uploadFile/updateSettlementData", json);
        } else {
          let json = {
            settlementNo: this.settlementNumber,
            settlementDate: this.settlementDate,
            execDate: this.executionDate,
          };
          await this.$store.dispatch("uploadFile/insertSettlementData", json);
        }
        this.$router.push("/reports?tab=SettlementInfo");
      }
    },
  }
};
</script>

<style>
/* .select.v-text-field.v-text-field--enclosed:not(.v-text-field--dense)
  > .v-input__control
  > .v-input__slot {
  min-height: 40px !important;
}
.v-text-field--full-width .v-input__prepend-outer,
.v-text-field--full-width .v-input__prepend-inner,
.v-text-field--full-width .v-input__append-inner,
.v-text-field--full-width .v-input__append-outer,
.v-text-field--enclosed .v-input__prepend-outer,
.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field--enclosed .v-input__append-inner,
.v-text-field--enclosed .v-input__append-outer {
  margin-top: 8px !important;
} */
</style>