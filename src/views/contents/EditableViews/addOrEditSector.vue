<template>
  <div>
    <v-row class="ma-0 pa-4 align-center">
      <v-col cols="2" class="pa-0">
        <h3 width="100" height="24" class=".text-lg-h6">
          Add Sector
        </h3>
      </v-col>
    </v-row>

    <div class="mt-1">
      <v-form ref="form" v-model="form" lazy-validation>
        <v-card class="mx-4 pa-5 cardBoxShadow rounded-lg">
          <v-row class="ma-0">
            <v-col cols="12" sm="12" md="6" lg="3">
              <span class="fsize14 font-weight-bold primaryColor">Sector Details</span>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="5">
              <div class="pb-1 secondaryColor fsize14">Sector Name</div>
              <v-text-field dense height="40px" v-model="sectorName" placeholder="Enter the Sector Name" autocomplete="off" outlined :rules="sectorNameRules">
              </v-text-field>
              <div class="pb-1 secondaryColor fsize14">Upload Image</div>
              <v-file-input type="file" dense v-model="image" placeholder="Select the Image" append-icon="mdi-folder-open" prepend-icon="" autocomplete="off" :rules="imageRules" outlined>
              </v-file-input>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4"></v-col>
          </v-row>
          <div>
          </div>
        </v-card>

        <div class="mt-5 pa-4 d-flex justify-end">
          <v-btn height="40" width="96" depressed outlined @click="$router.back()" class="text-capitalize" min-width="80">Cancel</v-btn>
          <v-btn height="40" width="96" color="primary" depressed class="ml-4 text-capitalize" @click="createSector" min-width="80">
            Save
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    sectorName: "",
    image: [],
    form: true,
    sectorNameRules: [(v) => !!v || "Sector Name is required"],
    imageRules: [(v) => !!v || "Image is required"],
  }),
  methods: {
    resetForm() {
      this.sectorName = "";
      this.image = [];
    },
    async createSector() {
      var fd = new FormData();
      fd.append("image", this.image);
      fd.append("secDetails", JSON.stringify({ sectorName: this.sectorName }));
      await this.$store.dispatch("sector/createSector", fd);
      this.resetForm();
    },
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>