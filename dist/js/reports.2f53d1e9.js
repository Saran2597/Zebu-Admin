(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reports"],{"8ce9":function(e,t,i){},"9dbe":function(e,t,i){"use strict";var a=i("ade3"),n=(i("277d"),i("4e82")),s=i("58df"),c=i("d9bd"),r=i("2b0e"),l=r["default"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots["default"]?(this.$scopedSlots["default"]&&(e=this.$scopedSlots["default"]({active:this.isActive,toggle:this.toggle})),Array.isArray(e)&&1===e.length&&(e=e[0]),e&&!Array.isArray(e)&&e.tag?(e.data=this._b(e.data||{},e.tag,{class:Object(a["a"])({},this.activeClass,this.isActive)}),e):(Object(c["c"])("v-item should only contain a single element",this),e)):(Object(c["c"])("v-item is missing a default scopedSlot",this),null);var e}});Object(s["a"])(l,Object(n["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),t["a"]=Object(s["a"])(l,Object(n["a"])("slideGroup")).extend({name:"v-slide-item"})},c464:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"w-100 pa-4"},[i("div",{staticClass:"font-weight-bold primaryColor"},[e._v("Funds "),e.loading?i("v-progress-circular",{staticClass:"ml-2",attrs:{indeterminate:"",size:"18",width:2,color:"black"}}):e._e()],1),i("div",{staticClass:"pt-3 d-flex flex-wrap justify-space-between"},[i("div",[i("v-slide-group",{attrs:{mandatory:""},model:{value:e.tabSelect,callback:function(t){e.tabSelect=t},expression:"tabSelect"}},e._l(e.tabs,(function(t){return i("v-slide-item",{key:t,attrs:{value:t},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.active,s=a.toggle;return[i("span",{on:{click:function(i){e.$router.push({path:"reports",query:{tab:t}}).catch((function(){}))}}},[i("v-btn",{staticClass:"fsize12 text-capitalize mr-2",attrs:{title:t,depressed:"",height:"26",color:n?"primary":"grey lighten-3"},on:{click:s}},[e._v(e._s(t))])],1)]}}],null,!0)})})),1)],1)])]),i("v-divider",{staticClass:"mx-4"}),i("v-card",{staticClass:"ma-4 cardBoxShadow rounded-lg"},["Holdings"==e.tabSelect?i("holdingsList"):e._e(),"Positions"==e.tabSelect?i("positionAvgList"):e._e(),"EDiS"==e.tabSelect?i("edisList"):e._e(),"Settlement Info"==e.tabSelect?i("settlemntDetails"):e._e(),"PayIn/PayOut Details"==e.tabSelect?i("payin"):e._e()],1)],1)},n=[],s=i("5530"),c=(i("d3b7"),i("3ca3"),i("ddb0"),i("2f62")),r=i("781e"),l={mixins:[r["a"]],components:{holdingsList:function(){return Promise.all([i.e("chunk-78e7f545"),i.e("chunk-26ad118a"),i.e("chunk-0744921d"),i.e("chunk-63f41e13"),i.e("chunk-4559773a")]).then(i.bind(null,"c811"))},positionAvgList:function(){return Promise.all([i.e("chunk-78e7f545"),i.e("chunk-26ad118a"),i.e("chunk-0744921d"),i.e("chunk-0cd3a036"),i.e("chunk-27aa4089")]).then(i.bind(null,"5f5e"))},edisList:function(){return Promise.all([i.e("chunk-78e7f545"),i.e("chunk-26ad118a"),i.e("chunk-0744921d"),i.e("chunk-0cd3a036"),i.e("chunk-c0c86878")]).then(i.bind(null,"bdef"))},payin:function(){return Promise.all([i.e("chunk-78e7f545"),i.e("chunk-26ad118a"),i.e("chunk-0744921d"),i.e("chunk-0cd3a036"),i.e("chunk-3e948b8f")]).then(i.bind(null,"4cd0"))},payout:function(){return Promise.all([i.e("chunk-78e7f545"),i.e("chunk-26ad118a"),i.e("chunk-0744921d"),i.e("chunk-0cd3a036"),i.e("chunk-a083fc80")]).then(i.bind(null,"4717"))},settlemntDetails:function(){return i.e("chunk-c0dcd2ba").then(i.bind(null,"348b"))}},data:function(){return{tabs:["Holdings","Positions","EDiS","PayIn/PayOut Details"],tabSelect:"Payin"}},computed:Object(s["a"])({},Object(c["b"])({loading:"getLoader"})),created:function(){this.tabSelect=this.$route.query.tab?this.$route.query.tab:"Payin"},methods:{}},o=l,d=i("2877"),u=i("6544"),h=i.n(u),v=i("8336"),b=i("b0af"),f=i("ce7e"),p=i("490a"),m=i("7efd"),k=i("9dbe"),g=Object(d["a"])(o,a,n,!1,null,null,null);t["default"]=g.exports;h()(g,{VBtn:v["a"],VCard:b["a"],VDivider:f["a"],VProgressCircular:p["a"],VSlideGroup:m["b"],VSlideItem:k["a"]})},ce7e:function(e,t,i){"use strict";var a=i("5530"),n=(i("8ce9"),i("7560"));t["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(e){var t;return this.$attrs.role&&"separator"!==this.$attrs.role||(t=this.vertical?"vertical":"horizontal"),e("hr",{class:Object(a["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(a["a"])({role:"separator","aria-orientation":t},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=reports.2f53d1e9.js.map