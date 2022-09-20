module.exports = options => {
  return async function jwt(ctx, next) {
    try {
      // 拿到传会数据的header 中的token值
      const token = ctx.request.header.authorization;
      const exclude = [
        "/api/init/all",
        "/api/adminUser/sign",
        "/api/wxApi/user/login",
        "/api/wxApi/geetest/init",
        "/api/wxApi/geetest/validate",
        "/api/wxApi/wxPayCallback",
        "/api/common/checkHasAdmin"
      ]
      if (exclude.indexOf(ctx.path) > -1) {
        await next();
        return
      }
      if (!token) {
        ctx.body = {
          success: false,
          errorMessage: "未登录， 请先登录"
        };
        ctx.status = 401;
      } else {
        // 解码token
        const decode = await ctx.app.jwt.verify(token, options.secret, async (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') { // token过期
              return 'TokenExpiredError';
            } else if (err.name === 'JsonWebTokenError') { // 无效的token
              return 'JsonWebTokenError';
            }
          } else if (ctx.path.indexOf("/api/wxApi") === -1) {
            // 验证管理后台的token
            const redisUser = await ctx.app.redis.get("def").get(decoded.key);
            if (!redisUser) {
              return "noUserInfo"
            }
            const currentUser = JSON.parse(redisUser);
            ctx.state.user = currentUser;
            ctx.state.userID = currentUser.id;
            return decoded;
          } else {
            // 验证微信用户的token
            console.log("微信token检测：",decoded)
            if (!decoded.id) {
              return "noUserInfo"
            }
            ctx.state.wxUser = decoded;
            return decoded;
          }
        });
        if (decode === 'TokenExpiredError') {
          ctx.body = {
            success: false,
            errorMessage: '登录过期，请重新登录',
          };
          ctx.status = 401;
          return;
        }
        if (decode === 'JsonWebTokenError' || decode === "noUserInfo") {
          ctx.body = {
            success: false,
            errorMessage: 'token无效，请重新登录',
          };
          ctx.status = 401;
          return;
        }
        await next();
      }
    } catch (e) {
      ctx.body = {
        success: false,
        errorMessage: "服务器错误"
      };
      ctx.status = 500;
    }
  }
}
