<template>
  <div>
    <v-form ref="form" v-model="formValid" @submit.prevent="getMwList()">
      <v-row class="ma-0 pa-4 align-center">
        <v-col></v-col>
        <v-col cols="12" sm="12" md="5" lg="3" class="pa-0">
          <div class="pb-2 fsize14">User Id</div>
          <v-text-field dense outlined v-model="userId" @input="userId = userId.toUpperCase()" placeholder="Enter User Id" :rules="userIdRules"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="5" lg="7">
          <div class="px-5">
            <v-btn :loading="loading" height="40" depressed type="submit" color="primary" class="fsize12 text-capitalize">Submit</v-btn>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-form>
    <v-tabs v-if="mwList" height="32" slider-size="2" color="#282828" class="text-capitalize px-8" v-model="activeTab">
      <v-tab v-for="(tab,index) in tabs" :key="index" :href="tab.link" class="fsize12 primaryColor text-capitalize">{{tab.name}}</v-tab>
    </v-tabs>
    <v-tabs-items v-if="mwList" color="grey" class="primaryColor fsize14 " v-model="activeTab">
      <v-card>
        <v-tab-item :transition="false" id="1">
          <v-data-table hide-default-footer :search="search" :headers="headers" v-bind:items="mwList[1]">
          </v-data-table>
          <!-- <div v-else class="d-flex align-center justify-center min-height-100">
            <span class="secondaryColor">No Scrips Found</span>
          </div> -->
        </v-tab-item>
        <v-tab-item :transition="false" id="2">
          <v-data-table hide-default-footer :search="search" :headers="headers" v-bind:items="mwList[2]">
          </v-data-table>
          <!-- <div v-else class="d-flex align-center justify-center min-height-100">
            <span class="secondaryColor">No Scrips Found</span>
          </div> -->
        </v-tab-item>
        <v-tab-item :transition="false" id="3">
          <v-data-table hide-default-footer :search="search" :headers="headers" v-bind:items="mwList[3]">
          </v-data-table>
          <!-- <div v-if="mwList[3]" class="d-flex align-center justify-center min-height-100">
            <span class="secondaryColor">No Scrips Found</span>
          </div> -->
        </v-tab-item>
        <v-tab-item :transition="false" id="4">
          <v-data-table hide-default-footer :search="search" :headers="headers" v-bind:items="mwList[4]">
          </v-data-table>
          <!-- <div v-else class="d-flex align-center justify-center min-height-100">
            <span class="secondaryColor">No Scrips Found</span>
          </div> -->
        </v-tab-item>
        <v-tab-item :transition="false" id="5">
          <v-data-table hide-default-footer :search="search" :headers="headers" v-bind:items="mwList[5]">
          </v-data-table>
          <!-- <div v-else class="d-flex align-center justify-center min-height-100">
            <span class="secondaryColor">No Scrips Found</span>
          </div> -->
        </v-tab-item>
      </v-card>
    </v-tabs-items>
    <div v-else class="d-flex justify-center secondaryColor pa-8">
      No Data Found
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  name: "MwList",
  mixins: [commonFunc],
  data: () => ({
    userId: "",
    headers: [
      {
        text: "Scrip Name",
        align: "left",
        sortable: true,
        value: "scrip_name",
      },
      {
        text: "Exchange Segment",
        align: "center",
        sortable: true,
        value: "exch_seg",
      },
      {
        text: "Token",
        align: "center",
        sortable: false,
        value: "token",
      },
      {
        text: "Lot Size",
        align: "center",
        sortable: false,
        value: "lot_size",
      },
      {
        text: "Tick Size",
        align: "center",
        sortable: false,
        value: "tick_size",
      },
      {
        text: "MW Id",
        align: "center",
        sortable: true,
        value: "mw_id",
      },
      {
        text: "Strike Price",
        align: "center",
        sortable: false,
        value: "strike_price",
      },
      {
        text: "Group Name",
        align: "center",
        sortable: true,
        value: "group_name",
      },
    ],
    activeTab: "1",
    tabs: [
      { name: "Mw-1", link: "#1" },
      { name: "Mw-2", link: "#2" },
      { name: "Mw-3", link: "#3" },
      { name: "Mw-4", link: "#4" },
      { name: "Mw-5", link: "#5" },
    ],
    formValid: true,
    userIdRules: [
      (v) => !!v || "User Id is required",
      (v) =>
        (v && v.length >= 2) || "User Id must be greater than 2 characters",
    ],
  }),
  computed: {
    ...mapGetters({
      loading: "getLoader",
      search: "getSearch",
    }),
    ...mapGetters("uploadFile", { mwList: "getMwList" }),
  },
  watch: {
    $route(to, from) {
      this.$store.commit('uploadFile/SET_MW_LIST', '')
    },
  },
  methods: {
    getMwList() {
      if (this.$refs.form.validate()) {
        let jsonObj = {
          user_id: this.userId,
        };
        this.$store.dispatch("uploadFile/getMwList", jsonObj);
      }
    },
  },
};
</script>