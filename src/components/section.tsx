import styled from '@emotion/styled'
import mediaqueries from '@/theme/styles/media'

const Section = styled.section<{ narrow?: boolean; relative?: boolean }>`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 2.5rem;

  ${mediaqueries.desktop`
    max-width: 850px;
  `};

  ${(p) =>
    p.narrow
      ? mediaqueries.tablet`
          padding: 0 1.25rem;
          max-width: 527px;
        `
      : mediaqueries.tablet`
          padding: 0 2.5rem;
          max-width: 567px;
        `}

  ${mediaqueries.phablet`
    max-width: 100%;
  `};
`

export default Section
