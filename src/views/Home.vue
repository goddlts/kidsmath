<template>
  <van-tabs v-model="activeName">
    <van-tab title="10以内" name="x10">
      <van-button @click="handleStart" type="primary" block>开始</van-button>
      <van-field
        type="digit"
        v-for="obj in x10"
        clearable
        :key="obj.id"
        label-width="30%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <div v-if="flag === 'view'">
            <van-icon class="green" v-if="obj.r === obj.user" name="success" />
            <van-icon class="red" v-else-if="obj.user !== null && obj.r !== obj.user" name="cross" />
          </div>
        </div>
      </van-field>
      <van-button @click="handleSave10" type="primary" block>结束</van-button>
    </van-tab>
    <van-tab title="20以内" name="x20">
       <van-button @click="handleStart" type="primary" block>开始</van-button>
       <van-field
        type="digit"
        clearable
        v-for="obj in x20"
        :key="obj.id"
        label-width="30%"
        v-model.number="obj.user"
        placeholder="请输入结果">
        <div slot="label">{{obj.x}} {{obj.o}} {{obj.y}} =  </div>
        <div slot="right-icon">
          <div v-if="flag === 'view'">
            <van-icon class="green" v-if="obj.r === obj.user" name="success" />
            <van-icon class="red" v-else-if="obj.user !== null && obj.r !== obj.user" name="cross" />
          </div>
        </div>
      </van-field>
      <van-button @click="handleSave20" type="primary" block>结束</van-button>
    </van-tab>
    <van-tab title="保存记录" name="history">
      <van-divider>历史记录</van-divider>
      <van-cell-group>
        <van-cell
          @click="restore(key)"
          v-for="key in keys"
          :key="key"
          :title="key">
            <!-- <template #title>
            </template> -->
            <van-icon @click.stop="handleRemove(key)" name="cross" />
        </van-cell>
      </van-cell-group>
    </van-tab>
  </van-tabs>
</template>

<script>
import { getRandomArray } from '../utils/kidsmath'
import { getAllKeys, save, getKey, remove } from '../utils/storage'
import { Dialog } from 'vant'

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
      flag: 'exam',
      // 生成题目数
      count: 20,
      // 成绩
      score: 0,
      // 用时多少分钟
      timespan: 0,
      startTime: null
    }
  },
  mounted () {
    Dialog.alert({
      title: '提示',
      message: `开始答题`
    })
    this.x10 = getRandomArray(this.count, 0, 10)
    this.x20 = getRandomArray(this.count, 0, 20)
    this.keys = getAllKeys()
    this.startTime = Date.now()
  },
  methods: {
    handleSave10 () {
      if (!this.startTime) {
        Dialog.alert({
          title: '提示',
          message: `请先开始答题`
        })
        return
      }
      this.flag = 'view'
      // 计算成绩
      let rightCount = 0
      this.x10.forEach(obj => {
        if (obj.r === parseInt(obj.user)) {
          rightCount++
        }
      })
      this.score = 100 / this.count * rightCount
      // 计算时间间隔
      this.timespan = diffTime(this.startTime, Date.now())
      this.startTime = null
      save({
        'result': {
          timespan: this.timespan,
          score: this.score,
          flag: '10以内'
        },
        'x10': this.x10
      })
      this.keys = getAllKeys()

      Dialog.alert({
        title: '答题结果',
        message: `答题用时：${this.timespan}，答题成绩：${this.score}`
      })
    },
    handleStart () {
      this.flag = 'exam'
      this.startTime = Date.now()
      this.x10 = getRandomArray(this.count, 0, 10)
      this.x20 = getRandomArray(this.count, 11, 20)
    },
    handleSave20 () {
      if (!this.startTime) {
        Dialog.alert({
          title: '提示',
          message: `请先开始答题`
        })
        return
      }
      this.flag = 'view'
      // 计算成绩
      let rightCount = 0
      this.x20.forEach(obj => {
        if (obj.r === parseInt(obj.user)) {
          rightCount++
        }
      })
      this.score = 100 / this.count * rightCount
      // 计算时间间隔
      this.timespan = diffTime(this.startTime, Date.now())
      this.startTime = null
      save({
        'result': {
          timespan: this.timespan,
          score: this.score,
          flag: '20以内'
        },
        'x20': this.x20
      })
      this.keys = getAllKeys()

      Dialog.alert({
        title: '答题结果',
        message: `答题用时：${this.timespan}，答题成绩：${this.score}`
      })
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

function diffTime (startDate, endDate) {
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  const diff = endDate.getTime() - startDate.getTime() // 时间差的毫秒数
  // 计算出相差天数
  const days = Math.floor(diff / (24 * 3600 * 1000))
  // 计算出小时数
  const leave1 = diff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  let returnStr = seconds + '秒'
  if (minutes > 0) {
    returnStr = minutes + '分' + returnStr
  }
  if (hours > 0) {
    returnStr = hours + '小时' + returnStr
  }
  if (days > 0) {
    returnStr = days + '天' + returnStr
  }
  return returnStr
}
</script>

<style>
.green {
  color: green;
}
.red {
  color: red;
}
</style>
