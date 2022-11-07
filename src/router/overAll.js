// const err401 = r =>
//     require.ensure([], () => r(require("@/views/error/err401.vue")), "home");
// const err404 = r =>
//     require.ensure([], () => r(require("@/views/error/err404.vue")), "home");
// const err403 = r =>
//       require.ensure([], () => r(require("@/views/error/err403.vue")), "home");
// const err500 = r =>
//     require.ensure([], () => r(require("@/views/error/err500.vue")), "home");
// const login = r =>
//     require.ensure([], () => r(require("@/views/Login")), "home");
export default [
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/error/err404.vue"),
  },
  {
    path: "/401",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/error/err404.vue"),
    name: "401",
  },
  {
    path: "/403",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/error/err403.vue"),
    name: "403",
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/error/err404.vue"),
    name: "404",
  },
  {
    path: "/500",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/error/err500.vue"),
    name: "500",
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "componentA" */ "wb@/views/Login"),
    name: "login",
    hidden: true,
  },
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
];
