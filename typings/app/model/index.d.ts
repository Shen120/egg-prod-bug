// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/model/adminUser';
import ExportCard from '../../../app/model/card';
import ExportCommodity from '../../../app/model/commodity';
import ExportConsume from '../../../app/model/consume';
import ExportGoodsType from '../../../app/model/goodsType';
import ExportLogAdminUser from '../../../app/model/logAdminUser';
import ExportLogInterface from '../../../app/model/logInterface';
import ExportNonMemberConsumption from '../../../app/model/nonMemberConsumption';
import ExportRecharge from '../../../app/model/recharge';
import ExportRechargerPrice from '../../../app/model/rechargerPrice';
import ExportRole from '../../../app/model/role';
import ExportSundry from '../../../app/model/sundry';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    AdminUser: ReturnType<typeof ExportAdminUser>;
    Card: ReturnType<typeof ExportCard>;
    Commodity: ReturnType<typeof ExportCommodity>;
    Consume: ReturnType<typeof ExportConsume>;
    GoodsType: ReturnType<typeof ExportGoodsType>;
    LogAdminUser: ReturnType<typeof ExportLogAdminUser>;
    LogInterface: ReturnType<typeof ExportLogInterface>;
    NonMemberConsumption: ReturnType<typeof ExportNonMemberConsumption>;
    Recharge: ReturnType<typeof ExportRecharge>;
    RechargerPrice: ReturnType<typeof ExportRechargerPrice>;
    Role: ReturnType<typeof ExportRole>;
    Sundry: ReturnType<typeof ExportSundry>;
    User: ReturnType<typeof ExportUser>;
  }
}
