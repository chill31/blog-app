// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import Button from "../elements/Button";
import { BsMoon, BsSun } from "react-icons/bs";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className="flex flex-col items-start justify-center mt-4 gap-2">
      The current theme is: {theme}
      <Button onClick={() => setTheme('light')} className='mt-2'><BsSun /> Light</Button>
      <Button onClick={() => setTheme('dark')}><BsMoon /> Dark</Button>
    </div>
  )
};