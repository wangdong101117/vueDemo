<template>
  <el-col :span="24" >
    <mybread level1="小京京" level2="京京"></mybread>
    <!-- 时间选择器 -->
    <!--固定时间点时间选择器:
     通过options选项中的 star、end和step指定可选的起始时间、结束时间和步长 -->
    <el-time-select
      v-model="value1"
      :picker-options="options"
      placeholder="选择时间">
    </el-time-select>

    <!-- 任意时间点 选择:  -->
    <!-- 通过selectableRange 限制可选时间范围。
    提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开arrow-control属性则通过界面上的箭头进行选择。-->
    <el-time-picker
      v-model="value2"
      :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
      placeholder="任意时间点">
    </el-time-picker>

    <!---->
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value3"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <!--<div>{{value4}}</div>-->
    <!--<div>{{value5}}</div>-->
    <!-- 日期时间选择: -->
    <br />
    <div class="block" :picker-options="pickerOptions1">
      <div class="demonstration">带快捷选项日期时间选择器演示:</div>
      <button @click="beforeDay">前一天</button>
      <button @click="today">今天</button>
      <button @click="afterDay">后一天</button>
      <el-date-picker
        v-model="value4"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </div>
  </el-col>
</template>

<script>
    export default {
        // name: "demos"
      data () {
        return {
          value1: '',
          options: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          },
          value2: new Date(2016, 9, 10, 18, 40), // 绑定的任意时间点数值
          value3: '',
          pickerOptions1: {
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
          value4: '',
          loading: true,
          value5: '',
          date: '',
          index: 1
        }
      },
      methods: {
        beforeDay () {
          // this.pickerOptions1.shortcuts[1].onClick()
          var date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * this.index)
          // this.loading = false
          this.index++;
          this.value4 = date;
          console.log(date);
        },
        today () {
          var date = new Date();
          this.value4 = date;
        },
        afterDay () {
          var date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24 * this.index)
          // this.loading = false
          this.index++;
          this.value4 = date;
          console.log(date);
        }
      },
      mounted () {
        setTimeout(function () {
          this.loading = false
        }, 5000)
      }
    }
</script>

<style scoped>
  button{
  }
</style>
