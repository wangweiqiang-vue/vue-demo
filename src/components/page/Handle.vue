<template>
    <div>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              firstPage
            </a>
          </div>
        </div>
      </nav>
      <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-warning">
                  <div class="panel-heading">
                    <h3 class="text-danger text-left">亲~^_^您有{{count}}件事情要处理</h3>
                    <input type="text" class="form-control" v-model="title" @keyup.13="add" placeholder="请输入要添加的事项">
                  </div>
                  <div class="panel-body">
                      <ul class="list-group">
                        <li class="list-group-item text-left" style="width:100%" v-for="(todu,index) in filerTodus" :key="index" @dblclick="rember(todu)">
                         <span :class="{del:todu.isSelected}" v-show="current != todu">
                            <input type="checkbox" v-model="todu.isSelected">{{todu.title}}
                         </span>  
                            <input type="text" v-model="todu.title" v-show="current == todu" @blur="cancel" @keyup.enter="cancel" v-focus="current == todu">
                            <button class="pull-right btn-danger btn-xs" @click="remove(todu)">&bigotimes;</button>
                        </li>
                      </ul>
                  </div>
                  <div class="panel-footer">
                    <ul class="nav nav-pills">
                      <li role="presentation" :class="{active:hash === 'all'}"><a href="#/#/all">全部</a></li>
                      <li role="presentation" :class="{active:hash === 'finsh'}"><a href="#/#/finsh">已完成</a></li>
                      <li role="presentation" :class="{active:hash === 'unfinsh'}"><a href="#/#/unfinsh">未完成</a></li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Axios from 'axios';
export default {
  name: 'handle',
  data () {
    return {
     title:'',
     current:'',
     hash:'',
     todos:[
       {
         isSelected:false,
         title:'开会'
       },  {
         isSelected:false,
         title:'休息'
       },  {
         isSelected:false,
         title:'逛街'
       }
     ]
    }
  },
  
  computed:{
     count(){
       return this.todos.filter(o => !o.isSelected).length;
     },
     filerTodus(){
       if(this.hash == 'all'){
         return this.todos;
       }
       if(this.hash == 'finsh'){
         return this.todos.filter(o=>o.isSelected);
       }
        if(this.hash == 'unfinsh'){
         return this.todos.filter(o=>!o.isSelected);
       }
       return this.todos;
     }
  },
  filters:{
     toFixed(input,par1){
       return '￥'+input.toFixed(par1);
     }
  },
  methods:{
    remove(p){
      //  this.products = this.products.filter(o => o.productName != p.productName);
      this.todos = this.todos.filter(o => o != p);
    },
    rember(to){
        this.current = to;
    },
    add(){
        this.todos.push({
          isSelected:false,
          title:this.title
        });
        this.title="";
    },
    cancel(){
      this.current = '';
    },
 },
 directives:{
      focus(el,binging){
          if(binging.value){
            el.focus();
          }
      }                   
   
 },
 watch:{
   todos:{
     handler(){
        localStorage.setItem("data",JSON.stringify(this.todos));
     },deep:true
   }
 },
 created(){
   this.todos = JSON.parse(localStorage.getItem("data"))||this.todos;
   //监控hash值的变化，如果页面以及有hash了 重新刷新页面再次获取hash值 
   this.hash = window.location.hash.slice(4) || 'all';
   window.addEventListener('hashchange',()=>{
     //当hash值发生变化 从新操作记录的数据
      this.hash = window.location.hash.slice(4);
   },false);
 }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.imgDiv{
  width: 20%;
  float: left;
  text-align: right;
}
.nameDiv{
  width: 60%;
  float: left;
  text-align: left;
}
.del{
  text-decoration: line-through;
  color:#cccccc!important;
}
</style>
