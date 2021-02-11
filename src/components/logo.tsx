import { mediaqueries } from '@/theme/theme-tw'
import type { Icon } from '@/theme/types'
import LogoDesktop from '@/content/theme/logo.inline.svg'
import LogoMobile from '@/content/theme/logo.mobile.inline.svg'
import { styled } from '@twstyled/core'

const Logo: Icon = ({ fill = 'white' }) => {
  return (
    <LogoContainer>
      <LogoDesktop className="Logo__Desktop" fill={fill} />
      <LogoMobile className="Logo__Mobile" fill={fill} />
    </LogoContainer>
  )
}

export default Logo

const LogoContainer = styled.div`
  .Logo__Mobile {
    display: none;
  }

  ${mediaqueries.tablet} {
    .Logo__Desktop {
      display: none;
    }

    .Logo__Mobile {
      display: block;
    }
  }
`
