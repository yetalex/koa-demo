## 推荐的Koa + TypeScript最佳实践结构

.
├─ src/
│  ├─ app.ts                // 组装 Koa 应用（加载中间件/路由）
│  ├─ server.ts             // 启动入口（监听端口、信号处理）
│  ├─ routes/
│  │  ├─ index.ts           // 聚合所有路由
│  │  └─ health.route.ts    // 示例路由
│  ├─ controllers/
│  │  └─ user.controller.ts // 路由处理函数（业务入口）
│  ├─ services/
│  │  └─ user.service.ts    // 业务逻辑（可复用）
│  ├─ middlewares/
│  │  └─ error.middleware.ts// 全局错误处理等
│  ├─ libs/
│  │  └─ mqtt.ts            // MQTT 客户端与事件
│  ├─ utils/
│  │  └─ logger.ts          // 工具函数、日志
│  ├─ config/
│  │  └─ index.ts           // 读取 env、集中配置
│  └─ types/
│     └─ global.d.ts        // 类型定义（扩展 ctx 等）
├─ .env                     // 环境变量（端口、MQTT连接等）
├─ package.json
├─ tsconfig.json
└─ pnpm-lock.yaml

### 简短的分层说明

* src/app.ts   只负责把中间件、路由装到app上；不做listen.
* src/server.ts: 只负责app.listen、优雅退出、日志初始化.
* routes/ + controllers/ + services/: 路由定义 -> 控制器(校验/拼装入参) -> 服务(业务逻辑).后续有数据库时再加repositories/
* libs/mqtt.ts   封装MQTT的连接、订阅、发布、重连等，暴露可复用函数。
* middlewares/: 错误、请求日志、跨域、鉴权等
* config/ : 集中读取.env,导出强类型配置，避免到处读环境变量。
* types/ : 扩展Koa Context、业务类型

### 脚本与运行

* 继续使用tsx + ESM:
  * 开发：pnpm dev -> tsx watch src/server.ts
  * 生产：pnpm start -> tsx src/server.ts
* 注意ESM导入路径要写.js后缀(tsx运行时)

### 测试

* src/tests/  用于路由/API测试
* 单元测试就近放置，与被测文件同目录，命名xxx.test.ts或者放在同级__test__
* 端到端测试可以在根目录新建tests/

### 上传到github

1. github上创建项目
2. git remote add origin  ***.git
3. git fetch origin
   git rebase origin/main

前提是你已经使用ssh能连接上github