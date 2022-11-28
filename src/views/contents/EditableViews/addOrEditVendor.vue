<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      Creater Vendor
    </v-row>

    <div class="mt-1">
      <v-form ref="form" v-model="formValid" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Vendor Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Vendor Name</div>
              <v-text-field autofocus dense height="40px" v-model="vendorName" placeholder="Enter the Vendor Name" :rules="vendorNameRules" autocomplete="off" outlined>
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Contact Person Name</div>
              <v-text-field dense height="40px" v-model="personName" placeholder="Enter the Contact Person Name" :rules="personNameRules" autocomplete="off" outlined>
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Mobile Number</div>
              <v-text-field dense height="40px" v-model="mobileNo" placeholder="Enter the Mobile Number" :rules="mobileNoRules" autocomplete="off" outlined>
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Logo (24*24px)</div>
              <v-file-input type="file" dense v-model="logo" placeholder="Please upload a square image (24*24px is preferred)" append-icon="mdi-folder-open" prepend-icon="" :rules="logoRules" autocomplete="off" outlined>
              </v-file-input>
              <v-row no-gutters>
                <v-col class="pr-2">
                  <div class="pb-1 secondaryColor fsize14">Email ID</div>
                  <v-text-field dense height="40px" v-model="emailId" placeholder="Enter the Email ID" :rules="emailIdRules" autocomplete="off" outlined>
                  </v-text-field>
                </v-col>
                <v-col class="pl-2">
                  <div class="pb-1 secondaryColor fsize14">Redirect URL</div>
                  <v-text-field dense height="40px" v-model="redirectUrl" placeholder="Enter the Redirect URL" :rules="urlRules" autocomplete="off" outlined>
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="pb-1 secondaryColor fsize14">Description</div>
              <v-textarea outlined v-model="description" name="input-7-4" placeholder="Enter the Description" :rules="descriptionRules"></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize" min-width="80">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="createVendor" min-width="80">
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
    vendorName: "",
    personName: "",
    mobileNo: "",
    emailId: "",
    logo: null,
    redirectUrl: "",
    description: "",
    formValid: true,
    vendorNameRules: [(v) => !!v || "Vendor Name is required"],
    personNameRules: [(v) => !!v || "Contact Person Name is required"],
    mobileNoRules: [(v) => !!v || "Mobile Number is required"],
    emailIdRules: [(v) => !!v || "Email ID is required"],
    logoRules: [(v) => !!v || "Logo is required"],
    urlRules: [(v) => !!v || "Redirect URL is required"],
    descriptionRules: [(v) => !!v || "Description is required"],
  }),
  methods: {
    createVendor() {
      if (this.$refs.form.validate()) {
      }
    },
  },
};
</script>