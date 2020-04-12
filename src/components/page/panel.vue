<template>
  <div class="hello">
    <panel :type="article.type" @sya-title="reciverTitle" v-for="(article,index) in articles" :key="index">
        <div slot="title"><span v-html="article.title"></span></div>
        <div slot="content">{{article.content}}</div>
        <div v-if="article.auth">{{article.auth}}</div>
    </panel>
<!-- 组件的循环/通过slot将要插入子组件的标签传过去，子组件通过slot接收即可 -->
  </div>
</template>

<script>
import axios from 'axios'
import panel from './panelComp'
import Axios from 'axios';
export default {
  name: 'pos',
  data(){
    return{
        articles:[
            {type:'warning',title:'<h2>Vue</h2>',content:'这是vue的文章',auth:'作者：xxx'},
            {type:'primary',title:'<h2>react</h2>',content:'这是primary的文章',auth:'作者：xxx'},
            {type:'danger',title:'<h2>angular</h2>',content:'这是danger的文章'},
         ]
    }
  },
  components:{
     panel
  },
  mounted:function(){
    
  },
  created:function(){
 
  },
  methods:{
      reciverTitle(val){
       alert(val);
      }
  }
}  
</script>

<style scoped>


  
</style>
