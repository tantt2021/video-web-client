<template>
    <button @click="toggle"><SmileOutlined :class="{active}"/></button>
    <Picker
      v-if="emojiPickerSelected"
      :data="emojiIndex"
      title="Pick your emoji…"
      emoji="point_up"
      @select="convertEmoji"
    />
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
  import data from 'emoji-mart-vue-fast/data/all.json'
  import {SmileOutlined} from "@ant-design/icons-vue";
  
  export default {
    name: 'EmojiPicker',
    components: {
      Picker,
    },
    emits: ['updateEmoji'],
    setup(props, context) {
      const emojiPickerSelected = ref(false)
      let emojiIndex = new EmojiIndex(data)
  
      let active = ref(false);
      const toggle = () => {
        emojiPickerSelected.value = !emojiPickerSelected.value;
        active.value = !active.value;
      }
  
      const convertEmoji = (emoji) => {
        context.emit('updateEmoji', emoji.native)
      }
  
      return {
        emojiPickerSelected,
        emojiIndex,
        toggle,
        convertEmoji,
        active,
      }
    },
  }
  </script>

<style>
  button{
    margin-left: .5rem;
  }
  .active{
    color: #44bc87;
  }
</style>