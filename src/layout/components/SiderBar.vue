<script setup>
import { useUserStore } from "@/stores/modules/user";
const props = defineProps({
  collapsed: Boolean
});
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const state = reactive({
  selectedKeys: [],
  openKeys: []
});

const items = computed(() => userStore.menus);
const menuClick = ({ keyPath }) => {
  const path = keyPath.join("");
  router.push(path);
};
// 跟随页面路由变化，切换菜单选中状态
watch(
  () => route.path,
  () => {
    const keys = route.path
      .split("/")
      .filter((item) => item && item.trim())
      .map((item) => "/" + item);
    state.selectedKeys = keys;
  },
  {
    immediate: true
  }
);
watch(
  () => props.collapsed,
  () => {
    if (!props.collapsed) {
      state.openKeys = state.selectedKeys.slice(0, state.selectedKeys.length - 1);
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible theme="dark">
    <div class="logo">logo</div>
    <a-menu v-model:selectedKeys="state.selectedKeys" v-model:openKeys="state.openKeys" :items="items" mode="inline"
      @click="menuClick" theme="dark" />
  </a-layout-sider>
</template>

<style scoped lang="scss"></style>
