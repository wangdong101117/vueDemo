<template>
  <el-col :span="24">
    <!-- 面包屑导航: -->
    <mybread level1="流动性管理" level2="查询方案选择 "></mybread>
    <!-- 方案选择部分: -->
    <el-card>
      <el-row class="row"><i class="ic"></i>方案选择</el-row>
      <!-- 表格组件: -->
      <el-table ref="singleTable" :data="tableData" border highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="username" label="序号" width="120"></el-table-column>
        <el-table-column property="email" label="创建人" width="120"></el-table-column>
        <el-table-column property="mobile" label="创建时间"></el-table-column>
        <el-table-column property="" label="操作">
          <!-- 表格区域-操作部分: 使用 button 组件 -->
          <template slot-scope="scope">
            <!-- scope.row 是当前行的数据源, 内部保存了当前行的所有数据 -->
            <!--{{scope.row}}-->
            <el-button type="success" icon="el-icon-edit" plain size="small" @click="editBtn(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="small" @click="delBtn(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 方案详情部分: -->
      <el-row class="row1"><i class="ic"></i>方案详情</el-row>
      <!-- input输入框 -->
      <div class="demo-input-suffix">
        <div class="iptBox">
          <span>方案名称:</span>
          <input placeholder="请输入内容" v-model="input1" class="ipt"></input>
        </div>
        <div class="iptBox">
          <span>数据单位:</span>
          <input placeholder="请输入内容" v-model="input2" class="ipt"></input>
        </div>
        <div class="iptBox">
          <span>小数位数:</span>
          <input placeholder="请输入内容" v-model="input3" class="ipt"></input>
        </div>

      </div>
      <!-- 可选用户列表-->
      <template>
        <div>
           <!--使用树形穿梭框组件  -->
          <!-- 参数说明
          1. width` 说明：`宽度` 类型：`String` 必填：`false` 默认：`100%` 补充：`建议在外部盒子设定宽度和位置`
          2. height` 说明：`高度` 类型：`String` 必填：`false` 默认：`320px`
          3.`title` 说明：`标题` 类型：`Array` 必填：`false` 默认：`["源列表", "目标列表"]`
          4.`button_text` 说明：`按钮名字` 类型：`Array` 必填：`false` 默认：`空`
          5. fromData` 说明：`源数据` 类型：`Array` 必填：`true` 补充：`数据格式同element-ui tree组件，但必须有id和pid`
          6.`toData` 说明：`目标数据` 类型：`Array` 必填：`true` 补充：`数据格式同element-ui tree组件，但必须有id和pid`
          7.`defaultProps` 说明：`配置项-同el-tree中props` 必填： `false` 补充：`用法和el-tree的props一样`
          8.`node_key` 说明：`自定义node-key的值，默认为id` 必填：`false` 补充：`必须与treedata数据内的id参数名一致，必须唯一`
          9.`pid` 说明：`自定义pid的参数名，默认为"pid"` 必填：`false` 补充：`有网友提出后台给的字段名不叫pid，因此增加自定义支持`
          10.`leafOnly` 说明：`是否只返回叶子节点` 类型：`Boolean` 必填：`false` 补充：`默认false，如果你只需要返回的末端子节点可使用此参数`
          11.`filter` 说明：`是否开启筛选搜索功能 ` 类型：`Boolean` 必填：`false`
          12.`openAll` 说明：`是否默认展开全部` 类型：`Boolean` 必填：`false`
          13. `renderContent` 说明：`自定义树节点` 类型：`Function` 必填：`false` 补充：`用法同element-ui tree`
          14. `mode` 说明：`设置模式，字段可选值为transfer|addressList` 类型：`String` 必填：`false` 补充：`mode默认为transfer模式，即树形穿梭框模式，可配置字段为addressList改为通讯录模式，通讯录模式时按钮不可自定义名字，如要自定义标题名在title数组传入四个值即可，addressList模式时标题默认为通讯录、收件人、抄送人、密送人`
          15. `transferOpenNode` 说明：`穿梭后是否展开穿梭的节点` 类型：`Boolean` 必填：`false` 补充：`默认为true即展开穿梭的节点，便于视觉查看，增加此参数是因为数据量大时展开会有明显卡顿问题，但注意，如此参数设置为false则穿梭后不展开，毕竟无法确定第几层就会有庞大数据`
          16. `defaultCheckedKeys` 说明：`默认展开节点` 类型：`Array` 必填：`false` 补充：`只匹配初始时默认节点，不会在你操作后动态改变默认节点`
          17. `placeholder` 说明：`设置搜索框提示语` 类型：`String` 必填：`false` 补充：`默认为请输入关键词进行筛选`
          18. `defaultTransfer` 说明：`是否自动穿梭一次默认选中defaultCheckedKeys的节点` 类型：`Boolean` 必填：`false` 补充：`默认false，用来满足用户不想将数据拆分成fromData和toData的需求`
       -- 事件:
          1.`addBtn` 说明：`点击添加按钮时触发的事件` 回调参数：`function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表`
          2 `removeBtn` 说明：`点击移除按钮时触发的事件` 回调参数：`function(fromData,toData,obj),树形穿梭框transfer模式分别为1.移动后左侧数据，2.移动后右侧数据，3.移动的节点keys、nodes、halfKeys、halfNodes对象；通讯录addressList模式时返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表`
          ！-->
          <tree-transfer
            :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"
            @addBtn='add' @removeBtn='remove' :mode='mode' filte="false" openAll>
          </tree-transfer>
        </div>
      </template>
    </el-card>
  </el-col>
</template>

<script>
  import treeTransfer from 'el-tree-transfer' // 引入
    export default {
      data () {
          return {
            tableData:[], // 表格组件区域绑定的数据
            input1: '',
            input2: '',
            input3: '',
            title: ['左侧', '右侧'], // 左右两侧列表的标题
            mode:'transfer',
            fromData:[ //左侧列表的数据源
              {
                id: "1",
                pid: 0,
                label: "一级 1",
                children: [
                  {
                    id: "1-1",
                    pid: "1",
                    label: "二级 1-1",
                    children: []
                  },
                  {
                    id: "1-2",
                    pid: "1",
                    label: "二级 1-2",
                    children: [
                      {
                        id: "1-2-1",
                        pid: "1-2",
                        children: [],
                        label: "二级 1-2-1"
                      },
                      {
                        id: "1-2-2",
                        pid: "1-2",
                        children: [],
                        label: "二级 1-2-2"
                      }
                    ]
                  }
                ]
              },
              {
                id: "2",
                pid: 0,
                label: "二级 1",
                children: [
                  {
                    id: "2-1",
                    pid: "1",
                    label: "二级 2-1",
                    children: []
                  }]
              }
            ],
            toData:[] // 右侧列表的数据源
          }
      },
      methods: {
          // 编辑按钮
        editBtn () {},
          // 删除按钮
        delBtn () {},
        // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
        changeMode() {
          if (this.mode == "transfer") {
            this.mode = "addressList";
          } else {
            this.mode = "transfer";
          }
        },
        // 监听穿梭框组件添加
        add(fromData,toData,obj){
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('fromData',fromData);
          console.log('toData',toData);
          console.log('obj',obj);
        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj) {
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        }
      },
      components:{ treeTransfer } // 注册
    }
</script>

<style scoped>
  .row {
    font-weight: 700;
    font-size: 14px;
    padding-bottom: 6px;
  }
  .ic {
    float: left;
    /*width: 4px;*/
    height: 14px;
    border: 3px solid blue;
    margin-right: 6px;
  }
  .demo-input-suffix{
    font-size: 12px;
    overflow: hidden;
  }
  .ipt {
    float: left;
    width: 220px;
    height: 28px;
    line-height: 28px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    webkit-appearance: none;
  }
  span {
    float: left;
    height: 28px;
    line-height: 28px;
    padding-right: 6px;
  }
  .iptBox{
    float: left;
    margin-right: 96px;
  }
  .iptBox:nth-child(3){
    margin-right: 0;
  }
  .row1 {
    font-weight: 700;
    font-size: 14px;
    padding: 10px 0;
  }
</style>
