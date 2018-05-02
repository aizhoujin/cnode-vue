<template>
  <div class="userPage">
    <div class="left">
      <div class="user-head">
        <p class="user-head-title">主页/</p>
        <div class="user-head-main">
          <img :src="userInfo.avatar_url">
          <span>{{userInfo.loginname}}</span>
          <p>{{userInfo.score}}  积分</p>
          <router-link :to="'/collect/' + userInfo.loginname">收藏</router-link>
          <a href="#">@{{userInfo.loginname}}</a>
          <div>注册时间{{userInfo.create_at}}</div>
        </div>
      </div>
      <div class="user-establish">
        <p>最近创建的话题</p>
        <li v-for="item in userInfo.recent_topics">
          <router-link :to="'/detail/' + item.id">
            <img :src="item.author.avatar_url" alt="">
            <span>{{item.title}}</span>
          </router-link>
        </li>
      </div>
      <div class="user-establish">
        <p>最近参与的话题</p>
        <li v-for="item in userInfo.recent_replies">
          <router-link :to="'/detail/' + item.id">
            <img :src="item.author.avatar_url" alt="">
            <span>{{item.title}}</span>
          </router-link>
        </li>
      </div>
    </div>
    <div class="right">
      <user-com :userName="loginname"></user-com>
      <ad-ver></ad-ver>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import UserCom from './UserCom'
import adVer from './advertising'

export default {
  name: "user",
  components: {
    UserCom,
    adVer
  },
  data () {
    return{
      userInfo:[]
    }
  },
  created () {
    let id = this.$route.params.username
    console.log(id)
    Axios.get('https://cnodejs.org/api/v1/user/' + id).then((res) => {
      this.userInfo = res.data.data
      this.loginname = res.data.data.loginname
      console.log(this.userInfo)
    })
  }
}
</script>

<style scoped>
.userPage{
  width: 100%;
}
</style>
