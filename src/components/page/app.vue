<template>
    <div>
        <!-- 需要缓存的组件 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 正常情况下访问的 -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Tab></Tab>
    </div>
</template>
<script>
    // import Tab from '../common/tab.vue';
    import Tab from '@/components/common/tab.vue'
    export default {
        name:'appa',
        components:{
            Tab
        }
    }
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
ul,li {
    list-style: none;
}
a {
    text-decoration: none;
}
</style>
