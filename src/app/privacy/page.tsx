import { StaticPageLayout } from "@/components/features/static-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | PicBoost",
  description: "PicBoost privacy policy - how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <p className="text-sm text-muted-foreground mb-6">Last updated: March 26, 2026</p>

      <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
      <p>PicBoost collects minimal data to provide our service:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Uploaded images:</strong> Temporarily stored for processing. Deleted automatically within 24 hours.</li>
        <li><strong>Usage data:</strong> Anonymous client ID and daily usage count for rate limiting.</li>
        <li><strong>Account data (registered users only):</strong> Email address and subscription status via Clerk Auth.</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To process and enhance your uploaded images</li>
        <li>To enforce daily usage limits</li>
        <li>To manage your account and subscription (if applicable)</li>
        <li>To improve our service quality</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">3. Data Storage & Security</h2>
      <p>All data is stored on Cloudflare's global infrastructure. Images are processed at the edge and automatically deleted. We use industry-standard encryption for data in transit and at rest.</p>

      <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Cloudflare:</strong> Hosting, CDN, image storage, and AI processing</li>
        <li><strong>Clerk:</strong> Authentication (for registered users)</li>
        <li><strong>PayPal/Stripe:</strong> Payment processing (for paid plans)</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access your personal data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of data collection by not using the service</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">6. Contact</h2>
      <p>For privacy-related inquiries, contact us at privacy@picboost.com</p>
    </StaticPageLayout>
  )
}
