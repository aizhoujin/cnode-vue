import Vue from 'vue'
import Router from 'vue-router'
import topics from '@/components/topics'
import detail from '@/components/detail'
import UserPage from '@/components/userpath'
import LoginPage from '@/components/loginPage'
import Newtopic from '@/components/Newtopic'
import meggages from '@/components/meggages'
import Collect from '@/components/collect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'topics',
      component: topics
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path:'/user/:username',
      name: 'UserPage',
      component: UserPage
    },
    {
      path:'/collect/:loginname',
      name: 'collect',
      component: Collect
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/new',
      name: 'Newtopic',
      component: Newtopic
    },
    {
      path: '/meggages',
      name: 'meggages',
      component: meggages
    }

  ]
})
