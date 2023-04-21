<template>
    <div class="chat">
        <nav>
            <li v-for="(item,idx) in conversation" :key="idx" @click="active=idx" :class="{'selected':active===idx}">
                <close-outlined @click="del(idx)"/>
                <nuxt-link :to="`/user/${item.userID}`">{{ item.uname }}</nuxt-link>

            </li>
        </nav>
        <main>
            <!-- {{ conversation[active] }} -->
            <ChatWindow :messageList="conversation[active]?.messages" @send-message="webSocketSend"/>
        </main>
    </div>
</template>

<script lang="ts">
export default{
    name:"message-chat"
}
</script>

<script lang="ts" setup>
import ChatWindow from "@/components/ChatWindow.vue";
import {ref,computed,onUpdated} from "vue";
import {getChat} from "@/api/message";
import useStore from "~~/store";
import type {chatMessageType, MessageType} from "@/types/message";
import io from "socket.io-client";
import {
   CloseOutlined,
    
  } from '@ant-design/icons-vue';
const {user,global} = useStore();
const client = io("http://127.0.0.1:9892").connect();
onBeforeUnmount(()=>{
    client.disconnect();
});
client.emit("addUser",user.id);
console.log(client);
client.on("privateMessage",message => {
    console.log("私聊消息",message);
    // 添加消息到对应conversation[x].messages
    // conversation.value[message.key].messages.push(message);
    conversation.forEach(item=>{
        if(item.key===message.key){
            delete message.key;
            item.messages.push(message);
        }
    })
    // 这样不好在没删除key
})

let myId = client.id;

let messages = reactive<object[]>([]);
let conversation = reactive<chatMessageType[]>([]);
getChat({userId:user.id}).then(
    res => {
        Object.assign(conversation, res);
        console.log(conversation,"conversation");

        let isExist = false;
        let conversationKey:string;
        if(global.chatId){
            // 判断是否有这个聊天记录
            conversationKey = 
                global.chatId < user.id 
                ? `${global.chatId}-${user.id}`
                :`${user.id}-${global.chatId}`;
            conversation.forEach((item,idx)=>{
                console.log(item.key,"item");

                if(item.key===conversationKey){
                    // 存在，选中对应聊天框
                    console.log(true);
                    active.value = idx;
                    isExist = true;
                }
            })
        // 不存在，新建聊天窗口
        if(!isExist){
            conversation.push({
                key: conversationKey,
                messages:[],
                participants:[global.chatId,user.id],
                uname: global.chatUname,
                userID:global.chatId,
            });
            // 选中
            active.value = conversation.length - 1;
        }
    }
    }
)

const webSocketSend = (e:MessageType) => {
    console.log("1111",e);
    e.sender_id = user.id;
    e.receiver_id = conversation[active.value].userID;
    e.type = "chat";
    client.emit("mess",{
        from:user.id,
        to:conversation[active.value].userID,
        text:e
    });
    // 添加到自己的列表
    conversation[active.value].messages.push(e);
};

let userList = ref([
    {
        name: 'A',
        messageList: [
            {
                type: 1,
                data: "1"
            }
        ]
    },
    {
        name: 'C',
        messageList: [
            {
                type: 0,
                data: "3"
            }
        ]
    }
]);
let active = ref(0);
const del = (idx:number) => {
    userList.value.splice(idx, 1);
}

let messuserList = computed(() => { 
    if(userList.value[active.value])
        return userList.value[active.value].messageList;
    else
        return [];
    
});

onMounted(() => {
    

    
})

</script>

<style lang="scss" scoped>
.chat{
    display:flex;
    height: calc(100% - 46px);
    flex: 1;
    nav{
        height: 100%;
        width: 15rem;
        border-right: 1px solid #ddd;
        overflow: auto;
        li{

            line-height: 3rem;
            padding-left: 1rem;
            transition: all .2s;
            &:hover{
                background-color: rgb(207, 255, 222);
            }
            span{
                transition:all .5s;
                transform:translateX(-5rem);
                vertical-align: middle;
                color: #4460bc;
            }
            &:hover span{
                transform:translateX(-.2rem);
            }
        }
        .selected{
            background-color: #44bc87;
        }
    }  
    main{
        flex:1;
    }
}
  
</style>