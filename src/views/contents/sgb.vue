<template>
  <div>
    <v-data-table v-if="sgbData.length != 0" :headers="headers" v-bind:items="sgbData" :search="search" :value="sgbData" hide-Details class="elevation-1" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.tittle }}</td>
          <td>{{ props.item.seriesName }}</td>
          <td>{{ props.item.pricePerGm }}</td>
          <td>{{ props.item.offOpenDate ? props.item.offOpenDate.split(' ')[0] : '' }}</td>
          <td>{{ props.item.offCloseDate ? props.item.offCloseDate.split(' ')[0] : '' }}</td>
          <td>{{ props.item.maturityDate ? props.item.maturityDate.split(' ')[0] : '' }}</td>
          <td>{{ props.item.annualInterestPayout }}</td>
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
  data: () => ({
    headers: [
      { text: "Title", value: "tittle", sortable: false },
      { text: "seriesName", value: "seriesName", sortable: false },
      { text: "pricePerGm", value: "pricePerGm", sortable: false },
      { text: "offOpenDate", value: "offOpenDate", sortable: false },
      { text: "offCloseDate", value: "offCloseDate", sortable: false },
      { text: "maturityDate", value: "maturityDate", sortable: false },
      {
        text: "annualInterestPayout",
        value: "annualInterestPayout",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      sgbData: "getSgbData",
      search: "getSearch",
      loader: "getLoading"
    }),
  },
  methods: {},
  created() {
    this.$store.dispatch("getSgb");
  },
};
</script>