// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminUser from '../../../app/service/adminUser';
import ExportCard from '../../../app/service/card';
import ExportCommodity from '../../../app/service/commodity';
import ExportCommon from '../../../app/service/common';
import ExportConsume from '../../../app/service/consume';
import ExportGeetest from '../../../app/service/geetest';
import ExportGoodsType from '../../../app/service/goodsType';
import ExportLog from '../../../app/service/log';
import ExportNonMemberConsumption from '../../../app/service/nonMemberConsumption';
import ExportQiniu from '../../../app/service/qiniu';
import ExportRecharge from '../../../app/service/recharge';
import ExportRechargerPrice from '../../../app/service/rechargerPrice';
import ExportSundry from '../../../app/service/sundry';
import ExportUser from '../../../app/service/user';
import ExportWxApi from '../../../app/service/wxApi';
import ExportWxPay from '../../../app/service/wxPay';

declare module 'egg' {
  interface IService {
    adminUser: AutoInstanceType<typeof ExportAdminUser>;
    card: AutoInstanceType<typeof ExportCard>;
    commodity: AutoInstanceType<typeof ExportCommodity>;
    common: AutoInstanceType<typeof ExportCommon>;
    consume: AutoInstanceType<typeof ExportConsume>;
    geetest: AutoInstanceType<typeof ExportGeetest>;
    goodsType: AutoInstanceType<typeof ExportGoodsType>;
    log: AutoInstanceType<typeof ExportLog>;
    nonMemberConsumption: AutoInstanceType<typeof ExportNonMemberConsumption>;
    qiniu: AutoInstanceType<typeof ExportQiniu>;
    recharge: AutoInstanceType<typeof ExportRecharge>;
    rechargerPrice: AutoInstanceType<typeof ExportRechargerPrice>;
    sundry: AutoInstanceType<typeof ExportSundry>;
    user: AutoInstanceType<typeof ExportUser>;
    wxApi: AutoInstanceType<typeof ExportWxApi>;
    wxPay: AutoInstanceType<typeof ExportWxPay>;
  }
}
