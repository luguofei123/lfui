<!--
 * @Author: sunch
 * @Date: 2020-07-16 19:43:24
 * @LastEditTime: 2020-11-11 11:08:34
 * @LastEditors: Please set LastEditors
 * @Description: “更多”展开按钮
 * @FilePath: /agla-fe-8.50/vuedev/src/components/UfMoreBtn.vue
-->
<template>
    <div class="flex-start moreBtn" @click="show = !show">
        更多
        <i class="glyphicon icon-angle-bottom" :class="{ moreTop: show }"></i>
    </div>
</template>
<script>
export default {
    name: 'uf-morebtn',
    data(){
        return {
            show: false
        }
    },
    mounted() {
        this.$emit('change', this.show)
    },
    watch: {
        show(val){
            this.$emit('change', val)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
/* 更多按钮样式*/
.moreBtn{
  color: $uf-link-color;
}
.moreDown{
  transition: all .3s ease;
  cursor: pointer;
  margin-left: 2px;
}
.moreTop{
  transform: rotate(180deg);
}
</style>