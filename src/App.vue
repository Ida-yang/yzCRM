<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: "App",
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive: true
            };
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function() {
                    this.isRouterAlive = true;
                });
            },
        }
    };
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
    }
    body {
        /* font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif; */
        /* font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif */
        font-family: FZCuYuan-M03S FZY4JW FZY4JW—GB1-0 7156;
    }
    a {
        text-decoration: none;
    }

    .el-form-item {
        margin-bottom: 12px;
    }
    /* 查询条件 */
    .searchList {
        width: 100%;
        margin: 8px;
        float: left;
    }
    .searchList .el-radio__inner,
    .radioList .el-radio__input {
        display: none !important;
        border: none !important;
        width: 0;
    }
    .radioList {
        padding-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .radioList > .el-radio-group {
        flex-grow:1;
        flex-shrink:1;
        flex-basis:1;
        display: flex;
        flex-wrap: wrap;
    }
    .radioList > .el-radio-group > .el-radio {
        flex: 0 0 9%;
        line-height: 30px;
        margin-left: 10px;
        color: #000000;
    }
    .nameList {
        display: inline-block;
        width: 90px;
        text-align: right;
        padding-right: 30px;
        font-size: 14px;
        color: #000000;
        line-height: 30px;
    }

    /* 表格 */
    .el-table {
        font-size: 13px;
        padding-bottom: 1px;
        margin-bottom: 15px;
    }
    .el-table th {
        font-size: 14px;
        background-color: #f7f7f7;
        color: #1f2d3d
        /* background: #eef1f6; */
    }
    .el-table td,
    .el-table th {
        padding: 8px 0;
        line-height: 23px;
        border-right: 1px solid #ebeef5
    }
    .el-table--border::after,
    .el-table--border::before {
        background-color: #ebeef5;
    }
    .el-table__header th,
    .el-table__footer-wrapper thead div,
    .el-table__header-wrapper thead div {
        background-color: #f7f7f7;
        color: #1f2d3d;
    }
    .el-table__expand-icon:after {
        content: "查看";
        color: rgb(60, 141, 188);
        cursor: pointer;
    }
    .el-table__expand-icon {
        transform: rotate(0deg) !important;
    }
    .el-table__expand-icon > i {
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
    .numberPage {
        margin-bottom: 10px;
        text-align: left !important;
        padding-left: 10px;
        background-color: #fff;
        width: 90%;
    }
    .pagination {
        margin: 20px 0;
        text-align: right;
    }
    .right {
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .entry {
        width: 100%;
        height: 50px;
        background: #f7f7f7;
        border-bottom: 1px solid #ebeef5;
        padding-left: 4px;
        box-sizing: border-box;
        clear: both;
        position: relative;
    }
    .screen {
        position: absolute;
        right: 10px;
        top: 12px;
    }
    .screen_upload {
        position: absolute;
        top: 12px;
        right: 60px;
    }
    .checklist .checkone {
        width: 100%;
        margin: 5px 0 0 20px;
    }

    .el-menu-item,
    .el-submenu__title {
        height: 40px !important;
        line-height: 40px !important;
    }
    .sidebar .el-submenu .el-menu-item,
    .sidebar .el-menu-item.is-active {
        min-width: 65px;
        box-sizing: border-box;
    }
    .sidebar_menu_item:hover,.sidebar_menu_item:focus,.sidebar_menu_item:active,
    .sidebar_submenu .el-submenu__title:hover,.sidebar_submenu .el-submenu__title:focus,.sidebar_submenu .el-submenu__title:active {
        background-color: rgb(41, 47, 63) !important;
    }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
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
        -webkit-transition: left 0.3s ease-in-out;
        transition: left 0.3s ease-in-out;
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
    
    .addorupdatecontent {
        width: 98%;
        margin: 40px 15px 65px 0;
        overflow-y: auto
    }
    .myForm {
        width: 41%;
        padding-left: 15px;
        box-sizing: border-box;
        float: left;
    }
    .line {
        float: left;
        /* height: 95%; */
        border-left: 1px solid #000;
        margin-right: 5px;
    }
    .formlist {
        width: 57%;
        height: auto;
        float: left;
    }

    .BarCodeBox {
        width: 20%;
        display: inline-block;
    }
    .crumbs {
        margin-bottom: 20px;
    }

    .plugins-tips {
        padding: 20px 10px;
        margin-bottom: 20px;
    }

    .el-button + .el-tooltip {
        margin-left: 10px;
    }
    .el-button + .el-button {
        margin: 0 !important;
    }
    .el-button--primary,
    .el-button--primary:focus,
    .el-button--primary:hover,
    .el-button--primary.is-active,
    .el-button--primary:active {
        background: #ff6333;
        border-color: #ff6b3e;
        color: #ffffff;
    }
    .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
        background: #fa8663;
        border-color: #ff815a;
        color: #ffffff;
    }
    .btn {
        margin-top: 15px;
    }
    .info-btn {
        background: #ffffff;
        color: #20222a;
    }
    .info-btn:hover,
    .info-btn:focus {
        background: #ff6333;
        color: #ffffff;
    }
    .clear_btn {
        margin-left: 55px;
        background: rgb(52, 63, 83);
        color: #ffffff;
    }
    .editor-btn {
        margin-top: 20px;
    }
    .btn_refresh {
        float: right;
    }
    .submit_btn {
        width: 100%;
        height: 60px;
        position: fixed;
        bottom: 0;
        background-color: #fdfeff;
        border-top: 1px solid #e4e7ed;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* 卡片 */
    .el-card {
        width: 100%;
    }
    .el-card__body {
        padding: 0;
    }
    .text {
        margin: 20px 40px;
    }
    .text ul {
        width: 100%;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: wrap;
        align-content: flex-start;
        box-sizing: border-box;
        list-style: none;
    }
    .text ul li {
        flex: 0 0 33%;
        font-size: 14px;
        line-height: 30px;
    }

    .move-enter-active,
    .move-leave-active {
        transition: opacity 0.5s;
    }
    .move-enter,
    .move-leave {
        opacity: 0;
    }

    /* 跟进记录 */
    .de_span_1 {
        color: #919191;
    }
    .de_span_2 {
        color: #606266;
    }
    .de_span_3 {
        color: #ffffff;
        background-color: #919191;
        border-radius: 10px;
    }
    .de_span_4 {
        color: #606266;
        cursor: pointer;
    }
    .de_span_4:hover {
        text-decoration: underline;
    }
    .bold_span {
        font-weight: bold;
        font-size: 16px;
    }

    /* 更多下拉框 */
    .drop_item {
        padding: 5px 0;
    }
    .drop_item .el-dropdown-menu__item {
        line-height: 24px;
        font-size: 12px;
        color: #919191;
    }

    .el-time-panel__content::after,
    .el-time-panel__content::before {
        margin-top: -7px;
    }

    .el-time-spinner__wrapper
        .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
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
        color: #ff6333 !important;
        cursor: default;
    }

    .hoverline {
        color: blue;
    }
    .hoverline:hover {
        text-decoration: underline;
    }
    
    .followform {
        height: auto;
        min-height: 200px;
        margin-bottom: 30px;
        position: relative;
    }
    .followform > .el-form-item:not(:first-child) {
        float: left;
        margin-bottom: 5px;
    }
    .followrecord {
        clear: both;
        width: 100%;
        min-height: 95px;
        list-style: none;
        position: relative;
    }
    .followrecord li {
        float: left;
        font-size: 12px;
        margin-bottom: 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box; /* Firefox */
        -webkit-box-sizing: border-box;
    }
    .followrecord .recordicon {
        float: left;
        color: #ffffff;
        padding-top: 5px;
    }
    .followrecord .recordcontent {
        width: calc(100% - 50px);
        line-height: 20px;
        height: auto;
        color: #000000;
        padding-top: 5px;
        padding-left: 10px;
        background-color: #f7f7f7;
        border-radius: 5px;
    }
    .recordcontent .left_more {
        float: left;
        width: 92%;
    }
    .recordcontent .right_more {
        float: right;
        height: 30px;
        cursor: pointer;
    }
    .delico {
        float: left;
        width: 25px;
        height: 25px;
        background-color: #ff8153;
        border: 1px solid #ffffff;
        border-radius: 50%;
        line-height: 25px;
        text-align: center;
    }
    .detail_portrait {
        float: left;
        width: 35px;
        height: 35px;
        border: 1px solid #d6d6d6;
        border-radius: 50%;
    }
    .verticalline {
        float: left;
        width: 10px;
        height: 19px;
    }

    

    /*隐藏table表头右边凸出的一块*/
    .gutter {
        display: none !important;
    }
    .ql-container {
        min-height: 400px;
    }
    .ql-snow .ql-tooltip {
        transform: translateX(117.5px) translateY(10px) !important;
    }
    .el-select .el-input .el-select__caret {
        color: #c0c4cc;
        font-size: 14px;
        height: 35px !important;
        transition: transform 0.3s;
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
        line-height: 16px;
        cursor: pointer;
    }
    .el-select .el-input__inner {
        cursor: pointer;
        padding-right: 35px;
        height: 30px;
    }
    .el-input__inner {
        height: 30px;
        line-height: 30px;
    }
    
    /*markdown*/

    .v-note-wrapper .v-note-panel {
        min-height: 500px;
    }

    .pricon {
        width: 100%;
        height: 40px;
        font-size: 14px;
    }
    .pricon_sel {
        width: 150px;
    }
    .totalnum_head {
        float: right;
        margin-right: 130px;
        font-size: 14px;
        line-height: 50px;
        padding: 0 10px;
    }
    .ul_business {
        list-style: none;
        padding: 10px;
        line-height: 30px;
    }
    .ul_business span {
        display: inline-block;
        width: 100px;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #409eff;
    }
    .radioList .el-radio__input.is-checked + .el-radio__label {
        color: blue;
    }
    .load_icon {
        width: 300px;
        height: 30px;
        padding-left: 120px;
        padding-top: 10px;
    }
    .step_process .el-step__title.is-success,
    .step_process .el-step__head.is-success,
    .step_process .el-step__description.is-success {
        color: blue;
        border-color: blue;
    }
    
    .wel_item .el-badge__content.is-fixed {
        position: absolute;
        top: 13px;
        right: 11px;
    }
    .wel_item .el-badge__content {
        border-radius: 8px;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        padding: 0;
    }
    .contentall {
        background-color: #ffffff;
        display: flex;
        height: 100%;
    }
    .setleftcontent {
        flex: 0 0 250px;
        height: 100%;
        padding-top: 30px;
        padding-bottom: 30px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .setrightcontent {
        flex: 0 0 calc(100% - 250px);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow-y: overlay;
        overflow-x: hidden;
    }
    .namecontent {
        width: 100%;
        list-style: none;
        font-size: 14px;
    }
    .namecontent li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 40px;
        box-sizing: border-box;
    }
    .namecontent li.actived {
        background-color: #f0f0f0;
        color: #409eff;
    }
        /* .centercontent{
                flex: 0 0 1%;
                box-sizing: border-box;
                background-color: #f0f0f0;
            } */
    .otherleftcontent {
        width: 250px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .otherightcontent {
        width: calc(100% - 250px);
        height: 100%;
        float: left;
        box-sizing: border-box;
        overflow-y: overlay;
        overflow-x: hidden;
    }
    .el-tree {
        margin: 20px 0;
    }
    .download_c {
        width: 150px;
        height: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .download_h {
        flex: 0 0 100%;
        text-align: center;
    }
    .download_down {
        flex: 0 0 50%;
        color: #20222a;
        /* font-size: 12px; */
    }
    .download_down a {
        font-size: 12px;
        color: #20222a;
    }
    .upload-demo .el-upload--text {
        flex: 0 0 50%;
        width: auto;
        height: auto;
        border: none;
        border-radius: 4px;
    }
    .checkform {
        width: 100%;
    }
    .el-date-editor .el-range-separator {
        line-height: 20px;
    }
    .imgbox_two {
        width: 80px;
        height: 80px;
        border: 1px solid #919191;
    }
    .tab_iframe {
        width: 98%;
        height: 630px;
    }

    .top {
        height: auto;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .bottom {
        background-color: #fff;
        margin-bottom: 20px;
        padding: 5px 20px;
        box-sizing: border-box;
    }

    .custom-tree-node {
        flex-grow:1;
        flex-shrink:1;
        flex-basis:1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .operation_org {
        position: fixed;
        right: calc(100% - 555px);
        width: 28%;
        text-align: right;
    }
    .content-collapse .operation_org {
        position: fixed;
        right: calc(100% - 470px);
        width: 28%;
        text-align: right;
    }
    .el-icon-info {
        font-size: 12px;
    }

    .uploadBOX {
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: wrap;
        align-content: flex-start;
        margin-top: 20px;
    }
    .imgbox {
        flex: 0 0 100px;
        margin-left: 10px;
        margin-bottom: 10px;
        position: relative;
    }
    .imgbox img {
        width: 100px;
        height: 100px;
    }
    .filebox {
        width: 100px;
        height: 100px;
    }
    .upload {
        width: 100px;
        height: 100px;
        display: inline-block;
        border-radius: 5px;
        position: relative;
        margin-left: 10px;
        background: rgb(255, 255, 255) url("./assets/img/plus.png") center center no-repeat;
        background-size: 100px 100px;
        border: 1px dashed #d9d9d9;
    }
    .upload input {
        position: relative;
        width: 100px;
        height: 100px;
        top: 0;
        left: 0;
        opacity: 0;
    }
    .filebox img {
        width: 100px;
        height: 100px;
        line-height: 100px;
        float: left;
        border-radius: 4px;
    }
    .upload i {
        position: absolute;
        bottom: 0;
        left: 100px;
        color: rgb(83, 76, 76);
        font-size: 24px;
    }
    .imgdel {
        position: absolute;
        top: 0;
        right: 5px;
    }

    .first_c {
        width: 100%;
        background-color: #f0f0f0;
    }
    .first_top {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        background-color: #fdfeff;
    }
    .first_left {
        width: calc(100% - 300px);
        padding: 20px;
    }
    .first_left .first_input {
        width: calc(50% - 20px);
    }
    .first_left .el-form-item__content {
        width: calc(100% - 100px);
    }
    .first_input .inputbox {
        width: calc(100% - 20px);
    }
    .first_right {
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .first_bottom {
        width: 100%;
        min-height: 150px;
        height: auto;
        margin-bottom: 10px;
        background-color: #fdfeff;
        padding-bottom: 10px;
        box-sizing: border-box;
    }
    .pro_title {
        padding: 10px 0 0 10px;
        font-weight: 500;
        color: #409eff;
    }
    
    .ueditor_c {
        margin: 20px;
    }
    .spec_select {
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .uploadproImg {
        padding: 20px;
        box-sizing: border-box;
    }
    .uploadproImg .el-upload--picture-card {
        background-color: #ffffff;
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
    .uploadproImg .el-upload--picture-card i {
        font-size: 18px;
    }
    .uploadproImg .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }
    .uploadproImg .el-progress {
        stroke-width: 90px;
    }

    .orderHead {
        padding-top: 20px;
        box-sizing: border-box;
    }
    .orderHead .first_input {
        width: calc(33% - 20px);
    }
    .orderHead .el-form-item__content {
        width: calc(100% - 100px);
    }
    .droplist {
        height: auto;
    }
    .orderDialog .el-dialog {
        min-height: 750px;
        margin-top: 10vh;
    }
    .table_date.el-date-editor.el-input {
        width: 150px;
    }
        th.table_required .cell::before {
        content: "*";
        margin-right: 4px;
        color: #f56c6c;
    }

    .generCharts {
        width: 50px;
        height: 50px;
        position: fixed;
        right: 25px;
        top: 90px;
        text-align: center;
        cursor: pointer;
    }
    .chart_icon {
        font-size: 24px;
        line-height: 50px;
    }
    .chart_icon:hover {
        color: #ff6333;
    }

    .charts-collapse {
        left: 80px;
        width: calc(100% - 112px);
    }

    .disabledForm {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .disabledForm .el-form-item {
        flex: 0 0 calc(25% - 15px);
    }
    .disabledForm .el-form-item .el-form-item__content {
        width: calc(100% - 90px);
    }
    .ap_top {
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        border-bottom: 10px solid #f0f0f0;
    }
    .ap_bottom {
        padding-top: 20px;
        box-sizing: border-box;
    }
    .ap_level {
        margin-bottom: 12px;
    }
    .ap_del {
        display: inline-block;
        margin-left: 30px;
        width: 20px;
        height: 20px;
        background-color: #f56c6c;
        border: 1px solid #f56c6c;
        border-radius: 10px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
    }
    .ap_del .el-icon-delete {
        font-size: 14px;
        color: #ffffff;
    }
    .ap_remark {
        padding: 45px;
        font-size: 14px;
        line-height: 35px;
        color: #606266;
    }
    .examine_c {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .examine_c .examine_item {
        flex: 0;
        height: 110px;
        display: flex;
    }
    .examine_c .examine_item .examine_cont {
        flex: 0;
        text-align: center;
    }
    .examine_c .examine_item .examine_next {
        flex: 0;
        width: 30px;
        height: 100px;
        line-height: 100px;
        display: inline-block;
        text-align: center;
    }
    .examine_c .examine_po,
    .examine_c .examine_po1,
    .examine_c .examine_po2 {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background-color: rgb(161, 161, 161);
    }
    .examine_c .examine_po,
    .examine_c .examine_po1 {
        margin: 0 15px;
    }
    .examine_c .examine_po2:not(:first-child) {
        margin-left: -25px;
    }
    .examine_c .examine_img {
        border-radius: 50%;
    }
    .examine_c .examine_type {
        line-height: 30px;
        font-size: 14px;
    }
    .examine_c .examine_status {
        font-size: 14px;
    }
    .examine_c .examine_time {
        line-height: 20px;
        font-size: 12px;
    }
    .examine_popover {
        height: 70px;
        position: relative;
    }
    .examine_popover .examine_ico {
        display: inline-block;
        width: 30px;
        position: absolute;
        top: 3px;
        left: 10px;
    }
    .examine_popover .examint_msg {
        width: 170px;
        display: inline-block;
        margin-left: 40px;
    }
    .examine_popover .examint_msg .examint_remark {
        width: 100%;
        line-height: 30px;
        padding-left: 5px;
        box-sizing: border-box;
        background-color: #f0f0f0;
    }

    .jobclass_line {
        width: 100%;
        height: 15px;
        background-color: #f0f0f0;
    }
</style>
