import Vue from 'vue'
import Router from 'vue-router'

//使用路由懶加載提高效能
const Cart = () => import('../views/front/Cart.vue')
const CustomerInfo = () => import('../views/front/CustomerInfo.vue')
const Detail = () => import('../views/front/Detail.vue')
const Home = () => import('../views/front/Home.vue')
const Index = () => import('../views/front/Index.vue')
const CustomerCheckout = () => import('../views/front/CustomerCheckout.vue')
const Shop = () => import('../views/front/Shop.vue')

const Dashboard = () => import('../views/back/Dashboard.vue') 
const Login = () => import('../views/back/Login.vue')
const Products = () => import('../views/back/Products.vue')
const Orders = () => import('../views/back/orders.vue')
const Coupon = () => import('../views/back/Coupon.vue')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect: '/home', //使用者亂打會導回首頁
    },
    {
      path: '',
      name: 'Index',
      component: Index,
      redirect: '/home',  //如果什麼都沒有也會導回首頁
      children:[
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'shop',
          name: 'Shop',
          component: Shop,
        },
        {
          path: 'detail/:detailId',
          name: 'Detail',
          component: Detail,
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
      ],
    },
    {
      path: '/cart',
      name: 'Index',
      component: Index,
      children:[
        {
          path: 'customerInfo',
          name: 'CustomerInfo',
          component: CustomerInfo,
        },
        {
          path: 'checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },

    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ],
    },
  ]
})
