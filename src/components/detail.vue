<template>
    <div class="detail">
      <div class="left">
      <div class="back">
        <div class="back-title">
        <span v-if="datailList.top">置顶</span>
        <span v-if="datailList.good">精华</span>
        <!--<span v-if="datailList.tab = 'share'">分享</span>-->
        <h3>{{datailList.title}}</h3>
        </div>
        <div class="back-annotation">
          <li>发布于1个月前</li>
          <li>作者 {{loginname}}</li>
          <li> {{datailList.visit_count}}次浏览</li>
          <li>最后一次编辑</li>
          <li>
            来自
            <span v-if="datailList.tab=='share'">分享</span>
            <span v-if="datailList.tab=='job'">问答</span>
            <span v-if="datailList.tab=='dev'">测试</span>
          </li>
          <input type="button" :value="msg" class="btn btn-info" @click="collect">
        </div>
        <hr>
        <div v-html="datailList.content" class="main"></div>
        <div class="reply">
          <p class="reply-header">{{datailList.reply_count}}回复</p>
          <div v-for="(item, index) in datailList.replies" :key="index" class="reply-my">
            <li id="replymy">
              <img :src="item.author.avatar_url" alt="">
              <div v-html="item.content"></div>
              <input type="button" @click="praise(item.id)" class="el-icon-success" style="font-size: 1rem" :value="item.ups.length">
              <hr>
            </li>
          </div>

          <div class="reply-box">
                <textarea name="" id="" cols="50" rows="3" class="text"
                          :class="{'err':hasErr}"
                          v-model="content"
                          placeholder="对贴子回复"
                ></textarea>
            <a class="button btn-info" @click="addReply">确定</a>
          </div>
        </div>
      </div>
      </div>
    <div class="right">
      <user-com :userName="loginname"></user-com>
      <ad-ver></ad-ver>
    </div>
  </div>

</template>

<script>
  import UserCom from './UserCom'
  import adVer from './advertising'
  import Axios from 'axios'
  import { Loading } from 'element-ui'
  export default {
    name: 'detail',
    components: {
      UserCom,
      adVer
    },
    data () {
      return {
        datailList:{},
        hasErr:false,
        content:'',
        msg : '',
      }
    },
    created () {
      let id = this.$route.params.id
      console.log(id)
      let detailDeta = {
        accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf',
      }
      // Axios({
      //   method:"get",
      //   url:'https://cnodejs.org/api/v1/topic/' + id,
      //   data: detailDeta
      // }).then((res) => {
      //     console.log(res)
      //     this.datailList = res.data.data
      //     this.loginname = res.data.data.author.loginname
      //     if (res.data.data.is_collect == true){
      //       this.msg = '取消'
      //     }else if (res.data.data.is_collect == false){
      //       this.msg = '添加收藏'
      //     }
      // })
      Axios.get('https://cnodejs.org/api/v1/topic/' + id,{
        params:{
          accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf'
        }
      }).then((res) => {
        console.log(res)
        this.datailList = res.data.data
        this.loginname = res.data.data.author.loginname
        if (res.data.data.is_collect == true){
          this.msg = '取消收藏'
        }else{
          this.msg = '收藏'
        }
      })
    },
    methods: {
      addReply(){
        //评论
        let ReplyData = {
          accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf',
          content: this.content
        }
        console.log(ReplyData)
        let topic_id = this.$route.params.id
        console.log(topic_id)
        // Axios.post('https://cnodejs.org/api/v1/topic/' + topic_id + '/replies',{
        //   params:{
        //     accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf',
        //     content: this.content
        //   }
        // }).then((res) => {
        //   console.log(res)
        // })
        Axios({
          method: 'post',
          url: 'https://cnodejs.org/api/v1/topic/' + topic_id + '/replies',
          data: ReplyData
        }).then((res) => {})

      },

      //点赞
      praise (val) {
        console.log(val)
        let praiseData = {
          accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf',
        }
        Axios({
          method: 'post',
          url:'https://cnodejs.org/api/v1/reply/' + val + '/ups',
          data: praiseData
        }).then((res) => {
          console.log(res)
          if(res.data.action == "up"){
           this.value++
          }
        })
      },



      //收藏
      collect(){
        let collectDeta = {
          accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf',
          topic_id: this.$route.params.id,
        }
        console.log(collectDeta)
        if ( this.msg = '收藏'){
          alert(1)
          Axios({
            method: 'post',
            url:'https://cnodejs.org/api/v1/topic_collect/collect',
            data:collectDeta
          }).then((res) => {
            if (res.data.success == true){
              alert('收藏成功')
            }
          })
        }else if(this.msg = '取消收藏'){
          Axios({
            method: 'post',
            url: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
            data:collectDeta
          }).then((res) => {
            this.msg = '收藏'
          })
        }
      }
    }
  }
</script>
<style scoped>
  @import url('../assets/css/markdown-github.css');
  .detail{
    width: 100%;
    margin: 0 auto;
  }
  @import '../style/topic.css';
  @import '../style/topic_user.css';
</style>
