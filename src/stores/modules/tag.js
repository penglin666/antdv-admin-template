export const useTagStore = defineStore(
  "tag",
  () => {
    const tag = reactive({
      activeKey: "",
      items: [],
    });
    const add = (data) => {
      const isExist = tag.items.some((item) => item.key === data.key);
      if (!isExist) {
        tag.items.push(data);
      }
      tag.activeKey = data.key;
    };
    const edit = (key, type, router) => {
      const index = tag.items.findIndex((item) => item.key === key);
      switch (type) {
        case "closeCurrent":
          if (key !== "/home") {
            if (tag.items[index + 1]) {
              tag.activeKey = tag.items[index + 1].key;
            } else {
              tag.activeKey = tag.items[index - 1].key;
            }
            tag.items.splice(index, 1);
          }
          break;
        case "closeLeft":
          tag.items.splice(1, index - 1);
          break;
        case "closeRight": //关闭当前页右边所有窗口
          tag.items.splice(index + 1);
          break;
        case "closeOther": //关闭其它所有窗口
          if (key === "/home") {
            tag.items = [tag.items[0]];
          } else {
            tag.items = [tag.items[0], tag.items[index]];
          }
          break;
        case "closeAll": //关闭所有窗口
          tag.items = [tag.items[0]];
          break;
      }
      if (type === "closeAll") {
        router.push(tag.items[0].key);
      } else {
        router.push(tag.activeKey);
      }
    };
    return {
      tag,
      add,
      edit,
    };
  },
  { persist: true }
);
