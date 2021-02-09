import { useEffect } from 'react'
import type * as React from 'react'
import { styled, cx } from 'twstyled'

import { useColorMode } from '@/theme/hooks/use-theme'
import NavigationHeader from '@/theme/components/navigation-header'
import NavigationFooter from '@/theme/components/navigation-footer'
import ArticlesContextProvider from '@/theme/layouts/articles/articles-list-context'
import { BlogSiteProps, SEOSiteProps } from '@/theme/types'
import { layoutStyles } from '@/theme/theme-tw'
import GoogleFonts from '../hooks/google-fonts'

const LayoutContainer = styled.div`
  position: relative;
  background: var(--color-background);
  transition: var(--transition-color-mode);
  min-height: 100vh;
`

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page.
 */
const Layout: React.FC<{
  siteProps: BlogSiteProps & SEOSiteProps
}> = ({ siteProps, children }) => {
  const [colorMode] = useColorMode()
  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap" />
      <LayoutContainer className={cx(layoutStyles)}>
        <NavigationHeader siteProps={siteProps} />
        {children}
        <NavigationFooter siteProps={siteProps} />
      </LayoutContainer>
    </ArticlesContextProvider>
  )
}

export default Layout
