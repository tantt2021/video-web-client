<template>
    <div>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <notification-item/>
        <p>没有更多了......</p>

    </div>
</template>

<script lang="ts" setup>
// export default{
//     name:'SystemNotification',
// }
import NotificationItem from "./item/NotificationItem.vue";

</script>

<style lang="scss" scoped>
    p{
        text-align: center;
        padding: 1rem;
        color: #777;
        font-size: .8rem;
    }
</style>