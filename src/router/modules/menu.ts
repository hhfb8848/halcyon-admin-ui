// 最简代码，也就是这些字段必须有
export default {
  path: "/menu",
  redirect: "/menu/index",
  meta: {
    title: "菜单管理"
  },
  children: [
    {
      path: "/menu/index",
      name: "SystemMenu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理"
      }
    }
  ]
};
