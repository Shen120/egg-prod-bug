import BaseController from "../core/base_controller";
import * as moment from "moment";
import {isNullOrEmpty} from "../utils";

class CardTypeController extends BaseController {

  // 新建会员卡
  async create() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body || {};
      const vali = await this.validate({
        name: "string",
        code: "string"
      });
      if (!vali) return
      const check = await service.card.checkCodeRepeat(params.code);
      if (check) {
        this.success({
          status: 201,
          success: false,
          errorMessage: "Code已存在"
        })
        return
      }
      const res = await service.card.createService({
        ...params,
        enable: 1,
        isDelete: 0,
        createTime: moment().unix(),
        updateTime: moment().unix(),
      });
      this.success({
        status: 200,
        success: true,
        data: res
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 删除会员卡
  async delete() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body;
      const check = await this.validate({id: "string"});
      if (!check) return;
      await service.card.deleteService(params.id);
      this.success({
        success: true,
        status: 201
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 更新会员卡
  async update() {
    const {ctx, service} = this;
    try {
      const params = ctx.request.body;
      const vali = await this.validate({
        id: "string"
      });
      if (!vali) return;
      const check = await service.card.checkCodeRepeat(params.code);
      if (check) {
        this.success({
          status: 201,
          success: false,
          errorMessage: "Code已存在"
        })
        return
      }
      await service.card.updateService(params.id, {
        ...params,
        updateTime: moment().unix(),
      });
      this.success({
        success: true,
        status: 201
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 分页查询会员卡
  async getListByPage() {
    const {ctx, service} = this;
    try {
      const params = ctx.params;
      const res = await service.card.queryService({
        ...params,
        page: !isNullOrEmpty(params.page) ? parseInt(params.page, 10) : 0,
        pageSize: !isNullOrEmpty(params.pageSize) ? parseInt(params.pageSize, 10) : 15,
      });
      this.success({
        status: 200,
        success: true,
        data: res,
        formatList: true,
        page: params.page,
        pageSize: params.pageSize
      })
    } catch (e) {
      this.log(e)
    }
  }

  // 查询全部会员卡
  async queryAllList() {
    const {service} = this;
    try {
      const res = await service.card.queryAllService();
      this.success({
        success: true,
        status: 200,
        data: res,
        formatList: true,
      })
    } catch (e) {
      this.log(e)
    }
  }

}

export default CardTypeController;
