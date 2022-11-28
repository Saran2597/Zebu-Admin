<template>
  <v-app>
    <v-layout row wrap align-center justify-center class="opansans-font ma-0">
      <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
        <v-img :src="loginImg" alt="loginLogo" class="mx-auto" max-width="60%"></v-img>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
        <v-row class="ma-0 justify-center">
          <v-card class="pa-6 cardBoxShadow rounded-lg" min-width="350">
            <form @keyup.enter="login()">
              <span class="fsize24 themeBlue"> {{ getBrokerName }}</span>
              <div class="fsize22 mb-6 primaryColor">
                {{ getBrokerName }} Admin Dashboard
              </div>
              <div>
                <p class="mb-2 ml-1 fsize14 primaryColor">Username</p>
                <v-text-field v-model.trim="userName" class="fsize11" placeholder="Enter the username"
                  :rules="userNameRules" outlined dense autocomplete></v-text-field>
              </div>
              <div>
                <p class="mb-2 ml-1 fsize14 primaryColor">Password</p>
                <v-text-field v-model="password" placeholder="Enter the password" :rules="passwordRules" class="fsize11"
                  outlined dense :type="passwordShow ? 'text' : 'password'"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow"
                  autocomplete></v-text-field>
              </div>
              <v-btn :loading="getLoader" @click="login()" block depressed
                class="login-btn text-capitalize mt-3 primary" :disabled="!userName || !password">
                Sign In</v-btn>
            </form>
          </v-card>
        </v-row>
      </v-flex>
    </v-layout>
    <footer class="d-flex justify-end ma-4">
      <span class="secondaryColor fsize13">2021 - 2022 Stoneage Solutions. All rights reserved</span>
    </footer>
    <!-- <div class="d-flex align-center justify-center" style="height:100vh !important">
      <img height="60" width="60" src="../assets/Spinner.gif" alt="loading">
    </div> -->
  </v-app>
</template>


<script>
import loginImg from "../assets/loginPic.png";
import { mapGetters } from "vuex";
export default {
  name: "Login",

  data: () => ({
    loginImg: loginImg,
    userName: "",
    password: "",
    passwordShow: false,
    userNameRules: [(v) => !!v || "Username is required"],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
    ],
  }),

  computed: {
    ...mapGetters(["getBrokerName", "getLoader", "getAuthcode"]),
  },

  created() {
    // let uri = window.location.search.substring(1);
    // let params = new URLSearchParams(uri);
    // console.log(params.get("authCode"));
    // if (params.get("authCode")) {
    // } else {
    //   this.ssoRedirect();
    // }
    // console.log(this.$router.currentRoute.path);
    // if (uri && this.$router.currentRoute.path === "/") {
    //   this.$store.dispatch("auth/getData");
    // }
  },

  methods: {
    login() {
      this.$store.dispatch("adminLogin", {
        userName: this.userName,
        password: this.password,
      });
    },
    ssoRedirect() {
      var appcode = this.getAuthcode;
      window.location.href =
        `https://a3.aliceblueonline.com?appcode=${appcode}`;
    },
  }
};
</script>

