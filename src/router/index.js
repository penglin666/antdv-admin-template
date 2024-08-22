import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      meta: { title: "首页" },
      redirect: { name: "home" },
      children: [
        {
          path: "/home",
          name: "home",
          meta: { title: "首页" },
          component: () => import("@/views/home/index.vue")
        },
        {
          path: "/about",
          name: "about",
          meta: { title: "关于" },
          children: [
            {
              path: "about1",
              name: "about1",
              meta: { title: "关于1" },
              component: () => import("@/views/about/index1.vue"),
              children: [
                {
                  path: "about1-1",
                  name: "about1-1",
                  meta: { title: "关于1-1" },
                  component: () => import("@/views/about/index1.vue")
                }
              ]
            },
            {
              path: "about2",
              name: "about2",
              meta: { title: "关于2" },
              component: () => import("@/views/about/index2.vue")
            },
            {
              path: "about3",
              name: "about3",
              meta: { title: "关于3" },
              component: () => import("@/views/about/index3.vue")
            }
          ]
        },
        {
          path: "/setting",
          name: "setting",
          meta: { title: "设置" },
          component: () => import("@/views/setting/index.vue"),
          children: [
            {
              path: "detail",
              name: "detail",
              meta: { title: "详情页" },
              component: () => import("@/views/setting/detail.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录" },
      component: () => import("@/views/user/login.vue")
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
      meta: { title: "页面不存在" },
      component: () => import("@/views/404.vue")
    }
  ]
});
export default router;
