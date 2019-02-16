<template>
  <!-- 将面包屑导航封装为组件
   要在main.js进行导入, 然后注册为全局组件
   导入:  import Mybread from '@/components/common/mybread.vue'
   注册为全局组件:  Vue.component(Mybread.name, Mybread)
          导出组件时, 设置了一个:  name: 'mybread'
   -->
    <el-card>
      <el-breadcrumb separator-class="el-icon-caret-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ level2 }}</el-breadcrumb-item>
        <!--<div class="block">-->
          <!--<span class="demonstration">带快捷选项</span>-->
          <!--<el-date-picker-->
            <!--v-model="value"-->
            <!--align="right"-->
            <!--type="date"-->
            <!--placeholder="选择日期"-->
            <!--:picker-options="pickerOptions1">-->
          <!--</el-date-picker>-->
        <!--</div>-->
      </el-breadcrumb>
    </el-card>
</template>

<script>
    export default {
      // 导出的是一个对象, 设置一个name属性, 表示创建的组件名
          // 导出后, 在main.js中导入后, 要将封装的面包屑导航组件注册为全局组件:
          //     Vue.component('组件名', 导出的组件), 因此要设置一个name
        name: "mybread",
      /* 面包屑导航的数据不能写死, 应该在不同的二级路由中显示对应的数据
      * 因此可以使用父组件给组件传参: ()
      * mybread组件是子组件, 传参步骤:
      * <1> 父组件传:
      *     1. 在父组件中定义好要传给子组件的参数
      *     2. 在<mybread level1="" level2="">设置自定义属性, 属性值为父组件要传递的参数
      * <2> 子组件接:
      *     1. 在子组件中通过 props 属性来接收: 设置props= ['level1', 'level2']
      *     2. level1 level2 内部保存的就是父组件要传递的参数
      */
      props: ['level1', 'level2'],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value: '',
    }
</script>

<style scoped>
  .block {
    float: right;
    height: 30px;
  }
  /*.time .el-input__icon {*/
    /*line-height: 30px;*/
  /*}*/
  /*.time .el-input__inner{*/
    /*height: 30px;*/
    /*line-height: 30px;*/
  /*}*/
</style>
