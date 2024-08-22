<script setup>
const router = useRouter();
</script>

<template>
  <div>
    系统设置

    <a-button type="primary" @click="router.push('/setting/detail')"
      >跳转详情页并锁定当前菜单</a-button
    >
  </div>
</template>

<style scoped lang="scss"></style>
