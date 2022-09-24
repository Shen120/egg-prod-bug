// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';
import ExportCard from '../../../app/controller/card';
import ExportCommodity from '../../../app/controller/commodity';
import ExportCommon from '../../../app/controller/common';
import ExportConsume from '../../../app/controller/consume';
import ExportGoodsType from '../../../app/controller/goodsType';
import ExportHome from '../../../app/controller/home';
import ExportInit from '../../../app/controller/init';
import ExportNonMemberConsumption from '../../../app/controller/nonMemberConsumption';
import ExportRecharge from '../../../app/controller/recharge';
import ExportRechargerPrice from '../../../app/controller/rechargerPrice';
import ExportUser from '../../../app/controller/user';
import ExportVerify from '../../../app/controller/verify';
import ExportWxPay from '../../../app/controller/wxPay';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
    card: ExportCard;
    commodity: ExportCommodity;
    common: ExportCommon;
    consume: ExportConsume;
    goodsType: ExportGoodsType;
    home: ExportHome;
    init: ExportInit;
    nonMemberConsumption: ExportNonMemberConsumption;
    recharge: ExportRecharge;
    rechargerPrice: ExportRechargerPrice;
    user: ExportUser;
    verify: ExportVerify;
    wxPay: ExportWxPay;
  }
}
