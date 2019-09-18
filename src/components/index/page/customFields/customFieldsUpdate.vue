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
                <div class="field_update_center_head">
                    <span style="cursor:pointer;font-size:14px;color:#ff6333;margin-right:30px" @click="topreview()">预 览</span>
                    <el-button type="primary" size="medium" :disabled="isDisable" @click="submit" style="margin-right:10px !important;">提交</el-button>
                    <el-button class="info-btn" size="medium" @click="closeTag" style="margin-right:10px !important;">返回</el-button>
                </div>
                <el-form ref="attributeform" :model="fieldsform" label-width="80px" :rules="rules" class="field_form">
                    <el-form-item v-for="(item,index) in updateForm" :key="index" :label="item.name" :prop="item.field_name" class="field_form_item" :class="click_item_index == index ? 'bg_field' : ''" @click.native="clickFormItem($event,item,index)">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'textarea'" disabled type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'number'" disabled onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'floatnumber'" disabled onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'mobile'" disabled onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-select v-else-if="item.formType == 'select'" disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                            <!-- <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option> -->
                        </el-select>

                        <el-select v-else-if="item.formType == 'checkbox'" multiple disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                        </el-select>

                        <el-select v-else-if="item.formType == 'user' || item.formType == 'structure'" disabled multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                        </el-select>

                        <el-date-picker v-else-if="item.formType == 'date'" disabled v-model="item.default_value" type="date" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:240px">
                        </el-date-picker>

                        <el-date-picker v-else-if="item.formType == 'datetime'" disabled v-model="item.default_value" type="datetime" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px">
                        </el-date-picker>

                        <el-button v-else-if="item.formType == 'file'" size="mini" class="info-btn">上传</el-button>
                        <div v-if="item.formType == 'file'" class="el-upload__tip" style="line-height:16px">{{item.input_tips}}</div>

                        <div class="field_item_del" v-if="click_item_index == index && item.is_sys !== 1" @click="delFieldItem($event,item,index)">
                            <i class="el-icon-delete" style="color:#ff6633;font-size:16px"></i>
                        </div>
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
                        <el-input v-model="attributeform.name" placeholder="标识名不能为空" @input="handleInput($event,1)"></el-input>
                    </el-form-item>

                    <span class="fieldform_label">提示文字</span>
                    <el-form-item>
                        <el-input v-model="attributeform.input_tips" placeholder="显示在输入框或选项框内的文字" @input="handleInput($event,2)"></el-input>
                    </el-form-item>

                    <span class="fieldform_label" v-if="attributeField.default_value || attributeField.default_date || attributeField.default_datetime">默认值</span>
                    <el-form-item>
                        <el-input v-model="attributeform.default_value" v-if="attributeField.default_value" @input="handleInput($event,3)"></el-input>
                        <el-date-picker v-model="attributeform.default_value" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-if="attributeField.default_date" @input="handleChange($event,1)" style="width:100%"></el-date-picker>
                        <el-date-picker v-model="attributeform.default_value" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-if="attributeField.default_datetime" @input="handleChange($event,2)" style="width:100%"></el-date-picker>
                    </el-form-item>

                    <span class="fieldform_label" v-if="attributeField.max_length">字符上限</span>
                    <el-form-item>
                        <el-input v-model="attributeform.max_length" v-if="attributeField.max_length" @input="handleInput($event,4)"></el-input>
                    </el-form-item>

                    <span class="fieldform_label" v-if="attributeField.check_setting">选项设置</span>
                    <el-form-item class="field_checkbox" v-if="attributeField.check_value">
                        <el-checkbox-group v-model="attributeform.check_value" @change="handleChange($event,3)">
                            <div v-for="(el,i) in attributeform.check_setting" :key="i" class="check_div">
                                <el-checkbox :label="el.value" class="field_check">
                                    <el-input v-model="el.value" ></el-input>
                                </el-checkbox>
                                <span class="plus_remove_icon">
                                    <i class="el-icon-circle-plus" @click="plusCheck(el,i)"></i>
                                    <i class="el-icon-remove" @click="removeCheck(el,i)"></i>
                                </span>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item class="field_radiobox" v-if="attributeField.radio_value">
                        <el-radio-group v-model="attributeform.radio_value" @change="handleChange($event,4)">
                            <div v-for="(el,i) in attributeform.check_setting" :key="i" class="check_div">
                                <el-radio :label="el.value" class="field_check">
                                    <el-input v-model="el.value" ></el-input>
                                </el-radio>
                                <span class="plus_remove_icon">
                                    <i class="el-icon-circle-plus" @click="plusCheck(el,i)"></i>
                                    <i class="el-icon-remove" @click="removeCheck(el,i)"></i>
                                </span>
                            </div>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item>
                        <el-checkbox v-model="attributeform.is_null" label="设为必填" @change="handleChange($event,5)"></el-checkbox>
                        <br />
                        <el-checkbox v-model="attributeform.is_unique" label="设为唯一" @change="handleChange($event,6)"></el-checkbox>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-dialog title="自定义字段" :visible.sync="dialogVisible" width="50%" class="preview_dialog">
            <div class="preview_dialog_body">
                <el-form ref="attributeform" :model="fieldsform" label-width="80px" :rules="rules">
                    <el-form-item v-for="(item,index) in previewData" :key="index" :label="item.name" :prop="item.field_name">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'textarea'" disabled type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'number'" disabled onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'floatnumber'" disabled onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-input v-else-if="item.formType == 'mobile'" disabled onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" style="width:240px"></el-input>

                        <el-select v-else-if="item.formType == 'select'" disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                        </el-select>

                        <el-select v-else-if="item.formType == 'checkbox'" multiple disabled v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                        </el-select>

                        <el-select v-else-if="item.formType == 'user' || item.formType == 'structure'" disabled multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:240px">
                        </el-select>

                        <el-date-picker v-else-if="item.formType == 'date'" disabled v-model="item.default_value" type="date" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:240px">
                        </el-date-picker>

                        <el-date-picker v-else-if="item.formType == 'datetime'" disabled v-model="item.default_value" type="datetime" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px">
                        </el-date-picker>

                        <el-button v-else-if="item.formType == 'file'" disabled size="mini" class="info-btn">上传</el-button>
                        <div v-if="item.formType == 'file'" class="el-upload__tip" style="line-height:16px">{{item.input_tips}}</div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="medium" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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

                updateLabel: {},

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
                previewData:[],
                fieldsform:{},
                rules:{},

                dialogVisible:false,

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
                    check_value: [''],
                    radio_value: '',
                    is_null: 0,
                    is_unique: 0,
                },
                attributeField:{},

                fileList:[{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }],

                click_item_index: 0,
                updateData: {},

                isDisable:false
            }
        },
        
        mounted(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')

                this.updateLabel = this.$store.state.customFieldData

                let data = {
                    label: this.updateLabel.label
                }

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/list.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.updateForm = info

                    info.forEach(el => {
                        if(el.is_null == 1){
                            _this.rules[el.field_name] = [{required: true , message: ' '}]
                        }
                    });

                    _this.loadfield(_this.updateForm[0])
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadfield(val){
                let firstItem = val
                this.updateData = val
                let newArr = new Array()
                let request = false
                let unique = false

                val.setting.forEach(item => {
                    newArr.push({value:item})
                });
                if(val.is_null == 1){
                    request = true
                }
                if(val.is_unique == 1){
                    unique = true
                }

                this.attributeform = {
                    name: val.name,
                    field_name: val.field_name,
                    input_tips: val.input_tips,
                    default_value: val.default_value,
                    max_length: val.max_length,
                    check_setting: newArr,
                    check_value: val.default_value,
                    radio_value: val.default_value,
                    is_null: request,
                    is_unique: unique,
                }
                
                if(firstItem.formType == 'text' || firstItem.formType == 'email' || firstItem.formType == 'number' || firstItem.formType == 'floatnumber' || firstItem.formType == 'mobile'){
                    this.attributeField = {
                        default_value: true, default_date: false, default_datetime: false, max_length: false,
                        check_setting: false, check_value: false, radio_value: false,
                    }
                }else if(firstItem.formType == 'textarea'){
                    this.attributeField = {
                        default_value: true, default_date: false, default_datetime: false, max_length: true,
                        check_setting: false, check_value: false, radio_value: false,
                    }
                }else if(firstItem.formType == 'select'){
                    this.attributeField = {
                        default_value: false, default_date: false, default_datetime: false, max_length: false,
                        check_setting: true, check_value: false, radio_value: true,
                    }
                }else if(firstItem.formType == 'checkbox'){
                    this.attributeField = {
                        default_value: false, default_date: false, default_datetime: false, max_length: false,
                        check_setting: true, check_value: true, radio_value: false,
                    }
                }else if(firstItem.formType == 'user' || firstItem.formType == 'structure' || firstItem.formType == 'file'){
                    this.attributeField = {
                        default_value: false, default_date: false, default_datetime: false, max_length: false,
                        check_setting: false, check_value: false, radio_value: false,
                    }
                }else if(firstItem.formType == 'date'){
                    this.attributeField = {
                        default_value: false, default_date: true, default_datetime: false, max_length: false,
                        check_setting: false, check_value: false, radio_value: false,
                    }
                }else if(firstItem.formType == 'datetime'){
                    this.attributeField = {
                        default_value: false, default_date: false, default_datetime: true, max_length: false,
                        check_setting: false, check_value: false, radio_value: false,
                    }
                }
            },

            clickFieldItem(e,item){
                const _this = this

                if(item.label == 1){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "text", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "单行文本", setting: [], type: item.label,
                    })
                }else if(item.label == 2){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "textarea", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "多行文本", setting: [], type: item.label,
                    })
                }else if(item.label == 3){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: null, field_name: '', formType: "select", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "单选", setting: [''], type: item.label,
                    })
                }else if(item.label == 9){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: [], field_name: '', formType: "checkbox", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "多选", setting: [''], type: item.label,
                    })
                }else if(item.label == 5){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: null, field_name: '', formType: "number", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "数字", setting: [], type: item.label,
                    })
                }else if(item.label == 6){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: null, field_name: '', formType: "floatnumber", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "货币", setting: [], type: item.label,
                    })
                }else if(item.label == 4){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "date", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "日期", setting: [], type: item.label,
                    })
                }else if(item.label == 13){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "datetime", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "日期时间", setting: [], type: item.label,
                    })
                }else if(item.label == 7){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "mobile", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "手机", setting: [], type: item.label,
                    })
                }else if(item.label == 14){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "email", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "邮箱", setting: [], type: item.label,
                    })
                }else if(item.label == 10){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "user", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "人员", setting: [], type: item.label,
                    })
                }else if(item.label == 12){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "structure", input_tips: '', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "部门", setting: [], type: item.label,
                    })
                }else if(item.label == 11){
                    this.updateForm.push({
                        id: null, parent_id: null, label: null, sorting: null, operating: null, examine_category_id: null,
                        default_value: '', field_name: '', formType: "file", input_tips: '只能上传jpg/png文件，且不超过500kb', is_null: 0,
                        is_sys: 0, is_unique: 0, max_length: null, name: "附件", setting: [], type: item.label,
                    })
                }

                let length = this.updateForm.length
                this.updateForm.forEach((el,i) => {
                    if(i == length - 1){
                        el.field_name = el.formType + i
                        _this.click_item_index = i
                        _this.loadfield(el)
                    }
                });
            },
            clickFormItem(e,item,index){
                this.click_item_index = index
                this.loadfield(item)
            },
            delFieldItem(e,item,index){
                if(item.is_sys == 1){
                    this.$message({
                        message: '该字段不可删除'
                    })
                }else{
                    this.updateForm.splice(index,1)
                } 
            },


            handleInput(e,val){
                let info = this.updateData
                if(info.is_sys == 1){
                    this.$message({
                        message: '该字段不可修改'
                    })
                }else{
                    if(val == 1){
                        this.loadselectItem('name',e)
                    }else if(val == 2){
                        this.loadselectItem('input_tips',e)
                    }else if(val == 3){
                        this.loadselectItem('default_value',e)
                    }else if(val == 4){
                        this.loadselectItem('max_length',e)
                    }
                }
            },
            handleChange(e,val){
                let info = this.updateData
                if(info.is_sys == 1){
                    this.$message({
                        message: '该字段不可修改'
                    })
                }else{
                    if(val == 1){
                        this.loadselectItem('default_value',e)
                    }else if(val == 2){
                        this.loadselectItem('default_value',e)
                    }else if(val == 3){
                        this.loadselectItem('default_value',e)
                    }else if(val == 4){
                        this.loadselectItem('default_value',e)
                    }else if(val == 5){
                        if(e == true){
                            this.loadselectItem('is_null',1)
                        }else if(e == false){
                            this.loadselectItem('is_null',0)
                        }
                    }else if(val == 6){
                        if(e == true){
                            this.loadselectItem('is_unique',1)
                        }else if(e == false){
                            this.loadselectItem('is_unique',0)
                        }
                    }
                }
            },
            plusCheck(el,i){
                this.attributeform.check_setting.push({value:null})
            },
            removeCheck(el,i){
                this.attributeform.check_setting.splice(i,1)
            },
            loadselectItem(n,v){
                let _this = this
                this.rules = {}

                this.updateForm.forEach((el,i) => {
                    if(i == this.click_item_index){
                        el[n] = v
                    }
                    if(el.is_null == 1){
                        _this.rules[el.field_name] = [{required: true , message: ' '}]
                    }
                });
            },

            topreview(){
                let newarr = new Array()
                this.updateForm.forEach(el => {
                    if(el.is_sys == 0){
                        newarr.push(el)
                    }
                });

                this.previewData = newarr
                this.dialogVisible = true
            },

            submit(){
                const _this = this
                let newArr = new Array()

                this.updateForm.forEach(el => {
                    newArr.push({
                        id:el.id,
                        parent_id:el.parent_id,
                        label:el.label,
                        sorting:el.sorting,
                        operating:el.operating,
                        examine_category_id:el.examine_category_id,
                        name:el.name,
                        field_name:el.field_name,
                        type:el.type,
                        input_tips:el.input_tips,
                        max_length:el.max_length,
                        default_value:el.default_value,
                        is_unique:el.is_unique,
                        is_null:el.is_null,
                        is_sys:el.is_sys,
                        formType:el.formType,
                        setting:el.setting
                    })
                });

                let fieldForm = {
                    label: this.updateLabel.label,
                    data: newArr
                }

                this.isDisable = true
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/save.do?cId='+_this.$store.state.iscId,
                    data: fieldForm,
                }).then(function(res){
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        _this.isDisable = false
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+'userPageInfo/saveUserPageInfo.do?cId='+_this.$store.state.iscId,
                            data: fieldForm,
                        }).then(function(res){
                            if(res.data.code && res.data.code == "200") {
                                _this.closeTag();
                            }else {
                                _this.$message({
                                    message: '页面未同步成功，请重新保存此页面',
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            // console.log(err);
                        });
                    }else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },

            //取消时返回上一个页面，若只有一个页面，则返回首页
            closeTag() {
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/customFields');
                }else{
                    this.$router.push('/index');
                }
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
        border-bottom: 1px solid #f0f0f0;
        text-align: right;
        padding: 18px 0;
        box-sizing: border-box
    }
    .field_form{
        height: calc(100% - 70px);
        padding-bottom: 20px;
        box-sizing: border-box;
        overflow-y: overlay
    }

    .bg_field{
        background: #fff9eb;
        border-left: 2px solid #ff6333;
        box-sizing: border-box
    }
    .field_form_item.el-form-item{
        position: relative;
        padding: 10px 0;
        margin-bottom: 0;
        box-sizing: border-box
    }
    .field_form_item .el-input.is-disabled .el-input__inner, .field_form_item .el-textarea.is-disabled .el-textarea__inner{
        background-color: #fff;
        color: #606266;
        border-color: #dcdfe6;
        cursor: initial
    }
    .field_item_del{
        position: absolute;
        bottom: -15px;
        right: 40px;
        width: 30px;
        height: 30px;
        box-shadow: 0 0 3px #9c9c9c;
        /* box-shadow: 0 0 5px #ff916f; */
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center
    }

    .check_div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px
    }
    .field_check{
        flex: 0 0 220px;
    }
    .plus_remove_icon{
        margin-left: 35px;
        display: block;
        flex: 0 0 50px
    }
    .plus_remove_icon i{
        font-size: 16px;
        line-height: 40px;
        letter-spacing: 5px;
        color: rgb(190, 190, 190);
        z-index: 9
    }
</style>