<template>
  <div>
    <v-data-table v-if="eventList.length != 0" :headers="headers" v-bind:items="eventList" :search="search" :value="eventList" class="my-2" id="table" item-key="name" single-select>
      <template v-slot:item="props">
        <tr>
          <td>{{ props.index + 1 }}</td>
          <td>{{ props.item.eventName }}</td>
          <td>{{ props.item.geography }}</td>
          <td>{{ props.item.sector }}
          </td>
          <td>{{ props.item.actualOutcome }}</td>
          <td>{{ props.item.expectedOutcome }}</td>
          <td>{{ props.item.previousOutcome }}</td>
          <td>{{ props.item.eventDescription }}</td>
          <td>{{ props.item.indiaDate }}</td>
          <td>{{ props.item.indiaTime }}</td>
          <td>{{ props.item.significance }}</td>
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
        {
          text: "S.NO",
          align: "start",
          sortable: false,
        },
        { text: "Event Name", value: "eventName", sortable: false },
        { text: "geography", value: "geography", sortable: false },
        { text: "sector", value: "sector", sortable: false },
        { text: "Actual Outcome", value: "actualOutcome", sortable: false },
        { text: "Expected Outcome", value: "expectedOutcome", sortable: false },
        { text: "Previous Outcome", value: "previousOutcome", sortable: false },
        { text: "Description", value: "eventDescription", sortable: false },
        { text: "Date", value: "indiaDate", sortable: false },
        { text: "Time", value: "indiaTime", sortable: false },
        { text: "Significance", value: "significance", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      search: "getSearch",
    }),
    ...mapGetters("event", {
      eventList: "getEventData",
    })
  },

  created() {
    this.$store.dispatch("event/getEvents");
  },

  methods: {
    addOrEditEvent(key) {
      localStorage.setItem("addOrEditEvent", JSON.stringify(key));
      this.$router.push("/newOrEditEvents");
    },
    deleteEvent(key) {
      let jsonobj = {
        eventId: key,
      };
      this.$store.dispatch("event/deleteEvent", jsonobj);
    },
  }
};
</script>

