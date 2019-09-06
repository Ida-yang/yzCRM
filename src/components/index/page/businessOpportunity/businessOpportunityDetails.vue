<template>
    <!-- 商机详情页 -->
    <el-row class="oppdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{customerpool.name}}</span><span style="margin-left:50px;">预计成交金额：{{opportunitydetail.opportunity_achievement | commaing}} 元</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>备注：<span>{{customerpool.remark}}</span></li>
                            <li>地址：<span>{{customerpool.address}}</span></li>
                        </ul>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            
            <div class="bottom" v-if="auxcontent">
                <div class="aux_c">
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.timeConsuming}}天</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">跟踪时间</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.trackProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="aaa" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.surplusTime}}天</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">剩余天数</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.surplusProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="bbb" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.step_probability}}%</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">成功率</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.step_probability}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="ccc" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.competitor}}人</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">竞争对手</span><br>
                                <!-- <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.competitorProportion}}%</span> -->
                                <span style="font-size:14px;color:#333333;line-height:20px">&nbsp;</span>
                            </p>
                            <!-- <el-progress type="circle" :percentage="ddd" :width="34" :stroke-width="5" :show-text="false"></el-progress> -->
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.num}}次</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">联系次数</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.numProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="fff" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.contacts}}人</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">关键联系人</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.contactsProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="ggg" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top">
                <el-card class="box-card step_process">
                    <div slot="header" class="clearfix">
                        <span>{{opportunitydetail.opportunity_name}}</span>
                        <el-button class="info-btn" size="mini" style="float:right;" @click="dialogVisible = true" v-if="shownext">下一步</el-button>
                        <el-button class="info-btn" size="mini" style="float:right;" @click="dialogVisible3 = true" v-if="shownext">失败关闭</el-button>
                        <span style="line-height:20px;float:right;font-size:14px;" v-if="showfail">该商机已关闭</span>
                        <span style="line-height:20px;float:right;font-size:14px;" v-if="showsuccess">签约成功！</span>
                        <el-button class="info-btn" size="mini" style="float:right;margin-right:10px;" v-if="showauxAnalys" @click="auxAnalys()">辅助分析</el-button>
                    </div>
                    <el-steps :active="active" finish-status="success" :process-status="isprocess" align-center style="padding:10px;">
                        <el-step v-for="item in stepList" :key="item.step_id" :title="item.step_name" :description="item.step_probability">
                            <template slot="description">
                                <p>成功几率：{{item.step_probability}}%</p>
                                <p v-if="showcreate">{{item.createTime}}</p>
                                <p v-if="showdurate">{{item.duration}}</p>
                            </template>
                        </el-step>
                    </el-steps>
                </el-card>
            </div>
            
            <div class="bottom">
                <el-tabs v-model="baseindex" type="card">
                    <el-tab-pane label="跟进记录" name="first" style="min-height:200px;">
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
                    <el-tab-pane label="基本信息" name="second">
                        <div class="text">
                            <ul>
                            <li>客户决策人：<span>{{contacts.coName}}</span></li>
                            <li>创建时间：<span>{{opportunitydetail.opportunity_time}}</span></li>
                            <li>签约时间：<span>{{contractTime}}</span></li>
                            <li>失败时间：<span>{{failTime}}</span></li>
                            <li>预计成交金额：<span class="bold_span">{{opportunitydetail.opportunity_achievement | commaing}} 元</span></li>
                            <li>预计成交时间：<span>{{opportunitydetail.opportunity_deal}}</span></li>
                            <li>负责人：<span>{{privateUser.private_employee}}</span></li>
                            <li>部门：<span>{{opportunitydetail.deptname}}</span></li>
                            <li>机构：<span>{{opportunitydetail.parentname}}</span></li>
                            <li>备注：<span>{{opportunitydetail.opportunity_remarks}}</span></li>
                        </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="third">
                        <el-table :data="contactData" border stripe style="width: 100%">
                            <el-table-column prop="name" label="联系人名称" min-width="120" />
                            <el-table-column prop="phone" label="手机" min-width="110" />
                            <el-table-column label="固话" prop="telephone" min-width="110" />
                            <el-table-column label="邮箱" prop="email" min-width="130" />
                            <el-table-column label="QQ" prop="qq" min-width="110" />
                            <el-table-column label="微信" prop="wechat" min-width="110" />
                            <el-table-column label="地址" prop="address" min-width="200" />
                            <el-table-column label="职务" prop="identity" show-overflow-tooltip min-width="90" />
                            <el-table-column label="性别" prop="sex" min-width="90" />
                            <el-table-column label="是否在职" prop="status" min-width="90">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.status" placement="right">
                                        <el-switch v-model="scope.row.status" active-value="在职" inactive-value="离职" active-color="#13ce66" inactive-color="#bbbbbb" @change="changeState(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否为关键人" prop="isCrux" min-width="110">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.isCrux" placement="right">
                                        <el-switch v-model="scope.row.isCrux" active-value="是" inactive-value="否" active-color="#13ce66" inactive-color="#bbbbbb" @change="changePrimary(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remark" min-width="180" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="产品报价" name="fourth">
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

                            <el-table-column label="主图" prop="productImg" width="80">
                                <template slot-scope="scope">
                                    <el-popover placement="right" width="200" trigger="hover">
                                        <img :src="scope.row.productImg" alt="" width="200" height="200">
                                        <img slot="reference" :src="scope.row.productImg" alt="" width="60" height="60">
                                    </el-popover>
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

                            <el-table-column label="备注1" prop="remarks1" min-width="180">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.remarks1" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.remarks1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注2" prop="remarks2" min-width="180">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.remarks2" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.remarks2 }}</span>
                                </template>
                            </el-table-column>

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
                    <el-tab-pane label="竞争对手" name="fifth">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" @click="addCompetitor"></el-button>
                        </div>
                        <el-table :data="competitorData" border highlight-current-row @cell-click="cellClick2">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>

                            <el-table-column label="公司名称" prop="name" min-width="280" fixed>
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-select v-model="scope.row.name" placeholder="请选择" filterable @focus="handleFoces(scope.$index,scope.row)" @change="selectChange($event,scope.row)">
                                            <el-option class="droplist" v-for="item in competitorList" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span v-else>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="contacts" min-width="100" label="联系人" />

                            <el-table-column prop="advantage" min-width="220" label="优势">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.advantage" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.advantage }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="inferiority" min-width="220" label="劣势">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.inferiority" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.inferiority }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="commonTactics" min-width="220" label="常用战术">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input v-model="scope.row.commonTactics" class="edit-input" size="small"/>
                                    </template>
                                    <span v-else>{{ scope.row.commonTactics }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" fixed="right" label="操作" min-width="90">
                                <template slot-scope="scope">
                                    <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="editCompetitor(scope.$index,scope.row)"></el-button>
                                    <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="deleteCompetitor(scope.$index,scope.row)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="失败原因" name="sixth" v-if="showfail">
                        <!-- 失败原因：失败 -->
                        <div class="wo_c" style="min-height:200px;">
                            <ul class="wo_ul_left">
                                <li class="wo_li_left">
                                    <span style="font-size:14px;">失败原因：</span>
                                    <el-tag size="small" type="info" v-for="item in opportunitydetail.reasonsForFailures" :key="item" style="margin-right:5px;">{{item}}</el-tag>
                                </li>
                                <br>
                                <li class="wo_li_left">
                                    <span style="font-size:14px;">失败描述：</span>
                                    <div v-html="opportunitydetail.codeSnippet"></div>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="400px">
            <span>确认修改商机进度吗？一旦确定将不可撤回</span>
            <br><br>
            <span style="margin-right:10px;font-size:14px;">预计成交时间:</span>
            <el-date-picker v-model="opportunityDeal" align="right" type="date" :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="nextStep()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible3" :close-on-click-modal="false" width="620px">
            <span>确认关闭商机进度吗？一旦确定将不可撤回</span>
            <br><br>
            <el-checkbox-group v-model="reasonsForFailure">
                <el-checkbox v-for="item in failReasonData" :key="item.id" :label="item.id" style="width:190px;margin:0">{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
            <!-- <hr style="width:100%;height:1px;background-color:#606266;border:none;margin-bottom:10px;"> -->
            <br>
            <div class="editor-container">
                <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="endStep()">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-col :span="6" style="padding:10px;min-height:600px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableDatas" style="width: 100%">
                <el-table-column prop="customerpool[0].name" label="公司名称">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.customerpool[0].name}}
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
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        name:'businessOpportunityDetails',
        store,
        components:{UE},
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
                searchList:{
                    keyword:null,
                },
                opportunitydetail:{},
                contacts:{},
                customerpool:{},
                customerId:null,
                privateUser:{},
                contractTime:null,
                failTime:null,

                tableDatas: null,
                tableNumber:null,
                page:1,
                limit:20,

                thisshow:true,
                idArr:{
                    opportunity_id:null,
                },

                active: 0,
                stepList:null,

                steptime:null,

                addstep:null,
                shownext:true,
                showfail:false,
                showsuccess:false,
                showcreate:false,
                showdurate:false,
                isprocess:'process',

                retracts:true,

                auxList:{},
                auxcontent:false,

                
                rules: {
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                },
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

                files:null,
                filesName:null,
                imgfile:null,
                imgName:null,
                filesList:[],
                imgList:[],

                record:[],
                dialogVisible2:false,
                dialogImageUrl2:null,

                contactData:[],
                competitorData:[],
                
                aaa:0,
                bbb:0,
                ccc:0,
                ddd:0,
                fff:0,
                ggg:0,

                dialogVisible:false,
                opportunityDeal:null,
                dialogVisible3:false,
                reasonsForFailure:[],
                codeSnippet:null,
                defaultMsg:'',
                config: {
                    initialFrameWidth: '',
                    initialFrameHeight: 200,
                    toolbars:[[
                        'bold', '|', 'insertorderedlist', 'insertunorderedlist', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    ]],
                    elementPathEnabled:false,
                    wordCount:false,
                },

                baseindex:'first',

                showauxAnalys:true,

                failReasonData:[],

                itemData:[
                    {id:10, productImg:null, amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false, remarks1:null, remarks2:null},
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
                productData:{},

                isDisable:false,

                competitorList:[],
            }
        },
        // mounted(){
        //     this.loadTable()
        //     this.loadData();
        // },
        activated(){
            this.loadTable()
            this.loadData()
            this.getList()
        },
        methods: {
            loadTable(){
                this.idArr.opportunity_id = this.$store.state.oppdetailsData.submitData.id
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                let data = {}
                data.type = '失败原因'
                let data2 = {}
                data2.page = 1
                data2.limit = 999999999
                let data3 = {}
                data3.type = '快捷方式'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableDatas = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.failReasonData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'classification/getClassificationNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                
                //竞争对手列表
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'competitor/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                    _this.competitorList = res.data.map.success
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
            loadData() {
                const _this = this
                //详情页
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'opportunity/getopportunityById.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.idArr.opportunity_id,
                }).then(function(res){
                    _this.opportunitydetail = res.data.map.success[0]
                    if(_this.opportunitydetail.discount){
                        _this.cusdiscount = res.data.map.success[0].discount
                    }else{
                        _this.cusdiscount = '100'
                    }
                    if(_this.opportunitydetail.taxRate){
                        _this.custaxRate = res.data.map.success[0].taxRate
                    }else{
                        _this.custaxRate = '0'
                    }
                    _this.contacts = res.data.map.success[0].contacts[0]
                    _this.privateUser = res.data.map.success[0].privateUser[0]
                    _this.customerpool = res.data.map.success[0].customerpool[0]
                    _this.opportunityDeal = res.data.map.success[0].opportunity_deal
                    _this.customerId = _this.customerpool.id
                    _this.stepList = _this.opportunitydetail.addstep
                    _this.stepList.length = _this.opportunitydetail.addstep.length - 1
                    _this.addstep = _this.opportunitydetail.opportunityProgress
                    let addStep = _this.addstep
                    if(addStep){
                        for(var i = 0,length = addStep.length;i < length;i++){
                            _this.stepList[i].createTime = addStep[i].createTime
                            _this.steptime = addStep[i].createTime
                            if(addStep[i].progress_probability == '0'){
                                _this.active = i
                                _this.shownext = false
                                _this.showfail = true
                                _this.showsuccess = false
                                _this.isprocess = 'error'
                                _this.failTime = addStep[i].createTime
                                _this.showauxAnalys = false
                            }else if(addStep[i].progress_probability == '100'){
                                _this.active = i+1
                                _this.shownext = false
                                _this.showfail = false
                                _this.showsuccess = true
                                _this.isprocess = 'wait'
                                _this.contractTime = addStep[i].createTime
                                _this.showauxAnalys = false
                            }else{
                                _this.active = i+1
                                _this.shownext = true
                                _this.showfail = false
                                _this.showsuccess = false
                                _this.isprocess = 'process'
                                _this.showauxAnalys = true
                            }
                            if(i !== 0){
                                if(addStep[i].previousTime){
                                    let arr = addStep[i].previousTime.split(" ");
                                    let arr2 = addStep[i].createTime.split(" ");
                                    let begintime = new Date(arr[0].replace(/-/g, "/"))
                                    let endtime = new Date(arr2[0].replace(/-/g, "/"))
                                    _this.showcreate = true
                                    _this.showdurate = true
                                    let dateDiff = endtime.getTime() - begintime.getTime();
                                    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                                    _this.stepList[i].duration = '历时：' + dayDiff + '天'
                                }
                            }else{
                                _this.showdurate = false
                                _this.showcreate = true
                            }
                        }
                    }
                    _this.auxcontent = false
                    _this.$options.methods.loadfollow.bind(_this)()
                }).catch(function(err){
                    _this.$message.error("商机详情加载失败,请重新进入页面");
                });
                //商机辅助分析
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityAnalysis.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.idArr.opportunity_id,
                }).then(function(res){
                    _this.auxList = res.data.map.opportunity
                    _this.aaa = parseFloat(_this.auxList.trackProportion)
                    _this.bbb = parseFloat(_this.auxList.surplusProportion)
                    _this.ccc = parseFloat(_this.auxList.step_probability)
                    _this.ddd = parseFloat(_this.auxList.competitorProportion)
                    _this.fff = parseFloat(_this.auxList.numProportion)
                    _this.ggg = parseFloat(_this.auxList.contactsProportion)
                }).catch(function(err){
                    // console.log(err);
                });
                _this.$options.methods.loadProduct.bind(_this)()
                _this.$options.methods.getCompetitor.bind(_this)()
            },
            loadProduct(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.opportunity_id = _this.idArr.opportunity_id
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.productData = res.data
                    _this.updateData = res.data.orderDetails
                    _this.updateData.forEach(el => {
                        if(el.image){
                            el.productImg = _this.$store.state.systemHttp + 'product/'+_this.$store.state.iscId+'/'+el.image
                        }else{
                            el.productImg = '../../../../static/img/noProduct.png'
                        }
                    });
                    if(_this.updateData.length){
                        _this.$options.methods.getItem.bind(_this)()
                    }else{
                        _this.itemData = [{id:10, productImg:null, amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false, remarks1:null, remarks2:null}]
                    }
                }).catch(function(err){
                    // console.log(err);
                });
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
                    url:_this.$store.state.defaultHttp+'getFollowByOpportunityIdOrContractId.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.idArr.opportunity_id,
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
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customerpool_id='+_this.customerId,
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
            closeDialog(){
                this.dialogVisible = false
                this.shownext = true
            },
            nextStep(){
                const _this = this
                let qs =require('querystring')
                for(var i = 0,length = this.stepList.length;i < length;i++){
                    let data = {}
                    data.previousTime = this.steptime + ':00'
                    data.deptid = this.$store.state.insid
                    data.secondid = this.$store.state.deptid
                    data.oy_id = this.idArr.opportunity_id
                    data.opportunityDeal = this.opportunityDeal
                    if(_this.active == i){
                        data.stepId = this.stepList[i].step_id
                        data.progress_probability = this.stepList[i].step_probability
                        if(data.progress_probability == '100'){
                            _this.shownext = false
                        }
                        axios({
                            method:'post',
                            url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                            data:qs.stringify(data),
                        }).then(function(res){
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.active += 1
                                _this.dialogVisible = false
                                _this.$options.methods.loadData.bind(_this)(true);
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            _this.$message.error("修改失败,请重新修改");
                        })
                    }
                }
            },
            endStep(){
                const _this = this
                let qs = require('querystring')
                let content = this.$refs.ue.getUEContent()
                let data = {}
                data.previousTime = this.steptime + ':00'
                data.deptid = this.$store.state.insid
                data.secondid = this.$store.state.deptid
                data.oy_id = this.idArr.opportunity_id
                data.stepId = 100
                data.codeSnippet = content
                data.reasonsForFailure = this.reasonsForFailure
                
                let flag = false
                if(!data.reasonsForFailure.length){
                    _this.$message({
                        message: '失败原因不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return
                
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '关闭成功',
                            type: 'success'
                        });
                        _this.isprocess = 'error'
                        _this.shownext = false
                        _this.showfail = true
                        _this.showauxAnalys = false
                        _this.dialogVisible3 = false
                        _this.$options.methods.loadData.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("关闭失败,请重新关闭");
                })
            },
            auxAnalys(){
                this.auxcontent = !this.auxcontent
            },
            
            changeState(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.status = row.status

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateStatus.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            changePrimary(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.isCrux = row.isCrux

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateIsCrux.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
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
                data.append("opportunity_id", this.idArr.opportunity_id);
                data.append("followType", this.followform.followType);
                data.append("contactTime", this.followform.contactTime);
                data.append("followContent", this.followform.followContent);
                data.append("contactsId", this.followform.contactsId);
                data.append("customerpool_id", this.customerId);
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

            // 竞争对手
            getCompetitor(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.oy_id = this.idArr.opportunity_id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunityCompetitor/selectByOpportunityId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data
                    _this.competitorData = items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                }).catch(function(err){
                    // console.log(err);
                });
            },
            cellClick2(row, column, cell, event){
                if(column.label !== '操作'){
                    row.edit = true
                    this.competitorData.forEach((el,i) => {
                        if(row.id == el.id){
                            this.scopeIndex = i
                        }
                    });
                }
            },
            addCompetitor(){
                this.competitorData.push({id:null,oy_id:this.idArr.opportunity_id,competitor_id:null,contacts:null,advantage:null,inferiority:null,commonTactics:null,edit:false})
            },
            selectChange(val,row){
                this.competitorList.forEach(el => {
                    if(el.id == val){
                        row.competitor_id = el.id
                        row.contacts = el.contacts
                    }
                });
            },
            editCompetitor(index,row){
                const _this = this
                let qs = require('querystring')
                let data = row

                let flag = false
                if(!data.competitor_id){
                    this.$message({
                        message:'竞争对手不能为空',
                        type:'success'
                    })
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunityCompetitor/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        row.edit = false
                        _this.$options.methods.loadData.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            deleteCompetitor(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id

                _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'opportunityCompetitor/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data)
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'操作成功',
                                type:'success'
                            })
                            _this.$options.methods.loadData.bind(_this)()
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        // console.log(err);
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
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
                    items.forEach(element => {
                        element.aaa = JSON.parse(element.spec)
                        element.goodspec = []
                        for(var key in element.aaa){
                            if(key !== "null" && key !== "undefined"){
                                element.goodspec.push({label:key,value:element.aaa[key]})
                            }
                        }
                        if(element.image){
                            element.productImg = _this.$store.state.systemHttp + 'product/'+_this.$store.state.iscId+'/'+element.image
                        }else{
                            element.productImg = '../../../../static/img/noProduct.png'
                        }
                    });
                    _this.list = items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
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
                        this.itemData.push({ productImg:el.productImg, amountOfMoney: el.amountOfMoney, brand: el.brand, discount: el.discount, discountAfter: el.discountAfter, discountAmount: el.discountAmount, goodsId: el.goodsId, tbGoods:{ goodsName:el.goodsName, describe:el.describe, }, id: el.itemId, itemId: el.itemId, num: el.num, price: el.price, taxAfter: el.taxAfter, taxAmount: el.taxAmount, taxRate: el.taxRate, goodspec: el.goodspec, unit: el.unit, edit:false, remarks1:el.remarks1, remarks2:el.remarks2})
                    });
                // }else{
                //     console.log('232323232')
                //     _this.itemData = [{id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},]
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
                        
                        if(element.image){
                            element.productImg = _this.$store.state.systemHttp + 'product/'+_this.$store.state.iscId+'/'+element.image
                        }else{
                            element.productImg = '../../../../static/img/noProduct.png'
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
                this.itemData.push({ productImg:null, amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false, remarks1:null, remarks2:null})
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
                            "remarks1":el.remarks1,
                            "remarks2":el.remarks2,
                        })
                    }
                });
                let data = {
                    "id":this.productData.id,
                    "opportunity_id":this.idArr.opportunity_id,
                    "customerpoolId":this.customerId,
                    "totalSum":totalSum,
                    "ascriptionId":this.customerpool.pId,
                    "secondid":this.customerpool.secondid,
                    "deptid":this.customerpool.deptid,
                    "orderDetails":partsDetails,
                    "pId":parseInt(this.$store.state.ispId)
                }

                let flag = false
                if(!data.orderDetails.length){
                    _this.$message({
                        message:'至少添加一个产品',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

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
                        _this.$options.methods.loadData.bind(_this)()
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


            getRow(index,row){
                this.$store.state.oppdetailsData.submitData = {"id":row.opportunity_id}
                this.idArr.opportunity_id = row.opportunity_id
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableDatas = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
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
    .oppdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .aux_c{
        height: 150px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .aux_ul{
        flex: 1
    }
    .aux_li{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .aux_li p{
        width: 60px
    }
    .aux_li .el-progress{
        margin-left: 5%;
        margin-top: 40px;
    }
</style>
