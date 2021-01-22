<template>
  <div class="header-wrap">
    <div class="flex-start">
      <div class="caption">
        <div class="title">{{ title }}</div>
      </div>
      <div class="ml-15">
        <slot></slot>
      </div>
    </div>
    <div>
      <slot name="btns"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      // 页面名
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.header-wrap {
  position: relative;
  border-bottom: 1px solid #dfe6ec;
  min-height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.caption {
  display: inline-block;
  font-size: 18px;
  line-height: 18px;
  padding: 12px 0;
  border-bottom: 3px solid $uf-primary-color;
}

.title {
  font-size: 16px;
  color: #2f353b;
}
</style>
