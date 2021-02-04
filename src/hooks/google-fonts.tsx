import { FC, useRef, useState, useEffect } from 'react'
import Head from 'next/head'

export interface GoogleFontsProps {
  /**
   * URL to your Google Fonts StyleSheet.
   *
   * Be sure to end with `&display=swap` for best performance.
   */
  href: string
}

let hydrated = false

const GoogleFonts: FC<GoogleFontsProps> = ({ href }) => {
  const hydratedRef = useRef(false)
  const [, rerender] = useState(false)

  useEffect(() => {
    if (!hydratedRef.current) {
      hydrated = true
      hydratedRef.current = true
      rerender(true)
    }
  }, [])

  return (
    <Head>
      <link
        key="gf-preconnect"
        rel="preconnect"
        href="https://fonts.gstatic.com"
      />
      <link key="gf-preload" rel="preload" as="style" href={href} />
      <link
        key="gf-stylesheet"
        href={href}
        rel="stylesheet"
        media={!hydrated ? 'print' : 'all'}
      />
    </Head>
  )
}

export default GoogleFonts
