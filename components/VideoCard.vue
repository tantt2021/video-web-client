<template>
    <div class="video-card" @click="navigateTo(`/detail/${content.id}`)">
        <div class="video-card-cover">
            <img :src="content.cover" alt="" :width="16*width">
        </div>
        <div class="video-card-info">
            <h2>{{ content.title }}</h2>
            <div>
                <p class="uname" @click.stop="navigateTo(`/user/${content.authorId}`)">{{ content.author }}</p>
                <p class="data">
                    <img src="../assets/svg/bfl.svg" alt=""><em>{{ content.views }}</em>
                    <img src="../assets/svg/dm.svg" alt=""><em>{{ content.likeCount }}</em>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Video } from '~/types';
let props = defineProps({
    width:{
        type:Number,
        default:15
    },
    content:{
        type:Object,
    }
})
</script>

<style lang="scss" scoped>
.video-card{
    display:flex;
    padding-right: 3rem;
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: 30rem;
    height: 11rem;
    &:hover h2{
    transition:all .5s;
        color: #44bc87;
    }
    .video-card-cover{
        img{
            // width:15rem;
            width: 100%;
            height: 100%;
        }
    }
    .video-card-info{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        margin-left: .5rem;
        p{
            margin-bottom: 0;
            color: #898888;
            font-weight: 400;
        }
        .uname{
            display: inline-block;
            &:hover{
                color: #44bc87;
            }
        }
        .data{
            white-space: nowrap;
            img{
                vertical-align: text-bottom;
                & ~ img{
                    margin-left:1rem;
                }
            }
            em{
                font-size: .8rem;

            }
        }
    }
}

</style>