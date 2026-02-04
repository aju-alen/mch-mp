'use client'

import Header from '../../src/components/Header'
import Footer from '../../src/components/Footer'
import SocialLinks from '../../src/components/SocialLinks'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <SocialLinks />
      <Footer />
    </div>
  )
}
