<template>
  <van-tabs v-model="activeName">
    <van-tab title="10以内" name="x10">
      <van-field
        @click="handle(obj)"
        v-for="obj in x10"
        :key="obj.id"
        label-width="50%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <van-icon v-if="obj.r === obj.user" name="success" />
          <van-icon v-else-if="obj.user && obj.r !== obj.user" name="cross" />
        </div>
      </van-field>
      <van-button @click="changeX10" type="primary" block>换一换</van-button>
    </van-tab>
    <van-tab title="20以内" name="x20">
       <van-field
        @click="handle(obj)"
        v-for="obj in x20"
        :key="obj.id"
        label-width="50%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <van-icon v-if="obj.r === obj.user" name="success" />
          <van-icon v-else-if="obj.user && obj.r !== obj.user" name="cross" />
        </div>
      </van-field>
      <van-button @click="changeX20" type="primary" block>换一换</van-button>
    </van-tab>
    <van-tab title="保存记录" name="history">
      <van-row type="flex" justify="space-around">
        <van-col span="12">
          <van-button size="small" type="primary">保存</van-button>
        </van-col>
        <van-col span="12">
          <van-button size="small" type="primary">再来一次</van-button>
        </van-col>
      </van-row>
      <van-divider>历史记录</van-divider>
    </van-tab>
  </van-tabs>
</template>

<script>
import { getRandomArray } from '../utils/kidsmath'
export default {
  name: 'home',
  data () {
    return {
      activeName: 'x10',
      x10: [],
      x20: [],
      histories: []
    }
  },
  created () {
    this.x10 = getRandomArray(10, 0, 10)
    this.x20 = getRandomArray(10, 11, 20)
  },
  methods: {
    changeX10 () {
      this.x10 = getRandomArray(10, 0, 10)
    },
    changeX20 () {
      this.x20 = getRandomArray(10, 11, 20)
    }
  }
}
</script>

<style>

</style>
