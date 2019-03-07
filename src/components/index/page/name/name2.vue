<template>
    <div class="uploadBOX">
        <div class="filebox">
            <span class="upload">
                <input type="file" name="file" ref="upload" accept=".xls, .xlsx" enctype="multipart/form-data" @change="tirggerFile($event)"/>
            </span>
        </div>
    </div>
</template>

<script>
import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
import XLSX from 'xlsx';

export default {
    data(){
        return{
            outputs:[]
        }
    },
    // mounted() {
    //   this.$refs.upload.addEventListener('change', (e) => {
    //        // 绑定监听表格导入事件
    //        this.readExcel(e);
    //    });
    // },
    methods: {
        tirggerFile(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();  
                var xhr = new XMLHttpRequest();
                xhr.onprogress=function(e){
                    var percentage = Math.round((e.loaded * 100) / e.total);
                    console.log("percentage:"+percentage);
                }
                xhr.onload=function(e){
                    console.log("percentage:100");
                }
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                xhr.open("POST", this.$store.state.defaultHttp+'excel/newupload.do',config);  
                reader.onload = function(evt) {
                    xhr.send(evt.target.result);
                };
                reader.readAsBinaryString(file);
            }
        }
    },
    
}
</script>

