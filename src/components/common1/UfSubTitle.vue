<template>
  <div class="subTitleWrap">
    <div class="subTitle"><slot></slot></div>
  </div>
</template>
<script>
export default {
  name: 'uf-sub-title',
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.subTitleWrap {
  border-left: 4px solid $uf-primary-color;
  padding-left: 5px;
  line-height: 20px;

  .subTitle {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
