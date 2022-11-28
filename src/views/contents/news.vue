<template>
  <div>
    <v-row class="ma-0 pa-2 align-center">
      <v-col cols="2" class="pa-0">
      </v-col>
      <v-col class="pa-0" cols="1"></v-col>
      <v-col cols="6" class="pa-0" style="height: 40px">
      </v-col>
      <v-col class="pa-0" cols="1"></v-col>
      <v-col cols="2" class="pa-0 d-flex justify-end">
        <v-btn depressed color="primary" class="text-capitalize" min-width="155px" @click="addOrEditNews('0')">
          Add News
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table v-if="newsList.length != 0" :headers="headers" v-bind:items="newsList" :search="search" :value="newsList" class="elevation-1 my-2 border-top" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td>{{ props.index + 1 }}</td>
          <td class="min-w-120">{{ props.item.source }}</td>
          <td>{{ props.item.headLine }}</td>
          <td>{{ props.item.subject }}</td>
          <td class="min-w-120">{{ getDateString(new Date(props.item.date.split(' ')[0]), "d-M-y") }}</td>
          <td class="text-center min-w-120"><v-icon class="pr-4" medium @click="addOrEditNews(props.item.newsId)"> mdi-pencil </v-icon>
          <v-icon medium @click="confirmationAlert(props.item.newsId)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <div v-else>
      <div class="text-center pa-5">
        <v-icon class="display-2 pb-4">mdi-thought-bubble-outline</v-icon>
        <div class="">Data Not Found</div>
      </div>
    </div>
    
    <template v-bind:items="sectorList">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5 fsize13" style="font-size: 21px !important;">
              Are you sure you want to delete this news ?
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
              <v-btn color="red darken-1" text :disabled="!isFormValid" @click="deleteNews()">
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
import commonFunc from "../../mixins/commonFunctions";
export default {
  mixins: [commonFunc],

  data() {
    return {
      dialog: false,
      newsInfo: "",
      isFormValid: "",
      token: "",
      headers: [
        { text: "S.NO", align: "start", sortable: false },
        { text: "Source", value: "source", sortable: false },
        { text: "HeadLine", value: "headLine", sortable: false },
        { text: "Subject", value: "subject", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Actions", align: "center", value: "", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      search: "getSearch",
    }),
    ...mapGetters('news',{
      newsList: "getNewsData",
    }),
  },

  mounted() {
    this.$store.dispatch("news/getNews");
    this.randomNumberGenerator()
  },

  methods: {
    addOrEditNews(key) {
      localStorage.setItem("addOrEditNews", JSON.stringify(key));
      this.$router.push("/addOrEditNews");
    },
    confirmationAlert(val){
     this.dialog = true
     this.newsInfo = val
     console.log(val);
    },
    deleteNews(key) {
       this.dialog = false
      if (this.token == this.isFormValid) {
        this.$store.dispatch("news/deleteNews", { sectorId: this.newsInfo });
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
      // let jsonobj = {
      //   newsId: this.newsInfo,
      // };
      // this.$store.dispatch("news/deleteNews", jsonobj);
      // this.dialog = false
    },
       randomNumberGenerator() {
      let randomToken = (Math.random() + 2).toString(36).substring(5);
      this.token = randomToken
    }
  }
};
</script>

