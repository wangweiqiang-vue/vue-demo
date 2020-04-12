<template>
  <div class="hello">
    <el-row>
      <el-col :span="7" class="el-colClass" id="elcolid">
        
        <el-tabs  type="card" v-model="tableModel">
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" border style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="70"></el-table-column>
              <el-table-column prop="price" label="价格" width="70"></el-table-column>
              <el-table-column prop="operateion" label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="redenceGood(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="orderGood(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
                <small>数量：</small>{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small>{{totalMoney}} 
            </div>
            <div class="div_btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger" @click="delAll">删除</el-button>
                <el-button type="success" @click="overAll">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
          <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
        </el-tabs>

      </el-col>
      <el-col :span="17">
        <div class="often-goods">
           <div class="title">常用商品</div>
           <div class="often-goods-list">
             <ul>
               <li v-for='item in oftenGoods' :key="item.goodsId" @click="orderGood(item)">
                 <span>{{item.goodsName}}</span>
                 <span class="priceColor">￥{{item.price}}元</span>
               </li>
             </ul>
           </div>
        </div>
        <div class="goods-type">
            <el-tabs tab-position="top"  class="tabs_title">
              <el-tab-pane label="汉堡">
                <div>
                  <ul>
                    <li v-for="typegood in type0Goods" :key="typegood.goodsId" @click="orderGood(typegood)">
                      <span><img :src="typegood.goodsImg" alt=""/></span>
                      <div class="top-Botton">
                         <span>{{typegood.goodsName}}</span>
                         <span class="priceColor">￥{{typegood.price}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <div>
                  <ul>
                    <li v-for="typegood in type1Goods" :key="typegood.goodsId" @click="orderGood(typegood)">
                      <span><img :src="typegood.goodsImg" alt=""/></span>
                      <div class="top-Botton">
                         <span>{{typegood.goodsName}}</span>
                         <span class="priceColor">￥{{typegood.price}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                  <ul>
                    <li v-for="typegood in type2Goods" :key="typegood.goodsId" @click="orderGood(typegood)">
                      <span><img :src="typegood.goodsImg" alt=""/></span>
                      <div class="top-Botton">
                         <span>{{typegood.goodsName}}</span>
                         <span class="priceColor">￥{{typegood.price}}</span>
                      </div>
                    </li>
                  </ul>
                </div>    
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <div>
                  <ul>
                    <li v-for="typegood in type3Goods" :key="typegood.goodsId" @click="orderGood(typegood)">
                      <span><img :src="typegood.goodsImg" alt=""/></span>
                      <div class="top-Botton">
                         <span>{{typegood.goodsName}}</span>
                         <span class="priceColor">￥{{typegood.price}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Axios from 'axios';
export default {
  name: 'pos',
  data(){
    return{
    tableModel:'first',
    tableData:[],
    oftenGoods:[],
    type0Goods:[],
    type1Goods:[],
    type2Goods:[],
    type3Goods:[]
    // totalCount : 0,
    // totalMoney : 0
    }
  },
  mounted:function(){
     var leftColWidth = document.body.clientHeight;
     document.getElementById("elcolid").style.height = leftColWidth + "px";
  },
  created:function(){
    Axios.post('http://jspang.com/DemoApi/oftenGoods.php')
         .then(response=>{
            this.oftenGoods = response.data;
            console.log(response);
         })
         .catch(error=>{
           console.log(error);
           alert("网络请求超时");
         })

     Axios.post('http://jspang.com/DemoApi/typeGoods.php')
         .then(response=>{
            this.type0Goods=response.data[0];
            this.type1Goods=response.data[1];
            this.type2Goods=response.data[2];
            this.type3Goods=response.data[3];
            console.log(response);
         })
         .catch(error=>{
           console.log(error);
           alert("网络请求超时");
         })
  },
  methods:{
    orderGood(good){
      // this.totalCount = 0;
      // this.totalMoney = 0;
      //判断商品是否已经存在订单列表中
      let isHave = false;
      let findGoodSId = 0;
      for(let i=0;i<this.tableData.length;i++){
        console.log(this.tableData[i].goodsId);
        if(this.tableData[i].goodsId == good.goodsId){
          isHave = true;
          findGoodSId = i;
        }
      }
      
      //业务逻辑
      if(isHave){
        
        let arr = this.tableData.filter(o => o.goodsId == good.goodsId);
        arr[0].count++;
        //  this.tableData[findGoodSId].count++;
      }else{
        let newGoods = {
          goodsId:good.goodsId,
          goodsName:good.goodsName,
          price:good.price,
          count:1
        };
        this.tableData.push(newGoods);
      }
      
      this.tableData.forEach((el)=>{
        // this.totalCount+= el.count;
        // this.totalMoney += el.count * el.price;
      })

    },
   redenceGood(good){
      //  for(let i=0;i<this.tableData.length;i++){
      //   if(this.tableData[i].goodsId == good.goodsId){
      //     // redenceGoodId = i;
          if(good.count>1){
             let yarr = this.tableData.filter(y => y.goodsId == good.goodsId);
             yarr[0].count--;
            //  this.totalCount--;
            //  this.totalMoney -= good.price;
          }else{
            // this.totalCount--;
            // this.totalMoney -= good.price;
            // this.tableData.splice(i, 1);
            this.tableData = this.tableData.filter(y => y.goodsId != good.goodsId);
          }
      //   }
      // }
      // this.tableData = this.tableData.filter(y => y.goodsId != good.goodsId);
      console.log(this.tableData);
   },
   delAll(){
      this.tableData=[];
      // this.totalCount = 0;
      // this.totalMoney = 0;
   },
   overAll(){
     if(this.totalCount!=0){
       this.tableData = [];
      //  this.totalCount = 0;
      //  this.totalMoney = 0;
       this.$message({
         message:'结算成功',
         type:'success'
       });
     }else{
       this.$message.error('不能空结算');
     }
   }
    
  },
  computed:{
   //属性依赖于缓存 用计算
    totalMoney(){
       return  this.tableData.reduce((pre,next) => {
               return pre + next.price * next.count;
         },0)
    },
    totalCount(){
       return this.tableData.reduce((pre,next) => {
               return pre +  next.count;
         },0)
    }
  }
}
</script>

<style scoped>
 .el-colClass{
    background-color: #F9FAFC;
    border-right: 1px solid #C0CCDA; 
 }
 .div_btn{
   margin-top: 10px;
 }
 .title{
   height: 40px;
   padding: 10px;
   background-color: #F9FAFC;
   border-bottom: 1px solid #C0CCDA;
   text-align: left; 
  }
  .often-goods-list ul{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex: 1;   
    flex-wrap: wrap; 
  }
  .often-goods-list ul li{
    list-style:none;
    border: 1px solid #E5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #FFF;
    /* float: left; */
    cursor: pointer;
  }
  .priceColor{
    color: #58B7FF;
  }
  .goods-type{
   border-top: 1px solid rgb(192, 204, 218);
  }
  .goods-type li{
    list-style:none;
    border: 1px solid #E5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #FFF;
    width:23%;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    /* float:left; */
    margin: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .goods-type ul{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex: 1;   
    flex-wrap: wrap; 
  }
  .goods-type li :first-child{
     text-align: left;
  }
   .goods-type li>span{
     width: 40%
   }
  .goods-type li :first-child img{
    width: 100%;
    /* border: 1px solid red; */
  }
  .top-Botton{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    padding: 0px 10px 10px 10px;
  }
  .top-Botton span{
    display: flex;
    width: 100%;
    align-self:flex-start;
  }
   .top-Botton :first-child{
     margin-bottom: 15px;
   }
   .tabs_title{
     padding:0 10px;
   }
   .totalDiv{
     border-bottom: 1px solid #C0CCDA;
     padding: 10px;
   }
</style>
