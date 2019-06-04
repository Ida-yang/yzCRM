<template>
    <div>{{msg}}</div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'workOrder',
        data(){
            return{
                msg:'工单'
            }
        },
    }
</script>

<style>

</style>
