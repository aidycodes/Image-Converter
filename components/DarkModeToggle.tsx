"use client"
 import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
 
  return (
   <div className="bg-transparent absolute top-0 right-0 hover:bg-transparent  h-12 w-12 cursor-pointer m-4 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center rounded-md"
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <Sun size={32}/> : <Moon size={32} className="text-white"/>}
    </div>
  )
}