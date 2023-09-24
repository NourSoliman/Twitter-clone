
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from './Redux/MainStore/StoreProvider'
import { ToastProdiver } from '@/Providers/Toast-Provider'
import Sidebar from './Components/Sidebar/Sidebar'
import FollowBar from './Components/Sidebar/FollowBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (

    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
      <div className="h-screen bg-black">
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'> 
        <div className='grid grid-cols-4 h-full'>
          <Sidebar />
          
        <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
        <ToastProdiver />
        {children}
        </div>
        <FollowBar />
          </div>
        </div>
        </div>
        </ReduxProvider>
        </body>
    </html>
  )
}
