<template>
  <div>
    <v-form ref="form" v-model="formValid" @submit.prevent="getPostionAvgList()">
      <v-row class="ma-0 pa-4 align-center">
        <v-col cols="12" sm="12" md="5" lg="2">
          <div class="pb-2 fsize14">User Id</div>
          <v-text-field dense outlined v-model="userId" @input="userId = userId.toUpperCase()" placeholder="Enter User Id" :rules="userIdRules"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="5" lg="7">
          <div>
            <v-btn :loading="loading" height="40" depressed type="submit" color="primary" class="fsize12 text-capitalize">Submit</v-btn>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-form>
    <v-data-table :search="search" v-if="positionAvgList.length > 0" :headers="headers" v-bind:items="this.positionAvgList" :value="this.positionAvgList" class="my-5" id="table" item-key="name" single-select>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  name: "PostionAvgList",
  mixins: [commonFunc],
  data: () => ({
    userId: "",
    headers: [
      {
        text: "Scrip Name",
        align: "left",
        sortable: false,
        value: "scrip_name",
      },
      {
        text: "Net QTY.",
        align: "center",
        sortable: false,
        value: "net_qty",
      },
      {
        text: "Exchange",
        align: "center",
        sortable: false,
        value: "exch",
      },
      {
        text: "Buy QTY.",
        align: "center",
        sortable: false,
        value: "buy_qty",
      },
      {
        text: "Sell QTY.",
        align: "center",
        sortable: false,
        value: "sell_qty",
      },
      {
        text: "Buy Rate",
        align: "center",
        sortable: false,
        value: "buy_rate",
      },
      {
        text: "Sell Rate",
        align: "center",
        sortable: false,
        value: "sell_rate",
      },
      {
        text: "Cl Price",
        align: "center",
        sortable: false,
        value: "cl_price",
      },
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
    ...mapGetters("uploadFile", { positionAvgList: "getPositionAvgList" }),
  },
  methods: {
    getPostionAvgList() {
      if (this.$refs.form.validate()) {
        let jsonObj = {
          clientId: this.userId,
        };
        this.$store.dispatch("uploadFile/getPostionAvgList", jsonObj);
      }
    },
  },
};
</script>

