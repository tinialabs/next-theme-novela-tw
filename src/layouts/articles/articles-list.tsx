import { useContext, useEffect } from 'react'
import type * as React from 'react'
import { styled, cx } from 'twstyled'

import Link from '@/theme/components/link'
import Image from '@/theme/components/image'
import ImagePlaceholder from '@/theme/components/image-placeholder'
import { mediaqueries } from '@/theme/theme-tw'
import type { IArticle } from '@/theme/types'

import formatDate from 'date-fns/format'
import { GridLayoutContext } from './articles-list-context'

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[]
  alwaysShowAllDetails?: boolean
}

interface ArticlesListItemProps {
  article: IArticle
  narrow?: boolean
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails
}) => {
  if (!articles) return null

  const hasOnlyOneArticle = articles.length === 1
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext
  )

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }
    return result
  }, [])

  useEffect(() => getGridLayout(), [])

  return (
    <ArticlesListContainer
      className={cx(alwaysShowAllDetails && 'alwaysShowAllDetails')}
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
    >
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0
        const isOdd = index % 2 !== 1

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isEven}
          >
            <ListItem article={ap[0]} narrow={isEven} />
            <ListItem article={ap[1]} narrow={isOdd} />
          </List>
        )
      })}
    </ArticlesListContainer>
  )
}

export default ArticlesList

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null

  const { gridLayout } = useContext(GridLayoutContext)
  const hasOverflow = narrow && article.title.length > 35
  const hasHeroImage =
    article.hero && article.hero.src && article.hero.src.length !== 0

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? (
            <Image {...article.hero} sizeHint={narrow ? 'narrow' : 'regular'} />
          ) : (
            <ImagePlaceholder />
          )}
        </ImageContainer>
        <div>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            className={cx(hasOverflow && gridLayout && 'hide')}
            narrow={narrow}
          >
            {article.excerpt}
          </Excerpt>
          <MetaData>
            {formatDate(new Date(article.date), 'MMMM do, yyyy')} ·{' '}
            {article.timeToRead} min read
          </MetaData>
        </div>
      </Item>
    </ArticleLink>
  )
}

const limitToTwoLines = `
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet} {
    -webkit-line-clamp: 3;
  }
`

const ArticlesListContainer = styled.div`
  transition: opacity 0.25s;
  p.alwaysShowAllDetails {
    display: -webkit-box;
  }

  h2.alwaysShowAllDetails {
    margin-bottom: 10px;
  }
`

const ListTile = styled.div<{ reverse: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: ${(p) => (p.reverse ? '457px 1fr' : '1fr 457px')};
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaqueries.tablet} {
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

const ListItemRow = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop} {
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  }

  ${mediaqueries.tablet} {
    grid-template-columns: 1fr;
  }

  @media (max-width: 540px) {
    background: var(--color-card);
  }

  ${mediaqueries.phablet} {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`

const ListItemTile = styled.div`
  position: relative;

  ${mediaqueries.tablet} {
    margin-bottom: 60px;
  }

  @media (max-width: 540px) {
    background: var(--color-card);
  }

  ${mediaqueries.phablet} {
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`

// If only 1 article, dont create 2 rows.
const ListRow = styled.div<{ hasOnlyOneArticle: boolean }>`
  display: grid;
  grid-template-rows: ${(p) => (p.hasOnlyOneArticle ? '1fr' : '1fr 1fr')};
`

const List: React.FC<{
  reverse: boolean
  gridLayout: string
  hasOnlyOneArticle: boolean
}> = ({ reverse, gridLayout, hasOnlyOneArticle, children }) =>
  gridLayout === 'tiles' ? (
    <ListTile reverse={reverse}>{children}</ListTile>
  ) : (
    <ListRow hasOnlyOneArticle={hasOnlyOneArticle}>{children}</ListRow>
  )

const Item: React.FC<{ gridLayout: string }> = ({ gridLayout, children }) =>
  gridLayout === 'rows' ? (
    <ListItemRow>{children}</ListItemRow>
  ) : (
    <ListItemTile>{children}</ListItemTile>
  )

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${(p) => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${(p) => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet} {
    height: 200px;
    margin-bottom: 35px;
  }

  ${mediaqueries.phablet} {
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const Title = styled.h2<{
  dark?: boolean
  hasOverflow?: boolean
  gridLayout?: string
}>`
  font-weight: bold;
  color: var(--color-primary);
  word-break: keep-all;
  line-height: 1.333;

  font-size: 21px;
  font-family: var(--font-serif);
  margin-bottom: ${(p) =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px'};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop} {
    margin-bottom: 15px;
  }

  ${mediaqueries.tablet} {
    font-size: 24px;
  }

  ${mediaqueries.phablet} {
    font-size: 22px;
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  }
`

const Excerpt = styled.p<{
  narrow: boolean
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-grey);
  max-width: ${(p) => (p.narrow ? '415px' : '515px')};

  &.hide {
    display: none;
  }

  ${mediaqueries.desktop} {
    display: -webkit-box;
  }

  ${mediaqueries.phablet} {
    margin-bottom: 15px;
  }

  ${mediaqueries.phablet} {
    max-width: 100%;
    padding: 0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  }
`

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: var(--color-grey);
  opacity: 0.33;

  ${mediaqueries.phablet} {
    max-width: 100%;
    padding: 0 20px 30px;
  }
`

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: var(--color-accent);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet} {
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  }
`
