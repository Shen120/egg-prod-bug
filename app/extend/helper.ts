import {isEmpty, isNil} from "ramda";
import * as moment from "moment";

const {Op} = require("sequelize");

interface ParamsRules {
  [key: string]: {
    condition: "and" | "or" | "gt" | "gte" | "lt" | "lte" | "ne" | "eq" | "not" | "between" | "notBetween" | "in" | "notIn" | "like" | "notLike" | "regexp" | "notRegexp",
    isUnixTime?: boolean,
    isTime?: boolean,
    valueType?: "string" | "number"
  }
}

export default {
  // this 是 helper 对象，在其中可以调用其他 helper 方法
  // this.ctx => context 对象
  // this.app => application 对象

  /**
   * 计算分页
   * @param page 当前页
   * @param size 每页条数
   */
  computePage(page?: number | string, size?: number | string): { limit: number, offset: number } {
    let _page = !isNil(page) ? page : 0;
    let _size = !isNil(size) ? size : 15;
    if (typeof _page === "string") {
      _page = parseInt(_page)
    }
    if (typeof _size === "string") {
      _size = parseInt(_size)
    }
    return {
      limit: _size,
      offset: _page * _size,
    }
  },

  timeStrToNum(date: string, isUnix?: boolean) {
    return isUnix ? moment(date).unix() : moment(date).valueOf()
  },

  /**
   * 将查询参数转换为高级Sequelize查询数据库时的条件
   * @param params 查询参数
   * @param rules 参数对应的查询条件
   */
  transOpParams(params: { [key: string]: any }, rules: ParamsRules): {[key: string]: any} {
    let obj = {};
    for (const k in rules) {
      if (k === "createTime") {
        const rule = rules[k];
        if (rule) {
          const condition = rule.condition;
          const isUnix = rule.isUnixTime;
          if (condition === "between") {
            if (!isNil(params.startTime) && !isNil(params.endTime)) {
              obj[k] = {
                [Op[condition]]: [
                  this.timeStrToNum(params.startTime, isUnix),
                  this.timeStrToNum(params.endTime, isUnix),
                ],
              }
            } else if (isNil(params.startTime) && !isNil(params.endTime)) {
              obj[k] = {
                [Op.lte]: this.timeStrToNum(params.endTime, isUnix),
              }
            } else if (!isNil(params.startTime) && isNil(params.endTime)) {
              obj[k] = {
                [Op.gte]: this.timeStrToNum(params.startTime, isUnix),
              }
            }
          } else {
            if (!isNil(params[k]) && !isEmpty(params[k])) {
              obj[k] = {
                [Op[condition]]: this.timeStrToNum(params[k], isUnix),
              }
            }
          }
        }
      } else {
        const rule = rules[k];
        if (rule) {
          const condition = rule.condition;
          const valueType = rule.valueType;
          const isUnix = rule.isUnixTime;
          const isTime = rule.isTime;
          if (!isNil(params[k]) && !isEmpty(params[k]) && (k !== "page" && k !== "pageSize" && k !== "current")) {
            if (isTime) {
              obj[k] = {
                [Op[condition]]: this.timeStrToNum(params[k], isUnix),
              }
            } else {
              obj[k] = {
                [Op[condition]]: valueType && valueType === "number" ? parseInt(params[k]) : params[k],
              }
            }
          }
        }
      }
    }
    console.log("高级查询条件：", obj)
    return obj;
  }
};
