<template>
    <!-- 基础设置页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <el-menu default-active="1" class="el-menu-vertical-demo base_menu">
                <el-submenu index="1">
                    <span slot="title">CRM参数</span>
                    <el-menu-item v-for="item in crmparam" :key="item.index" :index="item.slotindex" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <span slot="title">订货参数</span>
                    <el-menu-item v-for="item in orderparam" :key="item.index" :index="item.slotindex" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <span slot="title">办公参数</span>
                    <el-menu-item v-for="item in workparam" :key="item.index" :index="item.slotindex" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <span slot="title">基础参数</span>
                    <el-menu-item v-for="item in baseparam" :key="item.index" :index="item.slotindex" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="entry" v-show="newform.index !== 13">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <el-table :data="statesData" border stripe style="width:100%" v-show="showtopfour">
                <el-table-column label="顺序" prop="sort" sortable />
                <el-table-column label="ID" prop="id" width="100" sortable />
                <el-table-column label="名称" prop="typeName" min-width="120" sortable />
                <el-table-column label="备注" prop="notes" min-width="120" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="deliData" border stripe style="width:100%" v-show="showeleven">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="名称" prop="typeName" min-width="120" sortable />
                <el-table-column label="创建时间" prop="createTime" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="waysData" border stripe style="width:100%" v-show="showfive">
                <el-table-column label="顺序" prop="sort" sortable />
                <el-table-column label="方式名称" prop="typeName" min-width="120" sortable />
                <el-table-column label="跟进内容" prop="content" min-width="120" sortable />
                <el-table-column label="备注" prop="notes" min-width="120" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="oppstepsData" border stripe style="width:100%" v-show="showsix">
                <el-table-column label="顺序" prop="sort" sortable />
                <el-table-column label="状态名称" prop="step_name" min-width="120" sortable />
                <el-table-column label="成功几率" prop="step_probability" min-width="120" sortable>
                    <template slot-scope="scope">
                        <div>{{scope.row.step_probability}} %</div>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="notes" min-width="120" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-table :data="unitsData" border stripe style="width:100%" v-show="showeight">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="单位名称" prop="name" min-width="120" sortable />
                <el-table-column label="创建时间" prop="createTime" min-width="120" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteUnit(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="brandsData" border stripe style="width:100%" v-show="shownine">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="首字母" prop="firstChar" min-width="120" sortable />
                <el-table-column label="品牌名称" prop="name" sortable />
                <el-table-column label="创建时间" prop="createTime" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteBrand(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-tree node-key="id" highlight-current accordion :data="proClassData" :props="defaultProps" expand-on-click-node :default-expanded-keys="defaultkeys" v-show="showseven">
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
            <el-table :data="specData" border stripe style="width:100%" v-show="showten">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="规格名称" prop="specName" min-width="120" sortable />
                <el-table-column label="规格值" prop="specValue" min-width="200" sortable>
                    <template slot-scope="scope">
                        <span v-for="(a,i) in scope.row.specValue" :key="i">{{a}} , </span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="145" sortable />
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deletespec(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="distriData" border stripe style="width:100%" v-show="showtwelve">
                <el-table-column label="排序" prop="sort" min-width="50" sortable />
                <el-table-column label="经销商名称" prop="name" min-width="120" sortable />
                <el-table-column label="默认折扣" prop="discount" min-width="120" sortable>
                    <template slot-scope="scope">{{scope.row.discount}} %</template>
                </el-table-column>
                <el-table-column label="操作" width="140" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-table :data="codeData" border stripe style="width:100%" v-show="showthirteen">
                <el-table-column label="编号模块" prop="module" sortable />
                <el-table-column label="编号前缀" prop="prefix" sortable />
                <el-table-column label="操作" width="90" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            
            <el-tree node-key="id" highlight-current accordion :data="classData" :props="defaultProps" expand-on-click-node :default-expanded-keys="defaultkeys" v-show="showfourteen">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i class="el-icon-info">&nbsp;&nbsp;</i>{{ node.label }}</span>
                    <span class="operation_proclass">
                        <el-button type="text" size="mini" style="font-size:12px;" v-if="data.parentid == 0" @click="jobClassAdd(data)">添加/
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="jobClassEdit(data)">修改/
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="jobClassDelete(node,data)">删除
                        </el-button>
                    </span>
                </span>
            </el-tree>

            <el-table :data="payData" border stripe style="width:100%" v-show="showfifteen">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="支付方式" prop="typeName" sortable />
                <el-table-column label="备注" prop="notes" sortable />
                <el-table-column label="操作" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">编辑</el-button>
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
        
        <!-- 新增线索状态、客户状态、客户来源、客户分类 -->
        <el-dialog title="添加状态" :visible.sync="dialogVisible" width="40%">
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
        </el-dialog>
        <!-- 编辑线索状态、客户状态、客户来源、客户分类 -->
        <el-dialog title="修改状态" :visible.sync="dialogVisible2" width="40%">
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
        </el-dialog>
        <!-- 新增快捷方式 -->
        <el-dialog title="添加快捷方式" :visible.sync="shortcutadd" width="40%">
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
                <el-button @click="shortcutadd = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑快捷方式 -->
        <el-dialog title="修改快捷方式" :visible.sync="shortcutupdate" width="40%">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="shortcutupdate = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增商机进度 -->
        <el-dialog title="添加商机进度" :visible.sync="businessproadd" width="40%">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="businessproadd = false">取 消</el-button>
                <el-button type="primary" @click="addoppstep()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改商机进度 -->
        <el-dialog title="修改商机进度" :visible.sync="businessproupdate" width="40%">
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
                <el-button @click="businessproupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateoppstep()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增产品顶级分类 -->
        <el-dialog title="新增产品分类" :visible.sync="topProClassadd" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="proclass_name" label="产品分类名称">
                    <el-input v-model="newform.proclass_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="topProClassadd = false">取 消</el-button>
                <el-button type="primary" @click="addProclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增产品分类子集 -->
        <el-dialog title="新增产品分类" :visible.sync="prodClassadd" width="40%">
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
                <el-button @click="prodClassadd = false">取 消</el-button>
                <el-button type="primary" @click="addProclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑产品分类子集 -->
        <el-dialog title="修改产品分类" :visible.sync="prodClassupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="proclass_name" label="产品分类名称">
                    <el-input v-model="newform.proclass_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="prodClassupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateProclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增单位 -->
        <el-dialog title="新增单位" :visible.sync="unitadd" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="unit_name" label="单位名称">
                    <el-input v-model="newform.unit_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="unitadd = false">取 消</el-button>
                <el-button type="primary" @click="addunit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑单位 -->
        <el-dialog title="修改单位" :visible.sync="unitupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="unit_name" label="单位名称">
                    <el-input v-model="newform.unit_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="unitupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateunit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增品牌 -->
        <el-dialog title="新增品牌" :visible.sync="brandadd" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="brand_name" label="品牌名称">
                    <el-input v-model="newform.brand_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="brandadd = false">取 消</el-button>
                <el-button type="primary" @click="addbrand()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑品牌 -->
        <el-dialog title="修改品牌" :visible.sync="brandupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="brand_name" label="品牌名称">
                    <el-input v-model="newform.brand_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="brandupdate = false">取 消</el-button>
                <el-button type="primary" @click="updatebrand()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增规格名称 -->
        <el-dialog title="新增规格" :visible.sync="specadd" width="40%">
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
                <el-button @click="specadd = false">取 消</el-button>
                <el-button type="primary" @click="addSpec()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑规格名称 -->
        <el-dialog title="编辑规格" :visible.sync="specupdate" width="40%">
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
                <el-button @click="specupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateSpec()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增交货方式 -->
        <el-dialog title="新增交货方式" :visible.sync="deliveryadd" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="交货方式">
                    <el-input v-model="newform.typeName" placeholder="请输入交货方式"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deliveryadd = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑交货方式 -->
        <el-dialog title="修改交货方式" :visible.sync="deliveryupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="交货方式">
                    <el-input v-model="newform.typeName" placeholder="请输入交货方式"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deliveryupdate = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增经销商级别 -->
        <el-dialog title="添加经销商级别" :visible.sync="cusleveladd" width="40%">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cusleveladd = false">取 消</el-button>
                <el-button type="primary" @click="adddistri()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑编号规则 -->
        <el-dialog title="修改经销商级别" :visible.sync="cuslevelupdate" width="40%">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cuslevelupdate = false">取 消</el-button>
                <el-button type="primary" @click="updatedistri()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑编号规则 -->
        <el-dialog title="修改编号规则" :visible.sync="numruleupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="module" label="编号模块">
                    <el-input v-model="newform.module" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="prefix" label="编号前缀">
                    <el-input v-model="newform.prefix" placeholder="请输入编号前缀"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="numruleupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateCode()">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 新增工单顶级分类 -->
        <el-dialog title="新增工单分类" :visible.sync="topJobClassadd" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassdeptName" label="负责部门">
                    <el-select v-model="newform.jobclassdeptName" placeholder="请选择负责部门" size="mini" class="dept_selec">
                        <el-option class="droplist" :value="newform.jobclassdeptName">
                            <el-tree
                                node-key="deptid"
                                highlight-current
                                default-expand-all
                                ref="tree"
                                :data="treedatalist"
                                :props="deptProps"
                                :expand-on-click-node="false"
                                @current-change="handlecheck"
                                class="drop_tree">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="jobclassName" label="工单分类名称">
                    <el-input v-model="newform.jobclassName"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassRemark" label="描述">
                    <el-input type="textarea" rows="5" v-model="newform.jobclassRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="topJobClassadd = false">取 消</el-button>
                <el-button type="primary" @click="addJobclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增工单分类子集 -->
        <el-dialog title="新增工单分类" :visible.sync="jobclassadd" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="负责部门">
                    <el-input v-model="newform.jobclassdeptName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassPname" label="上级工单分类">
                    <el-input v-model="newform.jobclassPname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassName" label="工单分类名称">
                    <el-input v-model="newform.jobclassName"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassRemark" label="描述">
                    <el-input type="textarea" rows="5" v-model="newform.jobclassRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jobclassadd = false">取 消</el-button>
                <el-button type="primary" @click="addJobclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑工单分类子集 -->
        <el-dialog title="修改工单分类" :visible.sync="jobclassupdate" width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassdeptName" label="负责部门" v-if="newform.showdeptinput">
                    <el-select v-model="newform.jobclassdeptName" placeholder="请选择负责部门" size="mini" class="dept_selec">
                        <el-option class="droplist" :value="newform.jobclassdeptName">
                            <el-tree
                                node-key="deptid" highlight-current default-expand-all
                                ref="tree"
                                :data="treedatalist"
                                :props="deptProps"
                                :expand-on-click-node="false"
                                @current-change="handlecheck"
                                class="drop_tree">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="jobclassName" label="工单分类名称">
                    <el-input v-model="newform.jobclassName"></el-input>
                </el-form-item>
                <el-form-item prop="jobclassRemark" label="描述">
                    <el-input type="textarea" rows="5" v-model="newform.jobclassRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jobclassupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateProclass()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增支付方式 -->
        <el-dialog title="新增支付方式" :visible.sync="payTypeadd" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="支付方式">
                    <el-input v-model="newform.typeName" placeholder="请输入支付方式"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="payTypeadd = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑支付方式 -->
        <el-dialog title="编辑支付方式" :visible.sync="payTypeupdate" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="辅助资料类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="支付方式">
                    <el-input v-model="newform.typeName" placeholder="请输入支付方式"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="payTypeupdate = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog>
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
                codeData:[],
                classData:[],
                payData:[],

                treedatalist:[],

                specIndex:0,

                tableNumber:0,
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],
                deptProps:{
                    label:'deptname',
                    children:'next',
                },

                page:1,//默认为第一页
                limit:20,//默认为20行

                dataList:null,
                crmparam:[
                    {index:1,slotindex:'1',name:'线索状态',isActive:true},
                    {index:2,slotindex:'2',name:'客户状态',isActive:false},
                    {index:3,slotindex:'3',name:'客户来源',isActive:false},
                    {index:4,slotindex:'4',name:'客户分类',isActive:false},
                    {index:5,slotindex:'5',name:'快捷方式',isActive:false},
                    {index:6,slotindex:'6',name:'商机进度',isActive:false},
                    {index:14,slotindex:'14',name:'工单分类',isActive:false},
                    {index:15,slotindex:'15',name:'支付方式',isActive:false},
                ],
                orderparam:[
                    {index:7,slotindex:'7',name:'产品分类',isActive:false},
                    {index:8,slotindex:'8',name:'单位',isActive:false},
                    {index:9,slotindex:'9',name:'品牌',isActive:false},
                    {index:10,slotindex:'10',name:'规格',isActive:false},
                    {index:11,slotindex:'11',name:'交货方式',isActive:false},
                    {index:12,slotindex:'12',name:'经销商级别',isActive:false},
                ],
                workparam:[],
                baseparam:[
                    {index:13,slotindex:'13',name:'编号规则',isActive:false},
                ],
                newform:{
                    type:'线索状态',
                    index:'1',
                    id:null,
                    sort:null,
                    typeName:null,
                    notes:null,

                    quickname:null,//快捷方式
                    quickcontent:null,

                    probability:null,//商机进度

                    brand_name:null,//品牌

                    unit_name:null,//单位

                    parentclass_id:null, //产品分类
                    parentclass_name:null,
                    proclass_id:null,
                    proclass_name:null,

                    spec_name:null,//规格
                    specoption:[],

                    distri_name:null,//经销商几倍
                    distri_count:null,

                    prefix:null,//编号前缀参数

                    jobclassPid:null,
                    jobclassPname:null,
                    jobclassId:null,
                    jobclassName:null,
                    jobclassRemark:null,
                    jobclassdeptId:null,
                    jobclassdeptName:null,
                    showdeptinput:false,
                },

                tenoptions:[],
                specList:[],
                key:1,
                
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
                showthirteen:false,
                showfourteen:false,
                showfifteen:false,

                dialogVisible:false,//线索状态、客户状态、客户来源、客户分类
                dialogVisible2:false,
                shortcutadd:false,//快捷方式
                shortcutupdate:false,
                businessproadd:false,//商机进度
                topProClassadd:false,//产品分类顶级
                businessproupdate:false,
                prodClassadd:false,//产品分类子集
                prodClassupdate:false,
                unitadd:false,//单位
                unitupdate:false,
                brandadd:false,//品牌
                brandupdate:false,
                specadd:false,//规格分类、规格值
                specupdate:false,
                deliveryadd:false,//交货方式
                deliveryupdate:false,
                cusleveladd:false,//经销商级别
                cuslevelupdate:false,
                numruleupdate:false,//编号规则
                topJobClassadd:false,//工单分类顶级
                jobclassadd:false,
                jobclassupdate:false,//工单分类子集
                payTypeadd:false,
                payTypeupdate:false,//支付方式

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
                    prefix:[{ required: true, message: '编号前缀不能为空', trigger: 'blur' },],
                    jobclassdeptName:[{ required: true, message: '负责部门不能为空', trigger: 'blur' }],
                    jobclassName:[{ required: true, message: '工单分类名称不能为空', trigger: 'blur' }],
                    jobclassRemark:[{ required: true, message: '工单分类描述不能为空', trigger: 'blur' }],
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
            //加载1,2,3,4,5,11，的数据
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
                    }else if(i == 15){
                        _this.payData = res.data
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载商机进度
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
            //加载产品分类
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
            //加载单位
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
            //加载品牌
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
            //加载规格
            loadSpec(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'specification/selectList.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.specData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载经销商级别
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
            //加载编号前缀参数
            loadCode(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'serialNumber/select.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.codeData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载工单分类
            loadjobClass(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.classData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.treedatalist = res.data.map.success
                }).catch(function(err){
                });
            },
            //显示左边对应表格和数据
            showTableval(val){
                const _this = this
                let i = val.index
                this.newform.type = val.name
                this.newform.index = val.index

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
                _this.showthirteen = false
                _this.showfourteen = false
                _this.showfifteen = false
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
                }else if(i == 13){
                    _this.showthirteen = true
                    _this.$options.methods.loadCode.bind(_this)(true)
                }else if(i == 14){
                    _this.showfourteen = true
                    _this.$options.methods.loadjobClass.bind(_this)(true)
                }else if(i == 15){
                    _this.showfifteen = true
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }
            },
            //添加基础资料弹框
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
                            _this.shortcutadd = true
                        }else if(i == 6){
                            _this.newform.typeName = null
                            _this.newform.probability = null
                            _this.businessproadd = true
                        }else if(i == 7){
                            _this.newform.parentclass_id = null
                            _this.newform.parentclass_name = null
                            _this.newform.proclass_id = null
                            _this.newform.proclass_name = null
                            _this.topProClassadd = true
                        }else if(i == 8){
                            _this.newform.unit_name = null
                            _this.unitadd = true
                        }else if(i == 9){
                            _this.newform.brand_name = null
                            _this.brandadd = true
                        }else if(i == 10){
                            _this.newform.spec_name = null
                            _this.newform.specoption = []
                            _this.tenoptions = []
                            _this.specadd = true
                        }else if(i == 11){
                            _this.newform.typeName = null
                            _this.deliveryadd = true
                        }else if(i == 12){
                            _this.newform.distri_name = null
                            _this.newform.distri_count = null
                            _this.cusleveladd = true
                        }else if(i == 14){
                            _this.newform.jobclassdeptId = null
                            _this.newform.jobclassdeptName = null
                            _this.newform.jobclassPid = null
                            _this.newform.jobclassPname = null
                            _this.newform.jobclassId = null
                            _this.newform.jobclassName = null
                            _this.newform.jobclassRemark = null
                            _this.topJobClassadd = true
                        }else if(i == 15){
                            _this.newform.typeName = null
                            _this.payTypeadd = true
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //添加产品分类弹框
            proAdd(data){
                const _this = this
                _this.newform.parentclass_id = data.id
                _this.newform.parentclass_name = data.name
                _this.newform.proclass_id = null
                _this.newform.proclass_name = null
                _this.prodClassadd = true
            },
            // 添加工单分类弹框
            jobClassAdd(data){
                const _this = this
                _this.newform.jobclassPid = data.id
                _this.newform.jobclassPname = data.name
                _this.newform.jobclassdeptId = data.secondid
                _this.newform.jobclassdeptName = data.deptName
                _this.newform.jobclassId = null
                _this.newform.jobclassName = null
                _this.newform.jobclassRemark = null
                _this.jobclassadd = true
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
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 11 || i == 15){
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
                }else if(i == 15){
                    if(!data.typeName){
                        _this.$message({
                            message: "支付方式不能为空",
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
                        _this.shortcutadd = false
                        _this.deliveryadd = false
                        _this.payTypeadd = false
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
            //添加商机进度
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
                        _this.businessproadd = false
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
            //添加产品分类
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
                        _this.prodClassadd = false
                        _this.topProClassadd = false
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
            //添加单位
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
                        _this.unitadd = false
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
            //添加品牌
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
                        _this.brandadd = false
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
            //添加规格
            addSpec(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.specName = this.newform.spec_name
                data.specValue = this.newform.specoption

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
                        _this.specadd = false
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
            //添加经销商级别
            adddistri(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.sort = this.newform.sort
                data.name = this.newform.distri_name
                data.discount = this.newform.distri_count

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
                        _this.cusleveladd = false
                        _this.$options.methods.loadistri.bind(_this)(true);
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
            //添加工单分类
            addJobclass(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.name = this.newform.jobclassName
                data.secondid = this.newform.jobclassdeptId
                data.remarks = this.newform.jobclassRemark
                if(this.newform.jobclassPid){
                    data.parentid = this.newform.jobclassPid
                    data.parentname = this.newform.jobclassPname
                    this.defaultkeys = [this.newform.jobclassPid]
                }
                
                let flag = false;
                if(!data.secondid){
                    _this.$message({
                        message: "负责部门不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.name){
                    _this.$message({
                        message: "工单分类名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.remarks){
                    _this.$message({
                        message: "工单分类描述不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'serviceType/insertServiceType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.jobclassadd = false
                        _this.topJobClassadd = false
                        _this.$options.methods.loadjobClass.bind(_this)(true);
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
            //修改填写弹出框内容
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
                            _this.shortcutupdate = true
                        }else if(i == 6){
                            _this.newform.id = row.step_id
                            _this.newform.typeName = row.step_name
                            _this.newform.probability = row.step_probability
                            _this.businessproupdate = true
                        }else if(i == 8){
                            _this.newform.id = row.id
                            _this.newform.unit_name = row.name
                            _this.unitupdate = true
                        }else if(i == 9){
                            _this.newform.id = row.id
                            _this.newform.brand_name = row.name
                            _this.brandupdate = true
                        }else if(i == 10){
                            _this.newform.id = row.id
                            _this.newform.spec_name = row.specName
                            _this.newform.specoption = row.specValue
                            _this.specList = []
                            for(let i = 0;i < row.specValue.length; i ++){
                                _this.specList.push({name:row.specValue[i]})
                            }
                            _this.specupdate = true
                        }else if(i == 11){
                            _this.newform.id = row.id
                            _this.newform.typeName = row.typeName
                            _this.deliveryupdate = true
                        }else if(i == 12){
                            _this.newform.id = row.id
                            _this.newform.distri_name = row.name
                            _this.newform.distri_count = row.discount
                            _this.cuslevelupdate = true
                        }else if(i == 13){
                            _this.newform.id = row.id
                            _this.newform.module = row.module
                            _this.newform.prefix = row.prefix
                            _this.numruleupdate = true
                        }else if(i == 15){
                            _this.newform.id = row.id
                            _this.newform.typeName = row.typeName
                            _this.newform.notes = row.notes
                            _this.payTypeupdate = true
                        }
                    }
                }).catch(function(err){
                });
            },
            //修改产品分类弹出框
            proEdit(data){
                const _this = this
                _this.newform.proclass_id = data.id
                _this.newform.proclass_name = data.name
                this.prodClassupdate = true
            },
            //修改工单分类弹出框
            jobClassEdit(data){
                const _this = this
                if(data.parentid == 0){
                    _this.newform.showdeptinput = true
                }else{
                    _this.newform.showdeptinput = false
                }
                _this.newform.jobclassPid = data.parentid
                _this.newform.jobclassPname = data.parentname
                _this.newform.jobclassdeptId = data.secondid
                _this.newform.jobclassdeptName = data.deptName
                _this.newform.jobclassId = data.id
                _this.newform.jobclassName = data.name
                _this.newform.jobclassRemark = data.remarks
                _this.jobclassupdate = true
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
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 11 || i == 15){
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
                }else if(i == 15){
                    if(!data.typeName){
                        _this.$message({
                            message: "支付方式不能为空",
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
                        _this.shortcutupdate = false
                        _this.deliveryupdate = false
                        _this.payTypeupdate = false
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
            //修改商机进度
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
                        _this.businessproupdate = false
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
            //修改产品分类
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
                        _this.prodClassupdate = false
                        _this.$options.methods.loadproductClass.bind(_this)(true);
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
            //修改单位
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
                        _this.unitupdate = false
                        _this.$options.methods.loadUnit.bind(_this)(true);
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
            //修改品牌
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
                        _this.brandupdate = false
                        _this.$options.methods.loadBrand.bind(_this)(true);
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
            //修改规格
            updateSpec(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.specName = this.newform.spec_name
                data.specValue = this.newform.specoption

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
                        _this.specupdate = false
                        _this.$options.methods.loadSpec.bind(_this)(true);
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
            //修改经销商级别
            updatedistri(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.sort = this.newform.sort
                data.name = this.newform.distri_name
                data.discount = this.newform.distri_count

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
                        _this.cuslevelupdate = false
                        _this.$options.methods.loadistri.bind(_this)(true);
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
            //修改编号前缀参数
            updateCode(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.prefix = this.newform.prefix

                let flag = false;
                if(!data.prefix){
                    _this.$message({
                        message: "编号前缀不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'serialNumber/update.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.numruleupdate = false
                        _this.$options.methods.loadCode.bind(_this)(true);
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
            // 修改工单分类
            updateProclass(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.jobclassId
                data.name = this.newform.jobclassName
                data.secondid = this.newform.jobclassdeptId
                data.remarks = this.newform.jobclassRemark
                this.defaultkeys = [this.newform.jobclassId]
                
                let flag = false;
                if(!data.secondid){
                    _this.$message({
                        message: "负责部门不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.name){
                    _this.$message({
                        message: "工单分类名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.remarks){
                    _this.$message({
                        message: "工单分类描述不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'serviceType/updateServiceTypeById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.jobclassupdate = false
                        _this.$options.methods.loadjobClass.bind(_this)(true);
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
            //删除1,2,3,4,5,6,11,12,15
            handledelete(index,row){
                const _this = this;
                let i = this.newform.index
                let qs =require('querystring')
                let idArr = [];
                let urls = null
                let val = null
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 11 || i == 15){
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
                            if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 11 || i == 15){
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
            //删除产品分类
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
            //删除单位
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
            //删除品牌
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
            //删除规格
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
            //删除工单分类
            jobClassDelete(node,data){
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
                        url: _this.$store.state.defaultHttp+ 'serviceType/deleteServiceTypeById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadjobClass.bind(_this)(true)
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
            // 选择规格值
            changeValue(e){
                this.specList = []
                for(let i = 0;i < e.length; i ++){
                    this.specList.push({name:e[i]})
                }
            },
            //选择树形结构下拉框
            handlecheck(data,val){
                console.log(data,val)
                this.newform.jobclassdeptId = data.deptid
                this.newform.jobclassdeptName = data.deptname
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
    .droplist{
        padding: 0;
        height: auto
    }
    .drop_tree{
        margin: 0
    }
    .dept_selec{
        width: 100%;
    }
</style>
