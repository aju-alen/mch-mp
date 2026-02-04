import { LayoutClient } from '../components/LayoutClient'
import Contribute from '../../src/views/Contribute'

const CONTRIBUTE_SHARE_URL =
  process.env.NEXT_PUBLIC_CONTRIBUTE_SHARE_URL ||
  `${(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '')}/contribute`

export const metadata = {
  title: 'Make a Contribution | Michael H. Mugenya 2027',
  description:
    'Support Michael H. Mugenya 2027 by making a secure contribution via M-Pesa. Quick and easy mobile payment process.',
  alternates: { canonical: CONTRIBUTE_SHARE_URL },
  openGraph: {
    title: 'Make a Contribution',
    description:
      'Support Michael H. Mugenya 2027 by making a secure contribution via M-Pesa. Quick and easy mobile payment process.',
    url: CONTRIBUTE_SHARE_URL,
    siteName: 'Michael H. Mugenya 2027',
    images: [{ url: 'https://i.postimg.cc/cL5MWGTh/logo.png', alt: 'Make a Contribution' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Make a Contribution',
    description:
      'Support Michael H. Mugenya 2027 by making a secure contribution via M-Pesa. Quick and easy mobile payment process.',
    images: ['https://i.postimg.cc/cL5MWGTh/logo.png'],
  },
}

export default function Page() {
  return (
    <LayoutClient>
      <Contribute />
    </LayoutClient>
  )
}
