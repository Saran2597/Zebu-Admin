<template>
  <div>
    <v-data-table v-if="ipoData.length != 0" :headers="headers" v-bind:items="ipoData" :search="search" :value="ipoData" class="elevation-1 " id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.ipoName }}</td>
          <td>{{ props.item.bbFromDate ? props.item.bbFromDate.split(' ')[0] : '' }}</td>
          <td>{{ props.item.bbToDate ? props.item.bbToDate.split(' ')[0] : '' }}</td>
          <td>{{ props.item.minInvest }}</td>
          <td>{{ props.item.priceRangeFrom }}</td>
          <td>{{ props.item.priceRangeTo }}</td>
          <td>{{ props.item.issueSize }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.parentOrg }}</td>
        </tr>
      </template>
    </v-data-table>
    <div v-else>
      <div class="text-center pa-5">
        <v-icon class="display-2 pb-4">mdi-thought-bubble-outline</v-icon>
        <div class="">Data Not Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "IPO Name", value: "ipoName", align: "start", sortable: true },
        { text: "Bidding From Date", value: "bbFromDate", sortable: false },
        { text: "Bidding To Date", value: "bbToDate", sortable: false },
        { text: "Minimum Invest", value: "minInvest", sortable: false },
        { text: "Price Range From", value: "priceRangeFrom", sortable: false },
        { text: "Price Range To", value: "priceRangeTo", sortable: false },
        { text: "issueSize", value: "issueSize", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Organization", value: "parentOrg", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      loading: "getLoading",
      ipoData: "getIpoData",
    }),
    ...mapGetters({
      search: "getSearch",
    }),
  },

  created() {
    this.$store.dispatch("getIpo");
  },

  methods: {}
};
</script>

