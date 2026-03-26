import { StaticPageLayout } from "@/components/features/static-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "隐私政策 | PicBoost",
  description: "PicBoost 隐私政策 - 我们如何收集、使用和保护您的数据。",
}

export default function PrivacyPageZh() {
  return (
    <StaticPageLayout title="隐私政策">
      <p className="text-sm text-muted-foreground mb-6">最后更新：2026 年 3 月 26 日</p>

      <h2 className="text-xl font-semibold text-foreground">1. 我们收集的信息</h2>
      <p>PicBoost 仅收集最少的数据来提供服务：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>上传的图片：</strong>临时存储用于处理，24 小时内自动删除。</li>
        <li><strong>使用数据：</strong>匿名客户端 ID 和每日使用次数，用于限流。</li>
        <li><strong>账户数据（仅注册用户）：</strong>通过 Clerk Auth 管理的邮箱地址和订阅状态。</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">2. 信息使用方式</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>处理和增强您上传的图片</li>
        <li>执行每日使用限制</li>
        <li>管理您的账户和订阅（如适用）</li>
        <li>提升服务质量</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">3. 数据存储与安全</h2>
      <p>所有数据存储在 Cloudflare 全球基础设施上。图片在边缘处理后自动删除。我们使用行业标准加密保护传输中和存储的数据。</p>

      <h2 className="text-xl font-semibold text-foreground">4. 第三方服务</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Cloudflare：</strong>托管、CDN、图片存储和 AI 处理</li>
        <li><strong>Clerk：</strong>身份验证（注册用户）</li>
        <li><strong>PayPal/Stripe：</strong>支付处理（付费套餐）</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">5. 您的权利</h2>
      <p>您有权：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>访问您的个人数据</li>
        <li>请求删除您的数据</li>
        <li>不使用服务即可避免数据收集</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">6. 联系我们</h2>
      <p>隐私相关咨询请发送至 privacy@picboost.com</p>
    </StaticPageLayout>
  )
}
