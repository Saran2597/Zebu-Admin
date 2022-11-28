<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Content Management
          <v-progress-circular class="ml-2" indeterminate v-if="loader" size="18" :width="2" color="black"></v-progress-circular>
        </div>
        <div class="pt-3 d-flex">
          <v-slide-group v-model="tabSelect" mandatory>
            <v-slide-item v-for="n in tabs" :key="n" :value="n" v-slot="{ active,toggle }">
              <span @click="$router.push({ path: 'content',query: { tab:n}}).catch(() => { })">
                <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">{{n}}</v-btn>
              </span>
            </v-slide-item>
          </v-slide-group>
          <v-spacer></v-spacer>
          <div style="width:25%">
            <v-text-field dense hide-details="" outlined height="16" prepend-inner-icon="mdi-magnify" placeholder="Search" v-model="search"></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>

    <v-card class="ma-4 cardBoxShadow rounded-lg">
      <!-- <holiday v-if="tabSelect == 'Holidays'" /> -->
      <events v-if="tabSelect == 'Events'" />
      <results v-if="tabSelect == 'Results'" />
      <news v-if="tabSelect == 'News'" />
      <ipo v-if="tabSelect == 'IPO'" />
      <sgb v-if="tabSelect == 'SGB'" />
      <sector v-if="tabSelect == 'Sector'" />
      <mostActive v-if="tabSelect == 'Most Active'" />
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
export default {
  name: "holidays",
  mixins: [commonFunc],

  components: {
    events: () => import("../views/contents/event.vue"),
    results: () => import("../views/contents/result.vue"),
    news: () => import("../views/contents/news.vue"),
    ipo: () => import("../views/contents/ipo.vue"),
    sgb: () => import("../views/contents/sgb.vue"),
    sector: () => import("../views/contents/sector.vue"),
    mostActive: () => import("../views/contents/mostActive.vue"),
  },

  data: () => ({
    // tabs: ["Holidays", "Events", "Results", "News", "IPO", "SGB", "Sector","POA","Holdings","Marketwatch","EDIS"],
    tabs: [
      "Events",
      "Results",
      "News",
      "IPO",
      "SGB",
      "Sector",
      // "Most Active"
      // "POA",
      // "Holdings",
      // "Position",
      // "Marketwatch",
      // "EDIS",
      // "M-PIN",
      // "Payment Reference"
    ],
    tabSelect: "",
  }),

  computed: {
    ...mapGetters({
      loader: "getLoader",
      holidaysList: "getHolidays",
    }),
    search: {
      get() {
        return this.$store.state.search;
      },
      set(val) {
        this.$store.commit("SET_SEARCH", val);
      },
    },
  },

  created() {
    this.tabSelect = this.$route.query.tab ? this.$route.query.tab : "Holidays";
  },

  methods: {},
};
</script>

