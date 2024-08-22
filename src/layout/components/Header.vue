<script setup>
import avatar from "@/assets/avatar.jpg";
import { useUserStore } from "@/stores/modules/user";
import { CompressOutlined, ExpandOutlined } from "@ant-design/icons-vue";
import useFullScreen from "@/hooks/useFullScreen";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import axios from "axios";
let interval = null; //定时器
const router = useRouter();
const store = useUserStore();
const { isFull, requestFullScreen, exitFullScreen } = useFullScreen();
const dateTime = ref("");
const weather = ref("");
const handleLoginOut = () => {
  store.logout();
  clearInterval(interval);
  router.replace("/login");
};

const getDateTime = () => {
  dateTime.value = dayjs().locale("zh-cn").format("YYYY年MM月DD日 HH:mm:ss dddd");
};

const getWeather = () => {
  const key = "c5f90857a5d4772caeff4af84a629754";
  axios({
    url: "https://restapi.amap.com/v3/ip",
    method: "get",
    params: { key }
  }).then((res) => {
    const { adcode } = res.data;
    axios({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      method: "get",
      params: { key, city: adcode }
    }).then((res) => {
      weather.value = res.data.lives[0].weather;
    });
  });
};
onMounted(() => {
  interval = setInterval(() => {
    getDateTime();
  }, 1000);
  getWeather();
});
onUnmounted(() => {
  clearInterval(interval);
});
watch(
  () => isFull,
  (val) => {
    console.log(val, "pl");
  }
);
</script>

<template>
  <a-layout-header class="header">
    <div class="header-left">
      <slot name="headerLeft"></slot>
    </div>
    <div class="header-right">
      <div class="date-time header-right-item" v-if="isFull">{{ dateTime }}</div>
      <div class="weather header-right-item">天气：{{ weather }}</div>
      <div class="full-screen header-right-item">
        <CompressOutlined v-if="isFull" @click="exitFullScreen" />
        <ExpandOutlined v-else @click="requestFullScreen" />
      </div>
      <div class="header-right-item">{{ store.userInfo.nickName }}</div>
      <a-dropdown>
        <span class="header-right-item">
          <a-avatar :src="avatar"></a-avatar>
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/setting">编辑资料</router-link>
            </a-menu-item>
            <a-menu-item @click="handleLoginOut"> 退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  color: #fff;
  .header-left {
    display: flex;
  }
  .header-right {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-right-item {
      margin-left: 12px;
    }
  }
}
</style>
