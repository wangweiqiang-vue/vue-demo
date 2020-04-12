<template>
    <div class="footer">
        <router-link to="./home">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </router-link>
        <router-link to="./list">
            <i class="iconfont icon-mobilefill"></i>
            <span>列表</span>
        </router-link>
        <router-link to="/app/collect">
            <i class="iconfont icon-choicenessfill"></i>
            <span>收藏</span>
        </router-link>
        <router-link to="./add">
            <i class="iconfont icon-cartfill"></i>
            <span>添加</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'tab'
    }
</script>

<style scoped>
  .footer{
       position: fixed;
       left: 0;
       bottom: 15px;
       width: 95%;
       height: 65px;
       display: flex;
       background-color:#EFF2F7;
       left: 5%;
       /* border: 1px solid red */
    }
    a{
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        text-decoration: none;
    }
    a.router-link-active{
        color:red;
    }
</style>
