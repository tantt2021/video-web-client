<template>
    <a-empty v-if="userList.length===0"/>
    <div class="user-list" v-for="(item,idx) in userList" :key="idx" v-else>
        <img :src="item.avatar" alt="">
        <div class="user-info">
            <nuxt-link :to="`/user/${item.id}`" v-if="item.id!==user.id">{{ item.uname }}</nuxt-link>
            <nuxt-link to="/user/self" v-else>{{ item.uname }}</nuxt-link>
            <p>{{item.description}}</p>
        </div>
        <div class="user-operate">
            <a-button 
                :style="{backgroundColor:isFollow?'#fff':'#44bc87'}"  
                @click="handleFollowing(item.id)"
                ref="followButton"
                v-if="type==='follow'"
            >
                {{ isFollow?'已关注':'关注' }}
            </a-button>
            <a-button 
                :style="{backgroundColor:isFans?'#fff':'#44bc87'}"  
                @click="handleFollowing(item.id)"
                ref="followButton"
                v-else
            >
                {{ isFans?'已关注':'关注' }}
            </a-button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import type {PublicUserType} from "@/types";
import {handleFollow} from "@/api/data";
import useStore from "~~/store";
const {user} = useStore();
const emit = defineEmits(["updateFollowing"]);
let props = defineProps({
    userList: {
        type: Array<PublicUserType>,
        default:[]
    },
    type:String
});
console.log(props.type1,"111111");

let isFollow = ref(true);
let isFans = ref(false);
let followButton = ref(null);
const handleFollowing = (id:string) => {
    // followButton.value[idx].
    console.log(id);
    // 取消关注
    // 删除userId为user.id的，followId为id的follow表数据
    handleFollow({userId:user.id,followId:id});
    // emit自定义事件，删除userList
    emit("updateFollowing",id);
    
    // isFollow.value = !isFollow.value;
}
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
        a{
            font-size: 1.2rem;
            &:hover{
                color: #44bc87;
            }
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