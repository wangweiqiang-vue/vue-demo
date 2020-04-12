<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-cartfill" v-if="back" @click="goBack"></i>
    </div>
</template>
<script>
export default {
    props:{
        back:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
  .header{
       height: 40px;
       background-color: #afd9af;
       text-align: center;
       line-height: 40px;
       position: fixed;
       top: 0;
       left: 5%;
       width: 95%;
    }
    i{
        position:absolute;
        left:10px;
    }
    
</style>
