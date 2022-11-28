<template>
  <div>
    <div class="d-flex align-center px-4 py-2 mt-2">
      <div class="w-100">
        <div class="font-weight-bold primaryColor">Api Key
          <v-progress-circular class="ml-2" indeterminate v-if="loading" size="18" :width="2" color="black">
          </v-progress-circular>
        </div>
        <div class="pt-3 d-flex justify-space-between">
          <div>
            <v-slide-group v-model="tabSelect" mandatory>
              <v-slide-item v-for="n in tabs" :key="n" v-slot="{ active, toggle }" :value="n">
                <span @click="date = null; userId1 = ''">
                  <v-btn :title="n" depressed height="26" class="fsize12 text-capitalize mr-2" @click="toggle"
                    :color="active ? 'primary' : 'grey lighten-3'">{{ n }}</v-btn>
                </span>
              </v-slide-item>
            </v-slide-group>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-form ref="forms" v-model="formValid" @submit.prevent="getApiKeyDetails('get')">
      <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'API Key Details'">
        <v-row no-gutters class="px-4 py-10">
          <v-col cols="12" sm="12" md="6" lg="3">
            <div class="fsize14 font-weight-bold primaryColor pb-4">API Key Details</div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="5">
            <div class="primaryColor fsize14 pb-1">*UserId</div>
            <v-text-field clearable class="apiKeyInput" placeholder="Enter UserId"
              @input="userId = userId ? userId.toUpperCase() : ''" v-model="userId" outlined dense :rules="userIdRules">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
          </v-col>
        </v-row>
        <div class="pa-10 font-weight-bold" v-if="apiKeyDetails">
          <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
            <div class="primaryColor fsize14">User Id : &nbsp;</div>
            <div class="secondaryColor fsize14">{{ apiKeyDetails.user_id }}</div>
          </div>
          <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
            <div class="primaryColor fsize14">API Key : &nbsp;</div>
            <div class="secondaryColor fsize14"> {{ apiKeyDetails.api_key ? apiKeyDetails.api_key : '' }}</div>
          </div>
          <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
            <div class="primaryColor fsize14">Created On : &nbsp;</div>
            <div class="secondaryColor fsize14"> {{ apiKeyDetails.created_on ? `${getDateString(new
                Date(apiKeyDetails.created_on.split(' ')[0]), "d-M-y")} ${apiKeyDetails.created_on.split(' ')[1]}` : ''
            }}
            </div>
          </div>
          <div class="d-flex mb-3" style="min-width:350px;overflow:auto">
            <div class="primaryColor fsize14">Expiry Date : &nbsp;</div>
            <div class="">
              <div class="secondaryColor fsize14"> {{ apiKeyDetails.expiry_date ? getDateString(new
                  Date(apiKeyDetails.expiry_date.split(' ')[0]), "d-M-y") : ''
              }}</div>
            </div>
          </div>
          <div class="d-flex py-4">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y
                max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field @click:append="dateMenu = true" class="apiKeyInput" v-model="computedDateFormatted"
                    outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="dateRules"
                    placeholder="Select the Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="date" :show-current="true"
                  no-title @input="dateMenu = false"></v-date-picker>
              </v-menu>
            </v-form>
            <div class="mx-5">
              <v-btn height="40" :loading="loading" depressed @click="updateApiKey()" class="text-capitalize fsize12">
                Update Date</v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <v-card class="ma-3 cardBoxShadow rounded-lg" v-if="tabSelect == 'Expiry List'">
        <v-form ref="form" v-model="valid" @submit.prevent="getExpiryList()" lazy-validation>
          <div class="d-flex align-center">
            <div class="pa-4">
              <div class="pb-1">*From Date</div>
              <v-menu v-model="dateMenu1" :close-on-content-click="false" transition="scale-transition" offset-y
                max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field @click:append="dateMenu1 = true" class="apiKeyInput" v-model="computedDateFormatted1"
                    outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="fromDateRules"
                    placeholder="Select the From Date" append-icon="mdi-calendar" readonly dense v-bind="attrs"
                    v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="fromDate" :show-current="true" no-title @input="dateMenu1 = false">
                </v-date-picker>
              </v-menu>
            </div>

            <div class="pa-4">
              <div class="pb-1">*To Date</div>
              <v-menu v-model="dateMenu2" :close-on-content-click="false" transition="scale-transition" offset-y
                max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field @click:append="dateMenu2 = true" class="apiKeyInput" v-model="computedDateFormatted2"
                    outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="toDateRules"
                    placeholder="Select the To Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker v-model="toDate" :show-current="true" no-title @input="dateMenu2 = false">
                </v-date-picker>
              </v-menu>
            </div>
            <v-btn type="submit" height="40" depressed color="primary" class="text-capitalize fsize14">Submit</v-btn>
          </div>
        </v-form>
        <v-simple-table v-if="ApiKeyExpiryList.length">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Expiry Date</th>
              <th>created On</th>
              <th>API Key</th>
              <!-- <th class="text-center">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idex) in ApiKeyExpiryList" :key="idex" @mouseleave="i.showEdit = false"
              @mouseover="i.showEdit = true">
              <td>{{ i.user_id }}</td>
              <td>{{ getDateString(new Date(i.expiry_date.split(' ')[0]), "d-M-y") }}</td>
              <td>{{ getDateString(new Date(i.created_on.split(' ')[0]), "d-M-y") }}</td>
              <td class="position-relative">
                {{ i.api_key }}
                <div v-if="i.showEdit" class="position-absolute right-0">
                  <v-btn depressed color="grey" width="fit-content" height="26"
                    class="fsize12 text-capitalize white--text" @click="openDailog(i.user_id)">Update Expiry</v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>

        <div v-else class="d-flex align-center justify-center min-height-100">
          <div class="primaryColor fsize20">No Data Found</div>
        </div>

        <v-dialog v-model="logoutDialog" width="390" overlay-color="white">
          <v-card class="pa-5 cardBoxShadow rounded-lg" height="220">
            <div class="secondaryColor fsize14 d-flex justify-space-between">
              <div class="fsize14 font-weight-bold">Update Expiry Date</div>
              <div>
                <v-icon @click="logoutDialog = false" color="light-blue">mdi-close-circle-outline</v-icon>
              </div>
            </div>
            <div class="mt-4">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="fsize14 pb-1">Date</div>
                <v-menu v-model="dateMenu3" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field @click:append="dateMenu3 = true" class="apiKeyInput" v-model="computedDateFormatted3"
                      outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="dateRules"
                      placeholder="Select the Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="updateExpiryDate" :show-current="true" no-title @input="dateMenu3 = false">
                  </v-date-picker>
                </v-menu>
                <div class="d-flex justify-end pt-3">
                  <v-btn height="32" width="86" @click="updateDate()" depressed outlined text color="light-blue"
                    class="text-capitalize white--text fsize12 mr-2">
                    Confirm
                  </v-btn>
                  <v-btn height="32" width="86" @click="logoutDialog = false" depressed color="black" outlined text
                    class="text-capitalize fsize12">
                    Cancel
                  </v-btn>
                </div>
              </v-form>
            </div>
          </v-card>
        </v-dialog>
      </v-card>


      <div class="mt-5 pa-4 d-flex justify-end" v-if="tabSelect === 'API Key Details'">
        <v-btn height="40" width="96" depressed outlined color="grey--text" class=" mr-3 text-capitalize">Cancel</v-btn>
        <v-btn type="submit" :loading="loading" height="40" width="96" depressed color="primary"
          class="mr-3 text-capitalize">Submit</v-btn>
      </div>

    </v-form>
    <v-card class="ma-4 cardBoxShadow rounded-lg" v-if="tabSelect == 'API Calls'">

      <v-form ref="form2" v-model="loginForm" @submit.prevent="submitLogin()">
        <div class="d-flex ml-4 flex-wrap">
          <div class="mt-4">
            <div class="fsize14 font-weight-bold primaryColor pb-4">User Id</div>
            <v-text-field class="apiKeyInput" style="width:270px" placeholder="Enter UserId" v-model="UID" outlined
              dense :rules="userIDRules">
            </v-text-field>
          </div>
          <div class="mt-4 ml-3">
            <div class="fsize14 font-weight-bold primaryColor pb-4">Password</div>
            <v-text-field class="apiKeyInput" style="width:270px" placeholder="Enter password" v-model="uPASS" outlined
              dense :rules="userPassRules">
            </v-text-field>
          </div>
          <div class="mt-4 ml-3">
            <div class="fsize14 font-weight-bold primaryColor pb-4">2FA</div>
            <v-text-field class="apiKeyInput" style="width:270px" placeholder="Enter answer" v-model="answers" outlined
              dense :rules="user2FaRules">
            </v-text-field>
          </div>
          <div class="mt-4 ml-3">
            <div class="fsize14 font-weight-bold primaryColor pb-9"></div>
            <v-btn type="submit" height="40" depressed color="primary" :disabled=!loginForm
              class="text-capitalize fsize14">Submit</v-btn>
          </div>

        </div>
        <!-- <v-form ref="form" v-model="valid" @submit.prevent="getExpiryList()" lazy-validation>
  <div class="d-flex align-center">
    <div class="pa-4">
      <div class="pb-1">*From Date</div>
      <v-menu v-model="dateMenu1" :close-on-content-click="false" transition="scale-transition" offset-y
        max-width="290px" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field @click:append="dateMenu1 = true" class="apiKeyInput" v-model="computedDateFormatted1"
            outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="fromDateRules"
            placeholder="Select the From Date" append-icon="mdi-calendar" readonly dense v-bind="attrs"
            v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="fromDate" :show-current="true" no-title @input="dateMenu1 = false">
        </v-date-picker>
      </v-menu>
    </div>

    <div class="pa-4">
      <div class="pb-1">*To Date</div>
      <v-menu v-model="dateMenu2" :close-on-content-click="false" transition="scale-transition" offset-y
        max-width="290px" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field @click:append="dateMenu2 = true" class="apiKeyInput" v-model="computedDateFormatted2"
            outlined persistent-hint :menu-props="{ bottom: true, offsetY: true }" :rules="toDateRules"
            placeholder="Select the To Date" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on">
          </v-text-field>
        </template>
        <v-date-picker v-model="toDate" :show-current="true" no-title @input="dateMenu2 = false">
        </v-date-picker>
      </v-menu>
    </div>
    <v-btn type="submit" height="40" depressed color="primary" class="text-capitalize fsize14">Submit</v-btn>
  </div>
</v-form> -->
        <v-simple-table>
          <thead>
            <tr>
              <th>Scrip Names</th>
              <th>Response Time</th>
              <th>Status</th>
              <th>Action</th>
              <!-- <th class="text-center">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Login</td>
              <td>{{ preAuthenticateTimems ? preAuthenticateTimems : 'NA' }}ms</td>
              <td @click="info('1')">
                <v-icon :disabled="this.viewResponse">mdi-eye</v-icon>
              </td>
              <td>
                <span>NA</span>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{{ passwordTimeMs ? passwordTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.viewPasswordResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <span>NA</span>
              </td>
            </tr>
            <tr>
              <td>Security Question</td>
              <td>{{ validansTimeMs ? validansTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.viewsecurityResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <span>NA</span>
              </td>
            </tr>
            <tr>
              <td>Holdings</td>
              <td>{{ holdingsTimeMs ? holdingsTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.holdingResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.holdingbtn @click="getHoldings()">
                  SUBMIT</v-btn>
              </td>
            </tr>
            <tr>
              <td>Positions</td>
              <td>{{ responseTimeMs ? responseTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.positionResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.positionbtn @click="positionBook()">
                  SUBMIT</v-btn>
              </td>
            </tr>
            <tr>
              <td>Trade-Book</td>
              <td>{{ tradebookTimeMs ? tradebookTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.tradebookResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.gettradebtn
                  @click="getTradeHistory()">
                  SUBMIT</v-btn>
              </td>
            </tr>
            <tr>
              <td>Order-Book</td>
              <td>{{ orderbookTimeMs ? orderbookTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.orderbookResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.orderbtn @click="fetchOrderBook()">
                  SUBMIT</v-btn>
              </td>
            </tr>
            <tr>
              <td>Load Scrips</td>
              <td>{{ loadScripTimeMs ? loadScripTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadscripResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.scripbtn @click="loadScrips()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Get Limits</td>
              <td>{{ getLimitTimeMs ? getLimitTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.getlimitResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.limitbtn @click="getLimits()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Load Instrument</td>
              <td>{{ getLoadInstrumentTimeMs ? getLoadInstrumentTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadinstrumentResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.instrumentbtn
                  @click="loadInstrument()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Load Sublimits</td>
              <td>{{ getsubLimitTimeMs ? getsubLimitTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadsublimitsResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.sublimitbtn
                  @click="getRMSSubLimits()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Alert History</td>
              <td>{{ alertHistoryTimeMs ? alertHistoryTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.alerthistoryResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.alertHistorybtn
                  @click="getAlertHistory()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <!-- <tr>
        <td>Index Details</td>
        <td>{{ getindexdetailTimeMs ? getindexdetailTimeMs : 'NA' }}ms</td>
        <td>NA</td>
        <td>
          <v-btn class="my-4" depressed small color="primary" :disabled=this.limitbtn
            @click="getIndexDetails()">SUBMIT
          </v-btn>
        </td>
      </tr> -->
            <tr>
              <td>Multi-scrips Details</td>
              <td>{{ multiscripDataTimeMs ? multiscripDataTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.multiScripResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.multiScripbtn
                  @click="getMultiScripsData()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Index Details</td>
              <td>{{ indexDataTimeMs ? indexDataTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.indexdetailResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.indexDetailbtn
                  @click="getIndexData()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Top Gainers & Loser Info</td>
              <td>{{ TopnTimeMs ? TopnTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.topnviewResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.topnbtn @click="getGainerLosers()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Margin-Details</td>
              <td>{{ marginTimeMs ? marginTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.margindetailResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.marginDetailbtn @click="getMargin()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Account-Info</td>
              <td>{{ accountinfoTimeMs ? accountinfoTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.accountResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.accountbtn @click="accountInfo()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Place-Order</td>
              <td>{{ placeorderTimeMs ? placeorderTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.placeOrderResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.placeOrderbtn @click="placeOrder()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Modify-Order</td>
              <td>{{ modifyorderTimeMs ? modifyorderTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.modifyResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.modifyOrderbtn
                  @click="modifyOrder()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Market-Status</td>
              <td>{{ marketStatusTimeMs ? marketStatusTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.marketstatusResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.marketStatusbtn
                  @click="marketStatus()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Load-Options</td>
              <td>{{ marketStatusTimeMs ? marketStatusTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadOptionResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.loadOptionbtn @click="loadOption()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Order-History</td>
              <td>{{ orderHistoryTimeMs ? orderHistoryTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.orderHistoryResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.orderHistorybtn
                  @click="orderHistory()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <!-- <tr>
        <td>Chart-Data</td>
        <td>{{ chartDataTimeMs ? chartDataTimeMs : 'NA' }}ms</td>
        <td>NA</td>
        <td>
          <v-btn class="my-4" depressed small color="primary" :disabled=this.limitbtn
            @click="getChartData()">SUBMIT
          </v-btn>
        </td>
      </tr> -->
            <tr>
              <td>Search Scrips</td>
              <td>{{ searchScripsTimeMs ? searchScripsTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.searchscripResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.searchScripbtn
                  @click="scripSearch()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Watch List</td>
              <td>{{ watchListTimeMs ? watchListTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.watchListResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.watchListbtn
                  @click="getMarketWatchList()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Add Scrips</td>
              <td>{{ addScripsTimeMs ? addScripsTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.addscripResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.addScripbtn @click="addScripToMW()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Delete Scrips</td>
              <td>{{ deleteScripsTimeMs ? deleteScripsTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.deletescripResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.deleteScripbtn
                  @click="deleteScrips()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Basket Orders</td>
              <td>{{ basketOrderTimeMs ? basketOrderTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.basketOrderResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.basketOrderbtn
                  @click="basketOrder()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Bracket Order</td>
              <td>{{ bracketOrderTimeMs ? bracketOrderTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.bracketResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.bracketOrderbtn
                  @click="bracketOrder()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Cover Orders</td>
              <td>{{ coverOrderTimeMs ? coverOrderTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.coverorderResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.coverOrderBtn @click="coverOrder()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Load ExpiryDates</td>
              <td>{{ loadExpiryTimeMs ? loadExpiryTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadexpiryResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.loadExpirybtn
                  @click="loadExpiryDates()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Option-Chain</td>
              <td>{{ OptionChainTimeMs ? OptionChainTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.optionchainResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.optionChainbtn
                  @click="optionChainLoader()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Multiple-Scrips</td>
              <td>{{ multipleScripsTimeMs ? multipleScripsTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.multiplescripReponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.multipleScripbtn
                  @click="addMultipleScripToMW()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Categories</td>
              <td>{{ categoryTimeMs ? categoryTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.categoryResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.categorybtn @click="getCategories()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Quotes</td>
              <td>{{ quotesTimeMs ? quotesTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.qoutesResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.quotesbtn @click="showQuote()">SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Sort Maket-Watch</td>
              <td>{{ sortMarketwatchTimeMs ? sortMarketwatchTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.sortMarketwatcResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.sortMwbtn @click="sortMarketWatch()">
                  SUBMIT
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Load Retention-Type</td>
              <td>{{ retentionTypeTimeMs ? retentionTypeTimeMs : 'NA' }}ms</td>
              <td>
                <v-icon :disabled="this.loadretentionResponse" @click="info('2')">mdi-eye</v-icon>
              </td>
              <td>
                <v-btn class="my-4" depressed small color="primary" :disabled=this.sortMwbtn
                  @click="loadRetentionType()">SUBMIT
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-form>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{}">
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Response
        </v-card-title>
        <v-card-text>{{ this.responseData }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


 <!-- <script data-main="js/config" src="js/lib/require.js" ></script>  -->
<script>
import { mapGetters } from "vuex";
import commonFunc from "../mixins/commonFunctions";
import axios from "axios";
import CryptoJS from 'crypto-js'
// import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js'
import JSEncrypt from 'jsencrypt/lib/index.js';

require('crypto-js')
export default {
  name: "apiKey",
  mixins: [commonFunc],

  data: () => ({
    tabs: ["API Key Details", "Expiry List", "API Calls"],
    tabSelect: "Reset",
    userId: "",
    userId1: "",
    date: null,
    fromDate: null,
    toDate: null,
    updateExpiryDate: null,
    dateMenu: false,
    dateMenu1: false,
    dateMenu2: false,
    dateMenu3: false,
    viewResponse: true,
    orderbookResponse: true,
    holdingResponse: true,
    loadinstrumentResponse: true,
    viewResponse2: true,
    viewPasswordResponse: true,
    searchscripResponse: true,
    orderHistoryResponse: true,
    loadretentionResponse: true,
    viewsecurityResponse: true,
    topnviewResponse: true,
    margindetailResponse: true,
    accountResponse: true,
    basketOrderResponse: true,
    bracketResponse: true,
    coverorderResponse: true,
    loadexpiryResponse: true,
    placeOrderResponse: true,
    sortMarketwatcResponse: true,
    qoutesResponse: true,
    categoryResponse: true,
    holdingbtn: true,
    scripbtn: true,
    gettradebtn: true,
    positionbtn: true,
    orderbtn: true,
    limitbtn: true,
    instrumentbtn: true,
    alertHistorybtn: true,
    multiScripbtn: true,
    marginDetailbtn: true,
    accountbtn: true,
    modifyOrderbtn: true,
    indexDetailbtn: true,
    marketStatusbtn: true,
    placeOrderbtn: true,
    quotesbtn: true,
    topnbtn: true,
    watchListResponse: true,
    addscripResponse: true,
    deletescripResponse: true,
    loadOptionResponse: true,
    sublimitbtn: true,
    loadOptionbtn: true,
    orderHistorybtn: true,
    searchScripbtn: true,
    watchListbtn: true,
    addScripbtn: true,
    deleteScripbtn: true,
    bracketOrderbtn: true,
    modifyResponse: true,
    marketstatusResponse: true,
    coverOrderBtn: true,
    basketOrderbtn: true,
    optionChainbtn: true,
    positionResponse: true,
    tradebookResponse: true,
    loadscripResponse: true,
    getlimitResponse: true,
    loadExpirybtn: true,
    alerthistoryResponse: true,
    loadsublimitsResponse: true,
    multiScripResponse: true,
    multipleScripbtn: true,
    categorybtn: true,
    sortMwbtn: true,
    dialog: false,
    userIdRules: [(v) => !!v || "UserId is required"],
    userId1Rules: [(v) => !!v || "UserId is required"],
    dateRules: [(v) => !!v || "Date is required"],
    fromDateRules: [(v) => !!v || "From Date is required"],
    toDateRules: [(v) => !!v || "To Date is required"],
    valid: true,
    loginForm: true,
    formValid: true,
    logoutDialog: false,
    indexdetailResponse: true,
    multiplescripReponse: true,
    optionchainResponse: true,
    expiryDate: "",
    currentUserId: "",
    showUpdate: false,
    userIdRules: [
      (v) => !!v || "User Id is required",
      (v) =>
        (v && v.length >= 2) || "User Id must be greater than 2 characters",
    ],
    userIDRules: [
      (v) => !!v || "User Id is required",

    ],
    userPassRules: [
      (v) => !!v || "Password is required",

    ],
    user2FaRules: [
      (v) => !!v || "2FA is required",

    ],
    sPubKey1: "",
    secret: "123#$%",
    jSessionId: "",
    encryptPublicKey: "",
    sPubKey3: "",
    sPubKey5: "",
    publicKey1: '',
    encryptKEY: '',
    privateKey1: '',
    receiveDate: '',
    sendDate: '',
    holdingsTimeMs: '',
    responseTimeMs: '',
    passwordTimeMs: '',
    getLoadInstrumentTimeMs: '',
    addScripsTimeMs: '',
    watchListTimeMs: '',
    categoryTimeMs: '',
    chartDataTimeMs: '',
    basketOrderTimeMs: '',
    preAuthenticateTimems: '',
    retentionTypeTimeMs: '',
    quotesTimeMs: '',
    getLimitTimeMs: '',
    OptionChainTimeMs: '',
    deleteMWTimeMs: '',
    scripLoadTimeMs: '',
    loadScripTimeMs: '',
    alertHistoryTimeMs: '',
    getindexdetailTimeMs: '',
    placeorderTimeMs: '',
    coverOrderTimeMs: '',
    marketWatchscripTimeMs: '',
    loadExpiryTimeMs: '',
    deleteScripsTimeMs: '',
    indexDataTimeMs: '',
    validansTimeMs: '',
    marginTimeMs: '',
    tradebookTimeMs: '',
    orderbookTimeMs: '',
    getsubLimitTimeMs: '',
    multiscripDataTimeMs: '',
    marketStatusTimeMs: '',
    TopnTimeMs: '',
    accountinfoTimeMs: '',
    bracketOrderTimeMs: '',
    orderHistoryTimeMs: '',
    searchScripsTimeMs: '',
    modifyorderTimeMs: '',
    loadOptionTimeMs: '',
    multipleScripsTimeMs: '',
    sortMarketwatchTimeMs: '',
    pubKey: '',
    userSessionID: '',
    passwordResponse: '',
    Encdata3: '',
    Encdata4: '',
    Encdata5: '',
    Encdata6: '',
    sampleKey: '',
    sPrivateKey: '',
    responseData2: '',
    tokenId: '',
    UID: "",
    uPASS: "",
    answers: "",
    setAns: "|1",
    responseData: ''
  }),

  computed: {
    ...mapGetters("apiKey", {
      apiKeyDetails: "getApiKeyDetails",
      ApiKeyExpiryList: "getApiKeyExpiryList",
    }),
    ...mapGetters({
      loading: "getLoader",
    }),
    computedDateFormatted: {
      get() {
        return this.formatDate(this.date);
      },
      set() { },
    },
    computedDateFormatted1: {
      get() {
        return this.formatDate(this.fromDate);
      },
      set() { },
    },
    computedDateFormatted2: {
      get() {
        return this.formatDate(this.toDate);
      },
      set() { },
    },
    computedDateFormatted3: {
      get() {
        return this.formatDate(this.updateExpiryDate);
      },
      set() { },
    },
  },

  watch: {
    tabSelect(tab) {
      this.$store.commit("apiKey/SET_API_KEY_DETAILS", null);
      this.fromDate = new Date().toISOString().substr(0, 10);
      this.toDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 10);
      tab == "Expiry List" ? this.getExpiryList("initial") : "";
    },
  },

  created() {

  },

  mounted() {
    this.getInitialKey()
    this.tokenId = localStorage.getItem('tomcatCount')



  },

  methods: {


    info(val) {
      this.dialog = true
      // this.viewResponse = false
      if (val == 1) {
        if (this.viewResponse == true) {
          this.dialog = false;
        }
        this.responseData = this.sPubKey5
        // console.log(this.responseData);
      }
      else if (val == 2) {

        this.dialog = true
        this.responseData = this.passwordResponse
        // console.log(this.responseData);
        // this.viewResponse = false
      }
    },

    submitLogin() {
      this.preAuthenticateKey()
    },


    async getApiKeyDetails(type) {
      if (this.$refs.forms.validate()) {
        let formData = new FormData();
        formData.append(
          "userId",
          type == "update" ? this.apiKeyDetails.user_id : this.userId
        );
        await this.$store.dispatch("apiKey/getApiKeyDetails", {
          data: formData,
          type: type,
        });
      }
    },
    async updateApiKey() {
      let formData = new FormData();
      formData.append("userId", this.apiKeyDetails.user_id);
      formData.append("expiryDate", this.date);
      await this.$store.dispatch("apiKey/updateApiKey", formData);
      this.resetUpdateApiKeyForm();
      this.getApiKeyDetails("update");
    },

    resetUpdateApiKeyForm() {
      this.userId1 = "";
      this.date = null;
      this.$refs.form.resetValidation();
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    getExpiryList(val) {
      if (val == "initial") {
        let fd = new FormData();
        fd.append("from_date", this.fromDate);
        fd.append("to_date", this.toDate);
        this.$store.dispatch("apiKey/getApiExpiryList", fd);
      } else if (this.$refs.form.validate()) {
        let fd = new FormData();
        fd.append("from_date", this.fromDate);
        fd.append("to_date", this.toDate);
        this.$store.dispatch("apiKey/getApiExpiryList", fd);
      }
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    openDailog(val) {
      this.$refs.form.reset();
      if (val) {
        this.logoutDialog = true;
      }
      this.currentUserId = val;
    },

    async updateDate() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("expiryDate", this.updateExpiryDate);
        formData.append("userId", this.currentUserId);
        await this.$store.dispatch("apiKey/updateApiKey", formData);
        this.getExpiryList();
        this.resetUpdateApiKeyForm();
        this.logoutDialog = false;
      }
    },

    ///METHOD TO ENCRPTY//

    encryptBlock: function (src, publicKey, keySize) {
      var crypt = new JSEncrypt();
      crypt.setPublicKey(publicKey);
      var numberOfBytes = parseInt(parseInt(keySize / 8) - 11);

      var start = 0;
      var end = numberOfBytes;
      var encryptedString = "";

      if (numberOfBytes > src.length) {
        end = src.length;
      }

      do {
        var bytes = src.substring(start, end);
        encryptedString += crypt.encrypt(bytes);
        encryptedString += '\n';

        start = end;
        end = end + numberOfBytes;
        if (end > src.length) {
          end = src.length;
        }
      } while (end < src.length);

      if ((end - start) > 0) {
        var bytes = src.substring(start, end);
        encryptedString += crypt.encrypt(bytes);
        encryptedString += '\n';
      }
      return btoa(encryptedString);
    },
  
  decrypt(privateKey, src) {
    debugger
    var plainText = '';
    var crypt = new JSEncrypt();
    crypt.setPublicKey(privateKey);
    var encryptedText = window.atob(src);
    var encryptArray = encryptedText.split('\n');
    for (var i = 0; i < encryptArray.length; i = i + 1){
    var block = encryptArray[i];
        if (block != ''){
            plainText += crypt.decrypt(block);
        }
    }
    return plainText;
   },

    //Method to sub-encryption common-method//


    gen_public_key: function () {
      var generateKeys = new JSEncrypt({ default_key_size: 2048 });
      var publicKey = generateKeys.getPublicKey();
      return publicKey;
    },
    gen_private_key: function () {
      var generateKeys = new JSEncrypt({ default_key_size: 2048 });
      var privateKey = generateKeys.getPrivateKey();
      return privateKey;
    },
    encrypt: function (data, sPublicKey) {
      var encryptedData = this.encryptBlock(data, sPublicKey, 2048);
      return encryptedData;
    },
    decryptKey: function (sPrivateKey, Encdata) {
      //  console.log(sPrivateKey);
      //  console.log(Encdata);
      var decryptedData = this.decrypt(sPrivateKey, Encdata);
      console.log(decryptKey(sPrivateKey, Encdata));
      return decryptedData;
    },
    hash_String: function (str) {
      var hashed_str = CryptoJS.SHA256(str);
      for (var i = 1; i <= 999; i++) {
        hashed_str = CryptoJS.SHA256(hashed_str);
      }
      return hashed_str.toString();
    },


    getInitialKey() {
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/GetInitialKey")
        .then(response => {
          if (response.status == 200 && response.data.stat == 'Ok') {
            // console.log(response.data.publicKey);
            this.sPubKey1 = response.data.publicKey
            this.encryptPublicKey = window.atob(this.sPubKey1)
            //console.log(this.encryptPublicKey,);
            localStorage.setItem('encrptKey', (this.encryptPublicKey))
            //console.log(this.encryptPublicKey);
            this.jSessionId = response.data.tomcatCount
            localStorage.setItem('tomcatCount', (this.jSessionId))
            //console.log(this.jSessionId);
          }
        })
        .catch(e => {
          // console.log(e);
        })

    },



    preAuthenticateKey() {
      this.viewResponse = true
      this.viewPasswordResponse = true
      this.viewsecurityResponse = true
      var sPubKey2 = this.gen_public_key();
      //encrypt the input
      this.Encdata3 = this.encrypt(sPubKey2, this.encryptPublicKey);
      console.log(this.Encdata3);
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/GetPreAuthenticationKey?jsessionid=." + this.tokenId + "&jData=" + this.Encdata3 + "&jKey=" + hashData)
        .then(response => {
          this.receiveDate = (new Date()).getTime();
          this.preAuthenticateTimems = this.receiveDate - this.sendDate;
          if (response.status == 200 && response.data.stat == 'Ok') {
            this.sPubKey5 = response.data.publicKey3
            console.log(this.sPubKey5);
            var sPrivateKey = this.gen_private_key()
            //console.log(sPrivateKey);
            this.holdingbtn = this.gettradebtn = this.orderbtn = this.positionbtn = this.scripbtn = this.orderbtn = this.limitbtn = this.instrumentbtn = this.sublimitbtn =
              this.alertHistorybtn = this.multiScripbtn = this.indexDetailbtn = this.marginDetailbtn = this.topnbtn = this.indexDetailbtn = this.modifyOrderbtn = this.placeOrderbtn =
              this.marketStatusbtn = this.searchScripbtn = this.loadOptionbtn = this.orderHistorybtn = this.accountbtn = this.watchListbtn = this.optionChainbtn = this.addScripbtn = this.deleteScripbtn = this.bracketOrderbtn =
              this.coverOrderBtn = this.basketOrderbtn = this.loadOptionbtn = this.orderHistorybtn = this.loadExpirybtn = this.sortMwbtn = this.categorybtn = this.multipleScripbtn = this.quotesbtn = false;
            // this.sampleKey = this.decryptKey(sPrivateKey, this.sPubKey5)
            // console.log(this.sampleKey);
            // this.sPubKey5 =  this.decryptKey(sPrivateKey, this.sPubKey5);
            // console.log(this.sPubKey5);
            this.validatePassword()
          }

        })
        .catch(e => {
          // console.log(e);
        })
    },
    validatePassword() {
      this.viewPasswordResponse = false
      this.viewResponse = false
      this.viewsecurityResponse = false
      var jsonSendObj = {
        "uid": this.UID,
        "pwd": this.hash_String(this.uPASS),
        // "pwd": hash,
        "ftl": "N",
        "apk": "1.6.1.12",
        "Imei": "0000",
        "Source": "WEB"
      };
      //console.log(jsonSendObj);
      this.Encdata4 = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      console.log(this.Encdata4);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      this.$store.commit('SET_LOADER', true, { root: true })
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/ValidPwd?jsessionid=." + this.tokenId + "&jData=" + this.Encdata4 + "&jKey=" + hashData)
        .then(response => {
          this.receiveDate = (new Date()).getTime();
          this.passwordTimeMs = this.receiveDate - this.sendDate;

          if (response.status == 200 && response.data.stat === 'Not_Ok') {
            this.holdingbtn = this.gettradebtn = this.orderbtn = this.positionbtn = this.scripbtn = this.orderbtn = this.limitbtn = this.instrumentbtn = this.sublimitbtn =
              this.alertHistorybtn = this.multiScripbtn = this.indexDetailbtn = this.marginDetailbtn = this.topnbtn = this.indexDetailbtn = this.modifyOrderbtn = this.placeOrderbtn =
              this.marketStatusbtn = this.searchScripbtn = this.loadOptionbtn = this.optionChainbtn = this.orderHistorybtn = this.watchListbtn = this.addScripbtn = this.deleteScripbtn = this.bracketOrderbtn =
              this.coverOrderBtn = this.basketOrderbtn = this.loadOptionbtn = this.orderHistorybtn = this.accountbtn = this.loadExpirybtn = this.sortMwbtn = this.categorybtn = this.multipleScripbtn = this.quotesbtn = true;
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            if (response.data['Emsg'] === 'User Blocked Contact System Administrator') {
              this.unBlockUser()
            }
          }
          else if (response.data['2faResetFlag'] === 'Yes' && response.data['scount'] > 2) {
            this.save2FAAnswers(data)
          }
          else {
            var questionsCount = JSON.parse(response.data.scount);
            var sIndex = JSON.parse(response.data.sIndex);
            this.passwordResponse = response.data
            //console.log(sIndex);
            this.validate2fa(questionsCount, response.data.sIndex);
          }
          this.$store.commit('SET_LOADER', false, { root: true })
        })
        .catch(e => {
          // console.log(e);
        })
    },
    save2FAAnswers(pData) {
      var qIndex = JSON.parse(pData)['sIndex'];
      var questions = qIndex.split('|');
      var qa = questions[0] + setAns;
      for (var count = 1; count < 5; count++) {
        qa = qa + '|' + questions[count] + setAns;
      }
      var jsonSendObj = {
        "uid": this.UID,
        "qa": qa
      }
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //console.log(uid);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/SaveAns?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200) {
            var save2FAAns = response.data;
            //console.log(save2FAAns);
          }
          else {
            // this.getHoldings();
          }
        })
        .catch(e => {
          //console.log(e);
        })

    },
    validate2fa(questionsCount, sIndex) {
      while (sIndex.indexOf('|') > -1) {
        sIndex = sIndex.replace("|", "-");
      }
      //json object as input for 

      var jsonSendObj = {
        "uid": this.UID,
        "Count": questionsCount,
        "as": this.answers,
        "is": sIndex
      };

      this.Encdata5 = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      console.log(this.Encdata5);
      var hashData7 = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/ValidAns?jsessionid=." + this.tokenId + "&jData=" + this.Encdata5 + "&jKey=" + "bd31b58afe0d522bb2d72de4dd6d76b929f51017b00643b526d75838a2f45ee2")
        .then(response => {
          this.receiveDate = (new Date()).getTime();
          this.validansTimeMs = this.receiveDate - this.sendDate;
          if (response.status == 200) {
            var encResp = response.data.jEncResp;
            console.log(encResp);
            var sPrivateKey = this.gen_private_key()
            var decResp = this.decryptKey(sPrivateKey, this.sPubKey5);
            //console.log(sPrivateKey)
            // console.log(decResp);
            // var sPubKey4 = ''
            // sPubKey4 = JSON.parse(decResp).sUserToken;
            // console.log("Two factor atuthentication (Pub Key 4) =" + decResp);
            // localStorage.setItem("pubKey4", sPubKey4);
            // userSessionID = (JSON.parse(decResp).UserSessionID);
            // console.log(userSessionID);
            // localStorage.setItem("userSessionID", userSessionID);
            if (JSON.parse(decResp).sPasswordReset === 'Y') {
              this.changePasswordWithPubKey4();
            }
          }
          else { }

        })
        .catch(e => {
          //console.log(e);
        })
    },

    getHoldings() {
      var jsonSendObj = {
        "uid": this.UID,
        "acctid": this.UID,
        "brkname": "ALICEBLUE",
        "s_prdt_ali": "CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
        "symbol": "",
        "exch": "",
        "Pcode": "CNC"
      }
      this.Encdata6 = this.encrypt(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      console.log(this.encryptPublicKey);
      console.log(this.Encdata6);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Holding?jsessionid=." + "tomcat35" + "&jData=" + "ZEw2bk1INVlrUVpwT2x1VWNKbGZRWk4walJzeDM1Z1BxTmpudmRxY2lEenJJYnZBN09oQTVDOFBoOGMyajFhaHdqQWNURUF4dXFVR29tSDdxdmJnVHF6NUx2bG5xNWFXYzlJaFhuQ3E3T1o1b004SjdFWE1ZeFFLaDd4d05sczZ2VTMzdktkMFhzMmJxUkpQamVLMjFEa0NYYnZhL3lBVUx2bmJYWkVLQVlIcUNLMVJndVJBV0NTMUpCYm5xT1pjTVYyc1E0VWVJNG1LclRIWWRZMG9MMC80dk0zQlN2L0g2VEEweFRjZ3o1K20yb0o4cEphb2U3RE9uS2tqdE9kcVVBTDZlNm9rbDdkUURCT3NsNnhrSUJtV3ZYL3V2eUhzQ0V2L0FabmkvNUwveVJPbzJXOS9Jay9GRVpMM3RadGFYcmNuTnhWdzMrTEhyNkM2YjVWYzFBPT0K" + "&jKey=" + "54593d682541cee96655da65efcac07ebb135e13eafc13cb0eb85bbf627d0097")
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var holdingList = response.data.Emsg
            //console.log(holdingList);
            this.holdingResponse = false
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.holdingResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.holdingsTimeMs = this.receiveDate - this.sendDate;
          //console.log(this.holdingsTimeMs);
        })
        .catch(e => {
          //console.log(e);
        })
    },

    positionBook() {
      var jsonSendObj = {
        "uid": this.UID,
        "actid": this.UID,
        "type": "NET",
        "s_prdt_ali": "CNC:CNC||CO:CO||MIS:MIS||NRML:NRML"
      }
      var encrptToken = localStorage.getItem('encrptKey')
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      console.log(encrptToken);
      console.log(dataObj);
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();

      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/PositionBook?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData,)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var positionList = response.data.result
            this.positionResponse = false
            //console.log(positionList);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: "Session Expired", show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.positionResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.responseTimeMs = this.receiveDate - this.sendDate;

          //console.log(this.responseTimeMs);
        })
        .catch(e => {
          // console.log(e);
        })
    },


    getTradeHistory: function () {
      var jsonSendObj = {
        "uid": this.UID,
        // "accountId":UID,
        // "fromDate":"05/04/2019",
        // "toDate":"06/04/2019",
        // "exch":"NSE"
        "s_prdt_ali": "CNC:CNC||CO:CO||MIS:MIS||NRML:NRML"
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/TradeBook?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var getTradeBook = response.data.result
            this.tradebookResponse = true
            //console.log(getTradeBook);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.tradebookResponse = false
          }
          this.receiveDate = (new Date()).getTime();
          this.tradebookTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    getAlertHistory: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "s_prdt_ali": "BO:BO||CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
      };
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/AlertHistory?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var getTradeBook = response.data.result
            //console.log(getTradeBook);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.alertHistoryTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    fetchOrderBook: function () {
      var jsonSendObj = {
        "s_prdt_ali": "MIS:MIS||CNC:CNC||CO:CO||NRML:NRML||BO:BO",
        "uid": this.UID
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);

      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/OrderBook?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var getOrderBook = response.data.result
            this.orderbookResponse = false
            // console.log(getOrderBook);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true });
            this.orderbookResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.orderbookTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    loadScrips() {
      var jsonSendObj = {
        "Exchange": "NFO",
        "Instname": "FUTSTK"
      }
      //Encrypt the json object with Public key3              
      // var uid = encryptBlock(JSON.stringify(jsonSendObj),sPubKey4,2048);
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/LoadScrips?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadScrips = response.data.result
            this.loadscripResponse = false
            //   console.log(loadScrips);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.loadscripResponse = false
          }
          this.receiveDate = (new Date()).getTime();
          this.loadScripTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    getLimits() {
      var jsonSendObj = {
        "uid": this.UID,
        "actid": this.UID,
        "segment": "ALL",
        "Exchange": ""
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Limits?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadScrips = response.data.result
            this.getlimitResponse = false
            //  console.log(loadScrips);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.getlimitResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.getLimitTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //console.log(e);
        })
    },

    loadInstrument() {
      var jsonSendObj = {
        "Exchange": "MCX"
      };

      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Limits?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadInstrument = response.data.result
            this.loadinstrumentResponse = false
            // console.log(loadInstrument);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.loadinstrumentResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.getLoadInstrumentTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },

    getRMSSubLimits() {
      var jsonSendObj = {
        "uid": this.UID,
        "acId": this.UID,
        "s_prdt_ali": "CNC:CNC||CO:CO||MIS:MIS||NRML:NRML"
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/RMS/Sublimits?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var rmssubmlimit = response.data.result
            this.loadsublimitsResponse = false
            //console.log(rmssubmlimit);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.loadsublimitsResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.getsubLimitTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    getIndexDetails: function () {
      var jsonSendObj = {
        "Exchange": "NSE"
      };
      //Encrypt the json object with Public key4             
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/IndexDetails?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var indexDetails = response.data.result
            // console.log(indexDetails);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.getindexdetailTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    getMultiScripsData: function () {
      var jsonSendObj = {
        "scripList": "nse_fo|35110,nse_fo|35112,nse_fo|35115,nse_fo|35122,nse_fo|35124,nse_fo|35126,nse_fo|40062",
        "uid": this.UID
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/broker/mw/scrips?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var multiscripData = response.data.result
            this.multiScripResponse = false;
            // console.log(multiscripData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.multiScripResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.multiscripDataTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //console.log(e);
        })
    },
    getIndexData: function () {
      var jsonSendObj = {
        "Symbol": "Nifty 50",
        "exchange": "NSE",
        "uid": this.UID
      }
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/GetIndicesChart?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var indecChratData = response.data.result
            this.indexdetailResponse = false
            //console.log(indecChratData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.indexdetailResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.indexDataTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    getGainerLosers: function () {
      var jsonSendObj = {
        "Category": "TRADE_VOLUME",
        "Basket": "MCX_FO_OPEN_MARKET",
        "Toptype": ""
      }
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Topn?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var topntData = response.data.result
            this.topnviewResponse = false
            //console.log(topntData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.topnviewResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.TopnTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    getMargin: function () {
      var jsonSendObj =
      {
        "Ttranstype": "B",
        "uid": this.UID,
        "branchid": "HO",
        "TokenNo": "212",
        "Price": "36000",
        "exch": "NSE",
        "segment": "nse_cm",
        "qty": "1",
        "actid": this.UID,
        "Pcode": "MIS",
        "brokname": "ALICEBLUE",
        "prctyp": "L",
        "SqrOffAbsOrticks": "",
        "SLAbsOrticks": ""
      };
      //console.log(jsonSendObj);
      //Encrypt the json object with Public key4             
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/CheckMargin?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var getMargin = response.data.result
            this.margindetailResponse = false
            //console.log(getMargin);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.margindetailResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.marginTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    accountInfo: function () {
      var jsonSendObj = {
        "acctId": this.UID
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/user/account/details?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var accountInfo = response.data.result
            this.accountResponse = false
            // console.log(accountInfo);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.accountResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.accountinfoTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },
    placeOrder: function () {
      var jsonSendObj = {
        "s_prdt_ali": "BO:BO||CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
        "uid": this.UID,
        "actid": this.UID,
        "Tsym": "INFY-EQ",
        "exch": "NSE",
        "Ttranstype": "S",
        "Ret": "DAY",
        "prctyp": "L",
        "qty": "50",
        "discqty": "0",
        "MktPro": "5",
        "Price": "8",
        "TrigPrice": "0",
        "Pcode": "MIS",
        "DateDays": "NA",
        "AMO": "NO",
        "MinQty": "0",
        "PosSquareFlg": "",
        "BrokerClient": "13179",
        "naicCode": "10",
        "orderSource": "MOB",
        "userTag": "MOB",
        // "Exch_Algo_Id":"",
        // "Exch_Algo_Category":"",
        // "remarks":"",
        "criteriaAttribute": "place"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/PlaceOrder?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var placeOrder = response.data.result
            this.placeOrderResponse = false
            //console.log(placeOrder);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.placeOrderResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.placeorderTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    modifyOrder: function () {
      var jsonSendObj = {
        "s_prdt_ali": "NRML:NRML||MIS:MIS||CNC:CNC||CO:CO",
        "uid": this.UID,
        "Actid": this.UID,
        "Exchangeseg": "mcx_fo",
        "Exch": "MCX",
        "Tsym": "SILVERMIC22NOVFUT",
        "Nstordno": "221003000199244",
        "Transtype": "B",
        "Prctype": "L",
        "Price": "56000",
        "Qty": "1",
        "Dscqty": "0",
        "Trgprc": "",
        "Validity": "DAY",
        "Symbol": "",
        "Filledqty": "0",
        "Pcode": "MIS",
        "Mktpro": "NA",
        "DateDays": "NA",
        "criteriaAttribute": ""

      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/ModifyOrder?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var modifyOrderData = response.data.result
            //console.log(modifyOrderData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.modifyorderTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    marketStatus: function () {
      var jsonSendObj = {
        "Exchange": "MCX"
      };
      
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/MarketStatus?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var marketInfo = response.data.result
            //console.log(marketInfo);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.marketStatusTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    loadOption: function () {
      var jsonSendObj = {
        "Exchange": "MCX",
        "Instname": "FUTCOM",
        "Symbol": "CRUDEOILM",
        "Expirydate": "1232323199"
      };

      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/LoadOption?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadOptions = response.data.result
            this.loadOptionResponse = false
            // console.log(loadOptions);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.loadOptionResponse = true
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.loadOptionTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },
    orderHistory: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "s_prdt_ali": "BO:BO||CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
        "NOrdNo": "190319000000027"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/OrderHistory?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var orderHistory = response.data.result
            this.orderHistoryResponse = false
            // console.log(orderHistory);
          }
          else if (response.data[0].stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.orderHistoryResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.orderHistoryTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })

    },
    getChartData: function () {
      var jsonSendObj = {
        "exch": "CDS",
        "symbol": "3692",
        "interval": "60",
        "gType": "O"
      }
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/GetChartData?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var chartData = response.data.result
            // console.log(chartData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.chartDataTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    scripSearch: function () {
      // var groupCash = ["BE","BL","BZ","D1","DR","E1","E2","EQ","GB","GS","IT","IV","M1","MF","N1","N2","N3","N4","N5","N6","N7","N8","N9","NA","NB","NC","ND","NE","NF","NG","NH","NI","NJ","NK","NL","NM","NN","NO","NP","NQ","NR","NS","NT","NU","NV","NW","NX","NY","NZ","O1","O2","O3","O4","P1","P2","SM","ST","UZ","W1","XX","Y1","Y2","Y3","Y5","Y6","Y7","Y8","Y9","YA","YB","YC","YD","YG","YH","YI","YJ","YK","YL","YM","YN","YO","YP","YQ","YR","YS","YT","YU"];
      var groupCash = ["XX"];
      for (var count = 0; count < groupCash.length; count++) {
        var jsonSendObj = {
          "Exchange": "MCX",
          "SearchFor": "CRUDE",
          "Group": groupCash[count],
          "uid": this.UID
        };

        //Encrypt the json object with Public key3              
        var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
        //Hash the key used for encryption
        var hashData = CryptoJS.SHA256(this.encryptPublicKey);
        this.sendDate = (new Date()).getTime();
        axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Scripsearch?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
          .then(response => {
            if (response.status == 200 && response.data.stat === 'Ok') {
              var searchScrips = response.data.result
              this.searchscripResponse = false
              // console.log(searchScrips);
            }
            else if (response.data[0].stat === 'Not_Ok') {
              this.$store.commit('SET_SNAKBAR', { msg: response.data[0].Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
              this.searchscripResponse = true
            }
            this.receiveDate = (new Date()).getTime();
            this.searchScripsTimeMs = this.receiveDate - this.sendDate;
          })
          .catch(e => {
            // console.log(e);
          })
      }
    },
    getMarketWatchList() {
      //json object as input for 
      var jsonSendObj = {
        "uid": this.UID
      };
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);

      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/MWList?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {

          if (response.status == 200 && response.data.stat === 'Ok') {
            var defaultMktWatch = response.data.logindefaultmw;
            mwValues = JSON.parse(data).values;
            getMarketWatchScrips(defaultMktWatch);
            this.watchListResponse = false
            // console.log(searchScrips);
          }
          else if (response.data.stat === 'Not_Ok' || response.data.stat === null || response.data.stat === undefined) {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.watchListResponse = true
            this.getInitialKey()
            //  console.log(errorMessage);
          }
          this.receiveDate = (new Date()).getTime();
          this.watchListTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    getMarketWatchScrips(mktWatchListName) {
      //json object as input for 

      var jsonSendObj = {
        "uid": this.UID,
        "MWname": mktWatchListName,
        "mrvData": "Y"
      };
      //Encrypt the json object with Public key3              
      var uid = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/MarketWatch?jsessionid=." + this.tokenId + "&jData=" + uid + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var chartData = response.data.result
            //console.log(chartData);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.marketWatchscripTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    addScripToMW: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "Symbol": "57140",
        "Exchange": "NFO",
        "MWname": "mwGrp2"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/AddScripsToMW?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var addScrips = response.data.result
            this.addscripResponse = false
            //  console.log(addScrips);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.addscripResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.addScripsTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    deleteScrips: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "Exchange": "NSE",
        "MWName": "mwGrp2",
        "Symbol": "3045"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/DeleteMWScrips?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var deleteScrips = response.data.result
            this.deletescripResponse = false
            //console.log(deleteScrips);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.deletescripResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.deleteScripsTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })

    },

    basketOrder: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "acid": this.UID,
        "mOrderString": "NSE|INFY-EQ|B|MIS|L|DAY|730.00|0.0|10|0|NA|NA|NA",
        "naicCode": "",
        "orderSource": "MOB",
        "userTag": "MOB"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/BasketOrder?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var basketOrder = response.data.result
            this.basketOrderResponse = false
            //console.log(basketOrder);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.basketOrderResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.basketOrderTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    bracketOrder: function () {
      var jsonSendObj = {
        "exch": "MCX",
        "TokenNo": "215500",
        "Ttranstype": "B",
        "qty": "1",
        "actid": this.UID,
        "uid": this.UID,
        "s_prdt_ali": "BO:BO||CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
        "Ret": "DAY",
        "discqty": "1",
        "Price": "46870.00",
        "ltpOratp": "LTP",
        "SqrOffAbsOrticks": "Absolute",
        "SqrOffvalue": "1",
        "SLAbsOrticks": "Absolute",
        "SLvalue": "1",
        "trailingSL": "Y",
        "tSLticks": "20",
        "naicCode": "",
        "orderSource": "WEB",
        "userTag": "WEB",
        "Exch_Algo_Id": "NA",
        "Exch_Algo_Category": "NA",
        //"criteriaAttribute":"pla  ce",
        "prctyp": "SL",
        "TrigPrice": "46855.00"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/user/bo/placeorder?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var bracketOrder = response.data.result
            this.bracketResponse = false
            //console.log(bracketOrder);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.bracketResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.bracketOrderTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    coverOrder: function () {
      var jsonSendObj = {
        "s_prdt_ali": "BO:BO||CNC:CNC||CO:CO||MIS:MIS||NRML:NRML",
        "uid": this.UID,
        "actid": this.UID,
        "Tsym": "SILVER19JULFUT",
        "exch": "MCX",
        "Ttranstype": "B",
        "Ret": "DAY",
        "prctyp": "L",
        "qty": "5",
        "discqty": "0",
        "MktPro": "NA",
        "Price": "36250",
        "TrigPrice": "36190",
        "Pcode": "CO",
        "DateDays": "NA",
        "AMO": "NO",
        "MinQty": "0",
        "PosSquareFlg": "",
        "BrokerClient": "72026",
        "naicCode": "",
        "orderSource": "MOB",
        "userTag": "MOB",
        "criteriaAttribute": "place"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/PlaceOrder?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var coverOrder = response.data.result
            this.coverorderResponse = false
            // console.log(coverOrder);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.coverorderResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.coverOrderTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },

    loadExpiryDates: function () {
      var jsonSendObj = {
        "Exchange": "NFO",
        "Symbol": "NIFTY",
        "Instname": "OPTIDX"
      }
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/LoadDate?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadExpiry = response.data.result
            this.loadexpiryResponse = false
            // console.log(loadExpiry);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.loadexpiryResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.loadExpiryTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    optionChainLoader: function () {
      var jsonSendObj = {
        "exch": "NFO",
        "userid": this.UID,
        "symbol": "NIFTY",
        "sIMEI": "",
        "IN": "OPTIDX",
        "ED": "1235831400"
      };

      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/OptionChain?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var loadOptionChain = response.data.result
            this.optionchainResponse = false
            // console.log(loadOptionChain);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.optionchainResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.OptionChainTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },
    addMultipleScripToMW: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "mWString": "MCX|214671#MCX|214672",
        "MWname": "mwGrp2"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/AddMultiScripsToMW?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var multipleScrips = response.data.result
            this.multiplescripReponse = false
            // console.log(multipleScrips);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.multiplescripReponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.multipleScripsTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    getCategories: function () {
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/Topkeys?jsessionid=." + this.tokenId + "&jData=&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var getCategories = response.data.result
            this.categoryResponse = false
            // console.log(getCategories);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.categoryResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.categoryTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })
    },
    showQuote: function () {
      var jsonSendObj = {
        "Exchange": "NFO",
        "Symbol": "54658"
      };

      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/ShowQuote?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var showQuotes = response.data.result
            this.qoutesResponse = false
            // console.log(showQuotes);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.qoutesResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.quotesTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },

    sortMarketWatch: function () {
      var jsonSendObj = {
        "uid": this.UID,
        "MWname": "BANKNIFTY",
        "list": "BANKNIFTY|NSE|1594|NFO|50474|NSE|3456|NSE|547|NSE|11536|NFO|53757"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/SortMarketwatchScrips?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var sortMW = response.data.result
            this.sortMarketwatcResponse = false
            // console.log(sortMW);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.sortMarketwatcResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.sortMarketwatchTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //console.log(e);
        })
    },
    loadRetentionType: function () {
      var jsonSendObj = {
        "Exchange": "MCX"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), this.encryptPublicKey, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(this.encryptPublicKey);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/LoadRetentionType?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var sortMW = response.data.result
            this.loadretentionResponse = false
            //console.log(sortMW);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
            this.loadretentionResponse = true
          }
          this.receiveDate = (new Date()).getTime();
          this.retentionTypeTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          // console.log(e);
        })

    },
    deleteMW(mwName) {

      var jsonSendObj = {
        "uid": this.UID,
        "MWName": "null"
      };
      //Encrypt the json object with Public key3              
      var dataObj = this.encryptBlock(JSON.stringify(jsonSendObj), sPubKey4, 2048);
      //Hash the key used for encryption
      var hashData = CryptoJS.SHA256(sPubKey4);
      this.sendDate = (new Date()).getTime();
      axios.post("http://f5.aliceblueonline.com/NestHtml5MobileTech/rest/DeleteMW?jsessionid=." + this.tokenId + "&jData=" + dataObj + "&jKey=" + hashData)
        .then(response => {
          if (response.status == 200 && response.data.stat === 'Ok') {
            var sortMW = response.data.result
            //console.log(sortMW);
          }
          else if (response.data.stat === 'Not_Ok') {
            this.$store.commit('SET_SNAKBAR', { msg: response.data.Emsg, show: true, color: 'red lighten-1', timeout: 3000 }, { root: true })
          }
          this.receiveDate = (new Date()).getTime();
          this.deleteMWTimeMs = this.receiveDate - this.sendDate;
        })
        .catch(e => {
          //  console.log(e);
        })
    },

  }
};
</script>

<style>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.right-0 {
  right: 24px;
  top: 20%;
}

.v-icon[disabled] {
  cursor: not-allowed !important;
}
</style>