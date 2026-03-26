"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useLang } from "@/components/providers/lang-provider"

export function Footer() {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""

  const FOOTER_LINKS = {
    [t.footer.product]: [
      { href: `${prefix}/enhance`, label: t.footer.imageEnhancer },
      { href: `${prefix}/upscale`, label: t.footer.imageUpscaler },
      { href: `${prefix}/unblur`, label: t.footer.unblurPhoto },
      { href: `${prefix}/pricing`, label: t.nav.pricing },
    ],
    [t.footer.resources]: [
      { href: `${prefix}/blog`, label: t.footer.blog },
      { href: "/llms.txt", label: t.footer.api },
    ],
    [t.footer.legal]: [
      { href: `${prefix}/privacy`, label: t.footer.privacy },
      { href: `${prefix}/terms`, label: t.footer.terms },
    ],
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href={prefix || "/"} className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary p-1.5">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PicBoost</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">{t.footer.brandDesc}</p>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PicBoost. {t.footer.copyright}</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-3 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
