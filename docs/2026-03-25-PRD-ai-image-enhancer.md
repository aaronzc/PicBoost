# PRD：AI Image Enhancer（AI 图片增强工具）

> **产品代号**：PicBoost（待定）
> **状态**：待老爸确认 → 确认后发送鹿班开发
> **目标关键词**：ai image enhancer / ai photo enhancer / free image enhancer
> **创建时间**：2026-03-25
> **预计开发周期**：6-8 周（MVP）

---

## 一、产品概述

### 1.1 一句话定位
**免费、无水印、无需注册的 AI 图片增强在线工具** — 上传即用，一键提升图片清晰度、放大分辨率、修复模糊照片。

### 1.2 机会验证

| 维度 | 数据 |
|------|------|
| 关键词 | ai image enhancer / ai photo enhancer / free image enhancer |
| 月搜索量估算 | 100K+（ai image enhancer 主词） |
| 增长趋势 | Exploding Topics 标记 **Exploding**，5年增长 **7500%** |
| KD（竞争难度） | **45-55**（中等偏低，小站能排 SERP 前3） |
| Google 补全信号 | "free"、"no sign up"、"no watermark"、"4k"、"online" 高频 |
| 竞品数量/质量 | 玩家多但差异化不足，免费工具都有水印/注册墙 |

**SERP 前10验证**：6/10 是小站（DA<50），airbrush.com（DA~40）排第一，aienhancer.ai（DA~20）排第三 — **说明内容质量和SEO做好就能上去**。

### 1.3 目标用户

| 用户类型 | 场景 | 痛点 | 付费意愿 |
|---------|------|------|---------|
| **普通用户** | 修老照片、社交媒体发图、证件照 | 现有工具要注册、加水印、免费次数太少 | 低（免费用户，帮做流量和口碑） |
| **独立站卖家** | Shopify/Etsy 商品图批量优化 | 图片不够清晰、需要放大到 4K，每天上新几十张 | 高（$9.9/月是成本零头） |
| **内容创作者** | 博客/YouTube 缩略图、Instagram 帖子 | 配图质量直接影响点击率，需要快速批量处理 | 中（有收入但不多，$9.9-19.9 可接受） |
| **小型设计工作室** | 收到客户低清素材需要放大使用 | 客户给的素材太糊，需要快速放大交付 | 高（$19.9/月，接一个单就回本） |
| **房产/电商代运营** | 批量处理房源图、商品图 | 每天处理几十上百张图 | 高（批量处理是刚需） |

---

## 二、核心功能（MVP）

### 2.1 P0 — 必须有（MVP 首版）

| # | 功能 | 说明 | 技术方案 |
|---|------|------|---------|
| 1 | **AI 画质增强** | 自动锐化、降噪、色彩校正 | Cloudflare Workers AI（Real-ESRGAN） |
| 2 | **AI 超分辨率放大** | 支持 2x/4x 放大，最高输出 4K | Cloudflare Workers AI 推理 |
| 3 | **去模糊** | 修复轻微模糊的照片 | Workers AI 内置 |
| 4 | **前后对比预览** | 处理后同屏对比原图和增强图 | Canvas 拖拽对比组件 |
| 5 | **无注册即用** | 每日 5 张免费，无水印 | Cloudflare Workers 限流（IP/cookie）+ D1 |
| 6 | **拖拽上传** | 支持拖拽/点击上传，最大 10MB | 前端 File API → Cloudflare R2 |
| 7 | **异步处理队列** | AI 推理排队，避免超时 | Cloudflare Queues |

### 2.2 P1 — 应该有（V1.1）

| # | 功能 | 说明 |
|---|------|------|
| 1 | **背景去除** | 一键去背，生成透明 PNG |
| 2 | **批量处理** | 最多 10 张同时处理 |
| 3 | **用户注册** | 注册后每日额度提升到 15 张，保存历史 |
| 4 | **多种增强模式** | 通用/人像/动漫/夜景 分别优化 |
| 5 | **自定义放大倍数** | 选择 1.5x / 2x / 4x / 8x |

### 2.3 P2 — 可以有（后续迭代）

| # | 功能 | 说明 |
|---|------|------|
| 1 | **老照片修复** | 修复划痕、褪色、破损 |
| 2 | **AI 上色** | 黑白照片自动上色 |
| 3 | **API 接口** | 供开发者调用 |
| 4 | **浏览器插件** | Chrome 扩展，右键增强图片 |
| 5 | **视频增强** | 逐帧增强视频 |

---

## 三、技术方案

### 3.1 技术栈

| 层 | 技术选型 | 说明 |
|---|---------|------|
| **前端/SSR** | Next.js 14 + Tailwind CSS + shadcn/ui | 部署在 Cloudflare Pages |
| **API** | Cloudflare Workers | Edge 计算，全球低延迟 |
| **异步队列** | Cloudflare Queues | AI 推理排队，异步处理 |
| **AI 增强** | Real-ESRGAN via Workers AI → Replicate（备选） | 同一生态，延迟低 |
| **背景去除** | RMBG-2.0 via Workers AI → Replicate（备选） | 开源 SOTA |
| **存储** | Cloudflare R2 | 图片存储，出流量免费 |
| **CDN** | Cloudflare CDN + Images | 全球加速 + 图片优化 |
| **数据库** | Cloudflare D1（SQLite） | 免费 5GB，同一生态 |
| **认证** | Clerk Auth（免费 10K 用户） | 邮箱/Google 登录 |
| **支付** | PayPal（先行）+ Stripe（并行） | PayPal 快速上线验证，Stripe 后续接入 |

### 3.2 成本估算

| 项目 | 起步阶段（月） | 规模化（月） |
|------|-------------|------------|
| Workers AI 推理 | ~$20（免费额度内起步） | ~$100 |
| Cloudflare R2 | $0（免费额度内） | ~$15 |
| Cloudflare D1 | $0（免费 5GB） | $0-5 |
| Cloudflare Queues | $0（免费额度内） | ~$5 |
| Cloudflare Pages | $0（免费额度内） | ~$20 |
| Clerk Auth | $0（免费 10K 用户） | ~$25 |
| 域名 | ~$10 | ~$10 |
| **总计** | **~$10-30/月** | **~$180/月** |

**单张处理成本**：Workers AI 约 $0.01/张，自部署 RunPod 可降到 $0.001/张以下。

### 3.3 架构

```
用户浏览器 → Cloudflare Pages (Next.js SSR)
                ├── 文件上传 → Cloudflare R2
                ├── AI 推理 → Cloudflare Queues → Workers AI（异步）
                ├── 限流检查 → Cloudflare D1
                ├── 用户认证 → Clerk Auth
                ├── 支付 → PayPal / Stripe
                └── 结果返回 → Cloudflare CDN + Images → 用户下载
```

---

## 四、Freemium 设计

> 参考：knowledge/freemium-conversion-strategy.md（Growth Unhinged 2026 数据）

### 4.1 核心策略：**无注册 + 无水印**

这是最大差异化点。竞品分析结论：
- **所有竞品的免费版都有水印**（Let's Enhance、Upscale.media、Cutout.pro 全部如此）
- **大多数竞品要求注册**才能使用
- Google 补全 "free image enhancer no watermark" 和 "no sign up" 高频出现 → 用户明确在找这个

**基于知识库数据：**
- 无门槛体验（注册前就能用）可提升使用量 **3 倍**
- AI 原生产品 Freemium 转化 GOOD 6-8%，GREAT 15-20%
- 1000 访客 → 70 注册 → 5.6 付费（无门槛 Freemium 基准）

### 4.2 定价层级

| 层级 | **免费版** | **Starter** | **Pro** |
|------|----------|-------------|---------|
| **价格** | $0 | $9.9/月 | $19.9/月 |
| **每日处理** | 5 张（无注册） | 50 张/日 | 无限 |
| **注册用户** | 10 张/日（注册后） | — | — |
| **最大输出分辨率** | 2x 放大（约 2K） | 4x 放大（4K） | 8x 放大（8K） |
| **水印** | **❌ 无水印** | ❌ 无水印 | ❌ 无水印 |
| **批量处理** | ❌ | ✅ 最多 10 张 | ✅ 无限制 |
| **增强模式** | 通用模式 | 全部模式 | 全部模式 |
| **背景去除** | ❌ | ✅ | ✅ |
| **处理速度** | 排队 | 优先 | 最快 |
| **保存历史** | ❌ | ✅ | ✅ |
| **API** | ❌ | ❌ | ✅ |

### 4.3 转化钩子

| 钩子 | 机制 | 预期效果 |
|------|------|---------|
| **分辨率限制** | 免费 2x → 付费 4x/8x | 试过 4K 效果后不想回 2K |
| **注册引导** | "注册解锁每日 10 张" | 从 5→10 张，价值明显 |
| **批量处理** | 免费只能单张 | 批量是刚需，驱动 Starter |
| **速度差异** | 免费排队 vs 付费优先 | 体验落差 |
| **年付折扣** | 年付含 16% 折扣（月付提 $5，年付不变） | 参考知识库，提升 LTV |

### 4.4 首页双 CTA 策略

参考知识库数据：**首页双 CTA（免费试 + 付费试）可提升转化 26%**

- **主 CTA**: "免费增强图片 →" （无注册直接用）
- **副 CTA**: "或开始 7 天 Pro 免费试用" （需注册）

---

## 五、页面结构

### 5.1 核心页面

| 页面 | 路由 | 功能 | SEO 价值 |
|------|------|------|---------|
| **首页** | `/` | 产品介绍 + 上传入口 + 双 CTA | 主关键词排名 |
| **工具页** | `/enhance` | 核心增强功能 | "ai image enhancer online" |
| **放大页** | `/upscale` | 超分辨率放大 | "ai image upscaler" |
| **去模糊页** | `/unblur` | 修复模糊照片 | "unblur photo ai" |
| **去背页** | `/remove-background` | 背景去除 | "remove background ai free" |
| **定价页** | `/pricing` | 套餐对比 | "ai image enhancer pricing" |
| **博客** | `/blog` | SEO 内容矩阵 | 长尾词覆盖 |
| **对比页** | `/vs/[competitor]` | PicBoost vs 竞品 | 截流竞品搜索 |

### 5.2 交互流程

```
首页 → 拖拽上传 → 选择增强模式 → 点击"增强" →
等待 3-10 秒 → 前后对比预览 → 下载（免费/付费高清）
```

**目标：上传到出结果 < 15 秒，零注册摩擦。**

---

## 六、SEO / GEO 要求

### 6.1 技术文件
需包含：robots.txt、sitemap.xml、llms.txt 等标准 SEO/GEO 文件。

### 6.2 目标关键词

| 关键词 | 月搜索量 | KD | 类型 | 对应页面 |
|--------|---------|-----|------|---------|
| ai image enhancer | 100K+ | 45-55 | 商业型 | 首页 `/` |
| ai image upscaler | 150K+ | 50-60 | 商业型 | `/upscale` |
| free image enhancer no watermark | 10K+ | 25-35 | 商业型 | 首页 `/` |
| ai photo enhancer free | 50K+ | 40-50 | 商业型 | 首页 `/` |
| unblur photo online free | 30K+ | 30-40 | 商业型 | `/unblur` |
| remove background ai free | 80K+ | 45-55 | 商业型 | `/remove-background` |
| ai image enhancer reddit | 5K+ | 20-30 | 信息型 | 博客 |
| best ai image enhancer 2026 | 8K+ | 35-45 | 商业型 | 博客/对比页 |

### 6.3 内容策略

**博客矩阵**（每周 2 篇）：
- "如何提升产品图质量（不用 PS）"
- "2026 年最佳免费 AI 图片增强工具对比"
- "PicBoost vs Let's Enhance：哪个更好？"
- "AI 老照片修复完整指南"
- "电商产品图尺寸要求大全（Amazon/Shopify/淘宝）"
- "什么是 AI 超分辨率？一文搞懂"

**模板库**（SEO 流量入口，40x 影响力）：
- 各平台图片尺寸规范速查表
- 免费下载，带品牌曝光

### 6.4 GEO（AI 搜索优化）

- **llms.txt**：包含产品功能、定价、使用步骤，便于 LLM 提取推荐
- **结构化数据**：Product schema、FAQ schema、HowTo schema
- **G2/Product Hunt 上线**：LLM 高频引用来源
- **Reddit 布局**：在 r/photography、r/web_design、r/entrepreneur 分享真实使用体验

---

## 七、验收标准

### 7.1 功能验收
- [ ] 上传图片后 **15 秒内**完成增强（标准尺寸，1080p 输入）
- [ ] 支持 JPG/PNG/WebP 输入
- [ ] 输出 PNG/JPG（用户可选）
- [ ] 前后对比预览正常工作
- [ ] 免费用户每日 5 张限制生效，**无水印**
- [ ] 注册后每日 10 张限制生效
- [ ] 文件大小限制 10MB，超限提示清晰

### 7.2 性能验收
- [ ] 首页 LCP < 2.5 秒
- [ ] 图片上传支持断点续传（大文件）
- [ ] 并发处理 20 个请求不崩溃
- [ ] 处理队列机制正常（免费用户排队提示）

### 7.3 SEO 验收
- [ ] 所有页面 title/description 含目标关键词
- [ ] sitemap.xml 覆盖所有页面
- [ ] robots.txt 配置正确
- [ ] llms.txt 包含产品信息
- [ ] 移动端适配（Core Web Vitals 达标）
- [ ] Open Graph / Twitter Card 元标签完整

### 7.4 商业验收
- [ ] 免费用户可**无注册**使用（核心差异化）
- [ ] 注册流程 < 2 步（邮箱/Google）
- [ ] Stripe 支付成功 → 用户额度即时更新
- [ ] 每日额度在 UTC 00:00 重置

---

## 八、开发排期

| 阶段 | 内容 | 时间 |
|------|------|------|
| **Phase 1** | 核心增强引擎（Workers AI）+ R2 上传/下载 + 前后对比 + 无注册使用 | 2 周 |
| **Phase 2** | 用户注册（Clerk Auth）+ D1 额度系统 + PayPal 支付 + 定价页 | 2 周 |
| **Phase 3** | Queues 异步处理 + 批量处理 + 多模式 + 背景去除 + 博客系统 | 2 周 |
| **Phase 4** | Stripe 支付 + 对比页 + SEO/GEO 文件 + Product Hunt 上线 | 1 周 |
| **总计** | **MVP 到上线** | **7 周** |

---

## 九、风险与应对

| 风险 | 级别 | 应对 |
|------|------|------|
| GPU 成本超预期 | 高 | 起步用 Replicate 按量付费，验证 PMF 后自部署 RunPod |
| 主关键词排不上 | 高 | 聚焦长尾词 + 博客内容 + Reddit/G2 外链 |
| 免费用户太多烧不起 | 中 | 5 张/日限制 + 队列 + CDN 缓存处理结果 |
| 竞品跟进无水印策略 | 低 | 先发优势 + 持续迭代（批量、多模式、API） |
| Real-ESRGAN 效果不理想 | 中 | 叠加 CodeFormer（人脸）+ SwinIR 作为 fallback |

---

## 十、参考资料

- **竞品定价分析**：Let's Enhance ($9-34/月)、Upscale.media ($0.01-0.17/信用)、Pixelbin ($550K/年，5人团队)
- **Freemium 策略**：knowledge/freemium-conversion-strategy.md
- **关键词词根库**：memory/keyword-roots.md
- **趋势数据**：Exploding Topics "AI Image Enhancer" 7500% 5年增长，标记 Exploding
- **技术参考**：github.com/xinntao/Real-ESRGAN（25K+ stars）
- **session 分析日志**：sessions/736b559b-408f-44ba-9360-4ffe50ee63d8

---

*文档状态：**待老爸确认***
*确认后通过 sessions_send 发送鹿班开发*
