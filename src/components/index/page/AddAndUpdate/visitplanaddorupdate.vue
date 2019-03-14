<template>
    <!-- 拜访计划新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <el-form-item
                class="formitemcont"
                label-width="100px"
                v-for="item in visitaddOrUpdateData.createForm"
                :label="item.label"
                :key="item.inputModel"
                :prop="item.inputModel">

                <el-input 
                    v-if="!item.type || item.type == 'input'"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off"
                    @keyup.enter.native="submit">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'require' && item.inputModel == 'customerpoolid'"
                    :value="myForm[item.inputModel]"
                    @input="handleoninput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-select 
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'contactsid'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @select="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option v-for="o in item.options" :key="o[item.okey]" :label="o[item.olabel]" :value="o[item.ovalue]"></el-option>
                </el-select>
                <el-date-picker
                    v-else-if="item.type && item.type == 'date'"
                    v-model="myForm[item.inputModel]"
                    type="date"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    default-value="1985-06-15"
                    style="width:90%;" 
                    auto-complete="off">
                </el-date-picker>
            </el-form-item>
            <div style="margin-left:60px;">
                <el-button class="searchbutton" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div>
        </el-form>
        <div class="line"></div>
        <div class="formlist">
            <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{order: 'ascending'}"
                max-height="580"
                style="text-align:center">
                <el-table-column
                    header-align="center"
                    align="center"
                    width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="address"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="公司地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    header-align="left"
                    align="left"
                    min-width="40"
                    label="法人"
                    sortable>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';

export default {
    name:'visitplanaddorupdate',
    data(){
        return{
            visitaddOrUpdateData:{},

            myForm:{},

            rules:{},

            tableData:null,
            searchvalue:null,
        }
    },
    activated(){
        this.loadData()
    },
    methods:{
        //获取右边表格
        loadTable(){
            const _this = this
            let qs =require('querystring')
            let pageInfo = {}
            pageInfo.page = this.page;
            pageInfo.limit = this.limit;
            pageInfo.pId = this.$store.state.ispId;
            pageInfo.searchName = this.searchvalue
            // console.log(pageInfo)
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(pageInfo),
            }).then(function(res){
                // console.log(res.data.map.success)
                _this.tableData = res.data.map.success.customerpools
            }).catch(function(err){
                console.log(err);
            });
            },
        //加载或重载页面
        loadData() {
            this.visitaddOrUpdateData = this.$store.state.visitaddOrUpdateData;
            console.log(this.visitaddOrUpdateData)

            // 设置默认值
            let createForm = this.visitaddOrUpdateData.createForm;
            let setForm = this.visitaddOrUpdateData.setForm;
            if(setForm) {
                createForm.forEach((item, index) => {
                    if(item.type && item.type == 'select') {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                    } else if(item.type && item.type == "date") {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                    } else {
                        this.myForm[item.inputModel] = setForm[item.inputModel];
                    }
                });
                // console.log(this.myForm);
                this.$emit('input', this.myForm);
            }
        },
        getRow(index,row){
            console.log(row)
        },
        handleInput(val, key) {
            this.myForm[key] = val;
            // console.log(val)
        },
        handleoninput(val,key){
            // const _this = this
            this.myForm[key] = val
            // console.log(this.myForm[key])
            this.searchvalue = val
            this.$options.methods.loadTable.bind(this)(true);
        },
        submit(){
            console.log(this.myForm)
        },
        closeTag(){
            console.log('我点击取消了')
        },
    },
}
</script>

<style>
    .content {
        width: 98%;
    }
    .myForm {
        width: 41%;
        float: left;
    }
</style>


