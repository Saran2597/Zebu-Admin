<template>
    <div>
        <v-progress-linear indeterminate v-if="loader"></v-progress-linear>
        <v-container class="cont-2">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout row wrap class="ma-2">
                    <v-flex xs12 sm12 lg6>
                        <label for="">Search Query</label>
                        <v-textarea class="mt-3" outlined name="input-7-4" :rules="queryField" v-model="searchQuery"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.">
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm12 lg1></v-flex>
                    <v-flex xs12 sm12 lg3 class="ml-2 mt-6">
                        <v-btn class="ma-0 mt-3" outlined color="" @click="sumbitData()">
                            Submit
                        </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 lg1>

                    </v-flex>


                </v-layout>
            </v-form>
        </v-container>
        <v-simple-table id="tableData" class="border-right-left mb-4 mx-4">
            <thead>
                <tr class="tableRow">
                    <th class="tableHeader text-center" v-for="(idx, index) in headers" :key="index">{{ idx }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tableRow" v-for="(item, index) in queryResponse" :key="index">
                    <td class="tableContent text-center" v-for="(key, id) in headers" :key="id">{{ item[key] }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
    data: () => ({
        searchQuery: "",
        valid: true,
        queryField: [
            v => !!v || 'Field is required',
        ],
       
      
    }),

    computed: {
        
        ...mapGetters({
            loader: "getLoader",
        }),
        ...mapGetters("query", {
            queryResponse: "getQueryData",
            headers: "getHeaders"
        }),

    },
    mounted() {
        
    },
    methods: {
        sumbitData() {
            if (this.$refs.form.validate()) {
                let json = {
                    queryData: this.searchQuery
                }
                this.$store.dispatch("query/getQueryData", json)
            }
        }
    }
}
</script>

<style>
</style>