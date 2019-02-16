<template>
    <!--登录界面: 是用了element-ui中的from表单组件-->
  <div id="form">
    <!-- 通过设置 label-position 属性可以改变表单域标签的位置
     可选值为: top left , 当设置为top时, 标签会置于表单域的顶部-->
    <el-form :model="formObj" status-icon  ref="ruleForm2" label-width="100px" class="el-form" label-position="top">
      <h2>请登录</h2>
      <el-form-item label="用户名" prop="pass" label-position="top">
        <el-input type="text" v-model="formObj.username" autocomplete="off" name="uaername"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="formObj.password" autocomplete="off" name="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary submit" round  @click.prevent="getBtn" class="btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
    export default {
        data () {
          return {
            formObj:{
              username:'',
              password:''
            }
          }
        },
      methods: {
          // 将异步代码改为同步代码来书写, 可以让代码看起来更简洁
          // 使用 async 和 await 来修改异步代码
          //     - async 写在在方法名之前
          //     - await 用来修饰异步方法, 被修改的异步方法会在执行完成后, 与同步方法一样,返回它得到的数据
          //     - 不用在回调函数中使用这个返回值
          async getBtn () {
            var res = await this.$http.post('login', this.formObj)
            console.log(res)
            var {data, meta: {msg, status}} = res.data;
            // 保存token值:
            window.localStorage.setItem('token', data.token);
            if(status === 200){
              this.$message({
                message: msg,
                type: 'success'
              })
              this.$router.push('/home')
            }else{
              this.$message.error(msg)
            }
          }
      }
    }
</script>

<style scoped>
#form{
  background-color: aliceblue;
  height: 100%;
  position: relative;
}
  .el-form{
    position: absolute;
    width: 500px;
    padding: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  .btn{
    width: 100%;
  }
  h2 {
    text-align: center;
  }
</style>
