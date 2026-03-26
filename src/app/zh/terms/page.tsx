import { StaticPageLayout } from "@/components/features/static-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "服务条款 | PicBoost",
  description: "PicBoost 服务条款 - 使用我们 AI 图片增强平台的规则和指南。",
}

export default function TermsPageZh() {
  return (
    <StaticPageLayout title="服务条款">
      <p className="text-sm text-muted-foreground mb-6">最后更新：2026 年 3 月 26 日</p>

      <h2 className="text-xl font-semibold text-foreground">1. 接受条款</h2>
      <p>访问和使用 PicBoost 即表示您同意受本服务条款的约束。如不同意，请勿使用我们的服务。</p>

      <h2 className="text-xl font-semibold text-foreground">2. 服务描述</h2>
      <p>PicBoost 是一个 AI 驱动的图片增强平台，允许用户在线增强、放大和提升图片质量。</p>

      <h2 className="text-xl font-semibold text-foreground">3. 用户责任</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>不得上传非法、冒犯性或您不拥有的版权内容</li>
        <li>您对上传和增强的内容负责</li>
        <li>不得尝试绕过限流或安全措施</li>
        <li>不得超出套餐限制进行自动化或批量处理</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">4. 知识产权</h2>
      <p>您保留上传和增强图片的所有权利。PicBoost 不主张用户内容的所有权。增强后的图片无水印。</p>

      <h2 className="text-xl font-semibold text-foreground">5. 订阅与付款</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>付费订阅按月或按年计费</li>
        <li>您可以随时取消订阅</li>
        <li>购买后 14 天内可退款</li>
        <li>价格变更将提前 30 天通知</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">6. 责任限制</h2>
      <p>PicBoost 按"原样"提供，不作任何保证。我们不对任何数据丢失、业务中断或因使用服务而产生的损害承担责任。</p>

      <h2 className="text-xl font-semibold text-foreground">7. 条款变更</h2>
      <p>我们保留随时修改这些条款的权利。继续使用服务即表示接受更新后的条款。</p>

      <h2 className="text-xl font-semibold text-foreground">8. 联系我们</h2>
      <p>条款相关问题请发送至 legal@picboost.com</p>
    </StaticPageLayout>
  )
}
