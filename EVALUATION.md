# PicBoost 项目评估 & Phase 1 任务拆分

## 一、整体工作量评估

### 总体估算
- **总工期**：7 周合理，但建议预留 1-2 周 buffer（共 8-9 周）
- **核心难点**：Workers AI 模型效果调优、异步队列稳定性、支付集成
- **人力**：1 名全栈开发可独立完成，但如果赶工可加 1 名前端

### 各阶段风险评估

| 阶段 | 难度 | 工作量 | 风险点 |
|------|------|--------|--------|
| Phase 1 | ⭐⭐⭐ | 2 周 | Workers AI 模型效果验证、R2 上传稳定性 |
| Phase 2 | ⭐⭐⭐ | 2 周 | Clerk Auth 集成、D1 额度同步、PayPal 回调 |
| Phase 3 | ⭐⭐⭐⭐ | 2 周 | Queues 消费者稳定性、批量并发控制 |
| Phase 4 | ⭐⭐ | 1 周 | Stripe webhook 处理、SEO 文件完善 |

### 技术栈可行性

| 组件 | 可行性 | 备注 |
|------|--------|------|
| Next.js 14 + Cloudflare Pages | ✅ 成熟 | 需用 `@cloudflare/next-on-pages` |
| Workers AI (Real-ESRGAN) | ⚠️ 需验证 | 模型效果需实测，可能需叠加其他模型 |
| Cloudflare Queues | ✅ 成熟 | 适合异步处理场景 |
| Cloudflare R2 | ✅ 成熟 | 出流量免费，成本可控 |
| Cloudflare D1 | ✅ 成熟 | 免费 5GB 够用 |
| Clerk Auth | ✅ 成熟 | 免费 10K 用户，Next.js 集成好 |
| PayPal + Stripe | ✅ 成熟 | PayPal 先行验证商业模式 |

---

## 二、Phase 1 详细任务拆分（2 周）

### Week 1：项目搭建 + 核心上传下载

| Day | 任务 | 产出 | 验收标准 |
|-----|------|------|----------|
| D1 | 项目初始化 & 环境搭建 | `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example` | `npm run dev` 正常启动 |
| D1 | shadcn/ui 基础组件 | `Button`, `Card` 等 5+ 基础组件 | 组件可正常渲染 |
| D2 | 布局组件 | `Header`, `Footer`, `RootLayout` | 导航链接正常，响应式适配 |
| D2 | 首页 (`/`) | Hero + Features + How It Works + CTA | 页面完整，SEO meta 正确 |
| D3 | 拖拽上传组件 | `ImageUploader` | 支持拖拽/点击，校验 10MB/JPG/PNG/WebP |
| D3 | 图片预览 | 上传后显示预览 | 支持替换，URL.revokeObjectURL 清理 |
| D4 | R2 存储集成 | `lib/r2.ts` | 上传/下载/签名 URL 正常 |
| D4 | API Routes | `/api/enhance`, `/api/jobs/[id]`, `/api/quota` | 接口可调通 |
| D5 | D1 数据库 | Schema + 迁移脚本 | 表结构正确，可本地测试 |

### Week 2：AI 推理 + 前后对比 + 限流

| Day | 任务 | 产出 | 验收标准 |
|-----|------|------|----------|
| D6 | Workers AI 集成 | 调用 Real-ESRGAN 模型 | 输入图片 → 输出增强图片 |
| D6 | AI 效果验证 | 测试不同类型图片 | 人像/风景/产品图效果达标 |
| D7 | 增强工作台 | `EnhanceWorkbench` 组件 | 上传 → 处理 → 预览完整流程 |
| D7 | 处理状态轮询 | `pollJobStatus` + 进度条 | 状态实时更新，超时处理 |
| D8 | 前后对比组件 | `ComparisonSlider` | 拖拽对比流畅，移动端适配 |
| D8 | 下载功能 | 一键下载增强图 | 文件名正确，格式保持 |
| D9 | 限流系统 | IP/cookie 限流 + D1 记录 | 每日 5 张限制生效，UTC 重置 |
| D9 | 额度显示 | 剩余次数展示 | 实时更新，低额度警告 |
| D10 | SEO 文件 | `robots.txt`, `sitemap.xml`, `llms.txt` | 文件内容正确 |
| D10 | 联调测试 | 完整流程测试 | 上传 → 增强 → 对比 → 下载 < 15s |

---

## 三、项目骨架代码（已完成）

### 目录结构
```
/root/works/picboost/
├── .devcontainer/          # VS Code 开发容器配置
├── .github/workflows/      # CI/CD 部署流水线
├── .vscode/                # VS Code 扩展推荐
├── public/
│   ├── robots.txt          # 搜索引擎爬虫配置
│   ├── sitemap.xml         # 站点地图
│   └── llms.txt            # AI 搜索引擎优化
├── src/
│   ├── app/
│   │   ├── api/health/     # 健康检查端点
│   │   ├── blog/
│   │   │   ├── page.tsx    # 博客列表页
│   │   │   └── [slug]/     # 博客详情页
│   │   ├── enhance/        # AI 增强页
│   │   ├── upscale/        # AI 放大页
│   │   ├── unblur/         # 去模糊页
│   │   ├── pricing/        # 定价页
│   │   ├── vs/[competitor] # 竞品对比页
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页
│   ├── components/
│   │   ├── ui/             # shadcn/ui 基础组件
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── features/       # 业务组件
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       ├── image-uploader.tsx
│   │       ├── comparison-slider.tsx
│   │       └── enhance-workbench.tsx
│   ├── lib/
│   │   ├── utils.ts        # 工具函数
│   │   └── api.ts          # API 客户端
│   └── styles/
│       └── globals.css     # 全局样式 + CSS 变量
├── workers/
│   └── api/
│       ├── src/index.ts    # Cloudflare Worker 主入口
│       ├── migrations/     # D1 数据库迁移
│       └── wrangler.toml   # Worker 配置
├── .env.example            # 环境变量模板
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### 已完成的骨架功能

#### ✅ 前端组件
- **Header**: 响应式导航，移动端汉堡菜单
- **Footer**: 多列布局，SEO 链接
- **ImageUploader**: 拖拽上传，文件校验，预览
- **ComparisonSlider**: 前后对比拖拽，触摸支持
- **EnhanceWorkbench**: 完整工作流（上传→处理→对比→下载）
- **Button / Card**: shadcn/ui 风格基础组件

#### ✅ 页面
- **首页** (`/`): Hero + Features + How It Works + Testimonials + CTA
- **增强页** (`/enhance`): 增强工作台
- **放大页** (`/upscale`): 默认放大模式
- **去模糊页** (`/unblur`): 默认去模糊模式
- **定价页** (`/pricing`): Free / Starter / Pro 三档对比
- **博客页** (`/blog`): 博客列表
- **博客详情** (`/blog/[slug]`): 文章页
- **竞品对比** (`/vs/[competitor]`): 功能对比表

#### ✅ 后端 API (Cloudflare Worker)
- `POST /api/enhance`: 上传并排队增强
- `GET /api/jobs/[id]`: 查询任务状态
- `GET /api/quota`: 查询剩余额度
- Queue Consumer: 异步处理增强任务

#### ✅ 数据库 Schema (D1)
- `jobs`: 任务表
- `usage_quota`: 额度表
- `users`: 用户表 (Phase 2)
- `subscriptions`: 订阅表 (Phase 2)

#### ✅ SEO/GEO
- `robots.txt`: 允许 AI 爬虫
- `sitemap.xml`: 所有页面索引
- `llms.txt`: 产品信息供 LLM 提取
- Open Graph / Twitter Card 元数据

---

## 四、下一步行动

### 立即可做
1. `cd /root/works/picboost && npm install`
2. 配置 `.env` 文件
3. `npm run dev` 启动本地开发
4. 创建 Cloudflare 账号，配置 R2、D1、Workers AI

### 待验证
1. **Workers AI Real-ESRGAN 效果**：用真实图片测试，确认质量是否达标
2. **处理速度**：测试 1080p 图片是否 < 15 秒
3. **并发能力**：20 并发是否稳定

### 可能的调整
1. 如果 Real-ESRGAN 效果不理想，需叠加 CodeFormer（人脸）或 SwinIR
2. 如果 Workers AI 延迟过高，考虑 Replicate 作为备选
3. 如果免费用户量暴增，需提前设置更严格的限流

---

*评估完成时间：2026-03-26*
