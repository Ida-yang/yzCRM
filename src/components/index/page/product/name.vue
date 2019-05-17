<template>
  <el-button @click="getDate()">--</el-button>
</template>

<script>
  export default {
    data() {
      return {
        opportunityProgress: [{
          progress_id: 149,
          oy_id: 65,
          progress_name: "初步了解",
          progress_probability: "10",
          createTime: "2019-04-28 15:06",
          previousTime: null,
          pId: null,
          deptid: null,
          secondid: null,
          stepId: null
        }, {
          progress_id: 152,
          oy_id: 65,
          progress_name: "拜访",
          progress_probability: "30",
          createTime: "2019-05-16 00:33",
          previousTime: "2019-04-28 15:06",
          pId: null,
          deptid: null,
          secondid: null,
          stepId: null
        }, {
          progress_id: 153,
          oy_id: 65,
          progress_name: "需求确认",
          progress_probability: "50",
          createTime: "2019-05-17 00:17",
          previousTime: "2019-05-16 00:33",
          pId: null,
          deptid: null,
          secondid: null,
          stepId: null
        }, {
          progress_id: 154,
          oy_id: 65,
          progress_name: "商务谈判",
          progress_probability: "80",
          createTime: "2019-05-17 00:47",
          previousTime: "2019-05-17 00:17",
          pId: null,
          deptid: null,
          secondid: null,
          stepId: null
        }],
      }
    },
    methods: {
      getDate(){
        for(let i = 0; i < this.opportunityProgress.length; i ++){
          // console.log(this.opportunityProgress[i].previousTime,this.opportunityProgress[i].createTime)
          if(this.opportunityProgress[i].previousTime){
            let arr = this.opportunityProgress[i].previousTime.split(" ");
            let arr2 = this.opportunityProgress[i].createTime.split(" ");
            let begintime = new Date(arr[0].replace(/-/g, "/"))
            let endtime = new Date(arr2[0].replace(/-/g, "/"))
            let dateDiff = endtime.getTime() - begintime.getTime();
            let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
            console.log(dayDiff)
          }
        }
      },
    }
  };
</script>