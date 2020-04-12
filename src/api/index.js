import axios from 'axios'
// import Axios from 'axios'
axios.defaults.baseURL = 'http://localhost:2300'
// 可以在这里统一拦截 把结果处理为res.data  可以避免{data:alias}处理
// axios.interceptors.response.use((res) => {
//   return res.data
// })
// var ins = axios.create({
//   headers: {'content-type': 'application/json'}
// })
export let getSliders = (endUrl) => {
  // alert(endUrl)
  return axios.get(endUrl)
}
export let getBooks = (endUrl) => {
  // alert(endUrl)
  return axios.get(endUrl)
}
export let getBookList = (endUrl) => {
  return axios.get(endUrl)
}
export let removeBook = (endUrl) => {
  // alert(endUrl)
  return axios.delete(endUrl)
}
export let updataBook = (endUrl, data) => {
  // alert(endUrl)
  return axios.put(endUrl, data)
}
export let addBook = (endUrl, data) => {
  // alert(endUrl)
  return axios.post(endUrl, data)
}
// 同时获取 轮播和热门图书
export let getAll = (endUrl, secUrl) => {
  // alert(endUrl + '||' + secUrl)
  return axios.all([getSliders(endUrl), getBooks(secUrl)])
}
