<template>
    <div>
        <MHeader :back="true">添加</MHeader>
         <div class="continer">
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
                        <input type="text" v-model="book.bookPrice" id="bookPrice">
                    </li>
                     <li>
                        <label for="bookCover">封面</label>
                        <input type="text" v-model="book.bookCover" id="bookCover">
                    </li>
                    <li>
                        <button @click="add">提交</button>
                    </li>
                </ul>

        </div>
    </div>
</template>
<script>
    import MHeader from '@/components/common/MHeader.vue'
    import {addBook} from '../../../api'
    export default {
        name:'add',
        data(){
            return {
                book:{}
            }
        },
        created(){

        },
        methods:{
           async add(){
               await addBook('/book',this.book)
               this.$router.push('/app/list')
            }
        },
        components:{
           MHeader 
        }
    }
</script>
<style scoped>
    .continer{
        width: 95%;
        position: fixed;
        top: 40px;
        bottom: 5px;
        overflow: auto;
        /* background-color: darkcyan;
        z-index: 3; */
        padding: 30px 0 0 0;
    }
    ul li {
        list-style:none;
    }
</style>
