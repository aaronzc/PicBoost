"use client"

import * as React from "react"
import { translations, type Lang, type Translations, getLang } from "@/lib/i18n"

interface LangContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const LangContext = React.createContext<LangContextValue>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
})

export function LangProvider({ children, initialLang = "en" }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = React.useState<Lang>(initialLang)

  const setLang = React.useCallback((newLang: Lang) => {
    setLangState(newLang)
  }, [])

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return React.useContext(LangContext)
}
