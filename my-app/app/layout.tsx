
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/app/Redux/MainStore/StoreProvider'
import { ToastProdiver } from '@/Providers/Toast-Provider'
import Sidebar from '@/app/Components/Sidebar/Sidebar'
import FollowBar from '@/app/Components/Sidebar/FollowBar'
import 'react-loading-skeleton/dist/skeleton.css'
import ThemeProviderNext from '@/Providers/ThemeProvider'
import SkeletonProvider from '@/Providers/SkeletonTheme'
import { Roboto } from 'next/font/google'
const RobotoFont = Roboto({
  subsets:["latin"],
  weight:"400",
  variable:"--font-roboto"
})
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

    <html lang="en" className={`${RobotoFont.variable}`}>
      <body className={`bg:#FFFFFF dark:bg:black`} >
        <ReduxProvider>
          <ThemeProviderNext>
            <SkeletonProvider>
              <div className='robotoText'>
                <div className='container pl-0 pr-0 lg:pl-2 lg:pr-2 h-full mx-auto xl:px-30 max-w-6xl'>
                  <div className='grid grid-cols-3 lg:grid-cols-4 h-full'>
                    <Sidebar />
                    <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-200 dark:border-neutral-800'>
                      <ToastProdiver />
                      {children}
                    </div>
                    <FollowBar />
                  </div>
                </div>
              </div>
              </SkeletonProvider>
          </ThemeProviderNext>
        </ReduxProvider>
      </body>
    </html>
  )
}
