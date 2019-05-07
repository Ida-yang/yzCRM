<template>
  <!-- <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div>
    <button @click="getUEContent()">获取内容</button>
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
  </div> -->
  <div>
  <el-button @click="add">添加</el-button>
  <el-table :data="data">
  <el-table-column prop="name" label="名称">
  <template  slot-scope="scope">
  <el-input v-model="data[scope.$index].name"></el-input>
  </template>
</el-table-column>
    <el-table-column prop="age" label="年龄">
      <template  slot-scope="scope">
        <el-input v-model="data[scope.$index].age"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="age" label="年龄">
      <template  slot-scope="scope">
     <el-button @click="deleteRow(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<style>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
  import UE from '../../../index/ue.vue';
  export default {
    components: {UE},
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 600
        },
        data:[]
      }
    },
    methods: {
      // getUEContent() {
      //   let content = this.$refs.ue.getUEContent();
      //   this.$notify({
      //     title: '获取成功，可在控制台查看！',
      //     message: content,
      //     type: 'success'
      //   });
      //   console.log(content)
      // }
      add(){
        this.data.push({});
      },
      deleteRow(index){
        this.data.splice(index,1);
      }
    }
  };
</script>