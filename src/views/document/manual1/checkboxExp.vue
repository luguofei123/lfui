<template>
  <div>
    <h3>多选 uf-checkbox</h3>
    
    <div class="mt-10">
      <uf-checkbox type="normal" :options="checkboxList" @click="onChange"></uf-checkbox>
    </div>

    <div class="mt-10">
      <uf-checkbox type="button" :options="checkboxList" @click="onChange"></uf-checkbox>
    </div>

    <div class="mt-10">
      <uf-checkbox type="button" size="large" :options="checkboxList" @click="onChange"></uf-checkbox>
    </div>

    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource1 = !showSource1">显示代码</a>
    </div>
    <pre v-if="showSource1">
      <code>{{pagerText1}}</code>
    </pre>
  </div>
</template>
<script>
export default {
  name: 'checkboxExp',
  data() {
    return {
      checkboxList: [
        {
          disabled: false,
          checked: true,
          value: 1,
          label: "选项1"
        },
        {
          disabled: false,
          checked: false,
          value: 2,
          label: "选项2"
        },
        {
          disabled: true,
          checked: false,
          value: 3,
          label: "选项3"
        },
        {
          disabled: false,
          checked: false,
          value: 4,
          label: "选项4"
        },
      ],
      showSource1: false,
      pagerText1: '<uf-checkbox type="normal" :options="checkboxList" @click="onChange"></uf-checkbox>',
    }
  },
  methods: {
    onChange(e) {
      console.log(e)
    }
  }
}
</script>
