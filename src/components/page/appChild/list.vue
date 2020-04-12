<template>
    <div>
        <MHeader :back="true">列表</MHeader>
        <div class="content">
            <ul>
                <router-link v-for="book in books" :key="book.bookId" tag="li" :to="{name:'detail', params:{bid:book.bookId}}">
                    <img :src="book.bookCover">
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <p>{{book.bookPrice}}</p>
                        <!-- 阻止冒泡 -->
                        <button @click.stop="del(book.bookId)">删除</button>
                    </div>

                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    import MHeader from '@/components/common/MHeader'
    import {getBookList,removeBook} from '../../../api'
    export default {
        name:'list',
        data(){
             return {
                 books:[]
            }
        },
        created(){
             this.getBook();//获取热门图书
        },
        methods:{
             async getBook(){
                  //对象解构 加别名 对象中的属性名字必须和得到结果的一致 await后面必须加primse()实例
                 let {data:books}  = await getBookList('/book?id=');
                 this.books = books;
          },
             async del(id){
                 console.log("===="+id);
                await removeBook(`/book?id=${id}`);
                //前台删除1.可以前台过滤 2.也可以后台再次请求
                this.getBook();
          },
        //   下拉刷新 1.在div上绑定@scrll = "loadMore"事件 
        loadMore() {
            // 触发scroll事件 可能触发n次 需要先开启一个定时器 下次触发时将上一次的定时器清除掉即可
            clearTimeout(this.timer) // 防抖
            this.timer = setTimeout(() => {
            let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll //$refs获取元素dom html
            if(scrollTop + clientHeight + 20 > scrollHeight){// 距离底部20px 时触发
                this.getData()
            }
           },10)
         },
        //  页可以获取到元素进行监控
        loadMore1() {
            this.$refs.scroll.addEventListener("scroll",function(){
                // function 
            })
        }
        },
        components:{
           MHeader 
        }
    }
</script>
<style scoped>
    ul {
       display: flex;
       flex-wrap: wrap;
    }
    li {
        list-style: none;
        display: flex;
        padding: 10px;
        width: 50%;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        /* border: 1px solid blue; */
    }
    .content{
        width: 95%;
        position: fixed;
        top: 40px;
        bottom: 50px;
        overflow: auto;
    }
    button {
        display: block;
    }
</style>
