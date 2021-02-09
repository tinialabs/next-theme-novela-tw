import { styled } from 'twstyled'
import { mediaqueries } from '@/theme/theme-tw'

const Section = styled.section<{ relative?: boolean }>`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 2.5rem;

  ${mediaqueries.desktop} {
    max-width: 850px;
  }

  ${mediaqueries.tablet} {
    padding: 0 2.5rem;
    max-width: 567px;

    &.narrow {
      padding: 0 1.25rem;
      max-width: 527px;
    }
  }

  ${mediaqueries.phablet} {
    max-width: 100%;
  }
`

export default Section
