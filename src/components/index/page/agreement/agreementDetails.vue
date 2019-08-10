<template>
    <!-- 合同详情页 -->
    <el-row class="agrdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{agreementdetail.poolName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>合同代码：<span>{{agreementdetail.contract_number}}</span></li>
                            <li>合同名称：<span>{{agreementdetail.contract_name}}</span></li>
                            <li>商机名称：<span>{{agreementdetail.opportunity_name}}</span></li>
                            <li>合同金额：<span class="bold_span">{{agreementdetail.amount | commaing}} 元</span></li>
                            <li>合同类型：<span>{{agreementdetail.contract_type}}</span></li>
                            <li>客户签约人：<span>{{agreementdetail.signatories}}</span></li>
                            <li>我方签约人：<span>{{agreementdetail.our_signatories}}</span></li>
                            <li>签约时间：<span>{{agreementdetail.start_date}}</span></li>
                            <li>到期时间：<span>{{agreementdetail.end_date}}</span></li>
                            <li>剩余天数：<span>{{agreementdetail.due_time}}</span></li>
                        </ul>
                        <div class="agreeaudited" v-if="agreementdetail.checkStatus == 1">
                            <img class="audited_img" :src="auditing" alt="审核中">
                        </div>
                        <div class="agreeaudited" v-if="agreementdetail.checkStatus == 2">
                            <img class="audited_img" :src="audited" alt="已审核">
                        </div>
                        <div class="agreeaudited" v-if="agreementdetail.checkStatus == 3">
                            <img class="audited_img" :src="noaudit" alt="未通过">
                        </div>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <el-popover placement="right-start" width="220" trigger="click">
                            <div style="max-height:400px;overflow-y:overlay">
                                <div class="examine_popover" v-for="(b,j) in examineLog" :key="j">
                                    <span class="examine_ico">
                                        <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                        <i v-if="b.examineStatus == 1" class="el-icon-circle-check-outline" style="color:#67c23a;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 2" class="el-icon-circle-close-outline" style="color:#f56c6c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 5" class="el-icon-circle-plus-outline" style="color:#67c23a;font-size:20px"></i>
                                    </span>
                                    <div class="examint_msg">
                                        <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                        <p v-if="b.examineStatus == 1">{{b.realname + ' 已审核'}}</p>
                                        <p v-if="b.examineStatus == 2">{{b.realname + ' 已拒绝'}}</p>
                                        <div class="examint_remark"><p>{{b.remarks}}</p></div>
                                    </div>
                                </div>
                            </div>
                            <span slot="reference" style="font-size:14px;;text-decoration:underline">查看审核历史</span>
                        </el-popover>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck && agreementdetail.checkStatus !== 2">通过</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck && agreementdetail.checkStatus !== 2">拒绝</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(4)" v-show="hasCheck">驳回</el-button>
                    </div>
                    <div class="text item">
                        <div class="examine_c">
                            <div v-for="(item,index) in examineList" :key="index" class="examine_item">
                                <el-popover placement="bottom" width="220" trigger="hover" class="examine_cont">
                                    <div class="examine_popover" v-for="(b,j) in item.userList" :key="j">
                                        <span class="examine_ico">
                                            <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                            <i v-if="b.examineStatus == 1" class="el-icon-success" style="color:#67c23a;font-size:18px"></i>
                                            <i v-if="b.examineStatus == 2" class="el-icon-circle-close" style="color:#f56c6c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 5" class="el-icon-circle-plus" style="color:#67c23a;font-size:20px"></i>
                                        </span>
                                        <div class="examint_msg">
                                            <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                            <span>{{b.realname + '(' + b.phone + ')'}}</span>
                                            <p v-if="b.examineStatus == 0">未审核此申请</p>
                                            <p v-if="b.examineStatus == 1">通过此申请</p>
                                            <p v-if="b.examineStatus == 2">拒绝此申请</p>
                                            <p v-if="b.examineStatus == 5">创建此申请</p>
                                        </div>
                                    </div>
                                    <div slot="reference" style="width:100%;">
                                        <span class="examine_po" v-if="item.examineStatus == 5 || item.examineStatus == 4">
                                            <img class="examine_img" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <span class="examine_po1" v-if="item.stepType == 2">
                                            <img class="examine_img" :class="{'mohu':item.examineStatus !== 1}" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <div v-if="item.stepType == 3" style="display:inline-block;margin:0 15px;" :style="item.type_style">
                                            <span class="examine_po2" v-for="(a,i) in item.userList" :key="i">
                                                <img class="examine_img" :class="{'mohu':a.examineStatus == 0}" :src="a.headPortrait" width="50" height="50" />
                                            </span>
                                        </div>
                                        <br>
                                        <span v-if="item.examineUserName" class="examine_type">{{item.examineUserName}}</span>
                                        <span v-if="item.stepType == 2" class="examine_type">{{item.userLength + '人或签'}}</span>
                                        <span v-if="item.stepType == 3" class="examine_type">{{item.userLength + '人会签'}}</span>
                                        <br>
                                        <span v-if="item.examineStatus == 0 && index == 1" class="examine_status">一级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 2" class="examine_status">二级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 3" class="examine_status">三级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 4" class="examine_status">四级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 5" class="examine_status">五级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 6" class="examine_status">六级审核</span>
                                        <span v-if="item.examineStatus == 1" class="examine_status"><i class="el-icon-success" style="color:#67c23a;font-size:15px"></i> 已审核</span>
                                        <span v-if="item.examineStatus == 2" class="examine_status"><i class="el-icon-circle-close" style="color:#f56c6c;font-size:18px"></i> 未通过</span>
                                        <span v-if="item.examineStatus == 3" class="examine_status"><i class="el-icon-time" style="color:#e6a23c;font-size:18px"></i> 审核中</span>
                                        <span v-if="item.examineStatus == 5" class="examine_status"><i class="el-icon-circle-plus" style="color:#67c23a;font-size:18px"></i> 发起</span>
                                    </div>
                                </el-popover>
                                <span v-if="index !== examineList.length - 1" class="examine_next"><i class="el-icon-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="跟进记录" name="first">
                        <el-form class="followform" :rules="rules" ref="followform" :model="followform">
                            <el-form-item prop="followContent">
                                <el-input type="textarea" placeholder="添加跟进内容" v-model="followform.followContent"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" style="width:300px;" prop="followType">
                                <el-select v-model="followform.followType" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in followTypes" :key="item.value" :value="item.label" :label="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系人" style="width:290px;" prop="contactsId">
                                <el-select v-model="followform.contactsId" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in contactData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下次联系时间" style="width:300px;">
                                <el-date-picker v-model="followform.contactTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" :picker-options="pickerOptions" placeholder="选择日期时间" style="width:200px;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="快捷沟通" style="width:100%;">
                                <el-radio v-model="followform.followContent" v-for="item in fastcontactList" :key="item.id" :label="item.content">{{item.typeName}}</el-radio>
                            </el-form-item>
                            <el-form-item label="上传图片" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="imgList" action="doUpload" :auto-upload="false" :on-change="beforeUploadimg">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传图片</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="上传附件" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="filesList" action="doUpload" :auto-upload="false" :on-change="beforeUploadfile">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传附件</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item style="float:right;">
                                <el-button style="margin-top:6px;" type="primary" size="mini" @click="Submitfollowform">立即提交</el-button>
                            </el-form-item>
                        </el-form>
                        <div style="width:100%;height:10px;"></div>
                        <ul class="followrecord" v-for="item in record" :key="item.followId">
                            <li class="recordicon">
                                <img :src="item.imgUrl" class="detail_portrait" alt="头像" />
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div class="left_more">
                                    <p>
                                        <span class="de_span_2">{{item.contacts[0].name}}</span>
                                        <span class="de_span_1">&nbsp;|&nbsp;</span>
                                        <span class="de_span_1">{{item.createTime}}</span>
                                        <span v-if="item.contactTime" class="de_span_1">&nbsp;&nbsp;--&nbsp;&nbsp;</span>
                                        <span class="de_span_1">{{item.contactTime}}</span>
                                        &nbsp;&nbsp;
                                        <span class="de_span_3">&nbsp;&nbsp;{{item.followType}}&nbsp;&nbsp;</span>
                                    </p>
                                    <div style="margin-top:15px;margin-bottom:15px;" v-html="item.followContent"></div>
                                    <div class="imgbox_two" v-if="item.imgName">
                                        <img :src="item.picture_detail" alt="图片" width="80" height="80" @click="showImg($event,item)">
                                    </div>
                                    <div v-if="item.enclosureName">
                                        <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                                    </div>
                                    <el-dialog :visible.sync="dialogVisible2">
                                        <img width="100%" :src="dialogImageUrl2" alt="">
                                    </el-dialog>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="合同详情" name="second">
                        <div class="uploadBOX">
                            <div class="imgbox" v-for="item in fileList" :key="item.id" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
                                <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
                                <i class="el-icon-circle-close-outline imgdel" v-if="imgshow" @click="delImg($event,item)"></i>
                            </div>
                            <div class="filebox">
                                <span class="upload">
                                    <input type="file" name="file" @change="tirggerFile($event)"/>
                                </span>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="text" style="height:150px;">
                            <ul>
                                <li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>
                                <li>创建人：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人部门：<span>{{agreementdetail.deptname}}</span></li>
                                <li>创建人机构：<span>{{agreementdetail.parentname}}</span></li>
                                <li>创建时间：<span>{{agreementdetail.create_time}}</span></li>
                                <li>修改时间：<span>{{agreementdetail.update_time}}</span></li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款计划" name="third">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addplan()">新增计划</el-button>
                        </div>
                        <el-table :data="moneyPlanList" border stripe :summary-method="getSummaries" show-summary style="width: 100%">
                            <el-table-column label="期数" fixed header-align="center" align="center" type="index" width="60" />
                            <el-table-column label="公司名称" prop="customerName" min-width="200" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="回款阶段" prop="stage" min-width="110" />
                            <el-table-column label="预计回款金额" prop="price" min-width="120">
                                <template slot-scope="scope">
                                    {{scope.row.price | commaing}}
                                </template>
                            </el-table-column>
                            <el-table-column label="预计日期" prop="date" min-width="110" />
                            <el-table-column label="提醒时间" prop="remind_date" min-width="150" />
                            <el-table-column label="备注" prop="remarks" min-width="180" />
                            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center" v-if="!moneyBackList.length">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editplan(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="delplan(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br><br>
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addback()">新增回款</el-button>
                        </div>
                        <el-table :data="moneyBackList" border stripe :summary-method="getSummaries" show-summary style="width: 100%">
                            <el-table-column label="期数" fixed header-align="center" align="center" type="index" width="60" />
                            <el-table-column label="公司名称" prop="customerName" min-width="200" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="回款阶段" prop="back_plan" min-width="110" />
                            <el-table-column label="回款金额" prop="price" min-width="110">
                                <template slot-scope="scope">
                                    {{scope.row.price | commaing}}
                                </template>
                            </el-table-column>
                            <el-table-column label="回款日期" prop="createTime" min-width="110" />
                            <el-table-column label="备注" prop="remarks" min-width="180" />
                            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" :disabled="scope.row.disabledBtn" @click="editback(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" :disabled="scope.row.disabledBtn" type="danger" @click="delback(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="产品订单" name="fourth">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" @click="handleAdd"></el-button>
                        </div>
                        <el-table :data="itemData" border highlight-current-row show-summary :summary-method="getSummary" @cell-click="cellClick">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>

                            <el-table-column label="产品名称" prop="tbGoods.goodsName" min-width="280" fixed>
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-select v-model="scope.row.tbGoods.goodsName" placeholder="请选择" filterable :filter-method="handleFilter" @focus="handleFoces(scope.$index,scope.row)">
                                            <el-option class="droplist" :value="scope.row.tbGoods.goodsName">
                                                <el-table :data="selectData" border @current-change="currentChange" style="width: 100%">
                                                    <el-table-column header-align="center" type="index" min-width="45"></el-table-column>
                                                    <el-table-column prop="tbGoods.goodsName" label="产品名称" width="130"></el-table-column>
                                                    <el-table-column prop="tbGoods.describe" show-overflow-tooltip label="描述" width="150"></el-table-column>
                                                    <el-table-column prop="goodspec" label="规格属性" min-width="150">
                                                        <template slot-scope="scope">
                                                            <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="unit" label="单位" min-width="90"></el-table-column>
                                                </el-table>
                                            </el-option>
                                        </el-select>
                                        <el-button class="btn info-btn" size="mini" icon="el-icon-more" style="width:30px;height:28px;padding:0" @click="showDialog()"></el-button>
                                    </template>
                                    <span v-else>{{ scope.row.tbGoods.goodsName }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="描述" prop="tbGoods.describe" min-width="120" />
                            
                            <el-table-column label="规格属性" prop="goodspec" min-width="100">
                                <template slot-scope="scope">
                                    <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.value +'/'}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="单位" prop="unit" min-width="50" />

                            <el-table-column prop="num" min-width="100" label="数量">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.num" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                                    </template>
                                    <span v-else>{{ scope.row.num }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="price" min-width="120" label="单价">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.price" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                                    </template>
                                    <span v-else>{{ scope.row.price }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="amountOfMoney" min-width="120" label="金额">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.amountOfMoney" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                                    </template>
                                    <span v-else>{{ scope.row.amountOfMoney }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="discount" min-width="90" label="折扣">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.discount" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                                            <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                                        </el-input>
                                    </template>
                                    <span v-else-if="scope.row.discount">{{ scope.row.discount + ' %' }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="discountAmount" min-width="120" label="折扣额">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.discountAmount" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.discountAmount }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="discountAfter" min-width="120" label="折后金额">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.discountAfter" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.discountAfter }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="taxRate" min-width="90" label="税率">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.taxRate" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                                            <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                                        </el-input>
                                    </template>
                                    <span v-else>{{ scope.row.taxRate }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="taxAmount" min-width="120" label="税额">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.taxAmount" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.taxAmount }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="taxAfter" min-width="120" label="税后金额">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.taxAfter" onkeyup="value=value.replace(/[^\d]/g,'.')" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.taxAfter }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="brand" min-width="80" label="产品品牌"></el-table-column>

                            <el-table-column align="center" fixed="right" label="操作" min-width="90">
                                <template slot-scope="scope">
                                    <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                                    <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pro_sub_btn">
                            <el-button type="primary" :disabled="isDisable" @click="onSubmit">立即提交</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;min-height:635px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableDatas" style="width: 100%">
                <el-table-column label="公司名称" prop="poolName">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.poolName}}
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[20, 30, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
        <el-dialog title="选择产品" :visible.sync="dialogVisible1" :close-on-click-modal="false" width="80%" class="orderDialog" center>
            <div class="otherleftcontent">
                <el-tree
                    node-key="id"
                    highlight-current accordion expand-on-click-node
                    :data="datalist"
                    :props="defaultProps"
                    :default-expanded-keys="defaultkeys"
                    @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="otherightcontent">
                <span>产品名称：</span><el-input v-model="goodsName" style="width:200px;" @input="addInput"></el-input>
                <br><br>
                <el-table :data="tableData" border fit @selection-change="selectInfo" style="width: 100%">
                    <el-table-column header-align="center" align="center" type="selection" min-width="45" @selection-change="selectInfo"></el-table-column>
                    <el-table-column prop="tbGoods.goodsName" label="产品名称" width="130"></el-table-column>
                    <el-table-column prop="tbGoods.describe" show-overflow-tooltip label="描述" width="150"></el-table-column>
                    <el-table-column prop="goodspec" label="规格属性" min-width="150">
                        <template slot-scope="scope">
                            <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" width="90"></el-table-column>
                    <el-table-column prop="brand" label="品牌" width="90"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer order_foot">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="审核意见" :visible.sync="dialogVisibleexa" :close-on-click-modal="false" width="40%">
            <el-form ref="exaform" :model="exaform" :rules="rules">
                <el-form-item prop="remarks">
                    <el-input v-model="exaform.remarks" type="textarea" rows="5" placeholder="请输入审核意见（必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleexa = false">取 消</el-button>
                <el-button type="primary" @click="toexamine()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="回款计划" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="50%">
            <el-form ref="moneyPlan" :model="moneyPlan" :rules="rules" label-width="130px">
                <el-form-item label="总金额">
                    <el-input v-model="moneyPlan.amount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="剩余预计回款金额">
                    <el-input v-model="moneyPlan.restamount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="stage" label="回款阶段" v-show="!moneyPlan.id">
                    <el-select v-model="moneyPlan.stage" placeholder="请选择回款阶段" style="width:100%;">
                        <el-option v-show="moneyPlanList.length < 1" value="首笔款">首笔款</el-option>
                        <el-option value="阶段款">阶段款</el-option>
                        <el-option value="尾笔款">尾笔款</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="price" label="预计回款金额">
                    <el-input v-model="moneyPlan.price" onkeyup="value=value.replace(/[^\d]/g,'.')"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="预计回款时间">
                    <el-date-picker v-model="moneyPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="提醒时间">
                    <el-date-picker v-model="moneyPlan.remind_date" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="moneyPlan.remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="planSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="回款信息" :visible.sync="dialogVisible4" :close-on-click-modal="false" width="50%">
            <el-form ref="moneyBack" :model="moneyBack" :rules="rules" label-width="130px">
                <el-form-item label="预计回款金额">
                    <el-input v-model="moneyBack.amount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="剩余预计回款金额">
                    <el-input v-model="moneyBack.restamount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="back_plan_id" label="回款阶段">
                    <el-select v-model="moneyBack.back_plan_id" placeholder="请选择回款阶段" style="width:100%;">
                        <el-option v-for="a in moneyPlanList" :key="a.id" :label="a.stage" :value="a.id">{{a.stage}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="prices" label="回款金额">
                    <el-input v-model="moneyBack.price" onkeyup="value=value.replace(/[^\d]/g,'.')"></el-input>
                </el-form-item>
                <el-form-item prop="createTime" label="回款时间">
                    <el-date-picker v-model="moneyBack.createTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="pay_type_id" label="收款方式">
                    <el-select v-model="moneyBack.pay_type_id" placeholder="请选择收款方式" style="width:100%;">
                        <el-option v-for="item in payList" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="moneyBack.remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="backSubmit()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'agreementDetails',
        store,
        filters:{
            commaing(value){
                if(value){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
                    if(valArray.length === 2) {
                        floatPart = valArray[1].toString() // 拿到小数部分
                        if(floatPart.length === 1) { // 补0,实际上用不着
                            return intPartFormat + '.' + floatPart + '0'
                        }else{
                            return intPartFormat + '.' + floatPart
                        }
                    } else {
                        return intPartFormat + floatPart
                    }
                }
                
            },
        },
        data(){
            return {
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                
                detailData:null,
                searchList:{
                    keyword:null,
                },
                agreementdetail:{},
                activeName2: 'first',
                tableDatas: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },
                dataList:null,
                fileList:null,
                imgid:null,
                imgurl:null,
                dialogImageUrl:null,
                dialogVisible:false,
                imgshow:false,

                retracts:true,

                examineList:[],
                hasCheck:null,   //是否有审核权
                hasRecheck:null,   //是否有撤回权

                examineLog:[],

                dialogVisibleexa:false,
                exaform:{
                    status:null,
                    remarks:null,
                },

                moneyPlanList:[],

                dialogVisible3:false,
                moneyPlan:{
                    id:null,
                    amount:null,
                    restamount:null,
                    date:null,
                    price:null,
                    // stage:null,
                    back_plan_id:null,
                    contract_id:null,
                    customerpool_id:null,
                    remarks:null,
                    remind_date:null,
                },

                moneyBackList:[],
                dialogVisible4:false,
                moneyBack:{
                    id:null,
                    amount:null,
                    restamount:null,
                    createTime:null,
                    price:null,
                    stage:null,
                    contract_id:null,
                    customerpool_id:null,
                    remarks:null,
                    pay_type_id:null,
                    backNo:null,
                },
                payList:[],
                backamount:0,
                backrestamount:0,
                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }],
                    stage:[{ required: true, message: '回款阶段不能为空', trigger: 'blur' }],
                    price:[{ required: true, message: '预计回款金额不能为空', trigger: 'blur' }],
                    date:[{ required: true, message: '预计回款时间不能为空', trigger: 'blur' }],
                    prices:[{ required: true, message: '回款金额不能为空', trigger: 'blur' }],
                    createTime:[{ required: true, message: '回款时间不能为空', trigger: 'blur' }],
                    pay_type_id:[{ required: true, message: '收款方式不能为空', trigger: 'blur' }],
                    back_plan_id:[{ required: true, message: '回款阶段不能为空', trigger: 'blur' }],
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                },

                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png',

                itemData:[
                    {id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                ],
                list:null,
                selectData:[],
                scopeIndex:'',
                cusdiscount:null,
                custaxRate:null,
                OKdisabled:true,
                classification_id:null,
                goodsName:null,

                dialogVisible1:false,
                tableData:[],
                itemList:[],
                multipleSelection:[],
                idArr:[],

                datalist:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                nodeChange:false,
                updateData:[],
                productData:[],

                isDisable:false,
                

                followform:{
                    followType:'电话',
                    contactTime:'',
                    contactsId:'',
                    followContent:'',
                    imgName:null,
                    enclosureName: null,
                },
                followTypes:[
                    {label:'电话',value:'1'},
                    {label:'微信',value:'2'},
                    {label:'QQ',value:'3'},
                    {label:'邮箱',value:'4'},
                    {label:'拜访',value:'5'},
                ],
                fastcontactList:null,
                contactData:[],

                files:null,
                filesName:null,
                imgfile:null,
                imgName:null,
                filesList:[],
                imgList:[],

                record:[],
                dialogVisible2:false,
                dialogImageUrl2:null,
            }
        },
        activated(){
            this.loadData();
            this.loadIMG()
            this.getList()
        },
        methods: {
            loadData() {
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.keyword
                let data = {}
                data.type = '收款方式'
                let data3 = {}
                data3.type = '快捷方式'
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId + '&pId=' +_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.tableDatas = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                //加载收款方式
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.payList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                // 加载产品分类
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'classification/getClassificationNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                //加载快捷方式
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data3)
                }).then(function(res){
                    _this.fastcontactList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadIMG(){
                const _this = this
                this.detailData = this.$store.state.agreedetailsData.submitData;
                this.idArr.id = this.$store.state.agreedetailsData.submitData.id
                _this.fileList = []
                let qs = require('querystring')
                let data = {}
                data.typetid = this.detailData.id
                data.type = '合同'
                data.pId = this.$store.state.ispId
                data.cId = this.$store.state.iscId

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'imgInfo/getImgInfoByTypeid.do',
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.dataList = res.data
                    let arr = _this.dataList
                    arr.forEach(el => {
                        _this.imgid = el.id
                        _this.imgurl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.name
                        _this.fileList.push({id:_this.imgid,imgURL:_this.imgurl})
                    });
                }).catch(function(err){
                    _this.$message.error("图片加载失败");
                });
                //加载合同详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'getContractById.do?cId='+_this.$store.state.iscId+'&contractId='+this.detailData.id,
                }).then(function(res){
                    _this.agreementdetail = res.data
                    if(_this.agreementdetail.discount){
                        _this.cusdiscount = res.data.discount
                    }else{
                        _this.cusdiscount = '100'
                    }
                    if(_this.agreementdetail.taxRate){
                        _this.custaxRate = res.data.taxRate
                    }else{
                        _this.custaxRate = '0'
                    }
                    let examine = {
                        checkStatus: res.data.checkStatus,
                        recordId: res.data.examineRecordId,
                        pId: _this.$store.state.ispId
                    }
                    //加载审核流程
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(examine)
                    }).then(function(res){
                        _this.examineList = res.data.steps
                        _this.examineList.forEach((el,index) => {
                            el.userLength = el.userList.length
                            if(el.userLength == 1){
                                el.type_style = 'width:50px;'
                            }else if(el.userLength == 2){
                                el.type_style = 'width:75px;'
                            }else if(el.userLength == 3){
                                el.type_style = 'width:100px;'
                            }else if(el.userLength == 4){
                                el.type_style = 'width:125px;'
                            }else if(el.userLength == 5){
                                el.type_style = 'width:150px;'
                            }
                            
                            if(index == 0){
                                if(el.userList[0].img){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[0].img
                                }else{
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                }
                            }
                            if(el.stepType ==2){
                                for(let i = 0; i < el.userList.length; i ++){
                                    if(el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                        break
                                    }else if(el.userList[i].img && el.userList[i].examineStatus == 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus == 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                        break
                                    }
                                }
                            }
                            if(el.stepType == 3){
                                el.userList.forEach((a,i) => {
                                    if(a.img){
                                        a.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+a.img
                                    }else{
                                        a.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                    }
                                })
                            }
                        });
                        _this.hasCheck = res.data.isCheck  //是否有审核权
                        _this.hasRecheck = res.data.isRecheck  //是否有撤回权
                    }).catch(function(err){
                        // console.log(err);
                    });
                    //加载审核历史
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.agreementdetail.examineRecordId,
                    }).then(function(res){
                        _this.examineLog = res.data
                    }).catch(function(err){
                        // console.log(err);
                    });
                    _this.$options.methods.loadfollow.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });

                //加载回款计划
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'backPlan/selectBackPlanByContractId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.detailData.id,
                }).then(function(res){
                    _this.moneyPlanList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                //加载回款信息
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'back/selectBackByContactId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.detailData.id,
                }).then(function(res){
                    let data = res.data
                    data.forEach(element => {
                        if(element.checkStatus == 2){
                            element.disabledBtn = true
                        }
                    });
                    _this.moneyBackList = data
                }).catch(function(err){
                    // console.log(err);
                });
                _this.$options.methods.loadProduct.bind(_this)()
                
            },
            loadfollow(){
                const _this = this
                let qs =require('querystring')
                let pageInfo2 = {}
                pageInfo2.page = 1
                pageInfo2.limit = 100000

                //加载跟进记录
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'getFollowByOpportunityIdOrContractId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.detailData.id,
                }).then(function(res){
                    _this.record = res.data.map.success
                    _this.record.forEach(el => {
                        el.showdelico = false
                        let startTime = Date.parse(el.createTime); // 开始时间
                        let endTime = new Date().getTime(); // 结束时间
                        let usedTime = endTime - startTime; // 相差的毫秒数
                        if(usedTime < 7200000){
                            el.showdelico = true
                        }
                        if(usedTime > 7200000){
                            el.showdelico = false
                        }
                        if(el.userImagName){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userImagName
                        }
                        if(!el.userImagName || el.userImagName == null){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                        }
                        if(el.imgName && el.imgName !== null){
                            el.picture_detail = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.imgName
                        }
                        if(el.enclosureName && el.enclosureName !== null){
                            el.enclosureUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.enclosureName
                        }

                        el.followContent = el.followContent.replace(/\n/g,'<br/>')
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customerpool_id='+_this.agreementdetail.customerpool_id,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.contactData = res.data.map.success
                    _this.followform.contactsId = res.data.map.success[0].id
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                this.dialogImageUrl2 = this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            loadProduct(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.contract_id = _this.detailData.id
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.productData = res.data
                    _this.updateData = res.data.orderDetails
                    // if(_this.updateData.length){
                        _this.$options.methods.getItem.bind(_this)()
                    // }else{
                    //     _this.itemData = [{id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},]
                    // }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            tirggerFile (event) {
                const _this = this;
                let file = event.target.files[0]
                let param = new FormData() // 创建form对象
                param.append('file', file, file.name) // 通过append向form对象添加数据
                // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                // 添加请求头
                axios.post(this.$store.state.defaultHttp+'contractUpload.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId+'&contractid='+this.detailData.id, param, config)
                .then(res => {
                    if (res.data == 'success') {
                        _this.$message({
                            message:'上传成功',
                            type:'success'
                        })
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    }else{
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        })
                    }
                })
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'price'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index] = sums[index].toFixed(2)
                        let intPart = Math.trunc(sums[index])
                        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                        let floatPart = '.00' // 预定义小数部分
                        let valArray = sums[index].split('.')
                        if(valArray.length === 2) {
                            floatPart = valArray[1].toString() // 拿到小数部分
                            if(floatPart.length === 1) { // 补0,实际上用不着
                                sums[index] = intPartFormat + '.' + floatPart + '0'
                            }else{
                                sums[index] = intPartFormat + '.' + floatPart
                            }
                        } else {
                            sums[index] = intPartFormat + floatPart
                        }
                        sums[index] += ' 元';
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
            },
            showImg(e,val){
                this.dialogImageUrl = val.imgURL
                this.dialogVisible = true
            },
            delImg(e,val){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = val.id
                _this.$confirm('是否确认删除该图片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'imgInfo/delImgInfoById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            mouseenterdiv(val){
                this.imgshow = true
            },
            mouseleavediv(val){
                this.imgshow = false
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisibleexa = true
            },
            addplan(){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyPlanList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible3 = true
                this.moneyPlan = { 
                    id:null, amount:bb, restamount:cc, date:null, price:null, stage:null, remarks:null, remind_date:null,
                    contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            editplan(index,row){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyPlanList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible3 = true
                this.moneyPlan = { 
                    id:row.id, amount:bb, restamount:cc, date:row.date, price:row.price, stage:row.stage, remarks:row.remarks, remind_date:row.remind_date,
                    contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            planSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    id:this.moneyPlan.id,
                    date:this.moneyPlan.date,
                    price:this.moneyPlan.price,
                    stage:this.moneyPlan.stage,
                    contract_id:this.moneyPlan.contract_id,
                    customerpool_id:this.moneyPlan.customerpool_id,
                    remarks:this.moneyPlan.remarks,
                    remind_date:this.moneyPlan.remind_date,
                    pId:this.$store.state.ispId,
                }

                let flag = false
                if(!data.date){
                    _this.$message({
                        message: '预计回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.stage){
                    _this.$message({
                        message: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    _this.$message({
                        message: '预计回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.moneyPlan.restamount){
                    _this.$message({
                        message: '预计回款金额不能超过' + this.moneyPlan.restamount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'backPlan/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200') {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible3 = false
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("操作失败,请重新操作");
                })
            },
            delplan(index,row){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = row.id
                _this.$confirm('是否确认删除该回款计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'backPlan/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            addback(){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyBackList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible4 = true
                this.$store.commit('getNowDate')
                this.moneyBack = { 
                    id:null, price:null, back_plan_id:null, remarks:null, pay_type_id:null, amount:bb, restamount:cc, backNo:null,
                    createTime:this.$store.state.nowdate, contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            editback(index,row){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyBackList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa + row.price
                this.dialogVisible4 = true
                this.moneyBack = { 
                    id:row.id, backNo:row.backNo, price:row.price, back_plan_id:row.back_plan_id, remarks:row.remarks, pay_type_id:row.pay_type_id, amount:bb, restamount:cc, 
                    createTime:row.createTime, contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            backSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    id:this.moneyBack.id,
                    createTime:this.moneyBack.createTime,
                    price:this.moneyBack.price,
                    backNo:this.moneyBack.backNo,
                    back_plan_id:this.moneyBack.back_plan_id,
                    contract_id:this.moneyBack.contract_id,
                    customerpool_id:this.moneyBack.customerpool_id,
                    remarks:this.moneyBack.remarks,
                    pay_type_id:this.moneyBack.pay_type_id,
                    pId:this.$store.state.ispId,
                    secondid:this.$store.state.deptid,
                    deptid:this.$store.state.insid,
                    type:'合同'
                }

                let flag = false
                if(!data.createTime){
                    _this.$message({
                        message: '回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    _this.$message({
                        message: '回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.pay_type_id){
                    _this.$message({
                        message: '收款方式不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.back_plan_id){
                    _this.$message({
                        message: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.moneyBack.restamount){
                    _this.$message({
                        message: '回款金额不能超过' + this.moneyBack.restamount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'back/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200') {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible4 = false
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("操作失败,请重新操作");
                })
            },
            delback(index,row){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = row.id
                _this.$confirm('是否确认删除该回款信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'back/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.detailData.id
                data.recordId = this.agreementdetail.examineRecordId
                data.pId = this.$store.state.ispId
                data.status = this.exaform.status
                data.remarks = this.exaform.remarks

                let flag = false
                if(!data.remarks){
                    _this.$message({
                        message:'审核意见不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'examineRecord/auditExamine.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.dialogVisibleexa = false
                        _this.exaform.status = null
                        _this.exaform.remarks = null
                        _this.$options.methods.loadIMG.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("审核失败，请稍后再试");
                });
            },
            /*  ----产品 ----  */
            getList() {
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = 1
                data.limit = 1000000
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/search.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data.map.goods
                    _this.list = items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                    items.forEach(element => {
                        element.aaa = JSON.parse(element.spec)
                        element.goodspec = []
                        for(var key in element.aaa){
                            if(key !== "null" && key !== "undefined"){
                                element.goodspec.push({label:key,value:element.aaa[key]})
                            }
                        }
                    });
                    _this.$options.methods.getSelect.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getItem(){
                this.itemData = []
                if(this.updateData.length !== 0){
                    this.updateData.forEach((el,i) => {
                        el.aaa = JSON.parse(el.spec)
                        el.goodspec = []
                        for(var key in el.aaa){
                            if(key !== "null" && key !== "undefined"){
                                el.goodspec.push({label:key,value:el.aaa[key]})
                            }
                        }
                        this.itemData.push({ amountOfMoney: el.amountOfMoney, brand: el.brand, discount: el.discount, discountAfter: el.discountAfter, discountAmount: el.discountAmount, goodsId: el.goodsId, tbGoods:{ goodsName:el.goodsName, describe:el.describe, }, id: el.itemId, itemId: el.itemId, num: el.num, price: el.price, taxAfter: el.taxAfter, taxAmount: el.taxAmount, taxRate: el.taxRate, goodspec: el.goodspec, unit: el.unit, edit:false,})
                    });
                }else if(this.updateData == undefined){
                    _this.itemData = [{id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},]
                }
            },
            getData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = 1
                data.limit = 1000000
                data.classification_id = this.classification_id
                data.searchName = this.goodsName
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/search.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data.map.goods
                    items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                    items.forEach(element => {
                        element.aaa = JSON.parse(element.spec)
                        element.goodspec = []
                        for(var key in element.aaa){
                            if(key !== "null" && key !== "undefined"){
                                element.goodspec.push({label:key,value:element.aaa[key]})
                            }
                        }
                    });
                    _this.tableData = items
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getSelect(){
                this.itemData.forEach((a,j) => {
                    this.list.forEach((el,i) => {
                        if(el.id == a.id){
                            this.list.splice(i,1)
                        }
                    });
                });
                this.selectData = this.list
            },
            handleAdd(){
                this.itemData.push({amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false})
            },
            getSummary(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'amountOfMoney' || column.property == 'discountAmount' || column.property == 'discountAfter' || column.property == 'taxAmount' || column.property == 'taxAfter'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index] = sums[index].toFixed(2)
                        let intPart = Math.trunc(sums[index])
                        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                        let floatPart = '.00' // 预定义小数部分
                        let valArray = sums[index].split('.')
                        if(valArray.length === 2) {
                            floatPart = valArray[1].toString() // 拿到小数部分
                            if(floatPart.length === 1) { // 补0,实际上用不着
                                sums[index] = intPartFormat + '.' + floatPart + '0'
                            }else{
                                sums[index] = intPartFormat + '.' + floatPart
                            }
                        } else {
                            sums[index] = intPartFormat + floatPart
                        }
                        sums[index] += ' 元';
                    }else if(column.property == 'num'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index]
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
            },
            cellClick(row, column, cell, event){
                row.edit = false
                if(column.label !== '操作'){
                    row.edit = true
                    this.itemData.forEach((el,i) => {
                        if(row.id == el.id){
                            this.scopeIndex = i
                        }
                    });
                }
            },
            handleFoces(index,row){
                this.scopeIndex = index
            },
            handleFilter(val){
                this.selectData = []
                this.list.forEach(el => {
                    if(el.tbGoods.goodsName.indexOf(val) != -1){
                        this.selectData.push(el)
                    }
                });
            },
            currentChange(e){
                this.itemData.forEach((el,i) => {
                    if(i == this.scopeIndex){
                        if(e){
                            e.edit = true
                            e.price = e.tbGoods.price
                            e.discount = this.cusdiscount
                            e.taxRate = this.custaxRate
                            e.num = 1
                            this.itemData.splice(i,1,e)
                            this.OKdisabled = false
                            this.$options.methods.handleinput(1,i,e)
                        }
                    }
                });
                this.list.forEach((item,j) => {
                    if(e && e.id == item.id){
                        this.list.splice(j,1)
                    }
                });
                this.selectData = this.list
            },
            handleinput(e,index,row){
                if(row.num && row.price){
                    let z = parseInt(row.num) * parseFloat(row.price)
                    row.amountOfMoney = z.toFixed(2)
                }
                if(row.amountOfMoney && row.discount){
                    let a = parseFloat(row.amountOfMoney) * parseFloat(row.discount) / 100
                    let b = parseFloat(row.amountOfMoney) - a
                    row.discountAmount = b.toFixed(2)
                    row.discountAfter = a.toFixed(2)
                }else{
                    row.discountAmount = 0
                    row.discountAfter = 0
                }
                if(row.amountOfMoney && row.taxRate){
                    if(row.discountAfter){
                        let x = parseFloat(row.discountAfter) * parseFloat(row.taxRate) / 100
                        let y = parseFloat(row.discountAfter) + x
                        row.taxAmount = x.toFixed(2)
                        row.taxAfter = y.toFixed(2)
                    }else{
                        let c = parseFloat(row.amountOfMoney) * parseFloat(row.taxRate) / 100
                        let d = parseFloat(row.amountOfMoney) + c
                        row.taxAmount = c.toFixed(2)
                        row.taxAfter = d.toFixed(2)
                    }
                }else{
                    row.taxAmount = 0
                    row.taxAfter = 0
                }
            },
            showDialog(){
                this.dialogVisible1 = true
                this.$options.methods.getData.bind(this)()
            },
            handleNodeClick(data){
                this.classification_id = data.id
                if(data.next.length == 0){
                    this.nodeChange = true
                    this.$options.methods.getData.bind(this)()
                }
            },
            addInput(val){
                this.goodsName = val
                this.$options.methods.getData.bind(this)()
            },
            selectInfo(val){
                this.itemList = []
                this.multipleSelection = val;
                let arr = val;
                let newArr = new Array();
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr = newArr
                this.itemList = val
            },
            handleSubmit(){
                let arrs = []
                this.itemData.forEach((el,i) => {
                    if(el.goodsId){
                        arrs.push(el)
                    }
                    if(this.itemList.length){
                        this.itemList.forEach((a,j) => {
                            a.edit = true
                            if(el.id == a.id){
                                this.itemList.splice(j,1)
                            }
                        });
                    }
                });
                this.itemData = arrs.concat(this.itemList)

                this.itemData.forEach((param,y) => {
                    this.list.forEach((item,x) => {
                        if(item.id == param.id){
                            param.price = item.tbGoods.price
                            param.discount = this.cusdiscount
                            param.taxRate = this.custaxRate
                            param.num = 1
                            this.list.splice(x,1)
                            this.$options.methods.handleinput(1,y,param)
                        }
                    });
                });
                this.selectData = this.list

                this.dialogVisible1 = false
            },
            confirmEdit(row) {
                row.edit = false
                this.$message({
                    message: '本地保存成功',
                    type: 'success'
                })
            },
            handleDelete(index,row){
                this.itemData.forEach((el,i) => {
                    if(i == index){
                        this.itemData.splice(i,1)
                    }
                });
                this.$options.methods.getList.bind(this)()
            },
            onSubmit(){
                const _this = this
                let totalSum = 0
                let partsDetails = new Array()
                this.itemData.forEach(el => {
                    if(el.goodsId || el.itemId){
                        totalSum += parseFloat(el.taxAfter)
                        partsDetails.push({
                            "price":el.price,
                            "num":el.num,
                            "itemId":el.id,
                            "amountOfMoney":el.amountOfMoney,
                            "discount":el.discount,
                            "discountAmount":el.discountAmount,
                            "discountAfter":el.discountAfter,
                            "taxRate":el.taxRate,
                            "taxAmount":el.taxAmount,
                            "taxAfter":el.taxAfter,
                        })
                    }
                });
                let data = {
                    "id":this.productData.id,
                    "contract_id":_this.detailData.id,
                    "customerpoolId":this.agreementdetail.customerpool_id,
                    "totalSum":totalSum,
                    "ascriptionId":this.agreementdetail.pId,
                    "secondid":this.agreementdetail.secondid,
                    "deptid":this.agreementdetail.deptid,
                    "orderDetails":partsDetails,
                    "pId":parseInt(this.$store.state.ispId)
                }

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/saveOrUpdateFromOpportunityOrContract.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '操作成功',
                            type:'success'
                        })
                        _this.itemData.forEach(o => {
                            o.edit = false
                        });
                        _this.$options.methods.loadProduct.bind(_this)()
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    _this.isDisable = false
                });
            },

            beforeUploadimg(val,imgList){
                this.imgfile = val.raw;
                const extension = val.name.split('.')[1] === 'jpg'
                const extension2 = val.name.split('.')[1] === 'png'
                const extension3 = val.name.split('.')[1] === 'jpeg'
                const isLt500k = val.size / 1024 / 1024 < 0.5
                if (!extension && !extension2 && !extension3) {
                    this.$message.warning('图片只能是 jpg、png、jpeg格式!')
                    return
                }
                if (!isLt500k) {
                    this.$message.warning('图片大小不能超过 500KB!')
                    return
                }
                this.imgName = val.name
                this.imgList.push({name:val.name})
                return false;
            },
            beforeUploadfile(file,fileList){
                this.files = file.raw;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const extension3 = file.name.split('.')[1] === 'doc'
                const extension4 = file.name.split('.')[1] === 'docx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2 && !extension3 && !extension4) {
                    this.$message.warning('附件只能是 xls、xlsx、doc、docx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('附件大小不能超过 5MB!')
                    return
                }
                this.filesName = file.name
                this.filesList.push({name:file.name})
                return false; // 返回false不会自动上传
            },  
            // 跟进记录
            Submitfollowform(){
                const _this = this
                let qs = require('querystring')
                let data = new FormData()
                data.append("contract_id", this.detailData.id);
                data.append("followType", this.followform.followType);
                data.append("contactTime", this.followform.contactTime);
                data.append("followContent", this.followform.followContent);
                data.append("contactsId", this.followform.contactsId);
                data.append("customerpool_id", this.agreementdetail.customerpool_id);
                data.append("deptid", this.$store.state.insid);
                data.append("secondid", this.$store.state.deptid);
                data.append("imgNames", this.imgfile);
                data.append("enclosureNames", this.files);

                if(!this.followform.followContent){
                    _this.$message({
                        message: '跟进内容不能为空',
                        type: 'error'
                    });
                }else if(!this.followform.contactsId){
                    _this.$message({
                        message: '联系人不能为空',
                        type: 'error'
                    });
                }else{
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'customerJurisdiction/follow.do',//新增跟进记录
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            axios({
                                method: 'post',
                                url:  _this.$store.state.defaultHttp+ 'addFollow.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                                data:data,
                            }).then(function(res){
                                if(res.data.msg && res.data.msg == 'success' ) {
                                    _this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                } else {
                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }
                                _this.followform.contactTime = ''
                                _this.followform.followContent = ''
                                _this.followform.imgName = ''
                                _this.followform.enclosureName = ''
                                _this.filesList = []
                                _this.imgList = []
                                _this.imgfile = null
                                _this.files = null
                                _this.$options.methods.loadfollow.bind(_this)(true);
                            }).catch(function(err){
                                _this.$message.error("提交失败,请重新提交");
                            });
                        }
                        
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
            },


            getRow(index,row){
                this.$store.state.agreedetailsData.submitData = {"id":row.contract_id}
                this.idArr.contractId = row.contract_id
                this.$options.methods.loadIMG.bind(this)(true);
            },
            search(){
                const _this = this;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .agrdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .fileinput{
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border: 1px dashed #409EFF;
    }
    /* .fileinputnone{
        background-color: transparent;
    }
    .fileinputnone input{
        height: 100px;
        right: 0;
        top:30px;
        opacity: 0;
        cursor: pointer;
    }
    .fileinputnone .el-input__inner{
        background-color: transparent;
        padding: 0;
        height: 100px !important;
        color: transparent;
    } */
    .agreeaudited{
        position: absolute;
        right: 45%;
        top: 90px;
    }
    .agreeaudited .audited_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }
    .qingxi{
        opacity: 1;
    }
    .mohu{
        opacity: 0.3;
    }
</style>
