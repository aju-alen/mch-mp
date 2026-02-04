'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGA, logPageView } from '../../src/utils/google-analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    if (pathname) logPageView(pathname)
  }, [pathname])

  return null
}
