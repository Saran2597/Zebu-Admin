(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0291"],{"9ad7":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[0==t.sectorList.length||t.loader?t.loader?t._e():s("div",[s("div",{staticClass:"text-center pa-5"},[s("v-icon",{staticClass:"display-2 pb-4"},[t._v("mdi-thought-bubble-outline")]),s("div",{},[t._v("Data Not Found")])],1)]):s("v-data-table",{staticClass:"elevation-1 my-2",attrs:{headers:t.headers,items:t.sectorList,search:t.search,value:t.sectorList,id:"table","item-key":"name","single-select":""},scopedSlots:t._u([{key:"item",fn:function(e){return[s("tr",[s("td",{on:{click:function(s){return t.sectorDetails(e.item.sectorId)}}},[t._v(t._s(e.index+1))]),s("td",{on:{click:function(s){return t.sectorDetails(e.item.sectorId)}}},[t._v(t._s(e.item.imageUrl))]),s("td",{on:{click:function(s){return t.sectorDetails(e.item.sectorId)}}},[t._v(t._s(e.item.sectorName))]),s("td",{staticClass:"text-center",on:{click:function(s){return t.sectorDetails(e.item.sectorId)}}},[t._v(t._s(e.item.sectorId))])])]}}],null,!1,142216861)})],1)},c=[],a=s("5530"),o=s("2f62"),i={data:function(){return{headers:[{text:"S.NO",align:"start",sortable:!1},{text:"Image",value:"imageUrl",sortable:!1},{text:"Sector Name",value:"sectorName",sortable:!1},{text:"Sector Id",align:"center",value:"sectorId",sortable:!1}]}},computed:Object(a["a"])(Object(a["a"])({},Object(o["b"])({loader:"getLoader",search:"getSearch"})),Object(o["b"])("sector",{sectorList:"getSectorData"})),methods:{addOrEditSector:function(t){this.$router.push("/addOrEditSector")},deleteSector:function(t){this.$store.dispatch("sector/deleteSector",{sectorId:t})},sectorDetails:function(t){this.$router.push("/sectorDetails"),localStorage.setItem("sectorId",t)}},created:function(){this.$store.dispatch("sector/getSector")}},n=i,l=s("2877"),d=s("6544"),u=s.n(d),m=s("8fea"),h=s("132d"),b=Object(l["a"])(n,r,c,!1,null,null,null);e["default"]=b.exports;u()(b,{VDataTable:m["a"],VIcon:h["a"]})}}]);
//# sourceMappingURL=chunk-2d0f0291.f71e2eb0.js.map