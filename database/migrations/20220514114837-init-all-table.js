'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT, BIGINT } = Sequelize;
    // 杂项表
    await queryInterface.createTable("sundry", {
      id: {type: INTEGER(10), allowNull: false, primaryKey: true, autoIncrement: true, comment: "ID"},
      maxID: {type: STRING(11).BINARY, allowNull: false, comment: "会员卡下一个自增ID(此值是已经自增过，可以直接使用)，使用后需要再次更新此值"},
    })
    // 充值金额表
    await queryInterface.createTable("recharge_price", {
      id: {type: INTEGER(4), allowNull: false, primaryKey: true, autoIncrement: true, comment: "自增ID"},
      price: {type: BIGINT(7), allowNull: false, comment: "金额,单位(分)"},
      remarks: {type: STRING(255), comment: "备注"}
    });
    // 管理用户权限表
    await queryInterface.createTable("role", {
      id: {type: INTEGER(3), allowNull: false, primaryKey: true, autoIncrement: true, comment: "角色ID"},
      code: {type: STRING(20).BINARY, allowNull: false, comment: "权限CODE"},
      name: {type: STRING(50), allowNull: false, comment: "权限名称"},
    });
    // 商品类型表
    await queryInterface.createTable("goodsType", {
      id: {type: INTEGER(6), allowNull: false, autoIncrement: true, primaryKey: true, comment: "商品类型ID-自增"},
      name: {type: STRING(50), allowNull: false, comment: "商品类型的名称"},
      description: {type: TEXT, allowNull: true, comment: "商品类型的描述"},
      code: {type: STRING(100).BINARY, allowNull: false, comment: "商品类型code"},
      image: {type: STRING(255), allowNull: true, comment: "商品类型图"},
      remark: {type: TEXT, allowNull: true, comment: "商品类型的备注"},
      enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
      isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)，unix时间戳"},
    });
    // 会员卡类型表
    await queryInterface.createTable("card", {
      id: {type: INTEGER(6), allowNull: false, autoIncrement: true, primaryKey: true, comment: "类型ID"},
      name: {type: STRING(50).BINARY, allowNull: false, comment: '类型名称'},
      code: {type: STRING(20).BINARY, allowNull: false, comment: "类型code"},
      enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
      isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)，unix时间戳"},
      remark: {type: TEXT, allowNull: true, comment: "会员卡备注"},
    });
    // await queryInterface.addIndex("card", ["code", "isDelete", "createTime", "enable"]);

    // 接口日志
    await queryInterface.createTable("logInterface", {
      id: {type: BIGINT(13), allowNull: false, autoIncrement: true, primaryKey: true, comment: "自增ID"},
      url: {type: STRING(100).BINARY, allowNull: false, comment: "接口地址"},
      requestParams: {type: TEXT, allowNull: true, comment: "请求参数"},
      requestUser: {type: STRING(200), allowNull: false, comment: "请求用户（包含管理员）"},
      requestType: {type: STRING(10), allowNull: false, comment: "请求类型：post，get等"},
      responseStatus: {type: INTEGER(10), allowNull: false, comment: "响应状态码"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
      errorMsg: {type: TEXT, allowNull: true, comment: "错误内容"},
    });
    // 管理用户信息表
    await queryInterface.createTable("adminUser", {
      id: {type: INTEGER(6), allowNull: false, primaryKey: true, autoIncrement: true, comment: "角色ID"},
      account: {type: STRING(50).BINARY, allowNull: false, comment: "管理用户的名字，登录用"},
      pwd: {type: STRING(100), allowNull: false, comment: "管理用户的密码"},
      nickName: {type: STRING(50).BINARY, allowNull: false, comment: "管理用户的昵称"},
      roleId: {
        type: INTEGER(3),
        allowNull: false,
        comment: "管理用户的角色ID(与角色表ID绑定)",
        references: {
          model: "role",
          key: "id"
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
      },
      enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
      isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "管理用户创建时间(时间戳)，unix时间戳"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "管理用户更新时间(时间戳)，unix时间戳"}
    });
    // await queryInterface.addIndex("adminUser", ["account", "nickName", "createTime"]);

    // 用户表
    await queryInterface.createTable("user", {
      id: {type: INTEGER(10), allowNull: false, primaryKey: true, autoIncrement: true, comment: "用户ID"},
      nickName: {type: STRING(100), allowNull: false, comment: "用户昵称"},
      avatar: {type: STRING(255), allowNull: false, comment: "用户头像"},
      openId: {type: STRING(150).BINARY, allowNull: false, comment: "用户WX的openId"},
      tel: {type: STRING(11).BINARY, allowNull: true, comment: "用户的电话"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "用户创建时间(时间戳)"},
      balance: {type: BIGINT(7), allowNull: false, comment: "用户的余额，单位分"},
      IDCard: {type: STRING(11).BINARY, allowNull: false, comment: "用户卡号"},
      cardTypeID: {
        type: INTEGER(6),
        allowNull: false,
        comment: "用户卡类型ID（与用户卡类型表绑定）",
        references: {
          model: 'card',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      bindWX: {type: INTEGER(1), allowNull: false, comment: "0-未绑定微信, 1-已绑定微信"},
      loginTime: {type: INTEGER(20), allowNull: false, comment: "用户登录时间(时间戳)，unix时间戳"},
      lastRechargeTime: {type: INTEGER(20), allowNull: true, comment: "用户最后一次充值时间(时间戳)，unix时间戳"},
    });
    // await queryInterface.addIndex("user", ["tel", "createTime", "IDCard"]);

    // 商品表
    await queryInterface.createTable("commodity", {
      id: {type: INTEGER(6), allowNull: false, autoIncrement: true, primaryKey: true, comment: "商品ID"},
      goodsTypeID: {
        type: INTEGER(6),
        allowNull: false,
        comment: "商品类型",
        references: {
          model: 'goodsType',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      name: {type: STRING(255), allowNull: false, comment: "商品名称"},
      code: {type: STRING(100).BINARY, allowNull: false, comment: "商品code"},
      description: {type: TEXT, allowNull: true, comment: "商品描述"},
      image: {type: STRING(255), allowNull: true, comment: "商品图"},
      price: {type: BIGINT(7), allowNull: false, comment: "商品价格，单位分"},
      remark: {type: TEXT, allowNull: true, comment: "商品备注"},
      enable: {type: INTEGER(1), allowNull: false, comment: "0-禁用，1-启用"},
      isDelete: {type: INTEGER(1), allowNull: false, comment: "0-未删除，1-已删除"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)，unix时间戳"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)，unix时间戳"},
    });
    // await queryInterface.addIndex("commodity", ["code", "isDelete", "createTime", "enable", "name"]);

    // 管理员日志表
    await queryInterface.createTable("logAdminUser", {
      id: {type: BIGINT(13), allowNull: false, autoIncrement: true, primaryKey: true, comment: "日志ID"},
      adminUserID: {
        type: INTEGER(6),
        allowNull: false,
        comment: "管理用户ID（与管理用户信息表绑定）",
        references: {
          model: 'adminUser',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      type: {type: STRING(10).BINARY, allowNull: false, comment: "操作类型，update-更新，delete-删除，created-增加"},
      createTime: {type: INTEGER(20), allowNull: false, comment: "创建时间(时间戳)"},
      updateTime: {type: INTEGER(20), allowNull: false, comment: "更新时间(时间戳)"},
    });
    // 用户充值表
    await queryInterface.createTable("recharge", {
      id: {type: BIGINT(30), allowNull: false, autoIncrement: true, primaryKey: true, comment: "自增ID"},
      balance: {type: BIGINT(7), allowNull: false, comment: "充值前余额，单位分"},
      amount: {type: BIGINT(7), allowNull: false, comment: "当次充值的金额，单位分"},
      afterRecharging: {type: BIGINT(7), allowNull: false, comment: "充值后的余额，单位分"},
      userId: {
        type: INTEGER(10),
        allowNull: false,
        comment: "充值用户的ID（与user表关联）",
        references: {
          model: "user",
          key: "id"
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
      },
      createTime: {type: BIGINT(20), allowNull: false, comment: "充值时间(时间戳)"},
      status: {type: STRING(15), allowNull: false, comment: "充值状态源自微信支付trade_state字段"},
      wxOrderNum: {type: STRING(100).BINARY, allowNull: true, comment: "订单号（wx的订单号）"},
      wxOrderType: {type: STRING(20).BINARY, allowNull: true, comment: "充值类型（wx的充值类型）"},
      orderNum: {type: STRING(100).BINARY, allowNull: false, comment: "订单号（商户（也就是后端）的订单号）"},
      errorMsg: {type: TEXT, allowNull: true, comment: "充值错误消息"},
      checked: {type: INTEGER(1), allowNull: false, defaultValue: 0, comment: "该订单是否已与微信支付核对(0-未核对, 1-已核对)"},
      checkErr: {type: INTEGER(1), allowNull: false, defaultValue: 0, comment: "该账单核对后如果出现错误就为1(0-核对成功, 1-核对失败)"},
      remark: {type: TEXT, allowNull: true, comment: "备注"},
    });
    // await queryInterface.addIndex("recharge", ["orderNum", "createTime", "userId"]);

    // 用户消费表
    await queryInterface.createTable("consume", {
      id: {type: BIGINT(13), allowNull: false, autoIncrement: true, primaryKey: true, comment: "自增ID"},
      goodsID: {
        type: INTEGER(6),
        allowNull: false,
        comment: "商品ID（关联商品表）",
        references: {
          model: 'commodity',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      consumeAmount: {type: BIGINT(7), allowNull: false, comment: "当次消费的金额，单位分"},
      balance: {type: BIGINT(7), allowNull: false, comment: "消费后的余额，单位分"},
      balanceAmount: {type: BIGINT(7), allowNull: true, comment: "余额支付的金额， 单位分，仅为组合支付时此字段才有值"},
      cashAmount: {type: BIGINT(7), allowNull: true, comment: "现金支付的金额， 单位分，仅为组合支付时此字段才有值"},
      paymentWay: {type: STRING(30).BINARY, allowNull: false, comment: "充值方式，balance-现金支付，combined-组合支付，cash-现金支付"},
      createTime: {type: BIGINT(20), allowNull: false, comment: "消费时间(时间戳)"},
      orderNo: {type: STRING(100).BINARY, allowNull: false, comment: "消费订单号"},
      userId: {
        type: INTEGER(10),
        allowNull: false,
        comment: "消费用户的ID（与user表关联）",
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      status: {type: INTEGER(1), allowNull: false, comment: "消费状态（1-成功，0-失败）"},
      remark: {type: STRING(255), allowNull: true, defaultValue: "", comment: "备注"},
    });
    // await queryInterface.addIndex("consume", ["orderNo", "createTime", "paymentWay", "goodsID", "userId"]);

    // 非会员消费表
    await queryInterface.createTable("nonMemberConsumption", {
      id: {type: BIGINT(13), allowNull: false, autoIncrement: true, primaryKey: true, comment: "自增ID"},
      goodsID: {
        type: INTEGER(6),
        allowNull: false,
        comment: "商品ID（关联商品表）",
        references: {
          model: 'commodity',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      consumeAmount: {type: BIGINT(7), allowNull: false, comment: "当次消费的金额，单位分"},
      createTime: {type: BIGINT(20), allowNull: false, comment: "消费时间(时间戳)"},
      orderNo: {type: STRING(100).BINARY, allowNull: false, comment: "消费订单号"},
      remark: {type: STRING(255), allowNull: true, defaultValue: "", comment: "备注"},
    });
    // await queryInterface.addIndex("nonMemberConsumption", ["createTime", "orderNo"]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
