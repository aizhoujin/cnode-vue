<template>
  <div id="app">
    <div class="nav-banner">
      <div class="container">
        <a href="/" class="brand">
          <img src="https://cnodejs.org/public/images/cnodejs_light.svg" alt="">
        </a>
        <input type="text">
        <ul>
          <router-link to="/">首页</router-link>
          <router-link to="/meggages">
            <span style="background: red;color: white;border-radius: 100%;padding: 0.2rem 0.3rem;font-size: 1rem" v-if="!megData=='0'">{{megData}}</span>
            消息
          </router-link>
          <router-link to="/">新手入门</router-link>
          <router-link to="/">API</router-link>
          <router-link to="/">关于</router-link>
          <router-link to="/">注册</router-link>
          <router-link to='/login'>登录</router-link>
        </ul>
      </div>
    </div>
    <div class="main">
      <!--<transition name="left">-->
        <router-view/>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
  import register from '@/components/register'
  import advertising from '@/components/advertising'
  import Axios from 'axios'
export default {
  name: 'App',
  components: {
    register,
    advertising
  },
  data(){
    return{
      megData:''
    }
  },
  created(){
    Axios.get("https://cnodejs.org/api/v1/message/count",{
      params:{
        accesstoken: "c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf"
      }
    }).then((res)=>{
      console.log(res)
      this.megData = res.data.data
    })
  },

}
</script>

<style>

  .left-enter {
    transform: translateY(100rem);
  }
  .left-enter-active {
    transition: 2s;
  }
  .left-enter-to {
    transform: translateY(0);
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
body {
  font-family: Helvetica, sans-serif;
  background: #E1E1E1;
  list-style: none;
}
.nav-banner{
  margin-bottom: 2rem;
}
</style>
