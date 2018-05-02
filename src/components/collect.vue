<template>
    <div>
        <h3>被{{loginname}}收藏得</h3>
        <li v-for="item in collectDate">
          <div class="content">

            <router-link :to='{name:"UserPage",params:{username:item.author.loginname}}'><img :src='item.author.avatar_url' :title='item.author.loginname' class='authorImg'></router-link>
            <span class="topics-cont">
        <span>{{item.reply_count}}</span>/{{item.visit_count}}
      </span>
            <div class="title-wrap">
              <span class="putTop" v-if="item.top">置顶</span>
              <span v-else-if="item.good" class="putTop">精华</span>
              <span v-else-if="item.tab == 'share'" class="state">分享</span>
              <span v-else-if="item.tab == 'ask'" class="state">问答</span>
              <span v-else-if="item.tab == 'job'" class="state">招聘</span>
              <router-link :to="'/detail/' + item.id" class="item-title">{{ item.title }}</router-link>
            </div>
          </div>
        </li>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "collect",
  data() {
    return{
        collectDate:[],
        loginname:''
    }
  },
  created(){
    let loginname = this.$route.params.loginname
    this.loginname = this.$route.params.loginname
    console.log(loginname)
    Axios.get('https://cnodejs.org/api/v1/topic_collect/' + loginname).then((res) => {
      console.log(res)
      this.collectDate = res.data.data
    })
  }
}
</script>

<style scoped>
  .content{
    background: #f3f3f3;
    border-top: 10px solid #f3f3f3;
    display: flex;
    border-bottom: 1px solid #F3F3F3;
    line-height: 48px;
  }
  .content img{
    width: 2rem;
    height: 2rem;
    margin: 0 0.5rem;
  }
  .post-item{
    padding: 10px 15px;;
    background: #fff;
    margin-bottom: 10px;
  }
  .info{
    margin-bottom: 5px;
  }
</style>
