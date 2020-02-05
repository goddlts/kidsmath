import { format } from './format.js'

export function save (obj) {
  let key = format(new Date())
  window.localStorage.setItem(key, JSON.stringify(obj))

  setKeys(key)
}

export function remove (key) {
  window.localStorage.removeItem(key)
  let keys = window.localStorage.getItem('keys')
  keys = JSON.parse(keys) || []
  let index = keys.findIndex((item) => {
    return item === key
  })
  keys.splice(index, 1)
  window.localStorage.setItem('keys', JSON.stringify(keys))
  return keys
}

export function getKey (key) {
  let obj = window.localStorage.getItem(key)
  obj = JSON.parse(obj)
  return obj
}

export function getAllKeys () {
  let keys = window.localStorage.getItem('keys')
  keys = JSON.parse(keys) || []
  keys.reverse()
  return keys
}

function setKeys (key) {
  let keys = window.localStorage.getItem('keys')
  keys = JSON.parse(keys) || []
  keys.push(key)
  window.localStorage.setItem('keys', JSON.stringify(keys))
}
