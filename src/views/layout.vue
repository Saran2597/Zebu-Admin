<template>
  <v-app id="inspire">
    <v-navigation-drawer mobile-breakpoint="1024" app width="78" v-model="drawer" class="" color="">
    <div class="cursor d-flex justify-center align-center sidebar_head" @click="$router.push('/dashboard').catch(() => {})">
          <v-img :max-width="$store.state.brokerName == 'Aliceblue' ? 40 : 30" :src="($store.state.brokerLogo)" alt="logo"></v-img>
        </div>
      <div>
        <v-tabs class="sidebar mt-3" vertical v-model="selectedItem">
          <v-tab :title="item.text" class="sidebarTab" v-for="(item, i) in menuList" @click="changeRoute(item)" :key=i>
            <div class="menu d-flex align-center flex-column">
              <v-img max-width="35%" :src="getImgUrl(item.svg)" class="unactive_img mb-1" :alt="item.text"></v-img>
              <div class="fsize11 primaryColor font-weight-bold text-overflow">{{ item.text }}</div>
              <div class="fsize11 primaryColor font-weight-bold text-overflow">{{item.subText}}</div>
            </div>
          </v-tab>
        </v-tabs>
      </div>
    </v-navigation-drawer>

    <v-app-bar flat tile class="border-bottom-light bg_white" app dense height="56px">
      <v-app-bar-nav-icon v-if="$store.state.isMobileView" @click="drawer = !drawer" class="ma-0"></v-app-bar-nav-icon>
      <div :title="$store.state.brokerName" class="ml-3 primaryColor">{{`${$store.state.brokerName} - Admin Dashboard`}}</div>
      <v-spacer></v-spacer>
      <div class="text-right">
        <v-menu max-width="190" right bottom :offset-y="true" transition="slide-y-transition" :position-y="300" rounded>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="secondaryColor fsize12 font-weight-bold mr-2 indigo--text text-capitalize">{{userName}}</span>
          </template>
          <v-list class="py-0">
            <v-list-item v-for="(i,idx) in dropdownList" :key="idx" class="body-2 header_menu" @click="navigatePage(i)">
              <v-list-item-content>
                <span class="primaryColor font-weight-bold fsize14">{{i.text}}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="main_block">
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="logoutDialog" width="370" overlay-color="#84899D">
      <v-card class="pa-4 cardBoxShadow rounded-lg" height="130">
        <div class="secondaryColor fsize14 d-flex justify-space-between">
          <div>Are you sure want to logout ?</div>
          <div>
            <v-icon @click="logoutDialog = false" color="light-blue">mdi-close-circle-outline</v-icon>
          </div>
        </div>
        <div class="d-flex justify-end mt-10">
          <v-btn height="32" width="86" @click="logout()" depressed outlined text color="light-blue" class="text-capitalize white--text fsize12 mr-2">
            Confirm
          </v-btn>
          <v-btn height="32" width="86" @click="logoutDialog = false" depressed color="black" outlined text class="text-capitalize fsize12">
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    userName: localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "",
    drawer: null,
    selectedItem: 0,
    // aliceblue menulist
    menuList: [
      {
        text: "Dashboard",
        subText: "",
        svg: "home",
        route: "dashboard",
      },
      // {
      //   text: "Login",
      //   subText: "",
      //   svg: "home",
      //   route: "loginDetails",
      // },
      {
        text: "User Info",
        subText: "",
        svg: "orders",
        route: "userLogs",
      },
      {
        text: "File Upload",
        subText: "",
        svg: "upload",
        route: "fileUpload",
      },

      // {
      //   text: "Scrips Info",
      //   subText: "",
      //   svg: "positions",
      //   route: "scripInfo",
      // },
      {
        text: "Notification",
        subText: "",
        svg: "newsIcon",
        route: "adminMessage",
      },
      {
        text: "Content",
        subText: "",
        svg: "funds",
        route: "content",
      },
      {
        text: "Instruments",
        subText: "",
        svg: "holdings",
        route: "cMasterData",
      },
      {
        text: "API key",
        subText: "",
        svg: "Apikey",
        route: "apiKey",
      },
      {
        text: "Position",
        subText: "",
        svg: "holdings",
        route: "positionAvg",
      },
      {
        text: "charts",
        subText: "",
        svg: "holdings",
        route: "chartData",
      },
      // {
      //   text: "Reports",
      //   subText: "",
      //   svg: "funds",
      //   route: "reports",
      // },
      // {
      //   text: "Vendor",
      //   subText: "",
      //   svg: "user",
      //   route: "vendor",
      // },
      // {
      //   text: "Vendor",
      //   subText: "",
      //   svg: "user",
      //   route: "vendorinfo",
      // },
      // {
      // {
      //   text: "Settings",
      //   subText: "",
      //   svg: "settings",
      //   route: "settings",
      // },
      // {
      //   text: "scheduler",
      //   subText: "",
      //   svg: "time",
      //   route: "scheduler",
      // },
    ],
    // ABML menulist
    // menuList: [
    //   {
    //     text: "Dashboard",
    //     subText: "",
    //     svg: "home",
    //     route: "dashboard",
    //   },
    //   {
    //     text: "User Info",
    //     subText: "",
    //     svg: "orders",
    //     route: "userLogs",
    //   },
    //   {
    //     text: "Notify",
    //     subText: "",
    //     svg: "newsIcon",
    //     route: "adminMessage",
    //   },
    //   {
    //     text: "Content",
    //     subText: "",
    //     svg: "funds",
    //     route: "content",
    //   },
    //   {
    //     text: "Contracts",
    //     subText: "",
    //     svg: "holdings",
    //     route: "cMasterData",
    //   },
    //   {
    //     text: "API key",
    //     subText: "",
    //     svg: "Apikey",
    //     route: "apiKey",
    //   },
    //   {
    //     text: "Reports",
    //     subText: "",
    //     svg: "funds",
    //     route: "reports",
    //   },
    // ],
    dropdownList: [
      // {
      //   text: "Dashboard",
      //   route: "dashboard",
      // },
      // {
      //   text: "Content",
      //   route: "content",
      // },
      {
        text: "Logout",
        route: "logout",
      },
    ],
    logoutDialog: false,
  }),

  computed: {
    ...mapGetters({
      snackbar: "getSnackbar",
    }),
  },

  watch: {
    // aliceblue watch
    $route(to, from) {
      switch (to.name) {
        case "dashboard":
          this.selectedItem = 0;
          break;
        case "logDetails":
          this.selectedItem = 1;
          break;
        case "fileUpload":
          this.selectedItem = 2;
          break;
        case "adminMessage":
          this.selectedItem = 3;
          break;
        case "holidays":
          this.selectedItem = 4;
          break;
        case "contractMaster":
          this.selectedItem = 5;
          break;
        case "apiKey":
          this.selectedItem = 6;
          break;
        case "mpin":
          this.selectedItem = 7;
          break;
      }
    },

    // ABML watch
    // $route(to, from) {
    //   switch (to.name) {
    //     case "dashboard":
    //       this.selectedItem = 0;
    //       break;
    //     case "logDetails":
    //       this.selectedItem = 1;
    //       break;
    //     case "adminMessage":
    //       this.selectedItem = 2;
    //       break;
    //     case "holidays":
    //       this.selectedItem = 3;
    //       break;
    //     case "contractMaster":
    //       this.selectedItem = 4;
    //       break;
    //     case "apiKey":
    //       this.selectedItem = 5;
    //       break;
    //     case "reports":
    //       this.selectedItem = 6;
    //       break;
    //   }
    // },
  },

  mounted() {
    this.selectedItem = this.menuList.findIndex(
      (std) => std.route === this.$router.currentRoute.path.replace("/", "")
    );
  },

  methods: {
    getImgUrl(img) {
      var images = require.context("../assets/menu/", false, /\.svg$/);
      return images("./" + img + ".svg");
    },
    changeRoute(val) {
      this.$router.push(val.route).catch(() => {});
    },
    logout() {
      localStorage.clear();
      this.$router.push("/").catch(() => {});
      this.$store.commit("SET_SNAKBAR", {
        msg: "Logout Sucessfully",
        show: true,
        color: "teal darken-1",
        timeout: 2500,
      });
    },
    navigatePage(val) {
      if (val.route == "logout") {
        this.logoutDialog = true;
      } else {
        this.$router.push(val.route).catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 77px !important;
}
.v-navigation-drawer__content {
  overflow: clip !important;
}
.border-lft {
  border-left: 1px solid #ededed;
}
::v-deep.v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0px !important;
}
.hovershow:hover .indexChart {
  display: block !important;
}
.sidebar .v-tab {
  min-width: 64px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #282828 !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.sidebar .v-tab--active {
  color: #0065be !important;
}
.sidebar .v-tab--active {
  filter: invert(50%) sepia(85%) saturate(5176%) hue-rotate(192deg)
    brightness(102%) contrast(106%) !important;
}
.sidebar .v-tab:hover {
  filter: invert(50%) sepia(85%) saturate(5176%) hue-rotate(192deg)
    brightness(102%) contrast(106%) !important;
}
.theme--light .darkThemeImg {
  display: contents !important;
}
.theme--dark .sidebar .v-tab .unactive_img {
  display: contents !important;
}
.theme--dark .sidebar .v-tab--active .unactive_img {
  display: inline-block !important;
}
.theme--dark .sidebar .v-tab {
 height: 60px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #ffffff !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.theme--light .sidebar .v-tab {
 height: 60px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #282828 !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.theme--dark.v-tabs > .v-tabs-bar {
  background: #363636 !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #1e1e1e !important;
}
.theme--dark.v-app-bar.v-toolbar {
  background-color: #1e1e1e !important;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 24px !important;
}
.text-overflow {
  text-overflow: inherit !important;
  overflow: hidden !important;
  width: 60px;
}
.main_block {
  background-color: #f7f7f7;
}
</style>