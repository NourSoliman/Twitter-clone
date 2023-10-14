"use client"
import {ThemeProvider} from 'next-themes'
import { ReactNode } from 'react'
interface childrenProp {
    children:ReactNode,
}
const ThemeProviderNext : React.FC<childrenProp> = ({children}) => {
  return (
    <ThemeProvider attribute='class'>{children}</ThemeProvider>
  )
}

export default ThemeProviderNext