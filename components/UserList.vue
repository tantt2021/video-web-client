<template>
    <!-- <div v-for="(item,idx) in userList" :key="idx">
        
    </div> -->

    
    <div class="user-list" v-for="(item,idx) in userList" :key="idx">
        <img src="../assets/img/yatou.png" alt="">
        <div class="user-info">
            <strong>name</strong>
            <p>description</p>
        </div>
        <div class="user-operate">
            <a-button type="primary">关注</a-button>
        </div>
    </div>

</template>

<script lang="ts" setup>
let props = defineProps({
    userList: {
        type: Array,
        default:[]
    }
});
</script>

<style lang="scss" scoped>
.user-list{
    display:flex;
    padding: 1rem;
    img{
        width:3.5rem;
        height:3.5rem;
        border-radius:.8rem;
        margin-right: 1rem;
    }
    .user-info{
        flex: 1;
        strong{
            font-size: 1.2rem;

        }
        p{
            color:#777;
            font-size:.8rem;
        }
    }
    .user-operate{
        float:right;
        line-height:100%;

        button{
            line-height:100%;
        }
    }
}
</style>