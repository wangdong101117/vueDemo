import axios from 'axios'

var myaxios = {}

myaxios.install = function (Vue) {
  axios.defaults.baseURL ='http://localhost:8888/api/private/v1/'

  // 还需要设置一个 拦截器, 给除了login路由外的其他请求的请求头设置好登陆成功的标识: token
  axios.interceptors.request.use(function (config) {
    // config 内保存了所有的请求参数, 其中 config.url保存的是请求的路由
    if (config.url !== 'login'){
      // 给所有请求的请求头 设置上 token
      axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
    }
    // 当设置好后, 一定要返回 更新修改后的请求对象
    return config
  }, function (error) {
    return Promise.reject(error);
  })

  // 将axios作为实例的方法 添加到Vue中
  Vue.prototype.$http = axios  // 设置好后, 右后要使用axios, 可以使用this.$http来代替
}

// 最后导出创建的 myaxios对象
export default myaxios
