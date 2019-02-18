<template>
    <div class="welcome">
        <div class="welcome_body">
            <p class="hello">
                您好，&lt;{{public_username}}&gt;。
                <br/>
                <span class="hello_body">欢迎使用<strong>云纵CRM管理系统</strong>。</span>
            </p>
            <label class="time"> {{date | formatDate}} </label>
        </div>
    </div>
</template>
<style>
    .welcome{
        margin: 30px;
        padding: 30px;
        background-color: #fff;
        border-radius: 50px;
        border: 1px solid #ccc;
        box-shadow: 10px 10px 10px #cccccc;
    }
    .welcome_body{
        margin: 80px 50px;
    }
    .hello{
        text-align: center;
        font-size: 28px;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }
    .hello_body{
        font-size: 30px;
    }
    .time{
        margin-top: 30px;
        display: block;
        text-align: right;
    }
</style>
<script>
    import store from '../../../../store/store'
    var date={
        date:new Date()
    };
    var padDate = function (value) {
        return value <10 ? '0' + value:value;
    };
    export default {
        name:'welcome',
        data(){
            return {
                date,
                public_username:this.$store.state.user
            }
        },
        filters: {
            formatDate:function (value) {
                var date;
                if(value.date) {
                    date = value.date;
                } else {
                    date = new Date(value);
                }
                var year = date.getFullYear();
                var month = padDate(date.getMonth()+1);
                var day = padDate(date.getDate());
                var hours = padDate(date.getHours());
                var minutes = padDate(date.getMinutes());
                var seconds = padDate(date.getSeconds());
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            }
        },
        beforeCreate:function () {
            var _this = this; 
            this.date = new Date();
            this.timer = setInterval(function(){
                _this.date = new Date(); 
            },1000);
        },
        // beforeMount:function () {
        //     var _this = this; 
        //     this.timer = setInterval(function(){
        //         _this.date = new Date(); 
        //     },1000);
        // },
        // mounted:function () {
        //     var _this = this; 
        //     this.timer = setInterval(function(){
        //         _this.date = new Date(); 
        //     },1000);
        // },
        beforeDestroy:function(){
            if(this.timer){
                clearInterval(this.timer); 
            }
        },
    }
</script>
