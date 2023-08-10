'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

export const themeProvide = ({children}) => {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  )
}
