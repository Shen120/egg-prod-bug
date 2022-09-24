module.exports = () => {

  const whiteList = [
    '192.168.31.245:8000',
  ];

  return async function auth(ctx, next) {
    // 非白名单域名不允许访问
    const origin = ctx.get("origin");
    const referer = ctx.get("referer");

    const idx = whiteList.findIndex(host => {
      const reg = new RegExp(`^http(s)?://${host}(\\/)?$`);
      return (reg.test(origin) || reg.test(referer))
    });

    if (idx === -1) {
      ctx.status = 500;
      ctx.body = {
        errorMessage: "Illegal request"
      };
      return
    }

    await next()

  }
}
