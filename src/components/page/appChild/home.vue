<template>
    <div>
        <MHeader>首页</MHeader>
        <div class="continer">
            <Loading v-if="loading">加载中...........</Loading>
            <template v-esle>
                <Swiper :swiperSlides="sliders"></Swiper>
                <h3 v-if="!loading">热门图书</h3>
                <ul>
                    <li v-for="hot in hotBook" :key="hot.bookId">
                        <img :src="hot.bookCover">
                        <span>{{hot.bookName}}</span>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>
<script>
    import MHeader from '@/components/common/MHeader.vue'
    import Swiper from '@/components/common/Swiper.vue'
    import {getSliders,getBooks,getAll} from '../../../api'
    import Loading from '@/components/common/Loading.vue'
    export default {
        name:'home',
        data(){
             return {
                 sliders:[],
                 hotBook:[],
                 loading:true
            }
        },
        created(){
            this.getData();
        },
        methods:{
            async  getSlider(){
                  //对象解构 加别名 对象中的属性名字必须和得到结果的一致 await后面必须加primse()实例
                 let {data:slider}  = await getSliders('/sliders');
                 this.sliders = slider;
          }, 
          async  getBook(){
                  //对象解构 加别名 对象中的属性名字必须和得到结果的一致 await后面必须加primse()实例
                 let {data:bo}  = await getBooks('/hot');
                 this.hotBook = bo;
          },
          async getData(){
            let [slider, hot] = await getAll('/sliders','/hot');
            this.sliders = slider.data;
            this.hotBook = hot.data;
            // 所有请求加载完成
            this.loading = false
            // console.log('============:'+JSON.stringify(this.sliders))
            }
        },
        components:{
           MHeader,
           Swiper,
           Loading
        }
    }
</script>

<style scoped>
 .continer{
     width: 95%;
     position: fixed;
     top: 40px;
     bottom: 50px;
     overflow: auto;
 }
 h3{
     width: 100%;
     height: 40px;
     text-align: center;
     font-weight: bold;
 }
 ul{
     display: flex;
     flex-wrap: wrap;
 }
 ul li{
     display: flex;
     /* flex-direction: row; */
     flex:1;
     width:33.3%;
     padding: 15px;
     justify-content: center;
     align-items: center;
     flex-direction: column;
 }
 ul li img{
     /* width: 100%; */
 }
</style>

