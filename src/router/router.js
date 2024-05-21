// 暴露出一个createRouter方法，用来创建路由对象
// 通过defineAsyncComponent方法来实现路由的懒加载

import {createRouter,createWebHistory} from 'vue-router'

const routes  = [
  { path:'/', redirect:{name:'home'}},
  { path:'/home',name:'home',component: () => import('/src/view/home/home.vue')}
];

const router =  createRouter({
  history:createWebHistory(), //===> mode:"history"
  routes ,
})


// router.beforeEach((to, from, next) => {
//   const role = Vue.prototype.$ctmStorage.role;
//   if (to.name === 'Login') {
//     next()
//   } else if (!Vue.prototype.$ctmStorage.token || !role) {
//     next({ name: 'Login' })
//   } else {
//     if (!to.meta.roles.includes(role)) {
//       console.log("没有权限",to.name);
//       next()
//     } else {
//       next()
//     }
//   }
// });
export default router

