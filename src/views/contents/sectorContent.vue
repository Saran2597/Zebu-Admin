<template>
  <div class="ma-4">
    <div class="d-flex justify-space-between">
      <v-breadcrumbs class="pa-0 mr-5" :items="titles" large></v-breadcrumbs>
      <v-btn @click="addOrEditSector" depressed color="primary" class="text-capitalize fsize12">Add Sector Details
      </v-btn>
    </div>
    <v-card class="my-4  cardBoxShadow">
      <v-simple-table v-if="sectorMappedList.length != 0 && !loader">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Stock Name</th>
            <th>Scrip Name</th>
            <th>Company Name</th>
            <th>Exchange</th>
            <th>Token</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sectorMappedList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.stockName }}</td>
            <td>{{ item.scripName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.exch }}</td>
            <td>{{ item.token }}</td>
            <td class="text-center"  @click="deleteSectorMapping(item)">
              <v-icon>mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      
      <div v-else-if="!loader" class="d-flex align-center justify-center min-height-100">
        <div>
          <div class="">Data Not Found</div>
        </div>
      </div>
      
    </v-card>
          <template>
      <v-layout row justify-center>
        <v-dialog v-model="dailog"  persistent max-width="290" max-height="278">
          <v-card>
            <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
              Are you sure you want to delete this sector ?
            </v-card-title>
            <v-card-text>
               <div>Please type <span style="font-weight: bold; color: black;">{{ this.token }}</span> to confirm ?</div>
            </v-card-text>
           <div class="text-center">{{companyType}}</div>
            <div class="px-6">
              <v-text-field label="Enter Captcha" v-model="isFormValid"></v-text-field>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dailog = false">
                Close
              </v-btn>
              <v-btn color="red darken-1" text :disabled="!isFormValid" @click="deleteSector()">
                YES, Delete
              </v-btn>
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
  data: () => ({
    dailog: false,
    companyType: "",
    isFormValid: "",
     token: "",
    titles: [
      { text: "All Sectors", href: "content?tab=Sector", disabled: false },
      { text: "content", disabled: false },
    ],
  }),

  computed: {
    ...mapGetters({
      loader: "getLoader",
    }),
    ...mapGetters("sector", {
      sectorMappedList: "getSectorMappedData",
    }),
  },

  created() {
    this.getMappedData();
    this.randomNumberGenerator()
  },

  methods: {
    
    addOrEditSector(sectorId) {
      this.$router.push("/addOrEditSectorContent");
    },
    deleteSector(){
      let jsonObj = {
        sectorId: val.sectorId,
        token: val.token,
    };
    // this.$store.dispatch("sector/deleteSectorMapping", jsonObj);
    this.getMappedData();
    },

    deleteSectorMapping(val) {
      this.dailog = true
      this.companyType = val.companyName
     
    },
    
    getMappedData() {
      let sectorId = localStorage.getItem("sectorId");
      let sectorName = localStorage.getItem("sectorName");
      if(sectorName)
      this.titles[1].text = sectorName;
      this.$store.dispatch("sector/getSectorMappedData", {
        sectorId: sectorId,
      });
    },
    randomNumberGenerator() {
      let randomToken = (Math.random() + 2).toString(36).substring(5);
      this.token = randomToken
    }
  }
};
</script>

