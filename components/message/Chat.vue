<template>
    <div class="chat">
        <nav>
            <li v-for="(item,idx) in arr" :key="idx" @click="active=idx" :class="{'selected':active===idx}">
                <close-outlined @click="del(idx)"/>
                {{ item.name }}

            </li>
        </nav>
        <main>
            <ChatWindow :messageList="messArr"/>
        </main>
    </div>
</template>

<script lang="ts" setup>
import ChatWindow from "@/components/ChatWindow.vue";
import {ref,computed,onUpdated} from "vue";
import {
   CloseOutlined,
    
  } from '@ant-design/icons-vue';


let arr = ref([
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
                type: 1,
                data: "3"
            }
        ]
    },
    {
        name: 'B',
        messageList: [
            {
                type: 1,
                data: "2"
            }
        ]
    }
]);
let active = ref(0);
const del = (idx:number) => {
    arr.value.splice(idx, 1);
}

let messArr = computed(() => { 
    if(arr.value[active.value])
        return arr.value[active.value].messageList;
    else
        return [];
    
});

onUpdated(() => {
    console.log(arr.value,active.value);
    
})

</script>

<style lang="scss" scoped>
.chat{
    display:flex;
    height: 100%;
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