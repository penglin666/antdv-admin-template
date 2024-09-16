import NProgress from "nprogress";
import { message } from "ant-design-vue";
import { useUserStore } from "@/stores/modules/user";
import { useTagStore } from "@/stores/modules/tag";
import router from "./router";
NProgress.configure({ showSpinner: false });
const whiteNameList = ["login", "404"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  const { userInfo, menus } = userStore;
  if (userInfo && userInfo.token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (menus.length) {
        const isPerm = getObjByName("/" + to.name, menus, "key");
        if (isPerm) {
          next();
        } else {
          if (to.name === "404") {
            next();
          } else {
            message.error("抱歉，您访问了一个你无权访问的页面");
            next({ path: from.path });
          }
        }
      } else {
        await userStore.fetchPermsAndMenus(useUserStore.role);
        next({
          path: to.path,
          replace: true
        });
      }
    }
  } else {
    if (whiteNameList.some((n) => n === to.name)) {
      // 在免登录名单，直接进入
      next();
    } else {
      next({ name: "login", query: { redirect: to.fullPath }, replace: true });
    }
  }
});
router.afterEach((to, from, failure) => {
  const tagStore = useTagStore();
  if (!whiteNameList.includes(to.name)) {
    tagStore.add({ key: to.path, label: to.meta.title, closable: to.path !== '/home' });
  }
  document.title = to.meta.title;
  NProgress.done();
});

router.onError((error) => {
  console.error("路由错误", error);
});

/**
 * 递归查询---查询所有父节点
 * @param val 查询值
 * @param list 数组列表
 * @param field 查询的字段
 * @param childrenNode 递归的子节点
 * @returns [所有父级的item]
 */
const getObjByName = (val, list, field, childrenNode = "children") => {
  for (let i in list) {
    let item = list[i];
    if (item[field] === val) {
      return true;
    } else {
      if (item[childrenNode]) {
        let obj = getObjByName(val, item[childrenNode], "key");
        if (obj) return true;
      }
    }
  }
  return false;
};
export default router;
