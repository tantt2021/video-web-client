<template>
    <div class="video-item">
        <a href="http://localhost:3000/detail">
            <img src="../assets/img/侧耳.jpg" alt="">
            <div class="mask"></div>
            <div class="data">
                <div class="data-item">
                    <img src="../assets/svg/bfl.svg" alt="">
                    <span> 112</span>
                </div>
                <div class="data-item">
                    <img src="../assets/svg/dm.svg" alt="">
                    <span>888</span>
                </div>
            </div>
            
        </a>
        <div class="video-info">
            <a  href="http://169.254.227.78:3000/history">title</a>
            <p>
                <a href="http://169.254.227.78:3000/history">头大</a>
                ·<span> 2022-1-2</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.video-item{
    margin:.5rem 1.5rem;
    a{
        display: inline-block;
        position: relative;
        .mask{
            position: absolute;
            bottom: 0;
            left: 0;
            top: 80%;
            right: 0;
            background: linear-gradient(to bottom,transparent,#686868);
            border-bottom-left-radius: .5rem;
            border-bottom-right-radius: .5rem;
        }
        .data{
            // float: left;
            position: absolute;
            top: 3.3rem;
            display: flex;
            .data-item{
                padding: 0 .5rem;
            }
            img{
                width: 1rem;
            }
            span{
                font-weight: 400;
                font-size: .8rem;
                color: #fff;
            }
        }
    }
    img{
        width: 15rem;
        height: 8rem;
        border-radius: .5rem;
    }
    .video-info{
        a{
            font-weight: 400;
            font-size: 1rem;
            &:hover{
                color: #44bc87;
            }
        }
        p{
            color: #c6c7c8;
        }
        span{
            font-weight: 400;
            font-size: 1rem;

        }
    }
}
</style>