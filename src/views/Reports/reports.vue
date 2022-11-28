<template>
  <div>
    <div class="w-100 pa-4">
      <div class="font-weight-bold primaryColor">Funds
        <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black">
        </v-progress-circular>
      </div>
      <div class="pt-3 d-flex flex-wrap justify-space-between">
        <div>
          <v-slide-group v-model="tabSelect" mandatory>
            <v-slide-item v-for="n in $store.state.brokerName == 'Aliceblue' ? alicebluetabs : abmltabs" :key="n" v-slot="{ active, toggle }" :value="n">
              <span @click="$router.push({ path: 'reports', query: { tab: n } }).catch(() => { })">
                <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                  :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
              </span>
            </v-slide-item>
          </v-slide-group>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card class="ma-4 cardBoxShadow rounded-lg">
      <holdingsList v-if="tabSelect == 'Holdings'" />
      <positionAvgList v-if="tabSelect == 'Positions'" />
      <edisList v-if="tabSelect == 'EDiS'" />
       <settlemntDetails v-if="tabSelect == 'Settlement Info'" />
      <payin v-if="tabSelect == 'PayIn/PayOut Details'" />
     
    </v-card>
       <v-card  v-if="tabSelect == 'Orderslist'" class="mx-4">
        <v-chart class="chart"  autoresize :options="getList" />
      </v-card>
  </div>

</template>
<script>
import VChart from "vue-echarts";
import "@/plugins/echart";
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
   mixins: [commonFunc],
  components: {
    holdingsList: () => import("../contents/holdingsList.vue"),
    positionAvgList: () => import("../contents/positionAvgList.vue"),
    edisList: () => import("../contents/edisList.vue"),
    payin: () => import("./payIn.vue"),
    payout: () => import("./payOut.vue"),
    settlemntDetails: () => import("../contents/settlementInfo.vue"),
    VChart
  },
  data: () => ({
    // alicebluetabs: ["Holdings", "Positions", "EDiS", "Settlement Info", "PayIn/PayOut Details",],
    alicebluetabs: ["Holdings", "Positions", "EDiS", "PayIn/PayOut Details",],
    abmltabs: ["EDiS", "PayIn/PayOut Details"],
    tabSelect: "Payin",
  }),
  computed: {
    ...mapGetters({
      loading: "getLoader",
    }),
    ...mapGetters({
      getList: "getUserCount" 
    }),
  },
  created() {
    this.tabSelect = this.$route.query.tab ? this.$route.query.tab : "Payin";
 
  },

  mounted() {
        this.$store.dispatch('getPayOffData')
    },
  methods:{
  }
};
</script>

