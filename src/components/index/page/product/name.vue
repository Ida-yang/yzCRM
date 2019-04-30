<template>
  <div class="app-container">

    <div class="filter-container">
      <el-table :data="tableData1" border fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" prop="">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="changeId(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="规格名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" @blur="changeLabel"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="guige" label="规格值">
          <template slot-scope="scope">
            <el-select v-model="scope.row.guige" multiple filterable allow-create default-first-option style="width:100%" no-data-text="请输入" @change="changeValue">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-button size="mini" @click="AddId">添加</el-button>

    <el-table :data="tableData" :key="key" border fit highlight-current-row style="width: 100%">
      <el-table-column header-align="center" align="center" type="index" width="45"></el-table-column>
      <el-table-column prop="name" label="fruitName" width="180"/>
      <el-table-column v-for="(item,i) in formThead" :key="i" :label="item.label">
        <template slot-scope="scope">
          {{ scope.row[item.value] }}
        </template>
      </el-table-column>
      <el-table-column prop="proNum" label="商品编码" width="180"/>
      <el-table-column prop="Code" label="条形码" width="180"/>
      <el-table-column prop="erpcode" label="ERP对接码" width="180"/>
    </el-table>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData1:[
        // {id:0,address:'地址1',guige:[]}
      ],

      tableData: [
        // {
        //   name: 'fruit-1',
        //   proNum: 'proNum-10',
        //   Code: 'Code-10',
        //   erpcode: 'erpcode-10',
        // },
        // {
        //   name: 'fruit-2',
        //   proNum: 'proNum-20',
        //   Code: 'Code-20',
        //   erpcode: 'erpcode-20',
        // }
      ],
      key: 1, // table key
      formThead: [], // 默认表头 Default header
      firstID:0,

      options: [],
    }
  },
  watch: {
    checkboxVal(valArr) {
        this.tableData.forEach(el => {
            console.log(el)
        });
    },
  },
  mounted(){
    this.loadHead()
  },
  methods:{
    loadHead(){
      this.formThead = []
      this.tableData1.forEach(el => {
        this.formThead.push({label:el.address,value:el.id})
      });
    },
    changeId(e){
      console.log(e)
    },
    AddId(){
      // console.log(this.tableData1)
      this.firstID = this.firstID+1
      this.tableData1.push({id:'spec'+this.firstID, address:'spec'+this.firstID, guige:[]})
      this.$options.methods.loadHead.bind(this)()
    },
    changeLabel(e){
      this.$options.methods.loadHead.bind(this)()
    },
    changeValue(e){
      let arr = this.tableData1
      this.tableData = []
      // console.log(this.formThead)
      if(arr[0].guige.length){
        let a = arr[0].guige
      }
      if(arr[1].guige.length){
        let b = arr[1].guige
      }
      if(arr[2].guige.length){
        let c = arr[2].guige
      }
      if(a){
        for(let i = 0;i < a.length; i ++){
          this.tableData.push({name:'1212',spec1:a[i],proNum:'00',Code: '10-20',erpcode: '10-20',})
        }
      }
      // if(arr.length == 1){
      //   let a = arr[0].guige
      //   for(let i = 0;i < a.length; i ++){
      //     // console.log(a)
      //     this.tableData.push({name:'1212',spec1:a[i],proNum:'00',Code: '10-20',erpcode: '10-20',})
      //   }
      // }
      // if(arr.length == 2){
      //   let a = arr[0].guige
      //   let b = arr[1].guige
      //   // console.log(a,b)
      //   for(let i = 0; i < a.length; i ++){
      //     for(let j = 0; j < b.length; j ++){
      //       this.tableData.push({name:'1212',spec1:a[i], spec2:b[j],proNum:'00',Code: '10-20',erpcode: '10-20',})
      //     }
      //   }
      // }
      // if(arr.length == 3){
      //   let a = arr[0].guige
      //   let b = arr[1].guige
      //   let c = arr[2].guige
      //   console.log(a,b,c)
      //   for(let i = 0; i < a.length; i ++){
      //     for(let j = 0; j < b.length; j ++){
      //       for(let k = 0; k < c.length; k ++){
      //         this.tableData.push({name:'1212',spec1:a[i], spec2:b[j], spec3:c[k],proNum:'00',Code: '10-20',erpcode: '10-20',})
      //       }
      //     }
      //   }
      // }
      
    },
  },
}
</script>