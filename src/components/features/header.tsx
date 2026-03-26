"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/components/providers/lang-provider"

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()
  const { lang, t } = useLang()

  const prefix = lang === "zh" ? "/zh" : ""

  const NAV_LINKS = [
    { href: `${prefix}/enhance`, label: t.nav.enhance },
    { href: `${prefix}/upscale`, label: t.nav.upscale },
    { href: `${prefix}/unblur`, label: t.nav.unblur },
    { href: `${prefix}/pricing`, label: t.nav.pricing },
  ]

  const getLangSwitchUrl = (): string => {
    if (lang === "en") {
      if (pathname === "/") return "/zh"
      return `/zh${pathname}`
    } else {
      return pathname.replace(/^\/zh/, "") || "/"
    }
  }

  const handleLangSwitch = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = getLangSwitchUrl()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={prefix || "/"} className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">PicBoost</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={getLangSwitchUrl()} onClick={handleLangSwitch} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer">
            <Globe className="h-4 w-4" />
            {lang === "en" ? "中文" : "EN"}
          </a>
          <Link href={`${prefix}/enhance`}>
            <Button variant="ghost" size="sm">
              {t.nav.signIn}
            </Button>
          </Link>
          <Link href={`${prefix}/enhance`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              {t.nav.tryFree}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md hover:bg-muted"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <a
              href={getLangSwitchUrl()}
              onClick={handleLangSwitch}
              className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              {lang === "en" ? "切换到中文" : "Switch to English"}
            </a>
            <Link href={`${prefix}/enhance`} onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">
                {t.nav.signIn}
              </Button>
            </Link>
            <Link href={`${prefix}/enhance`} onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                {t.nav.tryFree}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
