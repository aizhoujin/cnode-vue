<template>
  <div class="topics">
    <div class="left">

    <div class="nav">
      <router-link :to="{name: 'topics',query: {tab: 'all'}}" class="nav-item">
        <span>全部</span>
      </router-link>
      <router-link :to="{name: 'topics',query: {tab: 'good'}}" class="nav-item">
        <span>精华</span>
      </router-link>
      <router-link :to="{name: 'topics',query: {tab: 'share'}}" class="nav-item">
        <span>分享</span>
      </router-link>
      <router-link :to="{name: 'topics',query: {tab: 'ask'}}" class="nav-item">
        <span>问答</span>
      </router-link>
      <router-link :to="{name: 'topics',query: {tab: 'job'}}" class="nav-item">
        <span>招聘</span>
      </router-link>
      <router-link :to="{name: 'topics',query: {tab: 'dev'}}" class="nav-item">
        <span>测试</span>
      </router-link>
    </div>
      <div class="content" v-for = 'item in listdata'>

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
      <am-pagination :total="100" v-model="pageNum1" @change="change(pageNumber)">

      </am-pagination>


      <div class="">

      </div>
  </div>
    <div class="right">
      <user-com :userName="loginname"></user-com>
      <div class="topics-topic">
        <router-link to="/new">
          <button class="btn btn-info">发布话题</button>
        </router-link>

      </div>
      <ad-ver></ad-ver>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import UserCom from './UserCom'
import adVer from './advertising'
import Axios from 'axios'
export default {
  name: 'name',
  components: {
    UserCom,
    adVer
  },
  data() {
    return{
      listdata: [],
      crasdata: [],
      tabname:'all',
      pageNum1: 1,
      limit: 40,
      mdrender: true,
      loginname: ''
    }
  },
  created() {
    Axios.get('https://cnodejs.org/api/v1/topics',{
      params: {
        limit: 40,
      }
    }).then((res) => {
      console.log(res)
      this.listdata = res.data.data
    })
    Axios({
      method:'post',
      url: 'https://cnodejs.org/api/v1/accesstoken',
      data: {
        accesstoken: 'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf'
      }
    }).then((userres) =>{
      console.log(userres)
      this.loginname = userres.data.loginname
    })
  },
  methods: {
    change: function () {
      alert(1)
    },
    getTopicsList: function () {
      this.axios.get('https://cnodejs.org/api/v1/topics'+'?tab='+this.tabname).then((res) => {
        console.log(res)
        this.crasdata = res.data.data
        for (let i=0;i<this.crasdata.length;i++){
          this.listdata.push(this.crasdata[i])
        }
      })
    },
    loadMore: function () {
      console.log(111)
      this.getTopicsList()
    },
  },
  mounted: function () {
    this.listdata = []
    this.tabname = this.$route.query.tab
  },
  watch: {
    '$route' (to, from) {
      this.listdata = []
      this.tabname = this.$route.query.tab
      this.loadMore()
      this.pageNum1 = 1
    }
  },
}
</script>

<style scoped>

  .nav{
    width: 100%;
    display: flex;
    padding: 10px 0;
    background: #F6F6F6;
  }
  .nav-item{
    width: 10%;
    display: block;
    flex: 1;
    text-decoration: none;

  }
  .nav-item img{
    width: 65%;
  }
  .nav-item span{
    display: block;
    font-size: 16px;
    margin-top: 6px;
    color: #000;
  }
  .img-wrap{
  }
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
  .avator{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
  }
  .username{
    color: #333;
    font-size: 16px;
  }
  .state{
    background: #8a8a8a;
    color: #fff;
    padding: 4px;
    display:inline-block;
    line-height: 15px;
    border-radius: 5px;
    margin-right: 8px;
    font-size: 14px;
  }
  .putTop{
    padding: 4px;
    display:inline-block;
    line-height: 15px;
    background: #80bd01;
    border-radius: 5px;
    color: #fff;
    margin-right: 8px;
    font-size: 16px;
  }
  .title-wrap{
    font-size: 18px;
    line-height: 48px;
    margin-bottom: 5px;

  }
  .reply{
    color: #9e78c0;
    font-size: 14px;
  }
  .mr4{
    margin-right: 4px;
  }
  .mr6{
    margin-right: 6px;
  }
  .loading{
    overflow: hidden;
  }
  .loading img{
    width: 100%;
  }
  .item-title{
    text-decoration: none;
    color: #333;
  }
</style>
