import {WXErrCode} from "../../app/class";

export type BaseParams = {
  page?: number;
  pageSize?: number;
}
export type Code2SessionResult = {
  openid: string;
  session_key: string;
  unionid?: string;
  errcode?: WXErrCode;
  errmsg?: string;
}
export type GenerateWxUserTokenResult = {
  success: boolean;
  token?: string | null
  errorMessage?: string;
  errCode?: number;
  expirationTime?: number | null;
}

export type WXLoginReqParams = {
  encryptedData: string;
  iv: string;
  signature: string;
  rawData: string;
  code: string;
}
export type WXUserInfo = {
  nickName: string;
  avatarUrl: string;
  city?: string;
  country?: string;
  province?: string;
  language?: string;
  gender?: 0 | 1;
}
export type WxLoginParseResult = {
  success: boolean;
  errorMessage?: string;
  errCode?: WXErrCode;
  data?: WXUserInfo & {
    openId: string;
    watermark: {
      timestamp: number;
      appid: string;
    }
  };
}
export type LoginServiceResult = {
  success: boolean;
  token: string;
  expirationTime: number;
}
export type GetUserRiskRankResult = {
  level: number,
  verifyAgain?: boolean,
  refuse?: boolean,
}
export type WXCallbackParams = {
  id: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
    original_type: string;
    algorithm: string;
    ciphertext: string;
    associated_data: string;
    nonce: string;
  };
}
export enum WXTradeType {
  // 公众号支付
  jsApi = "JSAPI",
  // 扫码支付
  native = "NATIVE",
  // APP支付
  app = "APP",
  // 付款码支付
  micropay = "MICROPAY",
  // H5支付
  mweb = "MWEB",
  // 刷脸支付
  facepay = "FACEPAY",
}

/**
 * 账单类型
 */
export enum WXBillType {
  all = "ALL", // 返回当日所有订单信息（不含充值退款订单
  success = "SUCCESS", // 返回当日成功支付的订单（不含充值退款订单）
  refund = "REFUND", // 返回当日退款订单（不含充值退款订单）
}
export enum WXTradeState {
  // 支付成功
  SUCCESS = "SUCCESS",
  // 转入退款
  REFUND = "REFUND",
  // 未支付
  NOTPAY = "NOTPAY",
  // 已关闭
  CLOSED = "CLOSED",
  // 已撤销（付款码支付）
  REVOKED = "REVOKED",
  // 用户支付中（付款码支付）
  USERPAYING = "USERPAYING",
  // 支付失败(其他原因，如银行返回失败)
  PAYERROR = "PAYERROR",
}
export type WXOrderResult = {
  // 商户ID
  mchid: string;
  // 应用ID
  appid: string;
  // 商户订单号
  out_trade_no: string;
  // 微信支付订单号
  transaction_id: string;
  // 交易类型
  trade_type?: WXTradeType;
  // 交易状态
  trade_state: WXTradeState;
  // 交易状态描述
  trade_state_desc: string;
  // 付款银行
  bank_type: string;
  // 附加数据
  attach: string;
  // 支付完成时间
  success_time: string;
  // 支付者
  payer: {
    // 支付者的用户标识
    openid: string
  };
  // 订单金额
  amount: {
    // 总金额
    total: number,
    // 用户支付金额
    payer_total: number,
    // 货币类型
    currency: number,
    // 用户支付币种
    payer_currency: number,
  };
}
export interface CreatedOrderInfo {
  // 商户订单号
  out_trade_no: string;
  // 微信支付订单号
  transaction_id?: string;
  // 交易类型
  trade_type?: WXTradeType;
  // 交易状态
  trade_state: WXTradeState;
  // 交易状态描述
  trade_state_desc: string;
  // 订单金额
  amount: {
    // 总金额
    total: number,
    // 用户支付金额
    payer_total: number,
    // 货币类型
    currency: number,
    // 用户支付币种
    payer_currency: number,
  };
  // 支付完成时间
  success_time: string;
  // 支付者
  payer: {
    // 支付者的用户标识
    openid: string
  };
  remark?: string;
}

export type WXTradeBillResult = {
  status: number;
  download_url: string;
  hash_type: string;
  hash_value: string;
}

export type TradeDetail = {
  // 商户ID
  mchid: string;
  // 应用ID
  appid: string;
  // 商户订单号
  out_trade_no: string;
  // 微信支付订单号
  transaction_id: string;
  // 交易类型
  trade_type?: WXTradeType;
  // 交易状态
  trade_state: WXTradeState;
  // 付款银行
  bank_type: string;
  // 支付完成时间
  success_time: string;
  // 支付者的用户标识
  openid: string
  // 订单金额
  amount: number;
  // 商品名称
  description: string;
  _checked?: boolean
}

export type BillDetail = {
  id?: number,
  balance: number,
  amount: number,
  afterRecharging: number,
  userId: number,
  createTime: number,
  status: WXTradeState,
  wxOrderNum?: string,
  wxOrderType?: WXTradeType,
  orderNum: string,
  errorMsg?: string,
  checked: 0 | 1,
  checkErr: 0 | 1,
  remark?: string
}
export declare namespace AdminUser {
  type Login = {
    account: string;
    pwd: string;
  };
  type Role = {
    id: number;
    code: "superAdministrator" | "admin" | "operator";
    name: "string"
  }
  type User = {
    id: number;
    account: string;
    pwd: string;
    nickName: string;
    roleId: string;
    // 0-禁用，1-启用
    enable: 0 | 1;
    // 0-未删除，1-已删除
    isDelete: 0 | 1;
    createTime: number;
    updateTime: number;
    role?: Role
  }
  type AdminUserLoginItem = {
    ip: string;
    time: string;
    expiresTime: number;
    account: string;
    uaData: any;
    redisKey: string;
    socketID?: string;
  }
}
export declare namespace CardType {
  type Item = {
    name: string;
    code: string;
    // 0-禁用，1-启用
    enable: 0 | 1;
    // 0-未删除，1-已删除
    isDelete: 0 | 1;
    createTime: number;
    updateTime: number;
    remark?: string;
  }
  type QueryParams = {
    name?: string;
    createTime?: number;
    updateTime?: number;
  } & BaseParams
}
export declare namespace Goods {
  export type GoodsItem = {
    goodsTypeID: number;
    name: string;
    description?: string;
    image: string;
    price: number;
    remark?: string;
    // 0-禁用，1-启用
    enable: 0 | 1;
    // 0-未删除，1-已删除
    isDelete: 0 | 1;
    createTime: number;
    updateTime: number;
  }

  export type CurrentGoods = {
    id: number;
    price: number;
    createTime: number;
    updateTime: number;
    goodsTypeID: number;
    name: string;
    description?: string;
    image?: string;
    remark?: string;
    enable: 0 | 1;
    isDelete: 0 | 1;
  }

  export type QueryParams = {
    name?: string;
    createTime?: number;
    updateTime?: number;
  } & BaseParams
}
export declare namespace GoodsType {
  export type GoodsTypeItem = {
    name: string;
    description?: string;
    image?: string;
    remark?: string;
    // 0-禁用，1-启用
    enable: 0 | 1;
    // 0-未删除，1-已删除
    isDelete: 0 | 1;
    createTime: number;
    updateTime: number;
  };

  export type GoodsTypeIns = {
    id: number;
  } & GoodsTypeItem;

  export type QueryParams = {
    name?: string;
    createTime?: number;
    updateTime?: number;
  } & BaseParams
}
export type AdvanceOrderParams = {
  description: string;
  total: number,
}
export declare namespace Recharge {
  export type QueryParams = {
    userId?: number,
    wxOrderNum?: string;
    orderNum?: string;
    wxOrderType?: WXTradeType,
    status?: WXTradeState,
    startTime?: string;
    endTime?: string;
  } & BaseParams;

  export type CurrentRecharge = {
    id: number;
    balance: number;
    amount: number;
    afterRecharging: number;
    userId: number;
    createTime: number;
    status: string;
    wxOrderNum?: string;
    wxOrderType?: WXTradeType;
    orderNum: string;
    errorMsg?: string;
    remark?: string;
    checked: 0 | 1;
    checkErr: 0 | 1;
  }
}
export declare namespace User {
  export type QueryParams = {

  } & BaseParams;
  export type CurrentUser = {
    id: number;
    nickName: string;
    avatar: string;
    openId: string;
    tel?: string;
    createTime: number;
    balance: number;
    IDCard: string;
    cardTypeID: number;
    bindWX: 0 | 1;
    loginTime: number;
    lastRechargeTime: number;
  }
}
export declare namespace Consume {
  export type QueryParams = {

  } & BaseParams;
  export type AdvancedQueryParams = {
    paymentWay?: "balance" | "combined" | "cash";
    orderNo?: string;
    goodsID?: number;
    userId?: number;
    status?: number;
    startTime?: string;
    endTime?: string;
  } & BaseParams;
  type FormParams = {
    orderNo: string;
    userId: number;
    status: number;
    goodsID: number;
    createTime: number;
    remark?: string;
    paymentWay: "balance" | "combined" | "cash";
    consumeAmount?: number;
    balanceAmount?: number;
    cashAmount?: number;
    onlyCashAmount?: number;
  }
  export type CurrentItem = {
    id: number;
    goodsID: number;
    consumeAmount: number;
    balanceAmount?: number;
    cashAmount?: number;
    paymentWay: "balance" | "combined" | "cash";
    balance: number;
    createTime: number;
    orderNo: string;
    userId: number;
    status: 0 | 1;
    remark?: string;
  }
}

export type WXSubscribeMsgParams = {
  template_id: string;
  page?: string;
  touser: string;
  data: { [key: string]: any };
  miniprogram_state: "developer" | "trial" | "formal";
}

export declare namespace NonMemberConsumption {
  export type QueryParams = {
    goodsID?: number,
    orderNo?: string;
    startTime?: string;
    endTime?: string;
  } & BaseParams;
  export type CreateParams = {
    goodsID: string | number;
    consumeAmount: number;
    createTime: number;
    orderNo: string;
    remark?: string;
  }
  export type CurrentItem = {
    id: number;
    goodsID: number;
    consumeAmount: number;
    createTime: number;
    orderNo: string;
    remark?: string;
  }
}
