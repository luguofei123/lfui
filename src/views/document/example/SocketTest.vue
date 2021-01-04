<!--
 * @Author: sunch
 * @Date: 2020-11-27 14:01:18
 * @LastEditTime: 2020-12-04 15:45:35
 * @LastEditors: Please set LastEditors
 * @Description: 后端推送测试
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/example/SocketTest.vue
-->
<template>
  <div style="padding: 20px;">
    <h1>socket.io client Test</h1>
    <uf-button :type="socketState ? 'default' : 'primary'" @click="socketState = !socketState">{{ btnText }}</uf-button>
    <uf-button class="ml-10" @click="clear">清除</uf-button>
    <h2 class="mt-20">当前消息：{{ msg }}</h2>
    <h2 class="mt-20">消息总数：{{ msgList.length }}</h2>
    <ul>
      <li v-for="(item, index) in msgList" :key="index">
        {{item.flag}} {{item.current}}/{{item.total}} {{item.data.name}} {{item.msg}}
      </li>
    </ul>
  </div>
</template>
<script>
import socket_io from 'socket.io/client-dist/socket.io'
const socket = socket_io.connect('http://127.0.0.1:9200')
export default {
  data() {
    return {
      msg: '',
      msgList: [],
      socketState: false,
      btnText: '开始接收',
    }
  },
  mounted() {
    // console.log(socket_io)
    let that = this
    socket.on('cwy_websocket_connection', function(result) {
      console.log(result)
      if (that.socketState) {
        that.msg = `${result.flag} ${result.msg} ${result.total} ${result.current} ${JSON.stringify(result.data)}`
        that.msgList.push(result)
      }
    })
  },
  watch: {
    socketState(state) {
      if (state) {
        this.btnText = '停止接收'
      } else {
        this.btnText = '开始接收'
      }
    },
  },
  methods: {
    clear(){
      this.msg = ''
      this.msgList = []
    }
  },
}
</script>
<style></style>
