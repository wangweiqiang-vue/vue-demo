<template>
    <div class="continer">
        <MHeader :back="true">详情</MHeader>
        <div class="continer">
             <h3>热门图书{{bid}}</h3>
                <ul>
                    <li>
                        <label for="bookName">名称</label>
                        <input type="text" v-model="book.bookName" id="bookName">
                    </li>
                    <li>
                        <label for="bookInfo">信息</label>
                        <input type="text" v-model="book.bookInfo" id="bookInfo">
                    </li>
                    <li>
                        <label for="bookPrice">价格</label>
                        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
                    </li>
                    <li>
                        <button @click="setAgain">修改</button>
                    </li>
                </ul>

        </div>
    </div>
</template>
<script>
// 详情页面不需要Tab  可以用背景遮住 见样式
    import MHeader from '@/components/common/MHeader.vue'
    import {getBookList,updataBook} from '../../../api'
    export default {
        name:'detail',
        data(){
             return {
                book:[]
            }
        },
        watch: {
           $route() {//路径变化 重新获取数据
             this.getBook(this.bid)
           }
        },
        created() {
           this.getBook(this.bid);
        },
        methods:{
            async getBook(bi) {
                  //对象解构 加别名 对象中的属性名字必须和得到结果的一致 await后面必须加primse()实例
                 let {data:book}  = await getBookList(`/book?id=${bi}`);
                //  console.log(`${bid}`)
                 this.book = book;
                 //如果对象为空 转到列表页
                 Object.keys(this.book).length>0?void 0:this.$router.push('/app/list')
          },
          async setAgain(){
              console.log(7654321)
              await updataBook('/book?id='+this.bid,this.book)
              console.log('/book?id='+this.bid)
              this.$router.push('/app/list')
          }
        },
        components:{
           MHeader,
        },
        computed: {
            bid(){
               return this.$route.params.bid;
           }
        }
    }
</script>

<style scoped>
 .continer{
     width: 95%;
     position: fixed;
     top: 40px;
     bottom: 0px;
     overflow: auto;
     background-color: darkcyan;
     z-index: 3;
 }
 ul li {
     list-style:none;
 }

</style>

