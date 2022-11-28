<template>
  <div>
    <v-form ref="form" v-model="formValid" @submit.prevent="getMpinDetails(userId,'get')" lazy-validation>
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
    <v-simple-table v-if="mpinDetails.user_id">
      <thead>
        <tr>
          <th class="text-capitalize text-center">User Id</th>
          <th class="text-capitalize text-center">M-PIN</th>
          <th class="text-capitalize text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">{{mpinDetails.user_id}}</td>
          <td class="text-center">{{mpinDetails.mpin}}</td>
          <td class="text-center">
            <v-icon class="mx-2" @click="editDialog = true;">mdi-pencil</v-icon>
            <!-- <v-icon class="mx-2" @click="EditOrDeleteMpin(mpinDetails.id,'delete')">mdi-delete</v-icon> -->
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="editDialog" width="300" height="300">
      <v-form @submit.prevent="EditOrDeleteMpin(mpinDetails.id,'edit')">
        <v-card class="pa-4 cardBoxShadow rounded-lg">
          <div class="pb-2 fsize14">New M-PIN</div>
          <input type="number" :value="newMpin" placeholder="Enter New M-PIN" @input="updateValue" class="mpin-input" />
          <div class="my-1 red--text fsize12" style="height:12px">
            <span v-if="newMpin == '' && isSubmit"> Please Enter M-PIN</span>
            <span v-else-if="newMpin.length < 6 && isSubmit">Please Enter 6 Digit M-PIN</span>
          </div>
          <div class="d-flex justify-end py-2">
            <v-btn type="submit" depressed color="primary" class="text-capitalize fsize12">Submit</v-btn>
          </div>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  name: "M-PIN",
  mixins: [commonFunc],

  data: () => ({
    tabs: ["M-PIN"],
    tabSelect: "M-PIN",
    userId: "",
    editDialog: false,
    newMpin: "",
    isSubmit: false,
    formValid: true,
    userIdRules: [
      (v) => !!v || "User Id is required",
      (v) =>
        (v && v.length >= 2) || "User Id must be greater than 2 characters",
    ],
  }),

  computed: {
    ...mapGetters("mpin", {
      mpinDetails: "getMpinDetails",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
  },

  watch: {
    editDialog(val) {
      this.isSubmit = false;
      this.newMpin = "";
    },
    $route(to, from) {
      this.$store.commit("mpin/SET_MPIN_DATA", []);
    },
  },

  created() {},

  methods: {
    async getMpinDetails(userId, type) {
      if (this.$refs.form.validate()) {
        let json = {
          user_id: userId,
        };
        await this.$store.dispatch("mpin/getMpinDetails", {
          data: json,
          type: type,
        });
      }
    },
    async EditOrDeleteMpin(mpinId, type) {
      this.isSubmit = true;
      if ((this.newMpin && this.newMpin.length == 6) || type == "delete") {
        let json = {
          id: mpinId,
          mpin: type == "delete" ? null : this.newMpin,
        };
        await this.$store.dispatch("mpin/editOrDeleteMpin", {
          data: json,
          type: type,
        });
        await this.getMpinDetails(this.mpinDetails.user_id, "update");
        this.editDialog = false;
      }
    },
    updateValue(event) {
      const value = event.target.value;
      if (String(value).length <= 6) {
        this.newMpin = value;
      }
      this.$forceUpdate();
    },
  }
};
</script>

<style>
.mpin-input {
  width: 100%;
  height: 40px;
  border: 1px solid #a2a2a2;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  outline: none;
  text-indent: 10px;
}
</style>