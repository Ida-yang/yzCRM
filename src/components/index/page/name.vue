<template>
    <div>
        <el-button type="primary" @click="weixinPay">微信支付</el-button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{}
        },

        methods:{
            weixinPay(){
                const _this = this
                let formData = new FormData()
                formData.append("channelId","WX_MWEB")
                formData.append("orderNo","G1571800690606000000")
                
                axios({
                    method: 'post',
                    url:  'http://cz6623.free.idcfengye.com/app/order/pay',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNiIsImp0aSI6Ijk5MTgyNTU1MWRkMTRmOGE4MDZlNWEzMGM3YmM3MDEwIiwiZXhwIjoxNTcxODQ2NDAwLCJpYXQiOjE1NzE2MjI0Mzh9.IGFA6SbNrnArwi_D83zMkhEN8ETEU3rnxT8aOL6Rc0U',
                    },
                    data:formData,
                }).then(function(res){
                    console.log(res)
                    // if(res.data.msg && res.data.msg == 'success' ) {
                    //     _this.$message({
                    //         message: '提交成功',
                    //         type: 'success'
                    //     });
                    // } else {
                    //     _this.$message({
                    //         message: res.data.msg,
                    //         type: 'error'
                    //     });
                    // }
                }).catch(function(err){
                    _this.$message.error("提交失败,请重新提交");
                });

            },
        },
    }
</script>