
exports.install = function (Vue) {
    //时间格式转换
    // Vue.prototype.dateFormat = function (row, column, cellValue, index){
    //     const time = new Date(cellValue);
    //     if(time!=null){
    //         const year = time.getFullYear();
    //         const month = time.getMonth() + 1;
    //         const day = time.getDate();
    //         const hh = time.getHours();
    //         const mm = time.getMinutes();
    //         const ss = time.getSeconds();
    //         const timeFormat= year + "年" + month + "月" + day + "日" + hh + ":" + mm + ":" + ss;
    //         return timeFormat;
    //     }    
    // }
    //去除输入框首位空格
    Vue.prototype.DelBlankSpace = function(userInput){
        if(userInput != null){
            return userInput.replace(/(^\s*)|(\s*$)/g, "")
        }else{
            return null
        }
        
    }
    //打印数据编写
    Vue.prototype.PrintData = function (selectedData,num, copiesNum, allData, printIds,type,sendData){
        
        for(var i = 0; i < selectedData.length; i++) {
            for (var j = 0; j < copiesNum; j++) {
                var obj = {};
                obj.Type = type ;
                if(num == 'ordernum'){
                    obj.Code = selectedData[i].ordernum;
                }else if(num == 'deliverynum'){
                    obj.Code = selectedData[i].deliverynum;
                }
                obj.id = selectedData[i].id
                allData.push(obj);
            }
            let printId = {};
            printId.id = selectedData[i].id;
            printId.status = 1;
            printIds.push(printId);
        }
        sendData.printerNo = this.selectprinterNo;
        sendData.printData = this.allData   
    }
  }
