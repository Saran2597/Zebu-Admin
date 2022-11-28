<template>
  <div>
    <v-form ref="form" v-model="formValid" @submit.prevent="getPoaList()">
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
    <v-container v-if="poaList.client_code" fluid class="mx-auto px-8">
      <div class="d-flex my-2">
        <div class="primaryColor">Client Code : &nbsp;</div>
        <div class="secondaryColor">{{poaList.client_code}}</div>
      </div>
      <div class="d-flex my-2">
        <div class="primaryColor">Created On : &nbsp;</div>
        <div class="secondaryColor">{{  `${getDateString(new Date(poaList.created_on.split(' ')[0]), "d-M-y")} ${poaList.created_on.split(' ')[1]}`}}</div>
      </div>
      <div class="d-flex my-2">
        <div class="primaryColor">DP ID : &nbsp;</div>
        <div class="secondaryColor">{{poaList.dp_id}}</div>
      </div>
      <div class="d-flex my-2">
        <div class="primaryColor">POA Status : &nbsp;</div>
        <div class="secondaryColor">{{poaList.poa_status}}</div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  name: "poaList",
  mixins: [commonFunc],
  data: () => ({
    userId: "",
    formValid: true,
    userIdRules: [
      (v) => !!v || "User Id is required",
      (v) => (v && v.length >= 2) || "User Id must be greater than 2 characters",
    ],
  }),
  computed: {
    ...mapGetters({
      loading: "getLoader",
    }),
    ...mapGetters("uploadFile", { poaList: "getPoaList" }),
  },
  methods: {
    getPoaList() {
      if(this.$refs.form.validate()) {
        let jsonObj = {
        clientCode: this.userId,
      };
      this.$store.dispatch("uploadFile/getPoaList", jsonObj);
      }
    },
  },
};
</script>

<style>
</style>