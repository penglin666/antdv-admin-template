<template>
  <a-layout-content>
    <a-tabs v-model:activeKey="pageTab.activeKey" type="editable-card" @tabScroll="callback" size="small"
      @edit="changePageTabs($event, 'closeSingleTab')" hideAdd @change="tabChange">
      <a-tab-pane v-for="item in pageTab.list" :key="item.path" :tab="item.label" :closable="item.path !== '/home'">
        <router-view></router-view>
      </a-tab-pane>
      <template #rightExtra>
        <a-dropdown>
          <DownOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="reloadCurrentPage">
                <ReloadOutlined />刷新当前
              </a-menu-item>
              <a-menu-item key="1" @click="changePageTabs(pageTab.activeKey, 'closeSingleTab')">
                <CloseOutlined />关闭当前
              </a-menu-item>
              <a-menu-item key="2" @click="changePageTabs(pageTab.activeKey, 'closeLeftTabs')">
                <ArrowLeftOutlined />关闭左侧
              </a-menu-item>
              <a-menu-item key="3" @click="changePageTabs(pageTab.activeKey, 'closeRightTabs')">
                <ArrowRightOutlined />关闭右侧
              </a-menu-item>
              <a-menu-item key="4" @click="changePageTabs(pageTab.activeKey, 'closeOtherTabs')">
                <MinusCircleOutlined />关闭其它
              </a-menu-item>
              <a-menu-item key="5" @click="changePageTabs(pageTab.activeKey, 'closeAllTabs')">
                <CloseCircleOutlined />关闭全部
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </a-layout-content>
</template>
<script setup>
import { useSettingStore } from "@/stores/modules/setting";
import {
  DownOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons-vue";
const settingStore = useSettingStore();
const pageTab = computed(() => settingStore.pageTab);
const router = useRouter();
const callback = (val) => {
  console.log(val);
};
const tabChange = (path) => {
  router.push(path);
};
const changePageTabs = (key, type) => {
  //窗口标签列表改变
  settingStore.changePageTabs(key, type, router);
};
const reloadCurrentPage = () => {
  //刷新当前tab页
  window.location.reload();
};
</script>
<style scoped lang="scss">
::v-deep(.ant-tabs) {
  height: 100% !important;

  .ant-tabs-nav {
    margin-bottom: 0;

    .ant-tabs-tab {
      background-color: #fff;

      &.ant-tabs-tab-active {
        background-color: #f5f5f5;
        border-bottom: 0;
        border-bottom-color: transparent;
      }

      .ant-tabs-tab-remove {
        line-height: normal;
        width: 16px;
        height: 16px;
        border-radius: 50%;

        &:hover {
          background-color: #ff4d4f;
          color: #fff;
        }
      }
    }
  }

  .ant-tabs-content-holder {
    padding: 12px;
  }

  .ant-tabs-content {
    height: 100%;
    overflow: auto;
  }

  .ant-tabs-extra-content {
    margin-right: 12px;
  }
}
</style>
