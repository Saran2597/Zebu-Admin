<template>
    <div>
     <v-card>
        <v-chart class="chart"  autoresize :options="OPTIONS" />
     </v-card>
    </div>
</template>

<script>
import VChart from "vue-echarts";
import "@/plugins/echart";
import { mapGetters } from 'vuex'
export default {

    components: {
    VChart,
  },
    data:() => {
     
    },

    computed:{
        // ...mapGetters({
        //  ChartAnalysis : "getOrderChartData"
        // })
        ...mapGetters("logs", {
            DATE_COUNTS: "getUserCount" 
   
    }),
    
    }
}
</script>

<style>

</style>