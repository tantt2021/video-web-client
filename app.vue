<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <Header></Header>
    <!-- <nuxt-page></nuxt-page> -->

    <Layout v-if="$route.path!=='/platform'&&$route.path!=='/studio'" />
    <platform v-else-if="$route.path!=='/studio'" />
    <studio v-else/>
  </div>
</template>
<script lang="ts">
</script>
