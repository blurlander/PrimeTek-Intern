'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

export const ThemeProvide = ({children}) => {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  )
}
