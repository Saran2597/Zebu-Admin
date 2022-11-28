<template>
  <v-app v-resize="onMobileSize">
    <!-- SNAKBAR  -->
    <!-- <v-snackbar transition="scroll-x-reverse-transition" app multi-line :top="true" :right="true" v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      <span class="font-weight-bold">{{ snackbar.msg }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" class="text-capitalize font-weight-bold" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters({ snackbar: "getSnackbar" }),
  },

  created() {
    const reloaded = localStorage.getItem("reloaded");
    if (reloaded !== "true") {
      localStorage.setItem("reloaded", "true");
      location.reload();
    }
  },

  methods: {
    onMobileSize() {
      this.$store.commit(
        "SET_MOBILEVIEW",
        window.innerWidth <= 1023 ? true : false
      );
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,300");
* {
  font-family: "Open Sans", sans-serif;
  font-display: swap !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* @font-face {
  font-family: open_sans;
  src: url(./assets/Open_Sans/static/OpenSans/OpenSans-Regular.ttf);
}
* {
  font-family: open_sans, sans-serif !important;
  font-display: swap !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
html {
  overflow-y: auto !important;
  /* text-rendering: optimizeLegibility; */
}
.themeBlue {
  color: #007aff;
}
.fsize24 {
  font-size: 24px;
}
.fsize22 {
  font-size: 22px;
}
.fsize18 {
  font-size: 18px !important;
}
.fsize20 {
  font-size: 20px !important;
}
.fsize11 {
  font-size: 11px;
}
.fsize12 {
  font-size: 12px !important;
}
.fsize13 {
  font-size: 13px;
}
.fsize10 {
  font-size: 10px !important;
}
.fsize14 {
  font-size: 14px;
}
.fsize16 {
  font-size: 16px;
}
.fontweight-bold {
  font-weight: bold;
}
.cardBoxShadow {
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15) !important;
  /* box-shadow: 2px 2px 5px #eee !important; */
}
.primaryColor {
  color: #282828;
}
.secondaryColor {
  color: #56585a;
}
.v-navigation-drawer__content{
  padding: 0 2px !important;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 5px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  --tw-bg-opacity: 2;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
  border-radius: 9999px;
}
.v-navigation-drawer__content::-webkit-scrollbar-track {
  --tw-bg-opacity: 2;
  background-color: rgba(75, 85, 99, var(--tw-bg-opacity));
  --tw-shadow: 0 10px 15px -3px rgba(255, 255, 255, 0.1),
    0 4px 6px -2px rgba(216, 213, 213, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.chart {
  height: 450px !important;
}
.echarts {
  width: 100% !important;
}
.border-bottom {
  border-bottom: 1px solid #e1e1e1;
}
.border-bottom-dark {
  border-bottom: 1px solid #a2a2a2 !important;
}
.border-top {
  border-top: 1px solid #e1e1e1;
}
.border-right-left {
  border-right: 1px solid #e1e1e1;
  border-left: 1px solid #e1e1e1;
}
.bg-lightgrey {
  background: hsl(0, 0%, 96%) !important;
}
.w-50 {
  width: 50% !important;
}
::-webkit-input-placeholder,
.v-text-field {
  /* Chrome/Opera/Safari -- for placeholder */
  font-size: 14px !important;
}
.bg_white {
  background-color: #fff !important;
}
.min-height-100 {
  min-height: 100px !important;
}
.min-w-120 {
  min-width: 120px !important;
}
.border-light {
  border: 1px solid #ededed;
}
.w-100 {
  width: 100% !important;
}
.v-btn {
  letter-spacing: 0.5px !important;
}
::-webkit-input-placeholder {
  /* Edge */
  color: #a3a3a3 !important;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #a3a3a3 !important;
}
::placeholder {
  color: #a3a3a3 !important;
}
.border-bottom-light {
  border-bottom: 1px solid #e6e6e6 !important;
}
.loaderPart {
  height: 50px;
  width: 50px;
}
.fileInput.v-file-input .v-input__control {
  max-width: 704px !important;
}
.apiKeyInput .v-input__control {
  max-width: 450px !important;
}
.input_text {
  max-width: 650px !important;
  min-width: 250px !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap;
}
.line-height-2 {
  line-height: 2;
}
.sidebar_head {
  border-bottom: solid 1px #d6d6d6;
  z-index: 9;
  position: sticky;
  top: 0;
  background: #ffffff;
  width: 74.5px;
  cursor: pointer;
  height: 56px;
  border-right: 1px solid #ddd;
}
.time-picker {
  border: 1px solid #a2a2a2;
  border-radius: 4px;
  height: 40px;
  margin-bottom: 28px;
  padding: 0px 10px;
  font-size: 14px !important;
  min-width: 100px;
}
.active_card {
  background: #f3f7fe !important;
  border: 0.1px solid #c4daff !important;
}
.active_card .text_title {
  color: #174ea6;
}
.active_card .count_no1 {
  color: #174ea6;
}
/* :root {
  color-scheme: dark;
} */
.v-dialog .json-dialog {
  overflow-x: hidden !important;
}
.dialog-header {
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  padding: 8px 12px;
  position: sticky;
  top: 0;
  background-color: #fafafa;
  align-items: center;
  z-index: 2;
}
.green-btn {
  background-color: #defce9 !important;
  color: #003618cb !important;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px !important;
  min-width: 100px !important;
  cursor: auto !important;
  font-size: 12px !important;
}
.red-btn {
  background-color: #fff5eeb5 !important;
  color: #da2809 !important;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px !important;
  min-width: 100px !important;
  cursor: auto !important;
  font-size: 12px !important;
}
.count_no {
  min-height: 300px;
  /* font-size: 4.5rem; */
  font-size: xxx-large;
  font-weight: bolder;
  color: rgba(54, 150, 59, 0.979);
}
.count_no1 {
  font-size: 2rem;
  font-weight: bolder;
}
.table_cus tr:nth-child(even) {
  background-color: #f7f9f8;
}

.wrapper {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
  grid-template-rows: minmax(300px, auto);
  grid-gap: 8px;
}

.box {
  border: 1px solid #ddd !important;
  display: grid;
  transition: 0.5s;
}
.wrapper .box:nth-child(3) {
  grid-row: span 2;
}
.wrapper .box:nth-child(4) {
  grid-column: span 2;
}
@media (max-width: 991px) {
  .wrapper .box {
    grid-column: unset !important;
    grid-row: unset !important;
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr)) !important;
  }
}
/* @media (max-width: 1622px) and (min-width: 992px) {
  .wrapper {
    grid-template-columns: repeat(auto-fit, minmax(400px, 466px));
  }
} */
.login-btn .v-btn--disabled {
  background-color: transparent !important;
}
.v-messages__message {
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    margin-right: 5px;
    margin-left: -12px !important;
    margin-top: 0px;
}
.bb-white{
  border-bottom: 2px solid #fff;
  border-radius: 2px
}


/* admin msg */
/* ul style */
.w-320 {
  width: 320px !important;
}

.selllabel {
  font-size: 14px;
  margin-top: 4px;
}

.searchbuyColor {
  background-color: #e8f4ff;
  color: #0060b9;
  padding: 4px 16px;
  border-radius: 4px;
}

.searchsellColor {
  background-color: #f7edef;
  color: #f03;
  padding: 4px 16px;
  border-radius: 4px;
}

.pointer {
  cursor: pointer;
}

.cancelledColor {
  background-color: #e9ecf1;
  color: #333638;
  padding: 4px 16px;
  border-radius: 4px;
}

.borderbox {
  box-shadow: 0px 0px 9px #00000014 !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

li:not(:last-child) {
  border-bottom: 1px solid #e5e7eb !important;
}
.searchContent {
  height: 300px;
  overflow-y: auto;
  z-index:9;
  position: absolute;
  width: 100%;
  border: 1px sloid #ededed !important;
  border-radius: 4px !important;
  background-color: #fff !important;
}
.clr-000{
  color: black !important;
}

</style>