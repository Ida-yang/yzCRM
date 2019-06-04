<template>
    <div>{{msg}}</div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'jobClassification',
        data(){
            return{
                msg:'新增工单，工单分类'
            }
        },
    }
</script>

<style>

</style>
