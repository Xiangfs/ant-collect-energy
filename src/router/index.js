import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AntCollectEnergy from '@/components/antCollectEnergy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/antCollectEnergy',
      name: 'antCollectEnergy',
      component: AntCollectEnergy
    }
  ]
})
