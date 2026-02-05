import { LayoutClient } from '../components/LayoutClient'
import Contribute from '../../src/views/Contribute'

const CONTRIBUTE_SHARE_URL =
  process.env.NEXT_PUBLIC_CONTRIBUTE_SHARE_URL ||
  `${(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '')}/contribute`

export const metadata = {
  title: 'Make a Contribution | Michael H. Mugenya 2027',
  description:
    'Support the Funyula future vision by contributing to the campaign of Michael Mugenya, MP 2027.',
  alternates: { canonical: CONTRIBUTE_SHARE_URL },
  openGraph: {
    title: 'Make a Contribution',
    description:
      'Support the Funyula future vision by contributing to the campaign of Michael Mugenya, MP 2027.',
    url: CONTRIBUTE_SHARE_URL,
    siteName: 'Michael H. Mugenya 2027',
    images: [{ url: 'https://i.postimg.cc/cL5MWGTh/logo.png', alt: 'Make a Contribution' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Make a Contribution',
    description:
      'Support the Funyula future vision by contributing to the campaign of Michael Mugenya, MP 2027.',
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
