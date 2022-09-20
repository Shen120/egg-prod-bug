import { anyPass, isEmpty, isNil } from 'ramda';
import * as moment from 'moment';

const CryptoJS = require('crypto-js');

// 加密解密
export class CryptoJSModel {
  keyStr = '';

  constructor(key: string) {
    this.keyStr = key;
  }

  encrypt(str: string) {
    return CryptoJS.AES.encrypt(str, this.keyStr)
      .toString();
  }

  decrypt(ciphertext: string) {
    return CryptoJS.AES.decrypt(ciphertext, this.keyStr)
      .toString(CryptoJS.enc.Utf8);
  }
}

// export function CryptoEncrypt(str: string, keyStr: string) {
//   return AES.encrypt(str, keyStr).toString();
// }
// export function CryptoDecrypt(ciphertext: string, keyStr: string) {
//   return AES.decrypt(ciphertext, keyStr).toString(Utf8);
// }

/**
 * 生成GUID
 * @returns {string}
 * @constructor
 */
export function guid() {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16)
      .substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 判断对象是否为null, undefined，空值
 * @param obj {*} 检测对象
 * @returns {boolean}
 * @example
 *    [1, 2, 3]  ===> false
 *    [] ===> true
 *    '' ===> true
 *    null ===> true
 *    {} ===> true
 *    {length: 0} ===> false
 *    undefined ===> true
 *    0 ===> false
 */
export function isNullOrEmpty(obj) {
  return anyPass([ isEmpty, isNil ])(obj);
}

// 生成订单号
export function generateOrderNumber(len: number = 17) {
  const prefix = moment()
    .valueOf();
  let suffix = '';
  for (let i = 0; i < len; i++) {
    suffix += Math.floor(Math.random() * 10);
  }
  return `${prefix}${suffix}`
}

// 强制保留2位小数，如：2，会在2后面补上00.即2.00
export const toDecimal2 = (x: any) => {
  const f1 = parseFloat(x);
  if (isNaN(f1)) {
    return false;
  }
  const f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

// 分转化为元 - 正则解决精度\
export const regFenToYuan = (fen: any) => {
  let num = fen;
  num = fen * 0.01;
  num += '';
  const reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  num = num.replace(reg, '$1');
  num = toDecimal2(num);
  return num
};

/**
 * 元转分 - 解决精度问题
 * @param yuan 要转换的钱，单位元
 * @param digit 放大倍数，如果元转分则为100
 */
export const regYuanToFen = (yuan: number, digit: number = 100) => {
  let m = 0;
  const s1 = yuan.toString();
  const s2 = digit.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
  }

  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

// 判断是否最多两位小数，正负均可
export const checkTwoPointNum = (inputNumber: any) => {
  const partten = /^-?\d+\.?\d{0,2}$/;
  return partten.test(inputNumber)
};

// 金额转为大写汉字
export const priceUppercase = (money: any) => {
  const cnNums = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ]; //汉字的数字
  const cnIntRadice = [ '', '拾', '佰', '仟' ]; //基本单位
  const cnIntUnits = [ '', '万', '亿', '兆' ]; //对应整数部分扩展单位
  const cnDecUnits = [ '角', '分', '毫', '厘' ]; //对应小数部分单位
  //var cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = '元'; //整型完以后的单位
  const maxNum = 999999999999999.9999; //最大处理的数字

  let IntegerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let ChineseStr = ''; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    // $.alert('超出最大处理数字');
    return '';
  }
  if (money == 0) {
    //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
    ChineseStr = cnNums[0] + cnIntLast
    //document.getElementById("show").value=ChineseStr;
    return ChineseStr;
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf('.') == -1) {
    IntegerNum = money;
    DecimalNum = '';
    cnIntLast = '元整'
  } else {
    parts = money.split('.');
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  let zeroCount = 0;
  let IntLen = 0;
  let n;
  let p;
  let m;
  let q;
  let decLen = 0;
  if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
    zeroCount = 0;
    IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      n = IntegerNum.substr(i, 1);
      p = IntLen - i - 1;
      q = p / 4;
      m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != '') {//小数部分
    decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      n = DecimalNum.substr(i, 1);
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == '') {
    //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
    ChineseStr += cnNums[0] + cnIntLast;
  }/* else if( DecimalNum == '' ){
              ChineseStr += cnInteger;
              ChineseStr += cnInteger;
          } */
  return ChineseStr;
};

// 格式化金钱，三位加一个逗号
export const priceToThousands = (num: any) => {
  if (num) {
    num = toDecimal2(num)
    //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
    num = num.toString()
      .replace(/\$|\,/g, '');
    //如果num不是数字，则将num置0，并返回
    if ('' == num || isNaN(num)) {
      return 'Not a Number ! ';
    }
    //如果num是负数，则获取她的符号
    const sign = num.indexOf('-') > 0 ? '-' : '';
    //如果存在小数点，则获取数字的小数部分
    let cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
    cents = cents.length > 1 ? cents : '';//注意：这里如果是使用change方法不断的调用，小数是输入不了的
    //获取数字的整数数部分
    num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num;
    //如果没有小数点，整数部分不能以0开头
    if ('' == cents) {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return 'Not a Number ! ';
      }
    }
    //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
    else {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return 'Not a Number ! ';
      }
    }
    //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
    /*
      也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
      字符串长度为0/1/2/3时都不用添加
      字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
     */
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    //将数据（符号、整数部分、小数部分）整体组合返回
    return (sign + num + cents);
  }
  return ''
}

const format = (date: Date) => {
  let time = '';
  time += date.getFullYear() + '-'; // 获取年份。
  time += addWords(date.getMonth() + 1) + '-'; // 获取月份。
  time += addWords(date.getDate()); // 获取日。
  return (time); // 返回日期。
};

export const addWords = (num: number | string) => {
  if (typeof num === "string") {
    num = Number(num);
  }
  return num < 10 ? '0' + num : num;
};

// 获取当前日期
export const currentTime = () => {
  const dateTime = new Date();
  // time1表示当前时间
  return dateTime.getFullYear() + '-' + addWords(dateTime.getMonth() + 1) + '-' + addWords(dateTime.getDate());
};

// 获取一天所有时间
export const getAllTimeInDay = (): string[] => {
  let arr: string[] = [];
  for (let i = 0; i < 24; i++) {
    arr.push(addWords(i).toString())
  }
  return arr;
}

// 获取最近多少天的日期
export const getLatestDate = function(dayNumber) {
  const dateTime = new Date();
  // currentTime=dateTime.getFullYear()+"-"+addWords(dateTime.getMonth()+1)+"-"+addWords(dateTime.getDate());//currentTime表示当前时间
  const dateEnd = new Date(dateTime);
  dateEnd.setDate(dateTime.getDate() + dayNumber);
  return dateEnd.getFullYear() + '-' + addWords(dateEnd.getMonth() + 1) + '-' + addWords(dateEnd.getDate());
};

// 按日查询
export const getDayAll = (begin, end) => {
  const dateAllArr: string[] = [];
  const startTime = begin.split('-');
  const endTime = end.split('-');
  const currentTime = new Date();
  currentTime.setFullYear(startTime[0], startTime[1] - 1, startTime[2]);
  const currentTime2 = new Date();
  currentTime2.setFullYear(endTime[0], endTime[1] - 1, endTime[2]);
  const unixDb = currentTime.getTime();
  const unixDe = currentTime2.getTime();
  for (let k = unixDb; k <= unixDe;) {
    dateAllArr.push(format(new Date(k)));
    k = k + 24 * 60 * 60 * 1000;
  }
  return dateAllArr;
};

// 按周查询
export const getWeekAll = (begin, end) => {
  const dateAllArr: string[] = [];
  const startTime = begin.split('-');
  const endTime = end.split('-');
  const currentTime = new Date();
  currentTime.setFullYear(startTime[0], startTime[1] - 1, startTime[2]);
  const currentTime2 = new Date();
  currentTime2.setFullYear(endTime[0], endTime[1] - 1, endTime[2]);
  const unixDb = currentTime.getTime();
  const unixDe = currentTime2.getTime();
  for (let k = unixDb; k <= unixDe;) {
    dateAllArr.push(format(new Date(k)).toString());
    k = k + 7 * 24 * 60 * 60 * 1000;
  }
  return dateAllArr;
};

// 按月查询
export const getMonthAll = (begin, end) => {
  const beginTime = begin;
  const endTime = end;
  const dateArray: string[] = [];
  const s1 = beginTime.split('-');
  const s2 = endTime.split('-');
  let mCount = 0;
  if (parseInt(s1[0]) < parseInt(s2[0])) {
    mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) -
      parseInt(s1[1]) + 1;
  } else {
    mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1;
  }
  if (mCount > 0) {
    let startM = parseInt(s1[1]);
    let startY = parseInt(s1[0]);
    for (let i = 0; i < mCount; i++) {
      if (startM < 12) {
        dateArray[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM += 1;
      } else {
        dateArray[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM = 1;
        startY += 1;
      }
    }
  }
  return dateArray;
};

// 按年查询
export const getYearAll = (begin, end) => {
  const beginTime = begin;
  const endTime = end;
  const dateArray: number[] = [];
  const s1 = beginTime.split('-');
  const s2 = endTime.split('-');
  const yearTime = parseInt(s2[0]) - parseInt(s1[0]) + 1;
  let startY = parseInt(s1[0]);
  for (let i = 0; i < yearTime; i++) {
    dateArray[i] = startY;
    startY += 1;
  }
  return dateArray;
};
