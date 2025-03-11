import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"
export type Language = "en" | "fr" | "es"
export type Currency = "USD" | "EUR" | "GBP"

interface PreferencesStore {
  theme: Theme
  language: Language
  currency: Currency
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  setCurrency: (currency: Currency) => void
}

export const usePreferences = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en",
      currency: "USD",
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "user-preferences",
    }
  )
) 