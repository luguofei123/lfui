<!-- 选择框 -->
<template>
  <div>
    <input ref="reference" type="text" name="cede" v-model="currentValue" @focus="handleFocus" />
    <!-- 模仿vue做了一个下拉 -->
    <transition>
      <el-select-menu ref="popper" :append-to-body="popperAppendToBody" v-show="visible !== false">
        <ul>
          <li>1111</li>
          <li>2222</li>
          <li>3333</li>
          <li>4444</li>
          <li>5555</li>
        </ul>
      </el-select-menu>
    </transition>
  </div>
</template>
<script lang="javascript">
import ElSelectMenu from './select-dropdown.vue'
export default {
  name: 'lf-checkbox',
  data() {
    return {
      visible: false,
      popperAppendToBody: true,
      currentValue: ''
    }
  },
  methods: {
    handleFocus(e) {
      this.visible = true
    }
  },
  components: {
    ElSelectMenu
  }
}
</script>
<style lang="scss" src="./select.scss"></style>
