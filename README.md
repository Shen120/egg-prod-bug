# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## Init
1. 先创建数据库`satcd`，字符集为`utf8mb4`，排序规则`utf8mb4_unicode_ci`
2. `sequelize db:migrate`初始化数据表
3. `sequelize db:seed:all`初始化数据表默认值
4. `config set notify-keyspace-events Ex`开启redis事件订阅
5. 配置微信支付回调地址

#### 指定环境变量
`npx sequelize db:migrate --env stg`

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
