<template>
  <div class="root">
    <!-- <NuxtWelcome /> -->
    <Header></Header>
    <!-- <nuxt-page></nuxt-page> -->

    <Layout v-if="$route.path !== '/platform' && $route.path !== '/studio'" />
    <platform v-else-if="$route.path !== '/studio'" />
    <studio v-else />
  </div>
</template>
<script lang="ts"></script>

<style lang="scss" scoped>
.root {
  // max-width: 2560px;
  // min-width: 580px;
  margin: 0 auto;
}
</style>
