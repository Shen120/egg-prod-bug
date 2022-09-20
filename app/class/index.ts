import * as moment from "moment";
import {AdminUser} from "../../typings/custom";

export enum WXErrCode {
  // 系统繁忙
  sysBusy = -1,
  // 请求成功
  success = 0,
  // code无效
  codeInvalid = 40029,
  // 频率限制，每个用户每分钟100次
  frequentRequests = 45011,
  // 高风险等级用户，小程序登录拦截
  userRisk = 40226
}
export enum WXUserRiskLevel {
  levFail = -1,
  lev0 = 0,
  lev1 = 1,
  lev2 = 2,
  lev3 = 3,
  lev4 = 4
}

export class SafeAdminUser {
  id: number;
  account: string;
  nickName: string;
  role: AdminUser.Role;
  // 0-禁用，1-启用
  enable: 0 | 1;
  // 0-未删除，1-已删除
  isDelete: 0 | 1;
  constructor(json?: any) {
    this.id = json.id || "";
    this.account = json.account || "";
    this.nickName = json.nickName || "";
    this.role = json.role || "";
    this.enable = json.enable || 0;
    this.isDelete = json.isDelete || 1;
  }
}

export class SafeCard {
  code: string;
  createTime: number;
  updateTime: number;
  id: number;
  // 0-禁用，1-启用
  enable: 0 | 1;
  // 0-未删除，1-已删除
  isDelete: 0 | 1;
  name: string;
  remark?: string;
  constructor(json?: any) {
    if (json) {
      this.code = json.code || "";
      this.createTime = json.createTime || moment().valueOf();
      this.updateTime = json.updateTime || moment().valueOf();
      this.id = json.id || "";
      this.enable = json.enable || 0;
      this.isDelete = json.code || 1;
      this.name = json.name || "";
      this.remark = json.remark || "";
    }
  }
}

export class SafeUser {
  id: number;
  nickName: string;
  avatar: string;
  city?: string;
  country?: string;
  province?: string;
  gender?: 0 | 1;
  tel?: string;
  IDCard: string;
  cardTypeID: string;
  // 0-未绑定微信, 1-已绑定微信
  bindWX: 0 | 1;
  card?: SafeCard;
  balance: number = 0;
  lastRechargeTime?: number;
  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nickName = json.nickName;
      this.avatar = json.avatar;
      this.balance = json.balance || 0;
      this.city = json.city;
      this.country = json.country;
      this.province = json.province;
      this.gender = json.gender;
      this.tel = json.tel;
      this.IDCard = json.IDCard;
      this.cardTypeID = json.cardTypeID;
      this.bindWX = json.bindWX;
      this.card = json.card ? new SafeCard(json.card) : new SafeCard();
      this.lastRechargeTime = json.lastRechargeTime;
    }
  }
}