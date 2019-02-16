<template>
  <!--<div>顶部</div>-->
  <!--Top 头部组件-->
  <!--使用了 Layout布局组件：
    1. 通过基础的24分栏， 迅速简便的创建布局
    2. 通过 row 和 col 组件， 并且通过 col 组件的span属性 我们就可以自由的组合布局
  -->
    <el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">将来放我俩的图片</div></el-col>
        <el-col :span="18"><div class="grid-content center bg-purple-light">王八东和小京京</div></el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <a href="#" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-row>
</template>
<script>
    export default {
      methods: {
        logout () {
          // 使用element-ui中的 MessageBox的 弹框组件中的确认消息弹框
          // 调用 $confirm 方法即可打开消息提示， 它模拟了系统的 confirm
            // this.$confirm('此操作将永久的删除该文件， 是否继续'， '提示'
            // { confirmButtonText: '确定'，  确认按钮 上面的文本内容
            // cancelButtonText: '取消'，  取消按钮 上面的文本内容
            // type: 'warning'   文字前面会有一个警告图标
            // }).then(()=>{
            //    this.$message({
            //         type: 'success'
            //                 message: '删除成功！'
            //    })
            // })
          // .then()方法    点击了 确定按钮 后 执行
          // .catch()方法    点击了 取消按钮 后 执行
          this.$confirm('是否退出', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            // 清除token:
            window.localStorage.removeItem('token')
            // 并跳转到登录界面
            this.$router.push('/login')
          }).catch(()=>{
            this.$message({
              type:'danger',
              message: '取消退出'
            })
          })
        }
      }
    }
</script>

<style scoped>
.bg-purple{

}
  .center{
    font-size: 24px;
  }
  .bg-purple a{
    color: deepskyblue;
  }
</style>
