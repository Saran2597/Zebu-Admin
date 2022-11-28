<template>
  <v-simple-table @mouseleave="isDropdown = false" v-if="mostActiveData.length > 0">
    <thead>
      <tr>
        <th>S.NO</th>
        <th>Intrument</th>
        <th class="text-center">Token</th>
        <th class="text-center">ISIN</th>
        <th class="text-center">Sorted Order</th>
        <!-- <th>Edit</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i,index) in mostActiveData" :key="index">
        <td>{{index+1}}</td>
        <td>{{i.stock_name}}</td>
        <td class="text-center">{{i.token}}</td>
        <td class="text-center">{{i.isin}}</td>
        <td class="text-center">{{i.sorting_order}}</td>
        <!-- <td>
          <div style="position:relative" @mouseleave="isDropdown = false">
            <v-btn text outlined color="primary" @click="isDropdown = !isDropdown;currentIndex = index" depressed height="32" class="text-capitalize fsize12">Edit Order</v-btn>

            <ul @mouseleave="isDropdown = false" class="most_active px-0" v-if="isDropdown && currentIndex == index">
              <li class="px-10 py-1" v-for="(data,id) in 10" :key="id" @click="updateTable(i,data)">
                {{data}}
              </li>
            </ul>
          </div>
        </td> -->
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    isDropdown: false,
    currentIndex: -1,
  }),

  computed: {
    ...mapGetters("mostActive", {
      mostActiveData: "getMostActiveData",
    }),
  },

  created() {
    this.$store.dispatch("mostActive/getMostActiveData");
  },

  methods: {
    updateTable(data, sortingOrder) {
      this.isDropdown = false;
      this.mostActiveData.forEach((element) => {
        if (element.token == data.token) {
          element.sorting_order = sortingOrder;
        }
      });
      this.$store.commit("mostActive/SET_MOSTACTIVE_LIST", this.mostActiveData);
    },
  }
};
</script>

<style>
.most_active li {
  list-style: none !important;
}
.most_active {
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  max-width: 160px;
  min-width: 120px;
}
.most_active li:hover {
  background-color: #dbdada;
}
.most_active {
  position: absolute;
  z-index: 9;
  -webkit-box-shadow: 2px 6px 21px -2px rgba(112, 112, 112, 0.75);
  -moz-box-shadow: 2px 6px 21px -2px rgba(112, 112, 112, 0.75);
  box-shadow: 2px 6px 21px -2px rgba(112, 112, 112, 0.75);
}
</style>