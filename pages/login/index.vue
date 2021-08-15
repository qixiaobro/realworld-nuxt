<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}} </h1>
        <p class="text-xs-center">
          <nuxt-link to="/register" v-if="isLogin">need an account?</nuxt-link>
          <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(msgs, field) in errors">
            <li v-for="(msg, index) in msgs" :key="index">
              {{field}} {{msg}}
            </li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required>
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
           {{isLogin ? 'Sign in' : 'Sign up'}} 
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {login, register} from '@/api/user'
//只在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
 middleware:'notAuthenticated',
 name:'LoginIndex',
 computed:{
  isLogin() {
   return this.$route.name === 'login'
  },
 },
  data(){
  return {
    user:{
      username:'',
      email:'982092691@qq.com',
      password:'12345678'
    },
    errors:{} //错误信息
  }
},
methods:{ 
  async onSubmit(){
    try{
      const { data } = this.isLogin ? await login({user:this.user}) : await register({user:this.user})
      console.log(data);

      //保存用户的状态
      this.$store.commit('setUser', data.user)
      //为了防止刷新页面数据丢失，需要持久化数据
      Cookie.set('user', JSON.stringify(data.user)) // saving token in cookie for server rendering
      this.$router.push('/')

    } catch (err){
      console.dir(err)
      this.errors = err.response.data.errors
    }
  }
}
}
</script>

<style scoped>

</style>
