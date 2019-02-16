<template>
    <!--<div>hah</div>-->
  <el-col :span="24">
    <!-- 面包屑导航:
       先使用element-ui提供的一个卡片容器: <el-card>
     -->
    <mybread level1="用户管理" level2="用户列表"></mybread>
    <!-- 搜索区域:
      使用了 element-ui 的 input输入框 组件
    -->
    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
      <!-- 使用了 element-ui 的 按钮组件 -->
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <!-- 添加用户按钮:
      使用了 elementi-ui 的 按钮组件
        @click="showAdd = true" 给点击事件绑定 data中的 showAdd, 以此控制按钮点击后, 显示新增面板
     -->
    <el-button type="success" plain @click="showAdd = true">添加用户</el-button>
    <!-- 新增添加用户面板:  使用了  一个dialog弹出框组件
      点击添加用户按钮之后, 弹出form表单
          使用了一个dialog弹出框组件
            title: 弹出框标题
            :visible.sync  用来控制弹出框的显示隐藏
            :model="form"  绑定 data 中的 form对象
            label="用户名称"  label 用来控制每一个input框绑定的form对象的属性
            :label-width="formLabelWidth": 表单的宽度
     -->
    <el-dialog title="添加" :visible.sync="showAdd">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格区域: 使用了element-ui的 表格组件
     :data  绑定的data 中的 tabledata
     property: 每一列绑定的 tabledata 中的 属性
     label:  每一列的文字描述
     -->
    <el-table ref="singleTable" :data="tableData" border highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="120"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!-- 使用switch开关组件
          如果仅仅使用 <el-switch>标签, 无法实现效果
          要添加一个父容器: <template slot-scope="scope"></template>
         -->
        <template slot-scope="scope">
          <!-- 注意switch开关的使用
           scope.row.mg_state :  用户的当前状态
           -->
          <!--{{scope.row.mg_state}}-->
          <el-switch @change="switchChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column property="" label="操作">
        <!-- 表格区域-操作部分: 使用 button 组件 -->
        <template slot-scope="scope">
          <!-- scope.row 是当前行的数据源, 内部保存了当前行的所有数据 -->
          <!--{{scope.row}}-->
          <el-button type="success" icon="el-icon-edit" plain size="small" @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="small" @click="delUser(scope.row.id)"></el-button>
          <el-button type="info" icon="el-icon-check" plain size="small" @click="setRole(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域: 是用了 Pagination 分页组件
      @size-change="handleSizeChange"  - 绑定的修改每页数据选择的事件
      @current-change="handleCurrentChange"  - 绑定的跳转页号事件
      :current-page="pagenum"   - 当前显示的是第几页
      :page-sizes="pagesizes"   - 绑定的可选择的 每页数据条数 选项
      :page-size   - 每页的数据条数
      layout=""   - 用于控制分页结构 每个部分的显示
      :total:    - 数据的总条数
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager , next, jumper"
      :total="total">
    </el-pagination>
  </el-col>
</template>

<script>
    export default {
      data () {
        return {
          search :'', // input搜索框上面 v-model双向绑定的 数据
          pagenum:1, // 获取用户请求时  请求参数中的 请求页数
          pagesize:4, // 获取用户请求时  请求参数参数中的 每页的个数
          pagesizes: [2, 4, 6, 8], // 供选择每页显示的数据条数
          showAdd: false, // showAdd 用来控制 新增用户 的 新增面板的显示与隐藏
          form: {  // 新增面板 弹出的dialog对话框中 form表单 绑定的对象
            username: '',
            password: '',
            email: '',
            mobile: ''
          },
          formLabelWidth: '80px', // 添加用户 新增面板 的 宽度
          tableData: [], //表格区域绑定的数据
          total: 20 // 所有的用户, 先给个默认值
        }
      },
      methods: {
        // 根据关键字搜索用户
        searchUser(){

        },
        // 添加用户 新增面板的 取消按钮 事件
        cancel () {},
        // 绑定的 添加用户 新增面板的 确认添加用户 按钮上的 事件
        addUser () {},
        // 获取所有用户信息
        async getAllData () {
          var res = await this.$http.get(`users?query=${this.search}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          console.log(res)
          var {data, meta:{msg, status}} = res.data
          if(status === 200){
            this.tableData = data.users
            this.total = data.total
          }
        },
        // 修改用户状态
        async switchChange (row) {
          // row 中保存了当前行中的 数据  row.mg_state 是用户的状态
          console.log(row.mg_state)
          var res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
          console.log(res)
          var {msg, state} = res.data.meta
          if (status === 200) {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.getAllData()
          }else {
            this.$message.error(msg)
          }
        },
        // 编辑按钮
        edit (row) {},
        // 删除用户按钮
        delUser (row) {},
        // 分配权限按钮
        setRole (row) {},
        // 控制当前每页显示的 条数
        handleSizeChange (val) {
          // val 是element-ui文档给出的, 是当前的 pagesize  当前每页的条数
          this.pagesize = val
          this.getAllData()
        },
        // 控制要显示第几页中的 数据
        handleCurrentChange (val) {
          // val 是element-ui文档中给出的, 就是当前的pagenum  当前的页面
          this.pagenum = val
          this.getAllData()
        }

      },
      created () {
        this.getAllData()
      }
    }
</script>

<style scoped>
.input-with-select{
  width: 320px;
}
</style>
