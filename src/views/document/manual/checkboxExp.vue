<template>
  <div class="demoBox">
    <div class="demo">
      <lf-checkbox v-model="checked1" @change="radioChange">单选</lf-checkbox>
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code1}}</code></pre>
    </div>
    <div class="demo">
      {{ checked2 }}
      <lf-checkbox-group v-model="checked2" @change="radioChange1">
        <lf-checkbox label="复选框 A"></lf-checkbox>
        <lf-checkbox label="复选框 B"></lf-checkbox>
        <lf-checkbox label="复选框 C"></lf-checkbox>
      </lf-checkbox-group>
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code2}}</code></pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked1: true,
      list: [
        { label: '1', text: '单选1' },
        { label: '2', text: '单选1' }
      ],
      checked2: ['复选框 C'],
      code1: `
      <lf-radio v-for="(item, index) in list" v-model="radio" :label="item.label" @change="radioChange" :key="index">{{ item.text }}</lf-radio>
      `,
      code2: `
      <lf-checkbox-group v-model="checked2" @change="radioChange1">
        <lf-checkbox label="复选框 A"></lf-checkbox>
        <lf-checkbox label="复选框 B"></lf-checkbox>
        <lf-checkbox label="复选框 C"></lf-checkbox>
      </lf-checkbox-group>`
    }
  },
  methods: {
    radioChange(v) {
      console.log(v)
      // console.log(e)
    },
    radioChange1(v) {
      console.log(v)
    }
  }
}
</script>
<style lang='scss'>
// .demoBox {
//   .demo {
//     margin-bottom: 16px;
//   }
// }
</style>
