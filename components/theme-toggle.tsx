"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)

  // When mounted on client, get the theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Default to system
      setTheme("system")
    }
  }, [])

  // Update the theme when it changes
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  // Show nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("light")}
        className={theme === "light" ? "bg-primary text-primary-foreground" : ""}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "bg-primary text-primary-foreground" : ""}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme("system")}
        className={theme === "system" ? "bg-primary text-primary-foreground" : ""}
      >
        System
      </Button>
    </div>
  )
}
