import VueRouter from 'vue-router'
import PivotTableDemo from '../views/VueFlexmonsterExamples/PivotTableDemo.vue'
//import UsingAPICalls from '../views/VueFlexmonsterExamples/UsingAPICalls.vue'

const router = new VueRouter({
  routes: [{
    path: '/pivot-table-demo',
    name: 'PivotTableDemo',
    component: PivotTableDemo
  },
  {
    path: '/handling-events',
    name: 'HandlingEvents',
    component: () => import('@/views/VueFlexmonsterExamples/HandlingEvents.vue')
  },
  {
    path: '/using-api-calls',
    name: 'UsingAPICalls',
    component: () => import('@/views/VueFlexmonsterExamples/UsingAPICalls.vue')
  },
  {
    path: '/updating-data',
    name: 'UpdatingData',
    component: () => import('@/views/VueFlexmonsterExamples/UpdatingData.vue')
  },
  {
    path: '/customizing-toolbar',
    name: 'CustomizingToolbar',
    component: () => import('@/views/VueFlexmonsterExamples/CustomizingToolbar.vue')
  },
  {
    path: '/customizing-grid',
    name: 'CustomizingGrid',
    component: () => import('@/views/VueFlexmonsterExamples/CustomizingGrid.vue')
  },
  {
    path: '/with-highcharts',
    name: 'WithHighcharts',
    component: () => import('@/views/VueFlexmonsterExamples/WithHighcharts.vue')
  },
  {
    path: '/with-amcharts',
    name: 'WithAmcharts',
    component: () => import('@/views/VueFlexmonsterExamples/WithAmcharts.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: PivotTableDemo
  }
  ]
})

export default router
