<template>
    <!-- 客户详情页 -->
    <el-row class="cusdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{customerdetail.pName}}</span>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">收起</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="retracts">显示</el-button>
                        <el-popover placement="bottom" width="100" trigger="click">
                            <el-select v-model="SMSform.templateId" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in templateList" :key="item.templateId" :label="item.title" :value="item.templateId"></el-option>
                            </el-select>
                            <br><br><br>
                            <div style="text-align: right; margin: 0">
                                <el-button type="primary" size="mini" @click="sendSMS()">确定</el-button>
                            </div>
                            <el-button style="float:right;" class="info-btn" slot="reference" type="mini">发送短信</el-button>
                        </el-popover>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="TocustomerPool()">转移至客户池</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>网址：<span>{{customerdetail.url}}</span></li>
                            <li>地址：<span>{{customerdetail.address}}</span></li>
                            <li>备注：<span>{{customerdetail.remark}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="customerdetail" v-show="!thisshow">
                    <div slot="header" class="clearfix">
                        <span>辅助信息</span>
                        <el-popover placement="left" width="350" trigger="click">
                            <el-select v-model="countryId" @change="searchBusiness" style="width:90%">
                                <el-option v-for="item in Provinces" :key="item.id" :label="item.name" :value="item.id" placeholder="请选择省份"></el-option>
                            </el-select>
                            <div class="load_icon" v-if="showloading">
                                <span><i class="el-icon-loading"></i>加载中，请稍候...</span>
                            </div>
                            <ul class="ul_business" v-if="showbusiness">
                                <li><span>匹配公司：</span>{{businessList.screenName || '无'}}</li>
                                <li><span>公司地址：</span>{{businessList.address || '无'}}</li>
                                <li><span>法人代表：</span>{{businessList.legalRepresentative || '无'}}</li>
                                <li><span>营业状态：</span>{{businessList.businessStatus || '无'}}</li>
                                <li><span>登记机关：</span>{{businessList.aicBureau || '无'}}</li>
                                <li><span>社会信用代码：</span>{{businessList.creditCode || '无'}}</li>
                                <li><span>注册号：</span>{{businessList.licenseNo || '无'}}</li>
                                <li><span>组织机构代码：</span>{{businessList.orgCode || '无'}}</li>
                                <li><span>成立时间：</span>{{businessList.startupDate || '无'}}</li>
                            </ul>
                            <el-button type="primary" style="margin-left:10px;" size="mini" v-if="showbusiness" @click="clickRefresh">确定</el-button>
                            <el-button class="btn_refresh" slot="reference" size="mini">智能补全</el-button>
                        </el-popover>
                    </div>
                    <div class="text item">
                        <ul>
                            <br>
                            <li>法人代表：<span>{{customerdetail.representative}}</span></li>
                            <li>行业：<span>{{customerdetail.industryType}}</span></li>
                            <li>社会信用代码：<span>{{customerdetail.creditCode}}</span></li>
                            <li>公司类型：<span>{{customerdetail.companyType}}</span></li>
                            <li>企业规模：<span>{{customerdetail.enterpriseScale}}</span></li>
                            <li>注册号：<span>{{customerdetail.registrationNumber}}</span></li>
                            <li>融资状态：<span>{{customerdetail.financingState}}</span></li>
                            <li>营业状态：<span>{{customerdetail.operatingState}}</span></li>
                            <li>组织机构代码：<span>{{customerdetail.organizationCode}}</span></li>
                            <li>注册资金：<span>{{customerdetail.capital}}</span></li>
                            <li>登记机关：<span>{{customerdetail.registrationAuthority}}</span></li>
                            <li>成立时间：<span>{{customerdetail.date}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="tabClick">
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
                                    <el-option v-for="item in contactList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" style="width:275px;" prop="state">
                                <el-select v-model="followform.state" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in stateList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下次联系时间" style="width:310px;">
                                <el-date-picker v-model="followform.contactTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" :picker-options="pickerOptions" placeholder="选择日期时间" style="width:200px;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="快捷沟通" style="width:80%;">
                                <el-radio v-model="followform.followContent" v-for="item in fastcontactList" :key="item.id" :label="item.content">{{item.typeName}}</el-radio>
                            </el-form-item>
                            <el-form-item label="上传图片" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="imgList" action="doUpload" :auto-upload="false" :on-change="beforeUploadimg">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传图片</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="上传附件" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="fileList" action="doUpload" :auto-upload="false" :on-change="beforeUploadfile">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传附件</el-button>
                                </el-upload>
                            </el-form-item>
                            
                            <el-form-item style="float:right;">
                                <el-button style="margin-top:6px" type="primary" size="mini" @click="Submitfollowform">立即提交</el-button>
                            </el-form-item>
                        </el-form>
                        <ul class="followrecord" v-for="(item,index) in record" :key="item.followId">
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
                                        <span class="de_span_2">{{item.state}}</span>
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

                                    <p class="de_span_1">{{item.inputType}}</p>
                                    
                                    <el-dialog :visible.sync="dialogVisible2">
                                        <img width="100%" :src="dialogImageUrl2" alt="">
                                    </el-dialog>
                                </div>
                                <div class="right_more" v-if="item.showdelico">
                                    <el-dropdown trigger="click" @command="deletefollow(index)">
                                        <span class="el-dropdown-link">更多<i class="el-icon-caret-bottom"></i></span>
                                        <el-dropdown-menu slot="dropdown" class="drop_item">
                                            <el-dropdown-item command="del">删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="second">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addcontact()">新增联系人</el-button>
                            <div class="screen">
                                <span style="font-size:14px;">首要联系人</span>
                                <el-select class="pricon_sel" v-model="contacts_id" placeholder="请选择" @change="choosePri">
                                    <el-option v-for="item in priconList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <el-table :data="cusConsDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="联系人名称" prop="name" min-width="120" />
                            <el-table-column label="手机" prop="phone" min-width="110" />
                            <el-table-column label="固话" prop="telephone" min-width="110" />
                            <el-table-column label="邮箱" prop="email" min-width="130" />
                            <el-table-column label="QQ" prop="qq" min-width="110" />
                            <el-table-column label="微信" prop="wechat" min-width="110" />
                            <el-table-column label="地址" prop="address" show-overflow-tooltip min-width="200" />
                            <el-table-column label="职务" prop="identity" min-width="90" />
                            <el-table-column label="性别" prop="sex" min-width="90" />
                            <el-table-column label="是否在职" prop="status" min-width="110">
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
                    <el-tab-pane label="商机管理" name="third">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addopp()">新增商机</el-button>
                        </div>
                        <el-table :data="opportunityDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="商机名称" prop="opportunity_name" min-width="150" />
                            <el-table-column label="商机金额" prop="opportunity_achievement" min-width="110">
                                <template slot-scope="scope">
                                    {{parseInt(scope.row.opportunity_achievement) | rounding}}
                                </template>
                            </el-table-column>
                            <el-table-column label="预计签单时间" prop="opportunity_deal" min-width="150" />
                            <el-table-column label="商机阶段" prop="opportunityProgress[0].progress_name" min-width="110" />
                            <el-table-column label="预计成功率" prop="opportunityProgress[0].progress_probability" min-width="120" />
                            <el-table-column label="商机创建时间" prop="opportunity_time" min-width="150" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="合同管理" name="fouth">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addagree()">新增合同</el-button>
                        </div>
                        <el-table :data="agreementDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="合同名称" prop="contract_name" min-width="150" />
                            <el-table-column label="合同类型" prop="contract_type" min-width="110" />
                            <el-table-column label="合同金额" prop="amount" min-width="110">
                                <template slot-scope="scope">
                                    {{scope.row.amount | rounding}}
                                </template>
                            </el-table-column>
                            <el-table-column label="签约人" prop="signatories" min-width="110" />
                            <el-table-column label="合同开始时间" prop="start_date" min-width="130" />
                            <el-table-column label="合同到期时间" prop="end_date" min-width="130" />
                            <el-table-column label="剩余天数" prop="due_time" min-width="110" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="开票资料" name="fifth">
                        <el-table :data="InvoiceDetails" border stripe style="width: 100%">
                            <el-table-column label="公司名称" prop="name" min-width="200" />
                            <el-table-column label="税务登记号" prop="creditCode" min-width="150" />
                            <el-table-column label="税务地址" prop="address" min-width="200" show-overflow-tooltip />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="外勤任务" name="sixth">
                        <el-table :data="FielDutyDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="类型" prop="type" min-width="90" />
                            <el-table-column label="主题" prop="theme" min-width="150" />
                            <el-table-column label="时间" prop="startTime" min-width="150">
                                <template slot-scope="scope">
                                    <p>{{scope.row.startTime}}</p>
                                    <p>{{scope.row.endTime}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="负责人" prop="private_employee" min-width="110">
                            </el-table-column>
                            <el-table-column label="状态" prop="state" min-width="90">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state == '已完成'" style="color:#e6a23c">{{scope.row.state}}</span>
                                    <span v-if="scope.row.state == '未完成'" style="color:#909399">{{scope.row.state}}</span>
                                    <span v-if="scope.row.state == '作废'" style="color:#f56c6c">{{scope.row.state}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="官网" name="seventh">
                        <iframe class="tab_iframe" :src="website"/>
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="eighth">
                        <el-table :data="EnclosureDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="附件名称" prop="name" min-width="150">
                                <template slot-scope="scope">
                                    <a :href="scope.row.src" download>{{scope.row.name}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column label="上传者" prop="uploads" min-width="100">
                            </el-table-column>
                            <el-table-column label="上传时间" prop="uploadTime" min-width="150">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;min-height:560px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="公司名称" prop="name">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.name}}
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

        <el-dialog title="新增联系人" :visible.sync="contactdialog" width="50%" :close-on-click-modal="false">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules" style="padding-right:30px">
                <el-form-item label="公司名称">
                    <el-input v-model="newform.pName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="联系人">
                    <el-input v-model="newform.name"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机">
                    <el-input v-model="newform.phone" onkeyup = "value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="newform.telephone"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="newform.qq"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="newform.email"></el-input>
                </el-form-item>
                <el-form-item label="微信">
                    <el-input v-model="newform.weChat"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                     <el-radio v-model="newform.sex" label="男">男</el-radio>
                    <el-radio v-model="newform.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker v-model="newform.birthday" type="date" default-value="1985-06-15" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="职务">
                    <el-input v-model="newform.identity"></el-input>
                </el-form-item>
                <el-form-item prop="explain" label="备注">
                    <el-input type="textarea" rows="5" v-model="newform.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="contactdialog = false">取 消</el-button>
                <el-button type="primary" @click="submitcontact">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增商机" :visible.sync="oppdialog" width="50%" :close-on-click-modal="false">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item label="公司名称">
                    <el-input v-model="newform.pName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="opportunity_name" label="商机名称">
                    <el-input v-model="newform.opportunity_name"></el-input>
                </el-form-item>
                <el-form-item prop="contacts_id" label="客户决策人">
                    <el-select v-model="newform.contacts_id" placeholder="请选择客户决策人" style="width:100%">
                        <el-option v-for="item in cusConsDetails" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="opportunity_achievement" label="预计成交金额">
                    <el-input v-model="newform.opportunity_achievement" onkeyup = "value=value.replace(/[^\d]/g,'.')"></el-input>
                </el-form-item>
                <el-form-item prop="opportunity_deal" label="预计成交时间">
                    <el-date-picker v-model="newform.opportunity_deal" type="date" placeholder="请选择预计成交时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="newform.our_signame" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="newform.opportunity_remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="oppdialog = false">取 消</el-button>
                <el-button type="primary" @click="submitopp">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增合同" :visible.sync="agreedialog" width="50%" :close-on-click-modal="false">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item label="客户名称">
                    <el-input v-model="newform.pName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="contract_type" label="合同类型">
                    <el-select v-model="newform.contract_type" placeholder="请选择" style="width:100%">
                        <el-option label="销售合同" value="销售合同"></el-option>
                        <el-option label="服务合同" value="服务合同"></el-option>
                        <el-option label="代理合同" value="代理合同"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="contract_name" label="合同名称">
                    <el-input v-model="newform.contract_name"></el-input>
                </el-form-item>
                <el-form-item prop="opportunity_id" label="对应商机">
                    <el-select v-model="newform.opportunity_id" placeholder="请选择" style="width:100%" @change="handleopp">
                        <el-option v-for="item in opportunityDetails" :key="item.opportunity_id" :label="item.opportunity_name" :value="item.opportunity_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="amount" label="合同金额">
                    <el-input v-model="newform.amount" onkeyup = "value=value.replace(/[^\d]/g,'.')"></el-input>
                </el-form-item>
                <el-form-item prop="start_date" label="开始时间">
                    <el-date-picker v-model="newform.start_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="handlechange" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="end_date" label="结束时间">
                    <el-date-picker v-model="newform.end_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="signatories" label="客户签约人">
                    <el-select v-model="newform.signatories" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in cusConsDetails" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="我方签约人">
                    <el-input v-model="newform.our_signame" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="newform.remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="agreedialog = false">取 消</el-button>
                <el-button type="primary" @click="submitagree">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'
    import qs from 'qs'

    export default {
        name:'customerDetails',
        store,
        computed: {
            cusConsDetails(){
                return store.state.cusConsDetailsList;
            },
            opportunityDetails(){
                return store.state.opportunityDetailsList;
            },
            agreementDetails(){
                return store.state.agreementDetailsList;
            },
            InvoiceDetails(){
                return store.state.InvoiceDetailsList;
            },
            FielDutyDetails(){
                return store.state.FielDutyDetailsList
            },
        },
        filters: {
            rounding (value) {
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
            }
        },
        data(){
            return {
                detailData:null,
                
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },

                SMSform:{
                    templateId:null,
                },
                templateList:null,
                
                followform:{
                    followType:'电话',
                    contactTime:'',
                    contactsId:'',
                    followContent:'',
                    state:'',
                },
                newform:{},
                rules: {
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                    state : [{ required: true, message: '请选择状态', trigger: 'blur' },],
                    name : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    phone : [{ required: true, message: '手机号码不能为空', trigger: 'blur' },],
                    opportunity_name : [{ required: true, message: '商机名称不能为空', trigger: 'blur' },],
                    opportunity_achievement : [{ required: true, message: '预计成交金额不能为空', trigger: 'blur' },],
                    opportunity_deal : [{ required: true, message: '预计成交时间不能为空', trigger: 'blur' },],
                    contacts_id : [{ required: true, message: '客户决策人不能为空', trigger: 'blur' },],
                    contract_type : [{ required: true, message: '合同类型不能为空', trigger: 'blur' },],
                    contract_name : [{ required: true, message: '合同名称不能为空', trigger: 'blur' },],
                    amount : [{ required: true, message: '合同金额不能为空', trigger: 'blur' },],
                    start_date : [{ required: true, message: '开始时间不能为空', trigger: 'blur' },],
                    end_date : [{ required: true, message: '结束时间不能为空', trigger: 'blur' },],
                    signatories : [{ required: true, message: '客户签约人不能为空', trigger: 'blur' },],
                    
                },
                followTypes:[
                    {label:'电话',value:'1'},
                    {label:'微信',value:'2'},
                    {label:'QQ',value:'3'},
                    {label:'邮箱',value:'4'},
                    {label:'拜访',value:'5'},
                ],

                stateList:[],
                searchList:{
                    keyword:null,
                },
                customerdetail:{
                    pName: ''
                },
                contacts:{},
                record:[],
                fastcontactList:null,
                contactList:[],
                activeName2: 'first',
                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },

                retracts:true,

                priconList:[],
                contacts_id:null,

                countryId:null,
                Provinces:[],
                businessList:null,
                showbusiness:false,
                showloading:false,

                files:null,
                filesName:null,
                imgfile:null,
                imgName:null,
                fileList:[],
                imgList:[],

                dialogVisible2:false,
                dialogImageUrl2:null,

                website:'',

                EnclosureDetails:[],

                contactdialog:false,
                oppdialog:false,
                agreedialog:false,
            }
        },
        beforeRouteLeave(to, from , next){
            bus.$off('customer')
            next()
        },
        activated(){
            this.loadData();
            this.loadCountry()
            this.reload()
            this.loadTemplate()
        },
        methods: {
            reload(){
                const _this = this
                bus.$on('customer', function (msg) {
                    if(msg){
                        _this.$options.methods.loadData.bind(_this)()
                        _this.$options.methods.loadCountry.bind(_this)()
                    }
                })
            },
            loadData() {
                this.detailData = this.$store.state.cusdetailsData.submitData;
                this.idArr.id = this.$store.state.cusdetailsData.submitData.id
                
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                let pageInfo2 = {}
                pageInfo2.page = 1
                pageInfo2.limit = 100000
                let data = {}
                data.type = '快捷方式'

                
                //加载快捷方式
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.fastcontactList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                //加载客户详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolById.do?cId='+_this.$store.state.iscId+'&id='+this.detailData.id,
                }).then(function(res){
                    _this.customerdetail = res.data.map.success
                    _this.contacts = res.data.map.success.contacts[0]
                    _this.showbusiness = false
                }).catch(function(err){
                    // console.log(err);
                });
                
                //加载跟进记录
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'customerpool/getFollowStaffAndpool.do?cId='+_this.$store.state.iscId+'&customerpool_id='+_this.detailData.id,
                }).then(function(res){
                    _this.record = res.data.map.success
                    if(!_this.record[0]){
                        _this.$options.methods.loadState.bind(_this)()
                    }else{
                        _this.followform.state = _this.record[0].state
                        _this.$options.methods.loadState.bind(_this)()
                    }
                    _this.record.forEach(el => {
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
                //详情页开票
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolNameAndNumber.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.$store.state.InvoiceDetailsList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                //详情页外勤任务
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'customerpool/selectWorkPlanAndVisit.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id
                }).then(function(res){
                    _this.$store.state.FielDutyDetailsList = res.data.map.workPlanAndVisit
                }).catch(function(err){
                    // console.log(err);
                });
                _this.$options.methods.loadContact.bind(_this)()
                _this.$options.methods.loadAgree.bind(_this)()
                _this.$options.methods.loadOpp.bind(_this)()
            },
            loadContact(){
                const _this = this
                let qs = require('querystring')
                let pageInfo2 = {}
                pageInfo2.page = 1
                pageInfo2.limit = 100000
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.$store.state.cusConsDetailsList = res.data.map.success
                    _this.contactList = res.data.map.success
                    _this.priconList = res.data.map.success
                    _this.followform.contactsId = res.data.map.success[0].id
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadAgree(){
                const _this = this
                let qs = require('querystring')
                let pageInfo2 = {}
                pageInfo2.page = 1
                pageInfo2.limit = 100000
                //详情页合同
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getContractByPool.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.$store.state.agreementDetailsList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadOpp(){
                const _this = this
                let qs = require('querystring')
                let pageInfo2 = {}
                pageInfo2.page = 1
                pageInfo2.limit = 100000
                //详情页商机
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/queryForPoolList.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.$store.state.opportunityDetailsList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadState(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.type = '客户状态'
                //加载客户状态
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.stateList = res.data
                    _this.stateList.forEach(el => {
                        if(_this.followform.state && _this.followform.state == el.typeName){
                            _this.followform.state = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            loadTemplate(){
                const _this = this;
                let qs =require('querystring')
                let data = {}
                data.type = '客户'
                data.genre = '营销类'
                data.status = '2'
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/selectTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.templateList = res.data.map.templates
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            loadCountry(){
                const _this = this
                let qs =require('querystring')

                //省/市/区
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do?id=',
                }).then(function(res){
                    _this.Provinces=res.data;
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            choosePri(val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.contacts_id = val

                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateFirst.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success'){
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
            showImg(e,val){
                this.dialogImageUrl2 = _this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                this.$store.state.cusdetailsData.submitData = {"id":row.id}
                this.idArr.id = row.id
                this.countryId = null
                this.$options.methods.loadData.bind(this)(true);
            },
            TocustomerPool(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerpool/updateTo.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '转移成功',
                            type: 'success'
                        });
                        _this.closeTag();
                    }else if(res.data.msg && res.data.msg == 'error'){//转移至客户池
                        _this.$message({
                            message: '对不起，您没有该权限，请联系管理员开通',
                            type: 'error'
                        })
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("转移失败,请重新转移");
                });
            },
            deletefollow(index){
                const _this = this
                let qs =require('querystring')
                let followData = {}
                followData.followId = this.record[index].followId

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'delFollow.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(followData)
                }).then(function(res){
                    if(res.data && res.data == '1' ) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$store.state.cusdetailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        
                    } else {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("删除失败,请重新删除");
                });
            },
            
            searchBusiness(val){
                this.showloading = true
                const _this = this
                let qs = require('querystring')
                let freshList = {}
                freshList.name = this.customerdetail.pName
                freshList.countryId = this.countryId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'businessData/getBusinessData.do',
                    data: qs.stringify(freshList),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200' && res.data.map.businessDatas){
                        _this.businessList = res.data.map.businessDatas[0]
                        _this.showloading = false
                        _this.showbusiness = true
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+'businessData/insertBusinessData.do',
                            data: qs.stringify(freshList),
                        }).then(function(res){
                        }).catch(function(err){
                            // console.log(err);
                        });
                    }else{
                        _this.$message({
                            message:'没有匹配的信息',
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("服务器开小差了,请稍候重试");
                });
            },
            clickRefresh(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.businessList.id
                data.customerpoolId = this.detailData.id
                data.countryId = this.countryId

                if(this.customerdetail.pName == this.businessList.screenName){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'customerpool/updateBusinessData.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'更新成功',
                                type:'success'
                            })
                            _this.$options.methods.loadData.bind(_this)(true);
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        _this.$message.error("更新失败,请重新更新");
                    });
                }else{
                    _this.$message({
                        message:'该公司与匹配的公司名称不一致，无法更新',
                        type:'error'
                    })
                }
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
            addcontact(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contactsJurisdiction/insert.do',//新增联系人
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.contactdialog = true
                        _this.newform = {
                            pName:_this.customerdetail.pName,
                            name:null,
                            phone:null,
                            telephone:null,
                            qq:null,
                            email:null,
                            weChat:null,
                            sex:null,
                            birthday:null,
                            identity:null,
                            remark:null,
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            submitcontact(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    poolName:this.customerdetail.pName,
                    customerpool_id:this.customerdetail.id,
                    name:this.newform.name,
                    phone:this.newform.phone,
                    telephone:this.newform.telephone,
                    qq:this.newform.qq,
                    email:this.newform.email,
                    weChat:this.newform.weChat,
                    sex:this.newform.sex,
                    birthday:this.newform.birthday,
                    identity:this.newform.identity,
                    remark:this.newform.remark,
                    pId:this.$store.state.ispId,
                    secondid:this.$store.state.deptid,
                    deptid:this.$store.state.insid
                }

                let flag = false
                if(!data.name){
                    _this.$message({
                        message: '联系人名称不能为空',
                        type: 'error'
                    })
                    flag = true
                }
                if(!data.phone){
                    _this.$message({
                        message: '手机号码不能为空',
                        type: 'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+ 'insertContacts.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        _this.contactdialog = false
                        _this.$options.methods.loadContact.bind(_this)();
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            addopp(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'opportunityJurisdiction/insert.do',//新增商机
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.oppdialog = true
                        _this.newform = {
                            pName:_this.customerdetail.pName,
                            opportunity_name:null,
                            contacts_id:null,
                            opportunity_achievement:null,
                            opportunity_deal:null,
                            our_signame:_this.$store.state.user,
                            opportunity_remarks:null,
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            submitopp(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    customerpool_id:this.customerdetail.id,
                    opportunity_name:this.newform.opportunity_name,
                    contacts_id:this.newform.contacts_id,
                    opportunity_achievement:this.newform.opportunity_achievement,
                    opportunity_deal:this.newform.opportunity_deal,
                    user_id:this.$store.state.ispId,
                    secondid:this.$store.state.deptid,
                    deptid:this.$store.state.insid
                }

                let flag = false
                if(!data.opportunity_name){
                    _this.$message({ message: '商机名称不能为空', type: 'error' })
                    flag = true
                }
                if(!data.contacts_id){
                    _this.$message({ message: '客户决策人不能为空', type: 'error' })
                    flag = true
                }
                if(!data.opportunity_achievement){
                    _this.$message({ message: '预计成交金额不能为空', type: 'error' })
                    flag = true
                }
                if(!data.opportunity_deal){
                    _this.$message({ message: '预计成交时间不能为空', type: 'error' })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        _this.oppdialog = false
                        _this.$options.methods.loadOpp.bind(_this)();
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            addagree(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contractJurisdiction/insert.do',//新增合同
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.agreedialog = true
                        _this.newform = {
                            pName:_this.customerdetail.pName,
                            contract_type:null,
                            contract_name:null,
                            opportunity_id:null,
                            amount:null,
                            start_date:null,
                            end_date:null,
                            signatories:null,
                            our_signatories:null,
                            our_signame:_this.$store.state.user,
                            remarks:null,
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            submitagree(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    customerpool_id:this.customerdetail.id,
                    contract_type:this.newform.contract_type,
                    contract_name:this.newform.contract_name,
                    opportunity_id:this.newform.opportunity_id,
                    amount:this.newform.amount,
                    start_date:this.newform.start_date,
                    end_date:this.newform.end_date,
                    signatories:this.newform.signatories,
                    our_signatories:this.$store.state.ispId,
                    remarks:this.newform.remarks,
                    pId:this.$store.state.ispId,
                    secondid:this.$store.state.deptid,
                    deptid:this.$store.state.insid
                }

                let flag = false
                if(!data.contract_type){
                    _this.$message({ message: '合同类型不能为空', type: 'error' })
                    flag = true
                }
                if(!data.contract_name){
                    _this.$message({ message: '合同名称不能为空', type: 'error' })
                    flag = true
                }
                if(!data.amount){
                    _this.$message({ message: '合同金额不能为空', type: 'error' })
                    flag = true
                }
                if(!data.start_date){
                    _this.$message({ message: '开始时间不能为空', type: 'error' })
                    flag = true
                }
                if(!data.end_date){
                    _this.$message({ message: '结束时间不能为空', type: 'error' })
                    flag = true
                }
                if(!data.signatories){
                    _this.$message({ message: '客户签约人不能为空', type: 'error' })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+ 'insertContract.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        _this.agreedialog = false
                        _this.$options.methods.loadAgree.bind(_this)();
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handlechange(val){
                this.newform.start_date = val
                let arr = val.split('-')
                let year = parseInt(arr[0]) + 1
                let month = arr[1]
                let day = arr[2]
                this.newform.end_date = year + '-' + month + '-' + day
            },
            handleopp(val){
                this.opportunityDetails.forEach(el => {
                    if(val == el.opportunity_id){
                        this.newform.amount = el.opportunity_achievement
                    }
                });
            },

            tabClick(val){
                if(val.index == 6){
                    this.website = 'http://' + this.customerdetail.url
                }
                if(val.index == 7){
                    this.EnclosureDetails = []
                    this.record.forEach(el => {
                        if(el.enclosureName){
                            this.EnclosureDetails.push({
                                name:el.enclosureOldName,
                                src:this.$store.state.systemHttp+'upload/'+this.$store.state.iscId+'/'+el.enclosureName,
                                uploads:el.private_employee,
                                uploadTime:el.createTime
                            })
                        }
                    });
                }
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
                const extension5 = file.name.split('.')[1] === 'pdf'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
                    this.$message.warning('附件只能是 xls、xlsx、doc、docx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('附件大小不能超过 5MB!')
                    return
                }
                this.filesName = file.name
                this.fileList.push({name:file.name})
                return false; // 返回false不会自动上传
            }, 

            Submitfollowform(){
                const _this = this
                let qs =require('querystring')
                let data = new FormData()
                data.append("followType", this.followform.followType);
                data.append("contactTime", this.followform.contactTime);
                data.append("followContent", this.followform.followContent);
                data.append("contactsId", this.followform.contactsId);
                data.append("follow_state", this.followform.state);
                data.append("customerpool_id", this.detailData.id);
                data.append("deptid", this.$store.state.insid);
                data.append("secondid", this.$store.state.deptid);
                data.append("imgNames", this.imgfile);
                data.append("enclosureNames", this.files);

                if(!this.followform.followContent){
                    _this.$message({
                        message: '跟进内容不能为空',
                        type: 'error'
                    });
                }else if(!this.followform.state){
                    _this.$message({
                        message: '跟进状态不能为空',
                        type: 'error'
                    });
                }else{
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'customerJurisdiction/follow.do',//客户添加跟进记录
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
                                _this.fileList = []
                                _this.imgList = []
                                _this.imgfile = null
                                _this.files = null
                                _this.$store.state.cusdetailsData.submitData = {"id":_this.detailData.id}
                                _this.$options.methods.loadData.bind(_this)(true);
                            }).catch(function(err){
                                _this.$message.error("提交失败,请重新提交");
                            });
                        }
                        
                    }).catch(function(err){
                        // console.log(err);
                    });
                }

                
            },
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
                    delItem.path === this.$route.fullPath && this.$router.push('/customer');
                }else{
                    this.$router.push('/index');
                }
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
                    url: _this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
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

            sendSMS(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.names = [this.customerdetail.pName]
                data.phones = [this.contacts.phone]
                data.contacts = [this.contacts.coName]
                data.templateId = this.SMSform.templateId

                axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'customerJurisdiction/send.do',//客户发送短信
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            axios({
                                method: 'post',
                                url: _this.$store.state.defaultHttp+'message/sendMarketingMsg.do?cId='+_this.$store.state.iscId,
                                data: qs.stringify(data)
                            }).then(function(res){
                                if(res.data.code && res.data.code == '200'){
                                    _this.$message({
                                        message:'发送成功',
                                        type:'success'
                                    })
                                    _this.$options.methods.addSMSsended.bind(_this)()
                                }else{
                                    _this.$message({
                                        message:res.data.msg,
                                        type:'error'
                                    })
                                }
                            }).catch(function(err){
                                // console.log(err);
                            });
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });

                
            },
            addSMSsended(){
                const _this = this
                let qs = require('querystring')
                let data2 = {}
                data2.type = '客户'
                data2.ids = [this.customerdetail.id]
                data2.names = [this.customerdetail.pName]
                data2.phones = [this.contacts.phone]
                data2.contacts = [this.contacts.coName]
                data2.templateId = this.SMSform.templateId
                data2.pId = this.$store.state.ispId
                data2.secondid = this.$store.state.deptid
                data2.deptid = this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'sendRecord/insertSendRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            }
        },
    }
</script>

<style>
    .cusdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
</style>
