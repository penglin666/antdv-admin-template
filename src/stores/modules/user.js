import { loginApi, getMenusApi } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    const menus = ref([]); //用户菜单
    const userInfo = ref({});

    /** 登录 */
    const login = (params) => {
      return new Promise((resolve, reject) => {
        loginApi(params)
          .then(async (res) => {
            resolve(res.data);
            userInfo.value = res.data.data;
            await fetchPermsAndMenus(res.data.data.role);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };
    /** 获取权限及菜单 */
    const fetchPermsAndMenus = async (role) => {
      return new Promise((resolve, reject) => {
        getMenusApi({ role })
          .then((res) => {
            resolve(res.data);
            menus.value = res.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    };
    /** 登出 */
    const clearProfile = () => {
      userInfo.value = {};
      // sessionStorage.clear();
      // localStorage.clear();
    };
    return {
      menus,
      login,
      userInfo,
      fetchPermsAndMenus,
      clearProfile
    };
  },
  { persist: true }
);
