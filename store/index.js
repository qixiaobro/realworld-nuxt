
const cookieparser = process.server ? require("cookieparser") : undefined;
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
   user: null
  }
}

export const mutations = {
 setUser(state, data) {
  state.user =  data
 }
}

export const actions = {
         //nuxtServerInit 是一个特殊的action 方法
         // 这个action 会在服务端渲染期间自动调用
         //作用: 初始化容器数据，传递给客户端使用
         nuxtServerInit({ commit }, { req }) {
           let auth = null;
           if (req.headers.cookie) {
             //使用cookieparser 把 cookie字符串转为js对象
             const parsed = cookieparser.parse(
               req.headers.cookie
             );
             try {
               auth = JSON.parse(parsed.auth);
             } catch (err) {
               // No valid cookie found
             }
           }
           commit("setUser", auth);
         },
       };