<template>
  <div class="demoBox">
    <div class="demo">
      <lf-checkbox v-model="checked1" @change="radioChange">单选</lf-checkbox>
      <!-- <lf-radio v-model="radio" label="2" @change="radioChange">单选</lf-radio> -->
      <!-- <lf-radio v-for="(item, index) in list" v-model="radio" :label="item.label" @change="radioChange" :key="index">{{ item.text }}</lf-radio> -->
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code1}}</code></pre>
    </div>
    <div class="demo">
      <lf-checkbox-group v-model="radio1" @change="radioChange1">
        <lf-checkbox>单选1</lf-checkbox>
        <lf-checkbox>单选2</lf-checkbox>
        <lf-checkbox>单选3</lf-checkbox>
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
      list: [
        { label: '1', text: '单选1' },
        { label: '2', text: '单选1' }
      ],
      radio: '1',
      radio1: '1',
      code1: `
      <lf-radio v-for="(item, index) in list" v-model="radio" :label="item.label" @change="radioChange" :key="index">{{ item.text }}</lf-radio>
      `,
      code2: `
      <lf-radio-group v-model="radio1" @change="radioChange1">
        <lf-radio label="1">单选</lf-radio>
        <lf-radio label="2">单选</lf-radio>
        <lf-radio label="3">单选</lf-radio>
      </lf-radio-group>`
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
