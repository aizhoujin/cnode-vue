<template>
  <div class="authorSec">
      <p>作者</p>
      <router-link class="linkUserName" :to='{name:"UserPage",params:{username:userInfo.loginname}}'>
        <div class="user-box">
          <img :src="userInfo.avatar_url" class="image">
          <div style="padding: 14px;" >
            <span class="linkUserName">{{userInfo.loginname}}</span>
          </div>
        </div>
      </router-link>
      <div class="clearfix scoreGithub">
        <span>积分：{{userInfo.score}}</span>
        <br>
        <span><i>"全力以赴，你会很酷"</i></span>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "UserCom",
  props: ['userName'],
  data () {
    return{
      userInfo:{}
    }
  },
  watch: {
    userName(val){
      console.log(val)
      Axios.get('https://cnodejs.org/api/v1/user/' + val).then((res)=>{
        console.log(res)
        this.userInfo = res.data.data
      })
    }
  }

  // created () {
  //   let id = this.$route.params.username
  //   Axios.get('https://cnodejs.org/api/v1/user/' + id).then((res) => {
  //     console.log(res)
  //     this.userInfo = res.data.data
  //   })
  // }
}
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 60px;
    height: 60px;
    display: block;
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    clear: both
  }

  .scoreGithub {
    padding: 20px 10px;
    line-height: 25px;
    font-size: 15px;
  }

  .linkUserName {
    text-decoration: none;
    color: #888;
  }
</style>
