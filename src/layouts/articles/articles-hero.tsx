import { useContext } from 'react'
import type * as React from 'react'
import Section from '@/theme/components/section'
import Bio from '@/theme/components/bio'
import Icons from '@/theme/icons'
import { mediaqueries } from '@/theme/theme-tw'
import type { HeroSiteProps, IAuthor } from '@/theme/types'
import { css, styled } from '@twstyled/core'
import { GridLayoutContext } from './articles-list-context'

const ArticlesHero: React.FC<{
  featuredAuthor: IAuthor
  siteProps: HeroSiteProps
}> = ({ featuredAuthor, siteProps }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext
  )

  const { hero } = siteProps
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles'

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `)
  }

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
      </HeadingContainer>
      <SubheadingContainer>
        <Bio author={featuredAuthor} />
        <GridControlsContainer>
          <GridButton
            onClick={() => setGridLayout('tiles')}
            active={tilesIsActive}
            data-a11y="false"
            title="Show articles in Tile grid"
            aria-label="Show articles in Tile grid"
          >
            <Icons.Tiles />
          </GridButton>
          <GridButton
            onClick={() => setGridLayout('rows')}
            active={!tilesIsActive}
            data-a11y="false"
            title="Show articles in Row grid"
            aria-label="Show articles in Row grid"
          >
            <Icons.Rows />
          </GridButton>
        </GridControlsContainer>
      </SubheadingContainer>
    </Section>
  )
}

export default ArticlesHero

declare const div: any

const SubheadingContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 100px;

      ${mediaqueries.desktop} {
        margin-bottom: 80px;
      }

      ${mediaqueries.tablet} {
        margin-bottom: 60px;
      }

      ${mediaqueries.phablet} {
        display: none;
      }
    `

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet} {
    display: none;
  }
`

const HeadingContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop} {
    width: 80%;
  }

  ${mediaqueries.tablet} {
    width: 100%;
  }
`

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: var(--color-primary);

  a {
    color: var(--color-accent);
  }

  ${mediaqueries.desktop} {
    font-size: 38px;
  }

  ${mediaqueries.phablet} {
    font-size: 32px;
  }
`

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: var(--color-hover);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${(p) => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: var(--color-primary);
    }
  }
`
