<template>
  <div>
    <div class="d-flex justify-end pa-4">
      <v-btn @click="addOrEditSector" depressed color="primary" class="text-capitalize fsize12">Add sector</v-btn>
    </div>
    <v-data-table v-if="sectorList.length != 0 && !loader" :headers="headers" v-bind:items="sectorList" :search="search"
      :value="sectorList" class="elevation-1 my-2" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td @click="sectorDetails(props.item.sectorId, props.item.sectorName)">{{ props.index + 1 }}</td>
          <td @click="sectorDetails(props.item.sectorId, props.item.sectorName)">{{ props.item.sectorName }}</td>
          <td @click="sectorDetails(props.item.sectorId, props.item.sectorName)" class="text-center">
            {{ props.item.sectorId }}</td>
          <td class="text-center" @click="sectorDetails(props.item.sectorId, props.item.sectorName)">
            {{ props.item.imageUrl }}</td>
          <td class="text-center" @click="previewImage(props.item.imageUrl)">
            <v-icon>mdi-eye</v-icon>
          </td>
          <td class="text-center" @click="openDailog(props.item.sectorId)">
            <v-icon>mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <div v-if="imageData">

    </div>

    <div v-else-if="loader">
      <div class="text-center pa-5">
        <v-icon class="display-2 pb-4">mdi-thought-bubble-outline</v-icon>
        <div class="">Data Not Found</div>
      </div>
    </div>

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>

            <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
              Are you sure you want to delete this sector ?
            </v-card-title>
            <v-card-text>Please type <span style="font-weight: bold; color: black;">{{ this.token }}</span> to confirm ?
            </v-card-text>
            <div class="px-6">
              <v-text-field label="Enter Captcha" v-model="isFormValid"></v-text-field>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="red darken-1" :disabled="!isFormValid" text @click="deleteSector()">
                YES, Delete
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="Imagedialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5 fsize13" style="font-size: 21px !important; text-align: center !important; font-size: 21px !important;
    text-align: center !important;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 12vh;">
              <!-- Are you sure you want to delete this sector ? -->
              Sector Image

            </v-card-title>
            <v-card-text>
              <div style="justify-content: center;
          text-align: center;">
                <img :src="imageData" alt="" width="60">
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="Imagedialog = false">
                Close
              </v-btn>
              <!-- <v-btn color="red darken-1" text @click="deleteSector()">
            Submit
          </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imageData: "",
      delteData: "",
      Imagedialog: false,
      dialog: false,
      isFormValid: "",
      token: "",
      data: '',
      tokenId: '',
      headers: [
        { text: "S.NO", align: "start", sortable: false },
        { text: "Sector Name", value: "sectorName", sortable: false },
        {
          text: "Sector Id",
          align: "center",
          value: "sectorId",
          sortable: false,
        },
        { text: "Image", align: "center", value: "imageUrl", sortable: false },
        { text: "Preview", align: "center", value: "imageUrl", sortable: false },
        {
          text: "Actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      loader: "getLoader",
      search: "getSearch",
    }),
    ...mapGetters("sector", {
      sectorList: "getSectorData",
    }),
  },

  created() {
    this.$store.dispatch("sector/getSector");

  },

  mounted() {
   this.randomNumberGenerator()
  },
  methods: {

    openDailog(val) {
      this.dialog = true
      this.delteData = val
    },
    addOrEditSector(id) {
      this.$router.push("/addOrEditSector");
    },
    deleteSector() {
      this.dialog = false
      if (this.token == this.isFormValid) {
        this.$store.dispatch("sector/deleteSector", { sectorId: this.delteData });
      }
      else {
        this.dialog = true
        this.$store.commit("SET_SNAKBAR", {
          msg: "Please enter valid captcha",
          show: true,
          color: "red darken-1",
          timeout: 3000,
        });
      }
    },
    previewImage(val) {
      this.Imagedialog = true
      this.imageData = val
      console.log(this.imageData);
    },
    async sectorDetails(sectorId, sectorName) {
      localStorage.setItem("sectorId", sectorId);
      localStorage.setItem("sectorName", sectorName);
      this.$router.push("/sectorDetails");
    },
    randomNumberGenerator() {
      let randomToken = (Math.random() + 2).toString(36).substring(5);
      this.token = randomToken
    }
  }
};
</script>

