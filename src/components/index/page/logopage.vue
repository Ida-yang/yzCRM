<template>
    <div class="logoColor">
        <img class="logoImg" src="../../assets/img/icon.png">
        <span class="logiTitle">{{compy}}</span>
        <span slot="title" class="logoSpan">{{name}}</span>
    </div>
</template>
<script>
    export default {
        name:'logopage',
        data(){
            return {
                compy:"云纵",
                name:"CRM管理平台"
            }
        }
    }
</script>
<style>
    .logoImg{
        display: inline-block;
        width:30px;
        height:30px;
        position: absolute;
        left: 6px;
        top: 3px;
        border-radius: 50%;
    }
    .logo{
        float: left;
        padding-right: 12px;
        text-align: right;;
        background: #12afe3;
    }
    .logo:hover{
        background: #12a0cf;
    }
    .logoSpan{
        position: relative;
        left: 30px;
        top:3px;
        font-size: 12px;
        color: #fff;
    }
    .logiTitle{
        position: relative;
        left: 30px;
        font-size: 16px; 
        top:-2px;
        color: #fff;
    }
    .logoColor{
      background: #12afe3 !important;  
    }
    .logoColor:hover{
        background: #12a0cf;
    }
</style>

