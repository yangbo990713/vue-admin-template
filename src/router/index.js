import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/classification',
    component: Layout,
    redirect: '/classification/list',
    meta: { title: '类别信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'classificationList',
        component: () => import('@/views/classification/classificationList'),
        meta: { title: '类别信息列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'classificationEdit',
        component: () => import('@/views/classification/classificationEdit'),
        meta: { title: '添加类别信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/list',
    meta: { title: '商家信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'merchantList',
        component: () => import('@/views/merchant/merchantList'),
        meta: { title: '商家信息列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'merchantEdit',
        component: () => import('@/views/merchant/merchantEdit'),
        meta: { title: '添加商家信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { title: '物品信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'goodsList',
        component: () => import('@/views/goods/goodsList'),
        meta: { title: '物品信息列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'goodsEdit',
        component: () => import('@/views/goods/goodsEdit'),
        meta: { title: '添加物品信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: { title: '订单信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: () => import('@/views/order/orderList'),
        meta: { title: '订单信息列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'orderEdit',
        component: () => import('@/views/order/orderEdit'),
        meta: { title: '添加订单信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/returnOrder',
    component: Layout,
    redirect: '/returnOrder/list',
    meta: { title: '退货单信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'returnOrderList',
        component: () => import('@/views/returnOrder/returnOrderList'),
        meta: { title: '退货单信息列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'returnOrderEdit',
        component: () => import('@/views/returnOrder/returnOrderEdit'),
        meta: { title: '添加退货单信息', icon: 'form' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
