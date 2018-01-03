// actions里存放的是异步操作
// 由于vuex中的state的变更只能由mutations进行操作，所以actions不直接进行数据操作，而是调用mutations方法
// 以下出现的that都是vue实例对象，因为把axios绑定在了Vue原型上，vuex无法调用，所以这里需要传入this

const actions = {
  // 异步获取基础数据
  // 这里使用了es7的async函数，相当于封装了promis的generator
  getAllData: async ({ commit }, that) => {
    // 声明变量用来存放之后获得的数据
    let self = {"_id":0,"avatar":"/static/images/avatar.jpg","birthday":"20/4/96","name":"缘自世界","gender":"man","email":"lvzhenbang@outlook.com","phone":"15038004543","address":"北京","explain":"一个爱编程前端小鸟"}
    let friends =[{"_id":1,"avatar":"/static/images/avatar1.jpg","birthday":"11/3/93","name":"明月楼","gender":"man","email":"mingyuelou@qq.com","phone":"178412313","address":"北京, 2584","explain":"Dolore ea cupidatat deserunt nostrud officia est "},{"_id":2,"avatar":"/static/images/avatar2.jpg","birthday":"21/6/93","name":"五月","gender":"female","email":"wuyue@qq.com","phone":"135523432","address":"河南,郑州, 442","explain":"Ipsum sit cupidatat dolore voluptate."},{"_id":3,"avatar":"/static/images/avatar3.jpg","birthday":"3/3/99","name":"南风先生","gender":"man","email":"nanfengxiansheng@qq.com","phone":"1581234219","address":"北京, 7757","explain":"Voluptate ad fugiat magna ut cupidatat"}]
//  await that.$http.get('/api/self')
//    .then(({ data }) => {
//      self = data.data
//    })
//  await that.$http.get('/api/friends')
//    .then(({ data }) => {
//      friends = data.data
//    })
    commit('getData', {
      self, friends
    })
  },
  // 聊天机器人
  sendValue: async ({ commit }, { _id, message, that }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    let robotData = ''
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, _id, message })
    // 进行ajax请求，此处的that是从组件内传来的对象this
    await that.$http.get('/api/robotapi', {
      params: {
        message,
        id: _id
      }
    }).then(res => {
      // 将获取到的数据赋值给先前设置的变量
      robotData = JSON.parse(res.data.data)
    })
    // 判断获取到的数据类型，在进行对应操作
    if (robotData.code === 100000) {
      commit('changeList', { _id, message: robotData.text })
    } else if (robotData.code === 200000) {
      let data = robotData.text + robotData.url
      commit('changeList', { _id, message: data })
    } else if (robotData.code === 302000) {
      commit('changeList', { _id, message: '暂不支持此类对话' })
    } else {
      commit('changeList', { _id, message: '暂不支持此类对话' })
    }
  }
}

export default actions
