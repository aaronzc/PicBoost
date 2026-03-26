import { StaticPageLayout } from "@/components/features/static-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | PicBoost",
  description: "PicBoost terms of service - rules and guidelines for using our AI image enhancement platform.",
}

export default function TermsPage() {
  return (
    <StaticPageLayout title="Terms of Service">
      <p className="text-sm text-muted-foreground mb-6">Last updated: March 26, 2026</p>

      <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
      <p>By accessing and using PicBoost, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>

      <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
      <p>PicBoost is an AI-powered image enhancement platform that allows users to enhance, upscale, and improve the quality of images online.</p>

      <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>You must not upload illegal, offensive, or copyrighted content you do not own</li>
        <li>You are responsible for the content you upload and enhance</li>
        <li>You must not attempt to circumvent rate limits or security measures</li>
        <li>You must not use the service for automated or bulk processing beyond your plan limits</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
      <p>You retain all rights to your uploaded and enhanced images. PicBoost does not claim ownership of user content. Enhanced images are delivered without watermarks.</p>

      <h2 className="text-xl font-semibold text-foreground">5. Subscriptions & Payments</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Paid subscriptions are billed monthly or annually</li>
        <li>You may cancel your subscription at any time</li>
        <li>Refunds are available within 14 days of purchase</li>
        <li>Price changes will be communicated 30 days in advance</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
      <p>PicBoost is provided "as is" without warranties of any kind. We are not liable for any loss of data, business interruption, or damages arising from use of the service.</p>

      <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>

      <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
      <p>For questions about these terms, contact us at legal@picboost.com</p>
    </StaticPageLayout>
  )
}
