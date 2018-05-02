<template>
    <div class="newtopic">
      <p><span>主页</span>/发布话题</p>
      选择版块：
      <select v-model="topic.tab">
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
        <option value="dev">测试</option>
      </select>
      <br/>
      <input type="text" v-model="topic.title" placeholder="标题">
      <br/>
      <textarea name="" id="" cols="60" rows="10" v-model="topic.content" placeholder="支持markdown语法？？？？"></textarea>

      <a class="btn btn-info" style="background: green;" @click="addTopic">发布</a>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: "newtopic",
    data () {
      return{
        topic: {
          tab: 'dev',
          title: '',
          content: ''
        }
      }
    },
    methods: {
      addTopic(){
        let posData = {
          tab: this.topic.tab,
          title:this.topic.title,
          content: this.topic.content,
          accesstoken:'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf'
        }
        console.log(posData)
        Axios({
          method:'post',
          url: 'https://cnodejs.org/api/v1/topics',
          data: posData
        }).then((res) => {
          console.log(res)
          if(res.data.success == true){
            this.$router.push('/')
          }
        })
      }
    }
}
</script>

<style scoped>

</style>
