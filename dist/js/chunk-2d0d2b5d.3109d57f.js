(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d2b5d"],{"5a50":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[0!=t.sgbData.length?a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.sgbData,search:t.search,value:t.sgbData,"hide-Details":"",id:"table","item-key":"name","single-select":""},scopedSlots:t._u([{key:"item",fn:function(e){return[a("tr",[a("td",[t._v(t._s(e.item.tittle))]),a("td",[t._v(t._s(e.item.seriesName))]),a("td",[t._v(t._s(e.item.pricePerGm))]),a("td",[t._v(t._s(e.item.offOpenDate?e.item.offOpenDate.split(" ")[0]:""))]),a("td",[t._v(t._s(e.item.offCloseDate?e.item.offCloseDate.split(" ")[0]:""))]),a("td",[t._v(t._s(e.item.maturityDate?e.item.maturityDate.split(" ")[0]:""))]),a("td",[t._v(t._s(e.item.annualInterestPayout))])])]}}],null,!1,4073413678)}):a("div",[a("div",{staticClass:"text-center pa-5"},[a("v-icon",{staticClass:"display-2 pb-4"},[t._v("mdi-thought-bubble-outline")]),a("div",{},[t._v("Data Not Found")])],1)])],1)},i=[],l=a("5530"),n=a("2f62"),r={data:function(){return{headers:[{text:"Title",value:"tittle",sortable:!1},{text:"seriesName",value:"seriesName",sortable:!1},{text:"pricePerGm",value:"pricePerGm",sortable:!1},{text:"offOpenDate",value:"offOpenDate",sortable:!1},{text:"offCloseDate",value:"offCloseDate",sortable:!1},{text:"maturityDate",value:"maturityDate",sortable:!1},{text:"annualInterestPayout",value:"annualInterestPayout",sortable:!1}]}},computed:Object(l["a"])({},Object(n["b"])({sgbData:"getSgbData",search:"getSearch",loader:"getLoading"})),methods:{},created:function(){this.$store.dispatch("getSgb")}},o=r,u=a("2877"),d=a("6544"),c=a.n(d),m=a("8fea"),b=a("132d"),f=Object(u["a"])(o,s,i,!1,null,null,null);e["default"]=f.exports;c()(f,{VDataTable:m["a"],VIcon:b["a"]})}}]);
//# sourceMappingURL=chunk-2d0d2b5d.3109d57f.js.map