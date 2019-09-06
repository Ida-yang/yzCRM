<template>
    <div class="field_update">
        <el-row class="field_update_row" :gutter="10">
            <el-col :span="7" class="field_update_col field_update_left">
                <span class="field_update_title">字段库</span>
                <div class="field_warehouse">
                    <div class="field_option" v-for="(item,index) in fieldList" :key="index" @click="clickFieldItem($event,item)">
                        <i :class="item.icon" style="color:#F2B774"></i>
                        &nbsp;{{item.name}}
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="field_update_col field_update_center">
                <div class="field_update_center_head"></div>
                <el-form ref="attributeform" :model="fieldsform" label-width="80px" :rules="rules" class="field_form">
                    <el-form-item v-for="(item,index) in updateForm" :key="index" :label="item.name" :prop="item.formType" class="vfvdfgdfgd" :class="click_item_index == index ? 'bg_field' : ''" @click="clickFormItem($event,item)">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)"></el-input>
                        <el-input v-else-if="item.formType == 'textarea'" type="textarea" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)"></el-input>
                        <el-input v-else-if="item.formType == 'number'" onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)"></el-input>
                        <el-input v-else-if="item.formType == 'floatnumber'" onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)"></el-input>
                        <el-input v-else-if="item.formType == 'mobile'" onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)"></el-input>
                        <el-select v-else-if="item.formType == 'select'" v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>
                        <el-select v-else-if="item.formType == 'checkbox'" multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>
                        <el-select v-else-if="item.formType == 'user' || item.formType == 'structure'" multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:calc(100% - 15px)">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>
                        <el-date-picker v-else-if="item.formType == 'date'" v-model="item.default_value" type="date" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:calc(100% - 15px)">
                        </el-date-picker>
                        <el-date-picker v-else-if="item.formType == 'datetime'" v-model="item.default_value" type="datetime" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:calc(100% - 15px)">
                        </el-date-picker>
                        <el-upload v-else-if="item.formType == 'file'" class="upload-demo" ref="upload" action="" 
                            :auto-upload="false" :on-change="beforeUploadfile" :file-list="fileList">
                            <el-button size="mini" class="info-btn">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="7" class="field_update_col field_update_right">
                <div class="field_update_right_head">
                    <span class="field_update_title">字段属性</span>
                </div>
                <el-form ref="attributeform" :model="attributeform" class="attribute_form">
                    <span class="fieldform_label">标识名</span>
                    <el-form-item>
                        <el-input v-model="attributeform.name" placeholder="标识名不能为空"></el-input>
                    </el-form-item>
                    <span class="fieldform_label">提示文字</span>
                    <el-form-item>
                        <el-input v-model="attributeform.input_tips" placeholder="显示在输入框或选项框内的文字"></el-input>
                    </el-form-item>
                    <span class="fieldform_label">默认值</span>
                    <el-form-item>
                        <el-input v-model="attributeform.default_value"></el-input>
                    </el-form-item>
                    <span class="fieldform_label">字符上限</span>
                    <el-form-item>
                        <el-input v-model="attributeform.max_length"></el-input>
                    </el-form-item>
                    <span class="fieldform_label">选项设置</span>
                    <el-form-item class="field_checkbox">
                        <el-checkbox-group v-model="attributeform.check_value">
                            <el-checkbox v-for="(el,i) in attributeform.check_setting" :key="i" :label="el.value">
                                <el-input v-model="el.value" ></el-input>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item class="field_radiobox">
                        <el-radio-group v-model="attributeform.radio_value">
                            <el-radio v-for="(el,i) in attributeform.radio_setting" :key="i" :label="el.value">
                                <el-input v-model="el.value" ></el-input>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="attributeform.is_null" label="设为必填"></el-checkbox>
                        <br />
                        <el-checkbox v-model="attributeform.is_unique" label="设为唯一"></el-checkbox>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        data(){
            return{
                msg:'自定义字段详情',

                updateData: {},

                fieldList:[
                    {label:1, name:'单行文本', icon:'el-icon-date'},
                    {label:2, name:'多行文本', icon:'el-icon-date'},
                    {label:3, name:'单选', icon:'el-icon-date'},
                    {label:9, name:'多选', icon:'el-icon-date'},
                    {label:5, name:'数字', icon:'el-icon-date'},
                    {label:6, name:'货币', icon:'el-icon-date'},
                    {label:4, name:'日期', icon:'el-icon-date'},
                    {label:13, name:'日期时间', icon:'el-icon-date'},
                    {label:7, name:'手机', icon:'el-icon-date'},
                    {label:14, name:'邮箱', icon:'el-icon-date'},
                    {label:10, name:'人员', icon:'el-icon-date'},
                    {label:12, name:'部门', icon:'el-icon-date'},
                    {label:11, name:'附件', icon:'el-icon-date'},
                ],

                updateForm:[],
                fieldsform:{},
                rules:{},

                attributeform:{
                    name: '',
                    field_name: '',
                    input_tips: '',
                    default_value: '',
                    max_length: '',
                    check_setting: [
                        {value:'check_setting'},
                        {value:'check_value'},
                        {value:''},
                    ],
                    check_value: [],
                    radio_setting:[
                        {value:'radio_value'},
                        {value:'radio_setting'},
                        {value:''},
                    ],
                    radio_value: '',
                    is_null: false,
                    is_unique: false,
                },

                fileList:[{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }],

                click_item_index: 0
            }
        },
        
        mounted(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    label: 1
                }

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/list.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.updateForm = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            clickFieldItem(e,item){
                console.log(item)
            },
            clickFormItem(e,item,index){
                console.log(e,item,index)
                this.click_item_index = index
            },

            beforeUploadfile(file, fileList){
                console.log(file, fileList)
            },
        }
    }
</script>

<style>
    .field_update{
        /* width: 100%; */
        height: 100%;
        background-color: #f0f0f0
    }
    .field_update_row{
        width: 100%;
        height: calc(100% - 10px);
        background-color: #fff;
        display: flex
    }
    .field_update_col{
        border-right: 1px solid #f0f0f0;
        box-sizing: border-box
    }
    .field_update_left{
        padding: 20px 15px 20px 20px !important;
        box-sizing: border-box
    }
    .field_update_center{
        padding: 0 !important
    }
    .field_update_right{
        padding: 0 !important;
        overflow-y: overlay
    }
    .field_update_title{
        line-height: 50px
    }

    .field_warehouse{
        font-size: 13px;
        display: flex;
        flex-wrap: wrap
    }
    .field_option{
        flex: 0 0 calc(50% - 5px);
        margin-bottom: 10px;
        padding: 6px 12px;
        box-sizing: border-box;
        background-color: #fff9eb;
    }
    .field_option:nth-child(2n){
        margin-left: 10px
    }

    .field_update_right_head{
        padding: 20px 0 0 15px;
        border-bottom: 1px solid #f0f0f0
    }
    .attribute_form{
        padding: 10px 25px 20px 15px;
        box-sizing: border-box
    }
    .fieldform_label{
        font-size: 14px;
        color: #606266;
        line-height: 24px
    }
    .field_checkbox .el-form-item__content{
        line-height: 30px;
        border-bottom: 1px solid #f0f0f0
    }
    .field_checkbox .el-checkbox+.el-checkbox{
        margin: 0
    }
    .field_radiobox .el-radio-group{
        line-height: 30px;
        border-bottom: 1px solid #f0f0f0
    }
    .field_radiobox .el-radio+.el-radio{
        margin: 0
    }

    .field_update_center_head{
        height: 70px;
        border-bottom: 1px solid #f0f0f0
    }
    .field_form{
        height: calc(100% - 70px);
        overflow-y: overlay
    }

    .bg_field{
        background: #fff9eb;
    }
    .vfvdfgdfgd:target{
        background-color: rgb(109, 108, 167);
    }
</style>