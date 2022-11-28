<template>
  <div>
    <div class="px-4 pt-4 w-100 d-flex align-center justify-space-between">
      <form></form>
      <v-form ref="form" v-model="formValid" lazy-validation @submit.prevent="getAccessLogs()">
        <div class="d-flex align-center">
          <div class="px-2 fsize14">
            <div class="pb-1">Logs Table</div>
            <v-autocomplete outlined dense :items="['AccessLogInput','AccessLog','ResponseLog']" :menu-props="{ bottom: true, offsetY: true }" :rules="tableRules" v-model="table"></v-autocomplete>
          </div>
          <div class="px-2 fsize14">
            <div class="pb-1">User Id</div>
            <v-text-field outlined dense :rules="userIdRules" v-model="userId"></v-text-field>
          </div>
          <div class="px-2 fsize14">
            <div class="pb-1">URL</div>
            <v-autocomplete outlined dense :items="urlPaths" :menu-props="{ bottom: true, offsetY: true }" :rules="urlPathRules" v-model="url"></v-autocomplete>
          </div>
          <div class="px-2 fsize14">
            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <div class="pb-1">Date</div>
                <v-text-field @click:append="dateMenu = true" v-model="computedDateFormatted" outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="dateRules" placeholder="Enter the Date of Event" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" :show-current="true" no-title @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </div>
          <div class="px-2 d-flex justify-end">
            <v-btn height="40" type="submit" color="primary" depressed class="text-capitalize fsize14">Submit</v-btn>
          </div>
          <div class="loaderPart d-flex align-center">
            <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black"></v-progress-circular>
          </div>
        </div>
      </v-form>
      <div>
        <v-btn depressed text>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <a depressed text height="20" @click="pageRoute(idx)" v-for="(i,idx) in Math.round(totalCount/30)" :key="idx" class="px-3 pt-2">{{i}}</a>
        <v-btn depressed text>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
    <v-simple-table class="ma-4" v-if="accessLogs.length != 0">
      <thead>
        <tr>
          <th class="text-center" width="100px">created Date</th>
          <th class="text-center">userId</th>
          <th class="text-center" v-if="table != 'ResponseLog'">DeviceIp</th>
          <th class="text-center" v-if="table != 'ResponseLog'">Domain</th>
          <th class="text-center">Input</th>
          <th class="text-center" v-if="table != 'ResponseLog'">User Agent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,idx) in accessLogs" :key="idx">
          <td class="text-center" style="min-width:120px">{{i.created_on.split(' ')[0]}}</td>
          <td class="text-center">{{i.user_id}}</td>
          <td class="text-center" v-if="table != 'ResponseLog'">{{i.device_ip}}</td>
          <td class="text-center" v-if="table != 'ResponseLog'">{{i.domain}}</td>
          <td class="input_text text-center" style="max-width:120px" @click="callDialog(i.input ? i.input: i.response_data)">{{i.input ? i.input: i.response_data}}</td>
          <td class="text-center" v-if="table != 'ResponseLog'">{{i.user_agent}}</td>
        </tr>
      </tbody>

    </v-simple-table>
    <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100 mt-16">
      <div class="text-center">No Access Logs Found</div>
    </div>

    <v-dialog v-model="dialog" max-width="400">
      <v-card class="pa-8 cardBoxShadow rounded-lg">
        <div class="fsize14 line-height-2" id="jsonData" ref="jsonData">{{currentJson}}</div>
        <div class="d-flex justify-end">
          <!-- <v-btn depressed text @click="JSON.stringify(currentJson)">Format</v-btn> -->
          <v-btn depressed outlined text :color="copyText == 'Copy' ? 'black' : 'green'" class="text-capitalize" @click="copyTextFunc()">{{copyText}}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    table: "",
    userId: "",
    url: "",
    date: null,
    //
    dateMenu: false,
    formValid: false,
    dateRules: [(v) => !!v || "Date is required"],
    urlPathRules: [(v) => !!v || "URL Path is required"],
    tableRules: [(v) => !!v || "Log type is required"],
    userIdRules: [(v) => !!v || "User Id is required"],
    offset: 0,
    currentJson: [],
    dialog: false,
    copyText: "copy",
  }),

  computed: {
    ...mapGetters("logs", {
      accessLogs: "getAccessLogs",
      totalCount: "getTotalCount",
      urlPaths: "getUrlPaths",
    }),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    userId(val) {
      this.userId = val.toUpperCase();
    },
  },

  created() {
    this.$store.dispatch("logs/getDistinctUrl");
  },

  methods: {
    callDialog(data) {
      this.copyText = "Copy";
      data ? this.dialog = true : '';
      this.currentJson = data
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    copyTextFunc() {
      navigator.clipboard.writeText(this.currentJson);
      var textarea = document.getElementById("jsonData");
      this.copyText = "Copied";
      var ok = document.execCommand("copy");
    },
    getAccessLogs() {
      if (this.$refs.form.validate()) {
        let json = {};
        if (this.table == "AccessLog") {
          json = {
            user_id: this.userId,
            uri: this.url,
            created_on: this.date,
            offset: this.offset,
          };
          this.$store.dispatch("logs/getAccessLog", json);
        } else if (this.table == "ResponseLog") {
          json = {
            user_id: this.userId,
            url: this.url,
            created_on: this.date,
            offset: this.offset,
          };
          this.$store.dispatch("logs/getResponseLogInput", json);
        } else {
          json = {
            user_id: this.userId,
            path: this.url,
            created_on: this.date,
            offset: this.offset,
          };
          this.$store.dispatch("logs/getAccessLogInput", json);
        }
      }
    },
    pageRoute(idx) {
      var preIndex = idx != 0 ? idx : 0;
      var nextIndex = preIndex == 0 ? 0 : preIndex + 30;
      let json = {};
      if (this.table == "AccessLog") {
        json = {
          user_id: this.userId,
          uri: this.url,
          created_on: this.date,
          offset: nextIndex,
        };
        this.$store.dispatch("logs/getAccessLog", json);
      } else if (this.table == "ResponseLog") {
        json = {
          user_id: this.userId,
          url: this.url,
          created_on: this.date,
          offset: nextIndex,
        };
        this.$store.dispatch("logs/getResponseLogInput", json);
      } else {
        json = {
          user_id: this.userId,
          path: this.url,
          created_on: this.date,
          offset: nextIndex,
        };
        this.$store.dispatch("logs/getAccessLogInput", json);
      }
    },
  }
};
</script>

<style>
</style>