<template>
  <div>
    <v-data-table :headers="headers" v-bind:items="this.holidaysList" :search="search" :value="this.holidaysList" class="my-5" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td class="px-5 py-2">
            <div class="primaryColor pb-2">
              {{ getDateString(new Date(props.item.holidayDate), "d-M-y") }}
            </div>
          </td>
          <td>{{ props.item.holidayName }}</td>
          <td class="text-center">{{ props.item.morningSession == 0 ? 'Closed' : 'Open' }}</td>
          <td class="text-center">{{ props.item.eveningSession == 0 ? 'Closed' : 'Open'}}</td>
          <td class="text-center">{{ props.item.settlementHoliday == 1 ? 'Holiday' : '--'}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunctions";
export default {
  mixins: [commonFunc],
  data() {
    return {
      holidayList: [],
      headers: [
        { text: "Date", value: "holidayDate", sortable: false },
        { text: "Holiday", value: "holidayName", sortable: false },
        {
          text: "Morning Session",
          value: "morningSession",
          align: "center",
          sortable: false,
        },
        {
          text: "Evening Session",
          value: "eveningSession",
          align: "center",
          sortable: false,
        },
        {
          text: "Settlement",
          value: "settlementHoliday",
          align: "center",
          sortable: false,
        },
      ],
      menu: false,
      date: "",
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      loader: "getLoader",
      holidaysList: "getHolidays",
      search: "getSearch",
    }),
  },
  created() {
    // this.$store.dispatch("getHolidays");
  },
};
</script>