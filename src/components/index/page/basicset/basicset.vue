<template>
    <!-- 基础设置页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <el-table
                :data="statesData"
                border
                stripe
                style="width:100%"
                v-show="showtopfour">
                <el-table-column
                    prop="sort"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="id"
                    width="100"
                    label="ID"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    min-width="120"
                    label="名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="deliData"
                border
                stripe
                style="width:100%"
                v-show="showeleven">
                <el-table-column
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    min-width="120"
                    label="名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="waysData"
                border
                stripe
                style="width:100%"
                v-show="showfive">
                <el-table-column
                    prop="sort"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    min-width="120"
                    label="方式名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="content"
                    min-width="120"
                    label="跟进内容"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="oppstepsData"
                border
                stripe
                style="width:100%"
                v-show="showsix">
                <el-table-column
                    prop="sort"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="step_name"
                    min-width="120"
                    label="状态名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="step_probability"
                    min-width="120"
                    label="成功几率"
                    sortable>
                    <template slot-scope="scope">
                        <div>{{scope.row.step_probability}} %</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-table
                :data="unitsData"
                border
                stripe
                style="width:100%"
                v-show="showeight">
                <el-table-column
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="name"
                    min-width="120"
                    label="单位名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    min-width="120"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteUnit(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="brandsData"
                border
                stripe
                style="width:100%"
                v-show="shownine">
                <el-table-column
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="firstChar"
                    min-width="120"
                    label="首字母"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="品牌名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteBrand(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-tree
                node-key="id"
                highlight-current
                accordion
                :data="proClassData"
                :props="defaultProps"
                expand-on-click-node
                :default-expanded-keys="defaultkeys"
                @node-click="handleNodeClick"
                v-show="showseven">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i class="el-icon-info">&nbsp;&nbsp;</i>{{ node.label }}</span>
                    <span class="operation_proclass">
                        <el-button type="text" size="mini" style="font-size:12px;" @click="proAdd(data)">添加/
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="proEdit(data)">修改/
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="deleteProclass(node,data)">删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-table
                :data="specData"
                border
                stripe
                style="width:100%"
                v-show="showten">
                <el-table-column
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="specName"
                    min-width="120"
                    label="规格名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="specValue"
                    label="规格值"
                    min-width="200"
                    sortable>
                    <template slot-scope="scope">
                        <span v-for="(a,i) in scope.row.specValue" :key="i">{{a}} , </span>
                        <!-- {{scope.row.specValue}} -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="145"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deletespec(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="distriData"
                border
                stripe
                style="width:100%"
                v-show="showtwelve">
                <el-table-column
                    prop="sort"
                    min-width="50"
                    label="排序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    min-width="120"
                    label="经销商名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="discount"
                    min-width="120"
                    label="默认折扣"
                    sortable>
                    <template slot-scope="scope">{{scope.row.discount}} %</template>
                </el-table-column>
                <el-table-column
                    prop="taxRate"
                    min-width="120"
                    label="税率"
                    sortable>
                    <template slot-scope="scope">{{scope.row.taxRate}} %</template>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage" v-show="showeight || shownine">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 100, 500]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div>
        </div>
        
        <el-dialog
            title="添加状态"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增线索状态、客户状态、客户来源、客户分类 -->
        <el-dialog
            title="修改状态"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑线索状态、客户状态、客户来源、客户分类 -->
        <el-dialog
            title="添加快捷方式"
            :visible.sync="dialogVisible3"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="quickname" label="快捷方式">
                    <el-input v-model="newform.quickname" placeholder="请输入快捷方式"></el-input>
                </el-form-item>
                <el-form-item prop="quickcontent" label="跟进内容">
                    <el-input v-model="newform.quickcontent" placeholder="请输入跟进内容"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增快捷方式 -->
        <el-dialog
            title="修改快捷方式"
            :visible.sync="dialogVisible4"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="quickname" label="快捷方式">
                    <el-input v-model="newform.quickname" placeholder="请输入快捷方式"></el-input>
                </el-form-item>
                <el-form-item prop="quickcontent" label="跟进内容">
                    <el-input v-model="newform.quickcontent" placeholder="请输入跟进内容"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑快捷方式 -->
        <el-dialog
            title="添加商机进度"
            :visible.sync="dialogVisible5"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="进度名称">
                    <el-input v-model="newform.typeName" placeholder="请输入进度名称"></el-input>
                </el-form-item>
                <el-form-item prop="probability" label="成功几率">
                    <el-input type="number" min="0" max="100" v-model="newform.probability" placeholder="请输入成功几率"><span slot="suffix" style="margin-right:20px">%</span></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible5 = false">取 消</el-button>
                <el-button type="primary" @click="addoppstep()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增商机进度 -->
        <el-dialog
            title="修改商机进度"
            :visible.sync="dialogVisible6"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="probability" label="成功几率">
                    <el-input type="number" min="0" max="100" v-model="newform.probability" placeholder="请输入成功几率"><span slot="suffix" style="margin-right:20px">%</span></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible6 = false">取 消</el-button>
                <el-button type="primary" @click="updateoppstep()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑商机进度 -->
        <el-dialog
            title="新增产品分类"
            :visible.sync="dialogVisible7"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="parentclass_name" label="上级产品分类">
                    <el-input v-model="newform.parentclass_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="proclass_name" label="产品分类名称">
                    <el-input v-model="newform.proclass_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible7 = false">取 消</el-button>
                <el-button type="primary" @click="addProclass()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增产品分类子集 -->
        <el-dialog
            title="修改产品分类"
            :visible.sync="dialogVisible8"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="proclass_name" label="产品分类名称">
                    <el-input v-model="newform.proclass_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible8 = false">取 消</el-button>
                <el-button type="primary" @click="updateProclass()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑产品分类子集 -->
        <el-dialog
            title="新增单位"
            :visible.sync="dialogVisible9"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="unit_name" label="单位名称">
                    <el-input v-model="newform.unit_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible9 = false">取 消</el-button>
                <el-button type="primary" @click="addunit()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增单位 -->
        <el-dialog
            title="修改单位"
            :visible.sync="dialogVisible10"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="unit_name" label="单位名称">
                    <el-input v-model="newform.unit_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible10 = false">取 消</el-button>
                <el-button type="primary" @click="updateunit()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑单位 -->
        <el-dialog
            title="新增品牌"
            :visible.sync="dialogVisible11"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="brand_name" label="品牌名称">
                    <el-input v-model="newform.brand_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible11 = false">取 消</el-button>
                <el-button type="primary" @click="addbrand()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增品牌 -->
        <el-dialog
            title="修改品牌"
            :visible.sync="dialogVisible12"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="brand_name" label="品牌名称">
                    <el-input v-model="newform.brand_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible12 = false">取 消</el-button>
                <el-button type="primary" @click="updatebrand()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑品牌 -->
        <el-dialog
            title="新增产品分类"
            :visible.sync="dialogVisible13"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="proclass_name" label="产品分类名称">
                    <el-input v-model="newform.proclass_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible13 = false">取 消</el-button>
                <el-button type="primary" @click="addProclass()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增产品分类顶级 -->
        <el-dialog
            title="新增规格"
            :visible.sync="dialogVisible14"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="spec_name" label="规格名称">
                    <el-input v-model="newform.spec_name"></el-input>
                </el-form-item>
                <el-form-item prop="specoption" label="规格值">
                    <el-select v-model="newform.specoption" multiple filterable allow-create default-first-option style="width:100%" no-data-text="请输入" placeholder="请输入" @change="changeValue">
                        <el-option v-for="item in tenoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table :data="specList" :key="key" border style="width: 100%">
                <el-table-column header-align="center" align="center" type="index" width="45"></el-table-column>
                <el-table-column label="规格值">
                    <template slot-scope="scope">
                    {{ scope.row.name }}
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible14 = false">取 消</el-button>
                <el-button type="primary" @click="addSpec()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增规格名称 -->
        <el-dialog
            title="编辑规格"
            :visible.sync="dialogVisible15"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="spec_name" label="规格名称">
                    <el-input v-model="newform.spec_name"></el-input>
                </el-form-item>
                <el-form-item prop="specoption" label="规格值">
                    <el-select v-model="newform.specoption" multiple filterable allow-create default-first-option style="width:100%" no-data-text="请输入" placeholder="请输入" @change="changeValue">
                        <el-option v-for="item in tenoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table :data="specList" :key="key" border style="width: 100%">
                <el-table-column header-align="center" align="center" type="index" width="45"></el-table-column>
                <el-table-column label="规格值">
                    <template slot-scope="scope">
                    {{ scope.row.name }}
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible15 = false">取 消</el-button>
                <el-button type="primary" @click="updateSpec()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑规格名称 -->
        <el-dialog
            title="添加交货方式"
            :visible.sync="dialogVisible16"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="交货方式">
                    <el-input v-model="newform.typeName" placeholder="请输入交货方式"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible16 = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增交货方式 -->
        <el-dialog
            title="修改交货方式"
            :visible.sync="dialogVisible17"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="交货方式">
                    <el-input v-model="newform.typeName" placeholder="请输入交货方式"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible17 = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑交货方式 -->
        <el-dialog
            title="添加经销商级别"
            :visible.sync="dialogVisible18"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="distri_name" label="经销商级别">
                    <el-input v-model="newform.distri_name" placeholder="请输入经销商级别"></el-input>
                </el-form-item>
                <el-form-item prop="distri_count" label="经销商折扣">
                    <el-input v-model="newform.distri_count" placeholder="请输入经销商折扣"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item prop="taxRate" label="经销商税率">
                    <el-input v-model="newform.taxRate" placeholder="请输入经销商税率"><template slot="append">%</template></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible18 = false">取 消</el-button>
                <el-button type="primary" @click="adddistri()">确 定</el-button>
            </span>
        </el-dialog><!-- 新增经销商级别 -->
        <el-dialog
            title="修改经销商级别"
            :visible.sync="dialogVisible19"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="distri_name" label="经销商级别">
                    <el-input v-model="newform.distri_name" placeholder="请输入经销商级别"></el-input>
                </el-form-item>
                <el-form-item prop="distri_count" label="经销商折扣">
                    <el-input v-model="newform.distri_count" placeholder="请输入经销商折扣"><template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item prop="taxRate" label="经销商税率">
                    <el-input v-model="newform.taxRate" placeholder="请输入经销商税率"><template slot="append">%</template></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible19 = false">取 消</el-button>
                <el-button type="primary" @click="updatedistri()">确 定</el-button>
            </span>
        </el-dialog><!-- 编辑经销商级别 -->
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'basicset',
        store,
        data(){
            return {
                statesData:[],
                waysData:[],
                oppstepsData:[],
                unitsData:[],
                brandsData:[],
                proClassData:[],
                specheadList:[],
                specData:[],
                deliData:[],
                distriData:[],

                specIndex:0,

                tableNumber:0,
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                page:1,//默认为第一页
                limit:20,//默认为20行

                dataList:null,
                nameList:[
                    {index:1,name:'线索状态',isActive:true},
                    {index:2,name:'客户状态',isActive:false},
                    {index:3,name:'客户来源',isActive:false},
                    {index:4,name:'客户分类',isActive:false},
                    {index:5,name:'快捷方式',isActive:false},
                    {index:6,name:'商机进度',isActive:false},
                    {index:7,name:'产品分类',isActive:false},
                    {index:8,name:'单位',isActive:false},
                    {index:9,name:'品牌',isActive:false},
                    {index:10,name:'规格',isActive:false},
                    {index:11,name:'交货方式',isActive:false},
                    {index:12,name:'经销商级别',isActive:false},
                ],
                newform:{
                    type:'线索状态',
                    index:'1',
                    id:null,
                    sort:null,
                    typeName:null,
                    notes:null,
                    quickname:null,
                    quickcontent:null,
                    probability:null,
                    brand_name:null,
                    unit_name:null,
                    parentclass_id:null,
                    parentclass_name:null,
                    proclass_id:null,
                    proclass_name:null,
                    spec_name:null,
                    specoption:[],
                    distri_name:null,
                    distri_count:null,
                    taxRate:null,
                },

                tenoptions:[],
                specList:[],
                key:1,

                checklist:['顺序','名称','备注'],
                idArr:{
                    id:null,
                },

                showtopfour:true,
                showfive:false,
                showsix:false,
                showseven:false,
                showeight:false,
                shownine:false,
                showten:false,
                showeleven:false,
                showtwelve:false,

                dialogVisible:false,//线索状态、客户状态、客户来源、客户分类
                dialogVisible2:false,
                dialogVisible3:false,//快捷方式
                dialogVisible4:false,
                dialogVisible5:false,//商机进度
                dialogVisible6:false,
                dialogVisible7:false,//产品分类子集
                dialogVisible8:false,
                dialogVisible9:false,//单位
                dialogVisible10:false,
                dialogVisible11:false,//品牌
                dialogVisible12:false,
                dialogVisible13:false,//产品分类顶级
                dialogVisible14:false,//规格分类、规格值
                dialogVisible15:false,
                dialogVisible16:false,//交货方式
                dialogVisible17:false,
                dialogVisible18:false,//经销商级别
                dialogVisible19:false,

                rules: {
                    typeName : [{ required: true, message: '名称不能为空', trigger: 'blur' },],
                    sort : [{ required: true, message: '排序编号不能为空', trigger: 'blur' },],
                    quickname : [{ required: true, message: '快捷方式不能为空', trigger: 'blur' },],
                    quickcontent : [{ required: true, message: '跟进内容不能为空', trigger: 'blur' },],
                    probability : [{ required: true, message: '成功几率不能为空', trigger: 'blur' },],
                    brand_name:[{ required: true, message: '品牌名称不能为空', trigger: 'blur' },],
                    unit_name:[{ required: true, message: '单位名称不能为空', trigger: 'blur' },],
                    proclass_name:[{ required: true, message: '产品分类名称不能为空', trigger: 'blur' },],
                    spec_name:[{ required: true, message: '规格名称不能为空', trigger: 'blur' },],
                    distri_name:[{ required: true, message: '经销商级别不能为空', trigger: 'blur' },],
                    distri_count:[{ required: true, message: '经销商折扣不能为空', trigger: 'blur' },],
                },
            }
        },
        mounted(){
            this.reloadTable()
        },
        activated(){
            this.reloadTable()
        },
        methods:{
            reloadTable(){
                const _this = this
                let qs = require('querystring')
                let i = this.newform.index
                let data = {}
                data.type = this.newform.type
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(i == 1 || i == 2 || i == 3 || i == 4){
                        _this.statesData = res.data
                    }else if(i == 5){
                        _this.waysData = res.data
                    }else if(i == 11){
                        _this.deliData = res.data
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadOppStep(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'addstep/selectAddstep.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.oppstepsData = res.data.map.addsteps
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadproductClass(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'classification/getClassificationNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.proClassData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadUnit(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'unit/selectUnitList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.unitsData = res.data.map.units
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadBrand(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'brand/selectBrandList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.brandsData = res.data.map.brands
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadSpec(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'specification/selectList.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.specData = res.data
                    // _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadistri(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'distributor/selectDistributor.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.distriData = res.data.map.distributors
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示左边对应表格数据
            showTableval(val){
                const _this = this
                let i = val.index
                this.newform.type = val.name
                this.newform.index = val.index
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                _this.showtopfour = false
                _this.showfive = false
                _this.showsix = false
                _this.showseven = false
                _this.showeight = false
                _this.shownine = false
                _this.showten = false
                _this.showeleven = false
                _this.showtwelve = false
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    _this.showtopfour = true
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }else if(i == 5){
                    _this.showfive = true
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }else if(i == 6){
                    _this.showsix = true
                    _this.$options.methods.loadOppStep.bind(_this)(true)
                }else if(i == 7){
                    _this.showseven = true
                    _this.$options.methods.loadproductClass.bind(_this)(true)
                }else if(i == 8){
                    _this.showeight = true
                    _this.$options.methods.loadUnit.bind(_this)(true)
                }else if(i == 9){
                    _this.shownine = true
                    _this.$options.methods.loadBrand.bind(_this)(true)
                }else if(i == 10){
                    _this.showten = true
                    _this.$options.methods.loadSpec.bind(_this)(true)
                }else if(i == 11){
                    _this.showeleven = true
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }else if(i == 12){
                    _this.showtwelve = true
                    _this.$options.methods.loadistri.bind(_this)(true)
                }
            },
            //添加
            handleAdd(){
                const _this = this
                let i = this.newform.index

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/insert.do',//新增
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = null
                        _this.newform.notes = null
                        if(i == 1 || i == 2 || i == 3 || i == 4){
                            _this.newform.typeName = null
                            _this.dialogVisible = true
                        }else if(i == 5){
                            _this.newform.quickname = null
                            _this.newform.quickcontent = null
                            _this.dialogVisible3 = true
                        }else if(i == 6){
                            _this.newform.typeName = null
                            _this.newform.probability = null
                            _this.dialogVisible5 = true
                        }else if(i == 7){
                            _this.newform.parentclass_id = null
                            _this.newform.parentclass_name = null
                            _this.newform.proclass_id = null
                            _this.newform.proclass_name = null
                            _this.dialogVisible13 = true
                        }else if(i == 8){
                            _this.newform.unit_name = null
                            _this.dialogVisible9 = true
                        }else if(i == 9){
                            _this.newform.brand_name = null
                            _this.dialogVisible11 = true
                        }else if(i == 10){
                            _this.newform.spec_name = null
                            _this.newform.specoption = []
                            _this.tenoptions = []
                            _this.dialogVisible14 = true
                        }else if(i == 11){
                            _this.newform.typeName = null
                            _this.dialogVisible16 = true
                        }else if(i == 12){
                            _this.newform.distri_name = null
                            _this.newform.distri_count = null
                            _this.newform.taxRate = null
                            _this.dialogVisible18 = true
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            proAdd(data){
                const _this = this
                console.log(data)
                _this.newform.parentclass_id = data.id
                _this.newform.parentclass_name = data.name
                _this.newform.proclass_id = null
                _this.newform.proclass_name = null
                _this.dialogVisible7 = true
            },
            //添加提交按钮
            addbasicset(){
                const _this = this;
                let qs = require('querystring')
                let i = this.newform.index
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 11){
                    data.typeName = this.newform.typeName
                }else if(i == 5){
                    data.typeName = this.newform.quickname
                    data.content = this.newform.quickcontent
                }
                
                let flag = false;
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    if(!data.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "状态名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 5){
                    if(!data.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.content){
                        _this.$message({
                            message: "跟进内容不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "快捷方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 11){
                    if(!data.typeName){
                        _this.$message({
                            message: "交货方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.dialogVisible3 = false
                        _this.dialogVisible16 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addoppstep(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                // data.notes = this.newform.notes
                data.step_name = this.newform.typeName
                data.step_probability = this.newform.probability
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_name){
                    _this.$message({
                        message: "商机进度不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_probability){
                    _this.$message({
                        message: "成功几率不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'addstep/insertAddstep.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible5 = false
                        _this.$options.methods.loadOppStep.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addProclass(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.name = this.newform.proclass_name
                if(this.newform.parentclass_id){
                    data.parentid = this.newform.parentclass_id
                    data.parentname = this.newform.parentclass_name
                    this.defaultkeys = [this.newform.parentclass_id]
                }
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "产品分类名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'classification/insertClassification.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible7 = false
                        _this.dialogVisible13 = false
                        _this.$options.methods.loadproductClass.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addunit(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.name = this.newform.unit_name
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "单位名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'unit/insertUnit.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible9 = false
                        _this.$options.methods.loadUnit.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addbrand(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.name = this.newform.brand_name
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "品牌名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'brand/insert.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible11 = false
                        _this.$options.methods.loadBrand.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addSpec(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.specName = this.newform.spec_name
                data.specValue = this.newform.specoption
                console.log(data)

                let flag = false;
                if(!data.specName){
                    _this.$message({
                        message: "规格名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'specification/insert.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible14 = false
                        _this.$options.methods.loadSpec.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            adddistri(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.sort = this.newform.sort
                data.name = this.newform.distri_name
                data.discount = this.newform.distri_count
                data.taxRate = this.newform.taxRate

                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.name){
                    _this.$message({
                        message: "经销商名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.discount){
                    _this.$message({
                        message: "经销商折扣不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'distributor/insertDistributor.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible18 = false
                        _this.$options.methods.loadistri.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });},
            //修改
            handleEdit(index,row){
                const _this = this
                let i = this.newform.index

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/update.do',//编辑
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = row.sort
                        _this.newform.notes = row.notes
                        if(i == 1 || i == 2 || i == 3 || i == 4){
                            _this.newform.id = row.id
                            _this.newform.typeName = row.typeName
                            _this.dialogVisible2 = true
                        }else if(i == 5){
                            _this.newform.id = row.id
                            _this.newform.quickname = row.typeName
                            _this.newform.quickcontent = row.content
                            _this.dialogVisible4 = true
                        }else if(i == 6){
                            _this.newform.id = row.step_id
                            _this.newform.typeName = row.step_name
                            _this.newform.probability = row.step_probability
                            _this.dialogVisible6 = true
                        }else if(i == 8){
                            _this.newform.id = row.id
                            _this.newform.unit_name = row.name
                            _this.dialogVisible10 = true
                        }else if(i == 9){
                            _this.newform.id = row.id
                            _this.newform.brand_name = row.name
                            _this.dialogVisible12 = true
                        }else if(i == 10){
                            _this.newform.id = row.id
                            _this.newform.spec_name = row.specName
                            _this.newform.specoption = row.specValue
                            _this.specList = []
                            for(let i = 0;i < row.specValue.length; i ++){
                                _this.specList.push({name:row.specValue[i]})
                            }
                            _this.dialogVisible15 = true
                        }else if(i == 11){
                            _this.newform.id = row.id
                            _this.newform.typeName = row.typeName
                            _this.dialogVisible17 = true
                        }else if(i == 12){
                            _this.newform.id = row.id
                            _this.newform.distri_name = row.name
                            _this.newform.distri_count = row.discount
                            _this.newform.taxRate = row.taxRate
                            _this.dialogVisible19 = true
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            proEdit(data){
                const _this = this
                console.log(data)
                _this.newform.proclass_id = data.id
                _this.newform.proclass_name = data.name
                this.dialogVisible8 = true
            },
            //修改提交按钮
            updatebasicset(){
                const _this = this;
                let i = this.newform.index
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 11){
                    data.typeName = this.newform.typeName
                }else if(i == 5){
                    data.typeName = this.newform.quickname
                    data.content = this.newform.quickcontent
                }
                
                let flag = false;
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    if(!data.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "状态名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 5){
                    if(!data.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.content){
                        _this.$message({
                            message: "跟进内容不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "快捷方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 11){
                    if(!data.typeName){
                        _this.$message({
                            message: "交货方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.dialogVisible4 = false
                        _this.dialogVisible17 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            updateoppstep(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.step_id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                // data.notes = this.newform.notes
                data.step_name = this.newform.typeName
                data.step_probability = this.newform.probability
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_name){
                    _this.$message({
                        message: "商机进度不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_probability){
                    _this.$message({
                        message: "成功几率不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'addstep/updateAddstep.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible6 = false
                        _this.$options.methods.loadOppStep.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            updateProclass(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.proclass_id
                data.name = this.newform.proclass_name
                this.defaultkeys = [this.newform.proclass_id]
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "产品分类名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'classification/updateClassificationById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible8 = false
                        _this.$options.methods.loadproductClass.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新添加");
                });
            },
            updateunit(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.name = this.newform.unit_name
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "单位名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'unit/updateUnit.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible10 = false
                        _this.$options.methods.loadUnit.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新添加");
                });
            },
            updatebrand(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.name = this.newform.brand_name
                
                let flag = false;
                if(!data.name){
                    _this.$message({
                        message: "品牌名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'brand/updateByPrimaryKey.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible12 = false
                        _this.$options.methods.loadBrand.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新添加");
                });
            },
            updateSpec(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.specName = this.newform.spec_name
                data.specValue = this.newform.specoption
                console.log(data)

                let flag = false;
                if(!data.specName){
                    _this.$message({
                        message: "规格名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'specification/update.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible15 = false
                        _this.$options.methods.loadSpec.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新添加");
                });
            },
            updatedistri(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.sort = this.newform.sort
                data.name = this.newform.distri_name
                data.discount = this.newform.distri_count
                data.taxRate = this.newform.taxRate
                console.log(data)

                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.name){
                    _this.$message({
                        message: "经销商名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.discount){
                    _this.$message({
                        message: "经销商折扣不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'distributor/updateDistributor.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible19 = false
                        _this.$options.methods.loadistri.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新添加");
                });
            },
            //删除
            handledelete(index,row){
                const _this = this;
                let i = this.newform.index
                let qs =require('querystring')
                let idArr = [];
                let urls = null
                let val = null
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 11){
                    idArr.id = row.id
                    urls = _this.$store.state.defaultHttp+ 'typeInfo/deleteTypeInfoById.do?cId='+_this.$store.state.iscId // 删除辅助资料
                    val = row.typeName
                }else if(i == 6){
                    idArr.step_id = row.step_id
                    urls = _this.$store.state.defaultHttp+ 'addstep/deleteByPrimaryKey.do?cId='+_this.$store.state.iscId  // 删除商机进度
                    val = row.step_name
                }else if(i == 12){
                    idArr.id = row.id
                    urls = _this.$store.state.defaultHttp+ 'distributor/deleteDistributor.do?cId='+_this.$store.state.iscId  // 删除商机进度
                    val = row.name
                }
                

                _this.$confirm('确认删除 ['+ val +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: urls,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 11){
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(i == 6){
                                _this.$options.methods.loadOppStep.bind(_this)(true);
                            }else if(i == 12){
                                _this.$options.methods.loadistri.bind(_this)(true);
                            }
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            deleteProclass(node,data){
                const _this = this
                let qs =require('querystring')
                let idArr = {}
                idArr.id = data.id

                _this.$confirm('确认删除 ['+ data.name +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+ 'classification/deleteClassificationById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadproductClass.bind(_this)(true)
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            deleteUnit(index,row){
                const _this = this
                let qs =require('querystring')
                let idArr = {}
                idArr.id = row.id

                _this.$confirm('确认删除 ['+ row.name +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+ 'unit/deleteUnit.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadUnit.bind(_this)(true)
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            deleteBrand(index,row){
                const _this = this
                let qs =require('querystring')
                let idArr = {}
                idArr.id = row.id

                _this.$confirm('确认删除 ['+ row.name +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+ 'brand/deleteByPrimaryKey.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadBrand.bind(_this)(true)
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            deletespec(index,row){
                const _this = this
                let qs =require('querystring')
                let idArr = {}
                idArr.id = row.id

                _this.$confirm('确认删除 ['+ row.specName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+ 'specification/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadSpec.bind(_this)(true)
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            handleNodeClick(data){
                // console.log(data)
            },
            changeValue(e){
                this.specList = []
                for(let i = 0;i < e.length; i ++){
                    this.specList.push({name:e[i]})
                }
            },
            handleSizeChange(val){
                const _this = this;
                let i = this.newform.index
                _this.limit = val;
                if(i == 8){
                    _this.$options.methods.loadUnit.bind(_this)(true)
                }
                if(i == 9){
                    _this.$options.methods.loadBrand.bind(_this)(true)
                }
            },
            handleCurrentChange(val){
                const _this = this;
                let i = this.newform.index
                _this.page = val;
                if(i == 8){
                    _this.$options.methods.loadUnit.bind(_this)(true)
                }
                if(i == 9){
                    _this.$options.methods.loadBrand.bind(_this)(true)
                }
            },
        }
    }
</script>
<style>
</style>
