<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Vendor
          <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active, toggle }" :value="n">
                <span @click="date = null; userId1 = ''">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                    :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>
          </div>
        </div>
      </div>
    </div>

    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 cardBoxShadow rounded-lg">
      <v-simple-table>
        <thead>
          <tr>
            <th v-for="(i, idex) in headers" :key="idex" :class="i.class">{{ i.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, idex) in vendorList" :key="idex">
            <td>{{ i.app_name }}</td>
            <td>{{ i.api_key }}</td>
            <td class="text-center">
              <button :class="i.active_status == 1 ? 'green-btn' : 'red-btn'" class="fsize12 text-capitalize">{{
                  i.active_status == 1 ? "Active" : "In Active"
              }}</button>
            </td>
            <td class="text-center">
              <v-btn min-width="113" height="30" :color="i.authorization_status == 0 ? 'red' : 'primary'"
                @click="authorize(i)" depressed class="text-capitalize fsize12 white--text">{{ `${i.authorization_status
                    == 0 ? 'Authorize' : 'Un Authorize'}`
                }}</v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <v-dialog v-model="authorizeDialog" width="370">
      <v-card class="pa-4 cardBoxShadow rounded-lg" height="130">
        <div class="secondaryColor fsize14 d-flex justify-space-between">
          <div>Are you sure want to <b>{{ `${this.vendorDetails.authorization_status == 1 ? 'Authorize' : 'UnAuthorize'}`}}</b> this APP ?</div>
          <div>
            <v-icon @click="authorizeDialog = false" color="light-blue">mdi-close-circle-outline</v-icon>
          </div>
        </div>
        <div class="d-flex justify-end mt-10">
          <v-btn height="32" width="86" @click="authorizeApi()" depressed outlined text color="light-blue"
            class="text-capitalize white--text fsize12 mr-2">
            Confirm
          </v-btn>
          <v-btn height="32" width="86" @click="authorizeDialog = false" depressed color="black" outlined text
            class="text-capitalize fsize12">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
export default {
  name: "vendor",
  mixins: [commonFunc],

  data: () => ({
    tabs: ["Vendor Details"],
    tabSelect: "Reset",
    headers: [
      {
        title: "Name",
        class: "text-left",
      },
      {
        title: "App Code",
        class: "text-left",
      },
       {
        title: "Status",
        class: "text-center",
      },
      {
        title: "Action",
        class: "text-center",
      },
    ],
    // data: [
    //   {
    //     status: "Active",
    //     name: "Amoga",
    //     api_key: "sadfsdfsdfesd21334QW2",
    //     expiry: "17 may 2021",
    //     authorization_status: 0,
    //   },
    // ],
    authorizeDialog: false,
    vendorDetails: [],
  }),

  computed: {
    ...mapGetters("vendor", {
      vendorList: "getVendors",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
   
  },

  watch: {},

  created() {
    this.$store.dispatch("vendor/fetchVendors", { client_id: "RC047" });
  },

  methods: {
    async getApiKeyDetails(type) {
      if (this.$refs.forms.validate()) {
        let formData = new FormData();
        formData.append(
          "userId",
          type == "update" ? this.apiKeyDetails.user_id : this.userId
        );
        await this.$store.dispatch("apiKey/getApiKeyDetails", {
          data: formData,
          type: type,
        });
      }
    },
    async authorize(data) {
      this.authorizeDialog = true;
      this.vendorDetails = data;
    },
    async authorizeApi() {
      let json = {
        data: {
          authorization_status:
            this.vendorDetails.authorization_status == 0 ? 1 : 0,
          api_key: this.vendorDetails.api_key,
        },
        client_id: this.vendorDetails.client_id,
      };
      await this.$store.dispatch("vendor/updateAuthorize", json);
      this.authorizeDialog = false;
    },
  }
};
</script>

<style>
</style>