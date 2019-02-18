<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
      return{
          reload:this.reload
      }
  },
  data(){
      return{
          isRouterAlive:true
      }
  },
  methods:{
      reload(){
          this.isRouterAlive = false
          this.$nextTick(function(){
              this.isRouterAlive = true
          })
      },
      
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app,
.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-x: hidden; overflow-y: auto; 
}
.myForm > .el-form-item,.clueForm > .el-form-item,.auxForm > .el-form-item{
    margin-bottom: 12px;
}
.searchList{
    width: 100%;
    margin: 8px;
    float: left;
}
.searchList .el-radio__inner,.radioList .el-radio__input{
    display: none !important;
    border:none !important;
    width: 0;
}
.radioList{
    margin-left: 8px;
}
.radioList{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
}
.radioList > .el-radio-group{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    /* align-items: center; */
}
.radioList > .el-radio-group > .el-radio{
    flex: 0 0 10%;
    line-height: 30px;
    margin-left: 10px ;
}
.nameList{
    display: inline-block;
    width: 90px;
    text-align: right;
    padding-right: 30px;
    font-size: 14px;
    color: #242424;
    line-height: 30px;
}
.el-table th {
    background: #eef1f6 
}
.numberPage {
    margin-bottom: 10px;
    text-align: left !important;
    padding-left: 10px;
    background-color: #fff;
    width: 90%;
}
body {
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}

a {
    text-decoration: none
}
    .el-menu-item,.el-submenu__title {
        height: 40px !important;
        line-height: 40px !important;
    }
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
}

.content-box {
    position: absolute;
    left: 150px;
    right: 0;
    top: 40px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}

.content-collapse {
    left: 65px;
}

.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.BarCodeBox{
    width: 20%;
    display: inline-block;
}
.crumbs {
    margin-bottom: 20px;
}

.pagination {
    margin: 20px 0;
    text-align: right;
}

.plugins-tips {
    padding: 20px 10px;
    margin-bottom: 20px;
}

.el-button+.el-tooltip {
    margin-left: 10px;
}
.el-card{
    width: 100%;
}
.el-table tr:hover {
    background: #f6faff;
}
.el-table {
    font-size: 12px;
    padding-bottom: 1px;
    margin-bottom: 15px;
    color: #000;
}
.el-table thead {
    color: #000;
}

.el-table th{
    font-size: 14px
}
.el-table td, .el-table th {
    padding: 8px 0;
    line-height:30px; 
}
.el-table--border::after, .el-table--border::before{
    background-color: #ebeef5;
}
.el-table__header th,.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: #f7f7f7;
    color: #1f2d3d;
}

.el-button+.el-button{
    margin: 0 !important;
}

.entry{
    width: 100%;
    height: 50px;
    background: #f7f7f7;
    border-bottom: 1px solid #ebeef5;
    padding-left: 4px;
    clear: both;
    position: relative;
}

.screen{
    position: absolute;
    right: 10px;
    top: 4px;
}
.btn{
    margin-top:15px;
}
.info-btn{
    background: #ffffff;
    /* margin: 4px 0 0 10px; */
    color: #222222;
}
.info-btn:hover,.info-btn:focus{
    background: #ff5722;
    color: #ffffff;
}
.checklist .checkone{
    width: 100%;
    margin: 5px 0 0 20px;;
}

.text ul{
    width: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    align-content: flex-start;
    margin-left: 20px;
    list-style: none;
}
.text ul li{
    flex: 0 0 33%;
    /* height: 30px; */
    font-size: 14px;
    line-height: 30px;
}

.mgb20 {
    margin-bottom: 20px;
}

.move-enter-active,
.move-leave-active {
    transition: opacity .5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

/*BaseForm*/

.form-box {
    width: 600px;
}

.form-box .line {
    text-align: center;
}

.el-time-panel__content::after,
.el-time-panel__content::before {
    margin-top: -7px;
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
    padding-bottom: 0;
}

/*Upload*/

.pure-button {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
}

.g-core-image-corp-container .info-aside {
    height: 45px;
}


.el-upload--text {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-upload--text .el-icon-upload {
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px;
}

.el-upload--text {
    color: #97a8be;
    font-size: 14px;
    text-align: center;
}
.el-input__icon {
    line-height: 17px !important;
}
.el-upload--text em {
    font-style: normal;
}
.el-pager li:hover {
    color: #5281c7 !important;
    cursor: default;
}
.el-pager li.active {
    color: #ff5722 !important;
    cursor: default;
}

.hoverline:hover{
        color: blue;
        text-decoration:underline;
    }

.searchbutton{
    background-color: #ff5722;
    color: #ffffff;
}
.el-button--primary{
    color:#ffffff;
    background-color:#ff5722;
    border-color:#e64d1f
}
.el-button--primary:focus,.el-button--primary:hover{
    background:#ff5722;
    border-color:#e64d1f;
    color:#ffffff
}
.el-button--primary.is-active,.el-button--primary:active{
    background:#ff511c;
    border-color:#e64d1f;
    color:#ffffff
}
    .followform{
        height: auto;
        min-height: 200px;
        margin-bottom: 30px;
        position: relative;
    }
    .followform > .el-form-item:not(:first-child){
        float: left;
        margin-bottom: 5px;
    }
.followrecord{
        clear: both;
        width: 100%;
        list-style: none;
        position: relative;
        /* background-color: pink; */
    }
    .followrecord li{
        float: left;
        font-size: 12px;
        margin-bottom: 10px;
        box-sizing:border-box; 
        -moz-box-sizing:border-box; /* Firefox */ 
        -webkit-box-sizing:border-box;
    }
    .followrecord .recordicon {
        float: left;
        position: absolute;
        /* right: 0; */
        width: 3%;
        /* height: auto; */
        height: 80px;
        /* height: 100px; */
        color: #ffffff;
        padding-top: 5px;
    }
    .verticalline{
        float: left;
        width: 3%;
        height: 19px;
        border-bottom: 1px solid #c2c4c9;
    }
    .followrecord .recordcontent{
        width:94%;
        line-height:20px;
        height: auto;
        /* min-height: 80px; */
        color: #000000;
        padding-top: 5px;
        padding-left: 10px;
        background-color: #f7f7f7;
        border-radius: 5px;
    }
    .delico{
        float: left;
        width:25px;
        height:25px;
        background-color:#ff8153;
        border: 1px solid #ffffff;
        border-radius:50%;
        line-height:25px;
        text-align:center;
    }

.el-table__expand-icon:after {
    content: "查看";
    color: rgb(60, 141, 188);
    cursor: pointer;
}
.el-table__expand-icon {
    transform: rotate(0deg) !important;
}
.el-table__expand-icon>i {
    display: none !important;
}

/*隐藏table表头右边凸出的一块*/
.gutter {
    display: none !important;
}

.el-table--border {
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
}
.el-table--border::after {
    background-color: #fff;
}
.el-table--border::before {
    background-color: #fff;
}

/*VueEditor*/
/* .el-table td div {
    box-sizing: border-box;
    height: 40px !important;
    line-height: 40px !important;
} */
.ql-container {
    min-height: 400px;
}
.el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    height: 35px !important;
    transition: transform .3s;
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    line-height: 16px;
    cursor: pointer;
}
.ql-snow .ql-tooltip {
    transform: translateX(117.5px) translateY(10px) !important;
}

.editor-btn {
    margin-top: 20px;
}
.el-select .el-input__inner {
    cursor: pointer;
    padding-right: 35px;
}

.el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
}
/*markdown*/

.v-note-wrapper .v-note-panel {
    min-height: 500px;
}
</style>
