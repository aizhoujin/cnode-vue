<template>
    <div fromWrapper>
        <div class="input">
          <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
          <a class="button" @click="logon">登录</a>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import $ from 'jquery'
   export default {
     data() {
       return {
         token: '',
         loginname:this.loginname
       };
     },
     methods: {
       logon() {
         if (this.token === '') {
           alert('令牌格式错误,应为36位UUID字符串');
           return false;
         }
         // $.ajax({
         //   type: 'POST',
         //   url: 'https://cnodejs.org/api/v1/accesstoken',
         //   data: {
         //     accesstoken: this.token
         //   },
         //   dataType: 'json',
         //   success: (res) => {
         //     console.log(res)
         //   }
         // })
        //  let token = this.token
        //  console.log(token)
        //  Axios.post('https://cnodejs.org/api/v1/accesstoken/' + token).then((res) => {
        //   console.log(res)
        // })

          Axios({
            method:'post',
            url: 'https://cnodejs.org/api/v1/accesstoken',
            data: {
              accesstoken: this.token
            }
          }).then((res) => {
            // let user = res.data
            // sessionStorage.user = JSON.stringify(user)



            console.log(res)
            localStorage.id = res.data.id
            localStorage.url = res.data.avatar_url
            localStorage.aaa = res.data.loginname
            localStorage.loginname = res.data.loginname
            if (res.data.success == true){
              this.$router.push('/')
              console.log(res.data)
            }
          })
       }
     },
 }

</script>

<style scoped>
  .formWrapper {
    margin: 20px 10%;
    background-color: white;
    min-width: 600px;
  }

  .input {
    /*border: solid black 1px;*/
    padding: 100px;

  }
  .loginName {
    margin-bottom: 10px;
    width: 300px;
  }
  .password {
    width: 300px;
  }
  .loginBtn{
    width: 100px;
    margin: 10px 0 0 100px;
  }
</style>
