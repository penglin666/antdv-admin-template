export const useSettingStore = defineStore(
  "setting",
  () => {
    const pageTab = reactive({
      activeKey: "",
      list: []
    });
    const generatePageTabs = (data) => {
      const pageTabIndex = pageTab.list.findIndex((item) => item.path === data.path);
      if (pageTabIndex < 0) {
        pageTab.list.push(data);
      } else {
        pageTab.list.splice(pageTabIndex, 1, data);
      }
      pageTab.activeKey = data.path;
    };
    const changePageTabs = (key, type, router) => {
      const currentIndex = pageTab.list.findIndex((item) => item.path === key);
      switch (type) {
        case "closeSingleTab": //关闭指定单个窗口
          if (key !== "/home") {
            pageTab.list.splice(currentIndex, 1);
            if (key === pageTab.activeKey) {
              router.push(pageTab.list[currentIndex - 1].path);
            }
          }
          break;
        case "closeLeftTabs": //关闭当前页左边所有窗口
          pageTab.list.splice(1, currentIndex - 1);
          break;
        case "closeRightTabs": //关闭当前页右边所有窗口
          pageTab.list.splice(currentIndex + 1);
          break;
        case "closeOtherTabs": //关闭其它所有窗口
          if (key === "/home") {
            pageTab.list = [pageTab.list[0]];
          } else {
            pageTab.list = [pageTab.list[0], pageTab.list[currentIndex]];
          }
          break;
        case "closeAllTabs": //关闭所有窗口
          pageTab.list = [pageTab.list[0]];
          router.push(pageTab.list[0].path);
          break;
      }
    };
    return {
      pageTab,
      generatePageTabs,
      changePageTabs
    };
  },
  { persist: true }
);
