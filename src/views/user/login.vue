<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item label="用户名：" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
      <a-input v-model:value="formState.username" placeholder="root/admin/user" />
    </a-form-item>

    <a-form-item label="密码：" name="password" :rules="[{ required: true, message: '请输入密码' }]">
      <a-input-password v-model:value="formState.password" placeholder="123456" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { useUserStore } from "@/stores/modules/user"
import { message } from "ant-design-vue";
const userStore = useUserStore();
const router = useRouter();

const formState = reactive({
  username: "",
  password: "",
  remember: true
});
const onFinish = (values) => {
  userStore.login(values).then((res) => {
    message.success("登录成功");
    router.push("/home");
  });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
