<template>
  <van-tabs v-model="activeName">
    <van-tab title="10以内" name="x10">
      <van-field
        type="digit"
        v-for="obj in x10"
        clearable
        :key="obj.id"
        label-width="50%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <div v-if="flag === 'view'">
            <van-icon v-if="obj.r === obj.user" name="success" />
            <van-icon v-else-if="obj.user !== null && obj.r !== obj.user" name="cross" />
          </div>
        </div>
      </van-field>
      <van-button @click="changeX10" type="primary" block>换一换</van-button>
    </van-tab>
    <van-tab title="20以内" name="x20">
       <van-field
        type="digit"
        clearable
        v-for="obj in x20"
        :key="obj.id"
        label-width="50%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <div v-if="flag === 'view'">
            <van-icon v-if="obj.r === obj.user" name="success" />
            <van-icon v-else-if="obj.user !== null && obj.r !== obj.user" name="cross" />
          </div>
        </div>
      </van-field>
      <van-button @click="changeX20" type="primary" block>换一换</van-button>
    </van-tab>
    <van-tab title="保存记录" name="history">
      <van-row type="flex" justify="space-around">
        <van-col span="12" style="text-align: center">
          <van-button
            size="small"
            @click="handleSave"
            type="primary">保存</van-button>
        </van-col>
        <van-col span="12" style="text-align: center">
          <van-button
            @click="handleAgain"
            size="small"
            type="primary">再来一次</van-button>
        </van-col>
      </van-row>
      <van-divider>历史记录</van-divider>
      <van-cell-group>
        <van-cell
          @click="restore(key)"
          v-for="key in keys"
          :key="key"
          :title="key">
            <van-icon @click.stop="handleRemove(key)" name="cross" />
        </van-cell>
      </van-cell-group>
    </van-tab>
  </van-tabs>
</template>

<script>
import { getRandomArray } from '../utils/kidsmath'
import { getAllKeys, save, getKey, remove } from '../utils/storage'
export default {
  name: 'home',
  data () {
    return {
      activeName: 'x10',
      x10: [],
      x20: [],
      histories: [],
      // 历史记录的所有 key
      keys: [],
      // 是否显示对错图标
      // exam 不显示
      // view 显示
      flag: 'exam'
    }
  },
  created () {
    this.x10 = getRandomArray(10, 0, 10)
    this.x20 = getRandomArray(10, 11, 20)
    this.keys = getAllKeys()
  },
  methods: {
    changeX10 () {
      this.x10 = getRandomArray(10, 0, 10)
      this.flag = 'exam'
    },
    changeX20 () {
      this.x20 = getRandomArray(10, 11, 20)
      this.flag = 'exam'
    },
    handleSave () {
      save({
        'x10': this.x10,
        'x20': this.x20
      })
      this.keys = getAllKeys()
    },
    handleAgain () {
      this.x10 = getRandomArray(10, 0, 10)
      this.x20 = getRandomArray(10, 11, 20)
      this.activeName = 'x10'
      this.flag = 'exam'
    },
    restore (key) {
      let obj = getKey(key)
      this.x10 = obj.x10
      this.x20 = obj.x20
      this.activeName = 'x10'

      this.flag = 'view'
    },
    handleRemove (key) {
      this.keys = remove(key)
    }
  }
}
</script>

<style>

</style>
