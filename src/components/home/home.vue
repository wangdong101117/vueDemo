<template>
  <div class="home">
    <el-container>
      <el-header>
        <Top />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Left />
        </el-aside>
        <el-main>
          <router-view>中间</router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Top from '@/components/common/top.vue'
  import Left from '@/components/common/left.vue'
    export default {
        // name: "home"
      data () {
        return {}
      },
      components: {
        Top,
        Left
      },
      // 在home.vue 中完成登录验证操作: 是在beforeCreate钩子函数中进行的验证
      beforeCreate () {
        var token = window.localStorage.getItem('token');
        if(!token) {
          this.$router.push('/login');
        }
      }
    }
</script>

<style scoped>
  .home, .el-container{
    height: 100%;
  }
  .el-header{
    background-color: mediumaquamarine;
    color: #333;
    text-align:center;
    line-height: 60px;
  }
  .el-aside{
    /*background-color: chocolate;*/
    color: #333;
    height: 100%;
    line-height: 160px;
  }
  .el-main{
    background-color: antiquewhite;
    color: #333;
    height: 100%;
    padding: 0 20px;
  }
</style>
