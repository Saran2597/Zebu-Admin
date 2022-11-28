<template>
    <div>

        <div class="d-flex align-center px-4 py-2 mt-2">
            <div class="w-100">
                <div class="font-weight-bold primaryColor">Vendor
                    <!-- <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black">
                    </v-progress-circular> -->
                </div>
                <div class="pt-3 d-flex justify-space-between">
                    <div>
                        <v-slide-group v-model="tabSelect" mandatory >
                            <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active, toggle }" :value="n">
                                <span @click="date = null; userId1 = ''">
                                    <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2"
                                        @click="toggle" :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                                </span>
                            </v-slide-item>
                        </v-slide-group>
                    </div>
                </div>
            </div>
        </div>
        <v-divider class="mx-4"></v-divider>
        <div class="" v-if="tabSelect == 'Vendor-Info'">
            <v-form ref="forms" v-model="formValid" @submit.prevent="submitVendor()">
                <v-card class="ma-4 cardBoxShadow rounded-lg">
                    <v-row no-gutters class="px-4 pt-10 pb-0">
                        <v-col cols="12" sm="2" lg="2" class="pa-2">
                            <div class="pb-2 fsize14">Vendor Code</div>
                            <v-text-field dense outlined v-model="vendorCode" placeholder="Enter your vendor code"
                                :rules="vendorRules">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" sm="2" lg="2" class="pa-2" v-if="authID">
                            <div class="pb-2 fsize14">Auth Code</div>
                            <v-text-field dense outlined v-model="authCode" placeholder="Enter your auth code"
                                :rules="vendorRules">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" sm="2" lg="2" class="pa-2" v-if="IPaddress">
                            <div class="pb-2 fsize14">IP-Address</div>
                            <v-text-field dense outlined v-model="ipAddress" placeholder="Enter your ipaddres code"
                                :rules="vendorRules">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" sm="2" lg="2" class="mt-9">
                            <v-btn type="submit" depressed height="40" color="primary"
                                class="text-capitalize fsize12 mt-0 ml-3">Submit</v-btn>
                        </v-col>
                        <!-- <v-col  cols="12" sm="2" lg="1">
                            <v-btn outlined color="primary" depressed height="40" :disabled="!telegram && !whatsApp && !smsMessage && !email"
                                @click="editChannel()">
                                <v-icon left>
                                    mdi-pencil
                                </v-icon>
                                Edit
                            </v-btn>
                        </v-col> -->
                    </v-row>

                    <div class="ma-0 ml-2 mt-2">
                        <div class="ml-4 mb-2">Vendor Details
                            <span></span>
                            <v-btn outlined color="primary" class="ml-6" 
                                @click="editChannel()">
                                <!-- <v-btn outlined color="primary" depressed height="40" :disabled="!telegram && !whatsApp && !smsMessage && !email"
                                @click="editChannel()"> -->
                                <v-icon left>
                                    mdi-pencil
                                </v-icon>
                                Edit
                                <!-- </v-btn> -->
                            </v-btn>
                        </div>

                        <!-- <div>
                            <v-btn outlined color="primary" depressed height="40" :disabled="!telegram && !whatsApp && !smsMessage && !email"
                                @click="editChannel()">
                                <v-icon left>
                                    mdi-pencil
                                </v-icon>
                                Edit
                            </v-btn>
                       
                        </div> -->
                    </div>


                    <div class="pa-6 font-weight-bold" v-if="getVendorRecord">
                        <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
                            <div class="primaryColor fsize14">Vendor Code : &nbsp;</div>
                            <div class="secondaryColor fsize14">{{ getVendorRecord.vendorCode }}</div>
                        </div>
                        <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
                            <div class="primaryColor fsize14">IP-Address: &nbsp;</div>
                            <div class="secondaryColor fsize14">{{ getVendorRecord.ipAddress }}</div>
                        </div>
                        <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
                            <div class="primaryColor fsize14">Auth Code:&nbsp;</div>
                            <div class="secondaryColor fsize14">{{ getVendorRecord.authenticationCode }}</div>
                        </div>
                    </div>


                    <v-divider class="mx-4"></v-divider>
                    <v-row class="mt-4 ml-4">
                        <v-col cols="12" sm="4" lg="2" class="pa-0">
                            <div>Channels</div>
                        </v-col>
                    
                    </v-row>
                    <v-row no-gutters class="px-4 pb-0 mt-4">

                        <v-col cols="12" sm="4" lg="1">
                            <div>
                                <v-checkbox class v-model="email" :value="getVendorRecord.eMail == 1 ? true : false"
                                    label="Email">
                                </v-checkbox>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="4" lg="1">
                            <div>
                                <v-checkbox v-model="whatsApp" :value="getVendorRecord.whatsapp == 1 ? true : false"
                                    label="WhatsApp">
                                </v-checkbox>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="px-4  pb-0">
                        <v-col cols="12" sm="4" lg="1">
                            <div>
                                <v-checkbox v-model="smsMessage" :value="getVendorRecord.sms == 1 ? true : false"
                                    label="SMS">
                                </v-checkbox>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="4" lg="1">
                            <div>
                                <v-checkbox v-model="telegram" :value="getVendorRecord.telegram == 1 ? true : false"
                                    label="Telegram">
                                </v-checkbox>
                            </div>
                        </v-col>
                    </v-row>

                </v-card>
            </v-form>
                <div class="mt-5 pa-4 d-flex justify-end">
                    <v-btn type="submit" height="40" width="96" depressed color="primary" class="mr-3 text-capitalize"
                        @click="updateVendor()">
                        Submit
                    </v-btn>
                </div>
          
        </div>
        <!-- //// -->
        <div class="" v-if="tabSelect == 'Add-Vendor'">
            <v-form ref="forms" v-model="formValid" @submit.prevent="submit()">
                <v-card class="ma-4 cardBoxShadow rounded-lg">
                    <v-row no-gutters class="px-4 pt-10 pb-0">
                        <v-col cols="12" sm="2" lg="2" class="pa-2">
                            <div class="pb-2 fsize14">Vendor Code</div>
                            <v-text-field dense outlined v-model="addvendorCode" placeholder="Enter your vendor code"
                                :rules="addvendorRules">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" sm="4" lg="2" class="pa-2">
                            <div class="pb-2 fsize14">Auth Code</div>
                            <v-text-field dense outlined v-model="addauthCode" placeholder="Enter your auth code"
                                :rules="authCodeRules">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" lg="2" class="pa-2">
                            <div class="pb-2 fsize14">IP-Address</div>
                            <v-text-field dense outlined v-model="addipAddress" placeholder="Enter your IP address"
                                :rules="ipAddressRules">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <div class="ml-2">
                        <v-row no-gutters class="px-4 pb-0">
                            <v-col cols="12" sm="4" lg="1">
                                <div>
                                    <v-checkbox v-model="email" label="Email"></v-checkbox>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="4" lg="1">
                                <div>
                                    <v-checkbox v-model="whatsApp" label="WhatsApp"></v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="px-4  pb-0">
                            <v-col cols="12" sm="4" lg="1">
                                <div>
                                    <v-checkbox v-model="smsMessage" label="SMS"></v-checkbox>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="4" lg="1">
                                <div>
                                    <v-checkbox v-model="telegram" label="Telegram"></v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>

                <div class="mt-5 pa-4 d-flex justify-end">
                    <v-btn type="submit" height="40" width="96" depressed color="primary" class="mr-3 text-capitalize">Submit</v-btn>
                </div>

            </v-form>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
    data: () => ({
        tabs: ['Add-Vendor', 'Vendor-Info'],
        tabSelect: "Vendor-Info",
        vendorCode: '',
        addvendorCode: '',
        addauthCode: '',
        addipAddress: '',
        email: false,
        whatsApp: false,
        valid: "",
        authcode: '',
        Records: '',
        smsMessage: false,
        telegram: false,
        isdisabled: true,
        vendorInfo: true,
        addVendor: false,
        formValid: false,
        authID: false,
        IPaddress: false,
        vendorRules: [
            (v) => !!v || "Vendor Code is required",
        ],
        addvendorRules: [
            (v) => !!v || "Vendor Code is required",
        ],
        authCodeRules: [
            (v) => !!v || "Auth Code is required",
        ],
        ipAddressRules: [
            (v) => !!v || "IP-Address is required",
        ],
        vendocoe: "",
        ipAddress: "",
        authCode: ""
    }),

    computed: {
        ...mapGetters('vendor', { getVendorRecord: "getVendorList" }),
        // ...mapState("vendor"["getVendorRecord"]),
        disabledbutton() {
            return this.whatsApp = false || this.diff < 10;
            this.$forceUpdate();
        },
    },

    watch: {
       tabSelect(val){
           if(val == 'Vendor-Info'){
               this.getVendorRecord == null;
           }
           else if (val == 'Add-Vendor'){
            // this.$refs.forms.reset()
            
           }
       }
    },

    async created() { 0 },
    mounted() {

    },
    methods: {
  
          
    /**
     * Method to Update Vendor Info
     * @author Saran Raj
     * @since 01/09/2022
     * @updatedOn :
     * @updatedBy
     /** */
         
        updateVendor() {
            if (this.$refs.forms.validate()){
            let jsonData = {
                "eMail": this.email == false ? 0 : 1,
                "whatsapp": this.whatsApp == false ? 0 : 1,
                "telegram": this.telegram == false ? 0 : 1,
                "sms": this.smsMessage == false ? 0 : 1,
                "vendorCode": this.vendorCode,
                "authenticationCode": this.authCode,
                "ipAddress": this.ipAddress
            }
            this.$store.dispatch('vendor/updateVendorData', jsonData)
            this.IPaddress = false,
            this.authID = false,
            this.authSecret = false
            // this.$refs.forms.reset()
        }
        },
        submitVendor() {
            if (this.$refs.forms.validate()){
            let jsonObj = {
                "vendorCode": this.vendorCode
            }
            this.$store.dispatch('vendor/getVendor', jsonObj)   
            
        }
        },

           /**
     * Method to Create Vendor Info
     * @author Saran Raj
     * @since 01/09/2022
     * @updatedOn :
     * @updatedBy
     /** */

        submit() {
            if (this.$refs.forms.validate()) {
            let json = {
                'pushNotification': 1,
                'eMail': this.email == true ? 1 : 0,
                'whatsapp': this.whatsApp == true ? 1 : 0,
                'telegram': this.telegram == true ? 1 : 0,
                'sms': this.smsMessage == true ? 1 : 0,
                'ipAddress': this.addipAddress,
                'vendorCode': this.addvendorCode,
                'authenticationCode': this.addauthCode, 
            }
            this.$store.dispatch('vendor/insertVendor', json)
            // this.$refs.forms.reset()
        }
        },

        editChannel() {
            this.isdisabled = false
            this.IPaddress = true,
            this.authID = true
        },
        
        async tabSwitch(currentTab) {
            switch (currentTab) {
                case "Vendor-Info":
                    // this.initialCall();
                    break;
                case "Add-Vendor":
                    // this.callTableData("active");
                    break;
            }
        },
    },

    computed: {
        ...mapGetters('vendor', { getVendorRecord: "getVendorList" }),
        // ...mapState("vendor"["getVendorRecord"]),
        disabledbutton() {
            return this.whatsApp = false || this.diff < 10;
            this.$forceUpdate();
        },
    }
};
</script>

<style>
.v-btn:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
}
</style>