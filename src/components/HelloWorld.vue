<template>
  <div class="hello">
    <img src="../assets/logo.png" />
    <h3>{{ msg }}</h3>
    <ul>
      <li>
        <a href="/#/antCollectEnergy">入口</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '蚂蚁森林收集能量效果移动端实现'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
