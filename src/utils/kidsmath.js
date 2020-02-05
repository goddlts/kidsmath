const OPERATOR_ADD = 1
const OPERATOR_MINUS = 0

// [{ r: 8, t: 1, o: '+' x: 8, y: 0}]
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // 含最大值，含最小值
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateObj (min, max, array) {
  let rObj = {}
  // 随机运算法  0 减法，1 加法
  rObj.t = getRandomInt(0, 1)
  rObj.o = rObj.t === OPERATOR_ADD ? '+' : '-'
  rObj.user = null
  // 随机 10 以内的数，运算结果
  rObj.r = getRandomInt(min, max)
  if (rObj.t === OPERATOR_ADD) {
    rObj.x = getRandomInt(min, rObj.r)
    rObj.y = rObj.r - rObj.x
  } else if (rObj.t === OPERATOR_MINUS) {
    // 如果是减法的话，rObj.x 要大于等于 rObj.r
    rObj.x = getRandomInt(rObj.r, max)
    rObj.y = rObj.x - rObj.r
  }
  rObj.id = `${rObj.r}${rObj.t}${rObj.x}${rObj.y}`

  let hasRObj = array.some((item) => {
    return item.id === rObj.id
  })

  return hasRObj ? generateObj(min, max, array) : rObj
  // return rObj
}

// 随机生成 10 以内的10个数
// 随机生成 10 种运算
export function getRandomArray (num, min, max) {
  let results = []
  for (let i = 0; i < num; i++) {
    // { r: 8, t: 1, o: '+' x: 8, y: 0, id: xxx}
    let obj = generateObj(min, max, results)
    results.push(obj)
  }
  return results
}
