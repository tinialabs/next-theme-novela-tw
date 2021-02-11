import type * as React from 'react'
import { styled, cx } from '@twstyled/core'

import { mediaqueries } from '@/theme/theme-tw'
import Section from '@/theme/components/section'
import SocialLinks from '@/theme/components/social-links'
import { BlogSiteProps, SEOSiteProps } from '@/theme/types'

const NavigationFooter: React.FC<{
  siteProps: SEOSiteProps & BlogSiteProps
}> = ({ siteProps }) => {
  const { name, social } = siteProps

  return (
    <>
      <FooterGradient />
      <Section className={cx('narrow')}>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            Copyright © {siteProps.blog.copyrightYear} {name}
          </FooterText>
          <div>
            <SocialLinks links={social} />
          </div>
        </FooterContainer>
      </Section>
    </>
  )
}

export default NavigationFooter

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
  color: var(--color-grey);

  ${mediaqueries.tablet} {
    flex-direction: column;
    padding-bottom: 100px;
  }

  ${mediaqueries.phablet} {
    padding-bottom: 50px;
  }
`

const HoritzontalRule = styled.div`
  @tailwind mx-auto mb-12 mt-32 relative;
  border-bottom: 1px solid var(--color-horizontal-rule);

  ${mediaqueries.tablet} {
    margin: 60px auto;
  }

  ${mediaqueries.phablet} {
    display: none;
  }
`

const FooterText = styled.div`
  ${mediaqueries.tablet} {
    margin-bottom: 80px;
  }

  ${mediaqueries.phablet} {
    margin: 120px auto 100px;
  }
`

const FooterGradient = styled.div`
  @tailwind pointer-events-none absolute bottom-0 left-0 w-full z-0;
  height: 590px;
  background: var(--color-gradient);
  transition: var(--transition-color-mode);
`
