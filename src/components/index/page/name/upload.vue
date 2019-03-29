<template>
    <div class="pull-right">
        <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="true"
            action="doUpload"
            :limit="1"
            :before-upload="beforeUpload">
            <el-button slot="trigger" size="small" type="primary" style="margin-right: 20px">上传excel</el-button>
        </el-upload>
    </div>
</template>

<script>
import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import XLSX from 'xlsx';

export default {
    store,
    data(){
        return{
            fileList:[],
            // requested:false
        }
    },
    methods: {
        beforeUpload(file){
                console.log(file,'文件');
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('上传模板大小不能超过 5MB!')
                    return
                }
                this.fileName = file.name;
                setTimeout(() => {
                    this.submitUpload();
                },500);
                return false; // 返回false不会自动上传
            },   
         
            // 上传excel
            submitUpload() {
                const _this = this
                console.log('上传'+this.files.name)
                if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }
                let fileFormData = new FormData();
                fileFormData.append("code", "t_pathology_info_excel");
                fileFormData.append("description", "excel上传测试");
                //filename是键，file是值，就是要传的文件，test是要传的文件名
                fileFormData.append('files', this.files, this.fileName);
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                // 执行上传excel
                let id = '';
                // this.http.postJson('/sys/file/upload', fileFormData, requestConfig).then(resp => {
                //     if (resp.data.status != 200) {
                //         this.$message.error("excel上传失败，请重新上传");
                //     } else {
                //         id = resp.data.result[0].attachmentId;
                //     }
                // }).catch((e) => {
                //     // console.log(e);
                //     this.$message.error("excel上传失败，请重新上传");
                // }).finally(() => {
                //     if(id) {
                //         // 触发生成订单实体数据
                //         this.generateBill(id);
                //     }
                // });
                axios.post(this.$store.state.defaultHttp+'excel/newupload.do',fileFormData, requestConfig)
                .then(res => {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        })
                }).catch((e) => {
                    // console.log(e);
                    this.$message.error("excel上传失败，请重新上传");
                }).finally(() => {
                    if(id) {
                        // 触发生成订单实体数据
                        this.generateBill(id);
                    }
                });
            },
 
            // 构建实体
            generateBill(attachmentId) {
                this.http.postJson('/admin/myTest/leadingIn/' + attachmentId + '/type_one').then(resp => {
                    if (resp.data.status != 200) {
                        // this.$message.error("excel上传失败，请重新上传");
                    } else {
                        this.$message.success("excel上传成功！");
                        this.query();
                    }
                }).catch((e) => {
                    // console.log(e);
                    // this.$message.error("excel上传失败，请重新上传");
                }).finally(() => {
 
                });
            }
        }
    }
</script>

