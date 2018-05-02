<template>
  <div class="meggages">
    <div class="new">
      <p><span>主页</span>/新消息</p>
      <p>
        <span v-if="unMess==0">无消息</span>
        <input class="btn btn-info" v-if="unMess!='0'" value="朕以阅" @click="read" style="width: 5rem;">
      </p>

      <li v-for="item in unMess">
        <span>
          <router-link :to='{name:"UserPage",params:{username:item.author.loginname}}'>
            {{item.author.loginname}}
          </router-link>
        </span>
        <span v-if="item.type == 'reply'">回复了你的话题</span>
        <span v-if="item.type == 'at'">在话题</span>
        <span>
          <router-link :to="'/detail/' + item.topic.id +'#' + item.reply.id">
            {{item.topic.title}}
          </router-link>
        </span>
        <span v-if="item.type == 'at'">中@了你</span>
        <!--<span><input type="button" class="btn btn-info" @click="readone(item.id)" value="这条朕已阅"></span>-->
      </li>

    </div>
    <div class="old">
      <p>过往消息</p>
      <p v-if="hasread==0">无消息</p>
      <li v-for="item in hasread">
        <span>
          <router-link :to='{name:"UserPage",params:{username:item.author.loginname}}'>
            {{item.author.loginname}}
          </router-link>
        </span>
        <span v-if="item.type == 'reply'">回复了你的话题</span>
        <span v-if="item.type == 'at'">在话题</span>
        <span>
          <router-link :to="'/detail/' + item.topic.id +'#' + item.reply.id">
            {{item.topic.title}}
          </router-link>
        </span>
        <span v-if="item.type == 'at'">中@了你</span>
      </li>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: "meggages",
    data(){
      return{
        megData:{},
        unMess:[],
        hasread:[]
      }
    },
    created(){
      let token = 'c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf'
      Axios.get('https://cnodejs.org/api/v1/messages',{
        params:{
          accesstoken: "c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf"
        }
      }).then((res) => {
        console.log(res)
        this.unMess = res.data.data.hasnot_read_messages
        this.hasread = res.data.data.has_read_messages
      })
    },
    methods:{
      read(){
        let readData= {
          accesstoken: "c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf"
        }
        Axios({
          method:"post",
          url:'https://cnodejs.org/api/v1/message/mark_all',
          data: readData
        }).then((res) => {
          console.log(res)
          this.unMess=[]
        })
      },
      readone(id,index){
        let readData= {
          accesstoken: "c401c2b4-fc9c-4d94-8cc7-9c69e06c3eaf"
        }
        console.log(id)
        Axios({
          method:"post",
          url:'https://cnodejs.org/api/v1/message/mark_one/' + id,
          data: readData
        }).then((res) => {
          console.log(res)
          if (res.data.success = true){
            this.hasread.push(this.index)
          }
        })
      }
    }
}
</script>

<style scoped>
li{
  line-height: 4.8rem;
  font-size: 1.2rem;
  text-indent: 1rem;
  border-bottom: 1px solid #888888;
}
</style>
