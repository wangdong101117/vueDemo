<template>
    <!--<div>左边</div>-->
  <!-- 左边组件-->
  <!-- 使用了 NavMenu导航菜单组件
      <el-menu>: 导航菜单的容器
      <el-submenu>: 每一个导航元素
      unique-opened: 只展开一个子元素
      :router: 当值为true时, 会进入vue-router形式, 会将<el-menu-item>解析为router-link, 会将index解析为to属性
  -->
  <el-menu
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b" :unique-opened="true" :router="true">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/users">
          <i class="el-icon-location"></i>
          用户列表
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>小京京</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/demos">
          <i class="el-icon-location"></i>
          京京
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>导航三</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/ceshi">
          <i class="el-icon-location"></i>
          王八东
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>导航四</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
          <i class="el-icon-location"></i>
          照片
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
