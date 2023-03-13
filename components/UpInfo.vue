<template>
    <div>
        <div class="up-info">
            <img src="../assets/img/yatou.png" alt="">
            <div class="up-mess">
                <h4>tantt</h4>
                <p>42min前·投稿了文章</p>
            </div>

            <a-dropdown placement="bottom">
                <a class="ant-dropdown-link dropdown" @click.prevent.stop :style="{ height: '50%' }">
                    <ellipsis-outlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a href="javascript:;">取消关注</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">举报</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">拉黑</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined } from "@ant-design/icons-vue";

</script>

<style lang="scss" scoped>
    .up-info {
        display: flex;

        img {
            width: 3rem;
            height: 3rem;
        }

        .up-mess {
            margin-left: 1rem;
            flex-grow: 1;

            h4 {
                margin: 0;
            }

            p {
                font-weight: 400;
                font-size: .8rem;
                color: #7e7c7c;
            }
        }

        .dropdown {
            height: 50%;

        }

    }
</style>