import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/projectList',
    name: 'ProjectList',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: '/projectList',
        name: 'ProjectList',
        component: () => import('@/views/projectManagement/projectList'),
        meta: {
          title: '项目列表',
          icon: 'dashboard',
          noCache: false
        }
      },
      {
        path: '/contractList',
        name: 'contractList',
        component: () => import('@/views/projectManagement/contractList'),
        meta: {
          title: '合同管理',
          icon: 'dashboard',
          noCache: false
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
