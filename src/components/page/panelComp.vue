<template>
    <div :class="[color]">
        <div class="panel-heading" ref="panelt">
            <slot name="title"></slot>
        </div>
        <div class="panel-body">
             <slot name="content"></slot>
        </div>
        <div class="panel-footer">
            <slot>匿名</slot>
          <button @click="sayTitle">显示标题</button>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'panelChild',
        props:{
            type:{
                type:[String],
                default:'default'
            }
        },
        data() {
          return{
             
          }
        },
        computed:{
            color () {
               return 'panel-' + this.type;
            }
        },
        mounted(){
            
        },
        methods:{
            sayTitle(){
                this.$emit('sya-title',this.$refs.panelt.innerText);
            }
        }
 }
</script>
