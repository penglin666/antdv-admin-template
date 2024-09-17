<script setup>
const router = useRouter();
</script>

<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button @click="router.go(-1)">返回上一页</a-button>
      <a-button type="primary" @click="router.replace('/home')">返回首页</a-button>
    </template>
  </a-result>
</template>

<style scoped lang="scss"></style>
