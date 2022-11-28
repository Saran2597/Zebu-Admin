<template>
    <div class="pa-4">
        <div class="mb-4 d-flex align-center">
            <v-breadcrumbs class="pa-0 mr-5" :items="titles" large></v-breadcrumbs>
            <v-progress-circular class="ml-2" indeterminate v-if="topViewsLoader" size="18" :width="2" color="black">
            </v-progress-circular>
        </div>
        <v-simple-table class="w-100 table_cus" v-if="!topViewsLoader">
            <thead>
                <tr>
                    <th class="fsize14 text-left py-2">S.NO</th>
                    <th class="fsize14 text-left py-2">URL</th>
                    <th class="fsize14 text-left py-2">Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in urlBasedLogs" :key="index">
                    <td class="fsize14 text-left py-2">{{ index+1 }}</td>
                    <td class="fsize14 text-left py-2">{{ item.path }}</td>
                    <td class="fsize14 text-left py-2">{{ item.count }}</td>
                </tr>
                <tr class="grey lighten-3">
                    <td></td>
                    <td>Total</td>
                    <td>{{ totalServiceHitCount }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => ({
        titles: [
            { text: "Dashboard", href: "/dashboard", disabled: false },
            { text: "All List", disabled: false },
        ],
    }),
    computed: {
        ...mapGetters({
            loader: "getLoader",
            urlBasedLogs: "getUrlBasedLogs",
            totalServiceHitCount: "getTotalServiceHitCount",
            topViewsLoader: "getTopViewsLoader",
            //
        }),
    },
    created() {
        this.$store.dispatch("getUrlBasedRecords", { count: 'all' });
    }
}
</script>