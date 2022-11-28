<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Scheduler
          <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black"></v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active,toggle }" :value="n">
                <span @click="date = null;userId1=''">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">{{n}}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 pa-4 cardBoxShadow rounded-lg">
      <v-form ref="forms" v-model="formValid" lazy-validation @submit.prevent="callDialog()">
        <div class="ma-4">Order Count Scheduler</div>
        <div class="d-flex align-center">
          <v-radio-group v-model="schedulerSwitch" :rules="schedulerRules" row class="mx-5">
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>
          <v-btn type="submit" height="40" width="100" depressed color="primary" class="text-capitalize fsize14 mx-4">Submit</v-btn>
        </div>
      </v-form>
    </v-card>
    <!-- dialog for Confirmation -->
    <v-dialog v-model="confirmationDialog" max-width="350" height="250">
      <v-card class="pa-4 cardBoxShadow rounded-lg">
        <div class="pa-4 fsize13 red--text">
          {{`Are you sure want to ${schedulerSwitch} the scheduler?`}}
        </div>
        <div class="d-flex mt-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" text depressed outlined class="text-capitalize mr-2" @click="schedulerOnOff(schedulerSwitch)">Confirm</v-btn>
          <v-btn text depressed outlined class="text-capitalize" @click="confirmationDialog = false;">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tabs: ["Order Count"],
    tabSelect: "Order Count",
    schedulerSwitch: null,
    formValid: true,
    confirmationDialog: false,
    schedulerRules: [(v) => !!v || "Select any one option"],
  }),
  computed: {
    ...mapGetters({
      loading: "getLoader",
    }),
  },
  methods: {
    callDialog() {
      if (this.$refs.forms.validate()) {
        this.confirmationDialog = true;
      }
    },
    async schedulerOnOff(schedulerSwitch) {
      let fd = new FormData();
      fd.append("sch", schedulerSwitch);
      await this.$store.dispatch("schedulerOnOff", fd);
      this.confirmationDialog = false;
    },
  },
};
</script>