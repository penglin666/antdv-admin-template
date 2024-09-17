<script setup>
import Tag from "./components/Tag.vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SiderBar.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
const collapsed = ref(false);
</script>

<template>
  <a-layout>
    <SideBar :collapsed="collapsed"></SideBar>
    <a-layout>
      <Header>
        <template #headerLeft>
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </template>
      </Header>
      <Tag />
      <a-layout-content>
        <RouterView />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2024 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.ant-layout {
  width: 100%;
  height: 100%;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-layout-content {
    padding: 24px;
  }
}
</style>
