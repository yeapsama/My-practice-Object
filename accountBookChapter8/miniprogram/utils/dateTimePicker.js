//格式整理函数，如果传入的值小于0则前面补齐0，否则不做处理
function withData(param) {
    return param < 10 ? '0' + param : '' + param;
  }
  //自动循环遍历start到end，并将结果按照withData函数格式放置在数组里
  function getLoopArray(start, end) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(withData(i));
    }
    return array;
  }
//   获取月份的天数
  function getMonthDay(year, month) {
      //判断是平年还是闰年
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), 
    array = null;
  
    // 获取月份，1,3,5,7,8,10,12月为31日，4,6,9,11为30日，2月平年28天闰年29天
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        array = getLoopArray(1, 31)
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        array = getLoopArray(1, 30)
        break;
      case '02':
        array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
        break;
      default:
        array = '月份格式不正确，请重新输入！'
    }
    return array;
  }
//   获取当前时间函数
  function getNewDateArry() {
    var newDate = new Date();
    // 获取当前时间  年 月 日 时 分 秒
    var year = withData(newDate.getFullYear()),
      mont = withData(newDate.getMonth() + 1),
      date = withData(newDate.getDate()),
      hour = withData(newDate.getHours()),
      minu = withData(newDate.getMinutes()),
      seco = withData(newDate.getSeconds());
  
    return [year, mont, date, hour, minu, seco];
  }
  function dateTimePicker(startYear, endYear, date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], //当前日期的时间数组
    dateTimeArray = [[], [], [], [], [], []];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据，如果传入data则显示data，并且按照一定的格式分割成数组，否则调用获取当前时间函数获取时间
    // 以 2022-03-11 11：30为例，...date.split(' ')[0].split('-')则表示2022，03，11；...date.split(' ')[1].split(':')表示11，30
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);
  
    dateTimeArray.forEach((current, index) => {
      // dateTimeArray的current里（即dateTimeArray[index])查找符合当前日期的内容defaultDate[index]
      //因为是遍历dateTimeArray，则current代表的是年月日时分秒数组，而current.indexof则是查找数组里面符合情况内容
      //indexOf要查找的内容是defaultDate[index]，即[year, mont, date, hour, minu, seco]
      //通过匹配查找到当前时间后，将内容push到dateTime里
      dateTime.push(current.indexOf(defaultDate[index]));
    });
  
    return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
    }
  }
  module.exports = {
    dateTimePicker: dateTimePicker,
    getMonthDay: getMonthDay
  }
  