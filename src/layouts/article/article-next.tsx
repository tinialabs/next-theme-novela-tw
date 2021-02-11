import type * as React from 'react'
import { styled, cx } from '@twstyled/core'

import Link from '@/theme/components/link'
import Image from '@/theme/components/image'
import { mediaqueries } from '@/theme/theme-tw'
import type { IArticle } from '@/theme/types'
import formatDate from 'date-fns/format'

interface ArticlesNextProps {
  articles: IArticle[]
}

/**
 * Sits at the bottom of our Article page. Shows the next 2 on desktop and the
 * next 1 on mobile!
 *
 *  [..............], [.........]
 *  [.....LONG.....], [..SHORT..]
 *  [..............], [.........]
 *
 * This does NOT use Articles.List because there's a special case of only have 1 article
 * as the next one suggested article, which requires special styling we didn't want to
 * mix into the generic list component.
 */
const ArticlesNext: React.FC<ArticlesNextProps> = ({ articles }) => {
  if (!articles) return null
  const numberOfArticles = articles.length
  return (
    <Grid className={cx(numberOfArticles === 1 && 'soloArticle')}>
      <GridItem article={articles[0]} />
      <GridItem article={articles[1]} narrow />
    </Grid>
  )
}

export default ArticlesNext

interface GridItemProps {
  article: IArticle
  narrow?: boolean
}

const GridItem: React.FC<GridItemProps> = ({ article, narrow }) => {
  if (!article) return null

  const hasOverflow = narrow && article.title.length > 35

  return (
    <ArticleLink
      className={cx(narrow && 'narrow')}
      to={article.slug}
      data-a11y="false"
    >
      <Item>
        <ImageContainer>
          <Image {...article.hero} sizeHint={narrow ? 'narrow' : 'regular'} />
        </ImageContainer>
        <Title dark hasOverflow={hasOverflow}>
          {article.title}
        </Title>
        <Excerpt className={cx(hasOverflow && 'hide')}>
          {article.excerpt}
        </Excerpt>
        <MetaData>
          {formatDate(new Date(article.date), 'MMMM do, yyyy')} ·{' '}
          {article.timeToRead} min read
        </MetaData>{' '}
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
const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 457px;
  grid-template-rows: 2;
  max-width: 100%;
  &.soloArticle {
    grid-template-columns: 1fr;
    grid-template-rows: 1;
    max-width: 680px;
  }
  column-gap: 30px;
  margin: 0 auto;

  ${mediaqueries.desktop} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaqueries.tablet} {
    grid-template-columns: 1fr;
  }
`

const ImageContainer = styled.div<{ narrow?: boolean }>`
  position: relative;
  height: 280px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: 30px;
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet} {
    height: 220px;
    margin-bottom: 35px;
  }

  ${mediaqueries.phablet} {
    height: 200px;
    margin-bottom: 0;
    box-shadow: none;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const Item = styled.div`
  position: relative;

  @media (max-width: 540px) {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background: var(--color-card);
  }
`

const Title = styled.h3<{ hasOverflow?: boolean; dark?: boolean }>`
  word-break: keep-all;
  font-weight: bold;

  font-size: 22px;
  line-height: 1.4;
  margin-bottom: ${(p) => (p.hasOverflow ? '45px' : '10px')};
  color: var(--color-primary);
  font-family: var(--font-serif);
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.tablet} {
    margin-bottom: 15px;
  }
  ${mediaqueries.phablet} {
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  }
`

const Excerpt = styled.p<{
  narrow?: boolean
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-grey);

  &.hide {
    display: none;
  }

  max-width: ${(p) => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop} {
    display: -webkit-box;
  }

  ${mediaqueries.tablet} {
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
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer} {
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
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 3px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
  }

  &.narrow {
    ${mediaqueries.tablet} {
      display: none;
    }
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
