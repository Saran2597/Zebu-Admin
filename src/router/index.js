import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: () => import( /* webpackChunkName: "login" */ '../views/login')
},
{
  path: '/layout',
  name: 'layout',
  component: () => import('../views/layout'),
  children: [{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import( /* webpackChunkName: "dashboard" */ '../views/dashboard'),
    meta: {
      title: 'dashboard'
    }
  },
  {
    path: '/loginDetails',
    name: 'userLogs',
    component: () => import( /* webpackChunkName: "userLogs" */ '../views/loginDetails'),
    meta: {
      title: 'UserLogs'
    }
  },
  {
    path: '/userLogs',
    name: 'logDetails',
    component: () => import( /* webpackChunkName: "logDetails" */ '../views/userLogs'),
    meta: {
      title: 'LogDetails'
    }
  },
  {
    path: '/adminMessage',
    name: 'adminMessage',
    component: () => import( /* webpackChunkName: "adminMessage" */ '../views/adminMessage'),
    meta: {
      title: 'AdminMessage'
    }
  },
  {
    path: '/fileUpload',
    name: 'fileUpload',
    component: () => import( /* webpackChunkName: "fileUpload" */ '../views/fileUpload'),
    meta: {
      title: 'FileUpload'
    }
  },
  {
    path: '/content',
    name: 'content',
    component: () => import( /* webpackChunkName: "content" */ '../views/content'),
    meta: {
      title: 'Content'
    }
  },
  {
    path: '/cMasterData',
    name: 'contractMaster',
    component: () => import( /* webpackChunkName: "contractMaster" */ '../views/contractMaster'),
    meta: {
      title: 'ContractMaster'
    }
  },
  {
    path: '/positionAvg',
    name: 'positionAvg',
    component: () => import( /* webpackChunkName: "positionAvg" */ '../views/positionAvg')
  },
  {
    path: '/chartData',
    name: 'chartData',
    component: () => import( /* webpackChunkName: "chartData" */ '../views/chartData')
  },
  {
    path: '/addOrEditNews',
    component: () => import( /* webpackChunkName: "addOrEditNews" */ '../views/contents/EditableViews/addOrEditNews')
  },
  {
    path: '/addSettlement',
    component: () => import( /* webpackChunkName: "addOrEditNews" */ '../views/contents/EditableViews/addSettlement')
  },
  {
    path: '/sectorDetails',
    component: () => import( /* webpackChunkName: "sectorDetails" */ '../views/contents/sectorContent.vue')
  },
  {
    path: '/accessLogs',
    component: () => import( /* webpackChunkName: "accessLogs" */ '../views/accessLogs.vue')
  },
  {
    path: '/test',
    component: () => import( /* webpackChunkName: "accessLogs" */ '../views/testgrid.vue')
  },
  {
    path: '/apiKey',
    name: 'apiKey',
    component: () => import( /* webpackChunkName: "apiKey" */ '../views/apiKey.vue'),
    meta: {
      title: 'apiKey'
    }
  },
  {
    path: '/vendor',
    name: 'vendor',
    component: () => import( /* webpackChunkName: "vendor" */ '../views/vendor.vue'),
    meta: {
      title: 'vendor'
    }
  },
  {
    path: '/updateVendor',
    component: () => import( /* webpackChunkName: "updateVendor" */ '../views/contents/EditableViews/addOrEditVendor')
  },
  {
    path: '/editScrip',
    name: "editScrip",
    props: true,
    component: () => import( /* webpackChunkName: "editScrip" */ '../views/contents/EditableViews/editContractScrip.vue')
  },
  {
    path: '/scheduler',
    name: 'scheduler',
    component: () => import( /* webpackChunkName: "scheduler" */ '../views/scheduler.vue')
  },

  {
    path: '/reports',
    name: 'reports',
    component: () => import( /* webpackChunkName: "reports" */ '../views/Reports/reports.vue'),
    meta: {
      title: 'reports'
    }
  },

  {
    path: '/settlementInfo',
    name: 'settlementInfo',
    component: () => import( /* webpackChunkName: "positionAvg" */ '../views/contents/settlementInfo')
  },
  {
    path: '/addOrEditSector',
    name: 'addOrEditSector',
    component: () => import( /* webpackChunkName: "positionAvg" */ '../views/contents/EditableViews/addOrEditSector')
  },
  {
    path: '/addOrEditSectorContent',
    name: 'addOrEditSectorContent',
    component: () => import( /* webpackChunkName: "positionAvg" */ '../views/contents/EditableViews/addOrEditSectorContent')
  },
  {
    path: '/query',
    name: 'query',
    component: () => import( /* webpackChunkName: "positionAvg" */ '../views/contents/query')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "reports" */ '../views/settings.vue'),
    meta: {
      title: 'settings'
    }
  },
  {
    path: '/topViewedPages',
    name: 'Top Pages',
    component: () => import( /* webpackChunkName: "reports" */ '../views/topViewedPages.vue'),
    meta: {
      title: 'Top viewed pages'
    }
  },
  {
    path: '/vendorinfo',
    name: 'vendorinfo',
    component: () => import( /* webpackChunkName: "vendor" */ '../views/vendorInfo.vue'),
    meta: {
      title: 'vendorinfo'
    }
  },

 
  ]
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  to.meta.title ? document.title = `Admin-Dashboard / ${to.meta.title}` : document.title = `Admin-Dashboard`
  store.commit('SET_CANONICAL', to.path)
  var isAuthenticated = localStorage.getItem("userId") && localStorage.getItem("sessionId") ? true : false;
  if (isAuthenticated) {
    next()
  }
  else {
    if (to.path == "/") {
      next()
    } else {
      next({ path: "/" })
    }
  }
})

router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message) && navigator.onLine) {
    window.location.reload()
  }
}); // onError

export default router