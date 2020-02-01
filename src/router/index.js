import Vue from 'vue'
import Router from 'vue-router'
import Pusher from '@/components/Pusher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pusher',
      component: Pusher
    }
  ]
})
