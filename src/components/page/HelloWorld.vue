<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <caption>购物车</caption>
        <tbody>
        <tr>
          <th>全选 <input type="checkbox" v-model="checkAll"/></th>
          <td>商品</td>
          <td>单价</td>
          <td>数量</td>
          <td>小计</td>
          <td>操作</td>
        </tr>
        <tr v-for="(product,index) in products" :key="index">
          <td>
            <input type="checkbox" v-model="product.isSelected">
          </td>
          <td>
            <div class="imgDiv"><img :src="product.productCover" :title="product.productsName"></div>
            <div class="nameDiv">{{product.productName}}</div>
          </td>
          <td>{{product.productPrice}}</td>
          <td><input type="number" v-model.number="product.productCount" min="1"></td>
          <td>{{product.productCount * product.productPrice | toFixed(2)}}</td>
          <td><input type="button" value="删除" class="btn btn-danger" @click="remove(product)"></td>
        </tr>
       <tr><td colspan="6">总额：{{sum  | toFixed(2)}}</td></tr>
        </tbody>
      </table>
    </div> 
  
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
                    <h3 class="text-danger text-left">亲~^_^您有 件事情要处理</h3>
                    <input type="text" class="form-control" id="">
                  </div>
                  <div class="panel-body">
                      <ul class="list-group">
                        <li class="list-group-item text-left" style="width:100%" v-for="(todu,index) in todos" :key="index">
                          <input type="checkbox" v-model="todu.isSelected">{{todu.title}}
                          <button class="pull-right btn-danger btn-xs">&bigotimes;</button>
                        </li>
                      </ul>
                  </div>
                  <div class="panel-footer">
                    <ul class="nav nav-pills">
                      <li role="presentation"><a href="#">全部</a></li>
                      <li role="presentation"><a href="#">已完成</a></li>
                      <li role="presentation"><a href="#">未完成</a></li>
                    </ul>
                  </div>
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
  name: 'HelloWorld',
  data () {
    return {
     products:[],
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
  created(){
    this.getData();
  },
  computed:{
     checkAll:{
       get(){
        return this.products.every(o=>o.isSelected);
       },
       set(val){
        return this.products.forEach(o=>o.isSelected = val);
       }
     },
     sum(){
       return this.products.reduce((pre,next)=>{
         if(!next.isSelected) return pre;
          return pre + next.productCount * next.productPrice;
       },0)
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
      this.products = this.products.filter(o => o != p);
    },
    getData(){ 
       Axios.get('http://localhost:8080/static/carts.json')
         .then(response=>{
            this.products = response.data;
            console.log("===============================");
         })
         .catch(error=>{
           console.log(error);
           alert("网络请求超时");
         })
    }
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
</style>
