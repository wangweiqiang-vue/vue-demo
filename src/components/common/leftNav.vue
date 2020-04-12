<template>
    <div class="left_nav">
        <ul>
            <li @click="getNext('sy')">
               <i class="icon iconfont icon-recharge"></i> 
               <div>收银</div>  
            </li>
            <li @click="getNext('dp')">
               <i class="icon iconfont icon-homefill"></i> 
               <div>店铺</div>  
            </li>
            <li @click="getNext('sp')">
               <i class="icon iconfont icon-cartfill"></i> 
               <div>商品</div>  
            </li>
            <li @click="getNext('hy')">
               <i class="icon iconfont icon-sponsorfill"></i> 
               <div>会员</div>  
            </li>
            <li>
               <i class="icon iconfont icon-suan"></i> 
               <div>统计</div>  
            </li>
            <li @click="getNext('sz')">
               <i class="icon iconfont icon-settings"></i> 
               <div>设置（返回主页）</div>  
            </li>
        </ul>
    </div>
   
</template>

<script>
    export default{
        name:'leftNav',
        methods:{
          getRight(type){
                // alert(type);
                router.push({ path: 'HelloWorld' });
            },
            getNext(type){
                 if(type == "sy"){
                     this.$router.push('/handler');
                 }else if(type == "dp"){
                     this.$router.push('/panel');
                 }else  if(type == "sp"){
                     this.$router.push('/HelloWorld');
                 }else  if(type == "sz"){
                     this.$router.replace('/');
                 }else  if(type == "hy"){
                     this.$router.replace('/app');
                 }
            }
        }
    }
</script>
<style>
    .left_nav{
        color: #fff;
        font-size: 10px;
        height: 100%;
        background-color: #343d41;
        opacity: 0.5;
        /*float: left;*/
        width: 5%;
    }
    .iconfont{
        font-size: 30px;
    }
   .left_nav ul{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 0px;
        margin: 0px;


    }
    .left_nav li{
        text-align: center;
        list-style: none;
        border-bottom: 1px solid #20a0ff;
        padding: 10px 0px;
        width: 100%;
    }
</style>