<template>
  <!-- <div> -->
    <!-- <h1>{{ currentIdx }}</h1>
    <button @click="cancel">撤销</button>
    <button @click="redo">取消撤销</button>
    <ul>
      <li v-for="(item,idx) in arr">{{ item }}</li>
    </ul>
    <button @click="addEle">add</button>
  </div>

  <div style="float:right">
    <ul>
      <li v-for="(item,idx) in history" :key="idx">{{ item }}</li>
    </ul>
  </div>
  <button @click="play" @click.once="submit">button</button> -->
</template>

<script setup lang="ts">

const play = () => {
  console.log("play");
}
const submit = () => {
  console.log("submit");
}

let currentIdx = ref(-1);
let arr = ref([1,2,3]);
let history = ref([arr.value]);
let max = 100;

const cancel = () => {
  if(currentIdx.value === -1){
    return;
  }
  currentIdx.value--;
  history.value[currentIdx.value+2] = history.value[currentIdx.value];
  arr.value = history.value[currentIdx.value+2];
}
const redo = () => {
  // 最新纪录时return
  currentIdx.value++;
}
const addEle = () => {
  arr.value.push(1);
}
watch(()=>arr.value,()=>{
  currentIdx.value+=1;
  history.value[currentIdx.value] = [...arr.value];
},{
  deep:true
})

</script>

<style lang="scss" scoped>
.send-msg-btn{
  position:absolute;
  bottom: 20px;
  right: 20px;
}
button{
  padding: .3rem 1rem;
  border: 1px solid #000;

}
button + button {
  margin-left: 1rem;

}
</style>