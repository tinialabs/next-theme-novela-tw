import type * as React from 'react'
import { styled } from 'twstyled'
import Image from '@/theme/components/image'
import ImagePlaceholder from '@/theme/components/image-placeholder'
import { mediaqueries } from '@/theme/theme-tw'
import type { IArticleDetail } from '@/theme/types'
import formatDate from 'date-fns/format'
import ArticleAuthors from './article-authors'

interface ArticleHeroProps {
  article?: IArticleDetail
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article }) => {
  const hasCoAUthors = article.authors.length > 1
  const hasHeroImage =
    article.hero && article.hero.src && article.hero.src.length !== 0

  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleAuthors authors={article.authors} />
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {formatDate(new Date(article.date), 'MMMM do, yyyy')} ·{' '}
            {article.timeToRead} min read
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image {...article.hero} sizeHint="full" />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
    </Hero>
  )
}

export default ArticleHero

const Hero = styled.div`
  ${mediaqueries.phablet} {
    &::before {
      content: '';
      width: 100%;
      height: 20px;
      background: var(--color-primary);
      position: absolute;
      left: 0;
      top: 0;
      transition: var(--transition-color-mode);
    }

    &::after {
      content: '';
      width: 100%;
      height: 10px;
      background: var(--color-background);
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: var(--transition-color-mode);
    }
  }
`

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  margin-left: ${(p) => (p.hasCoAUthors ? '10px' : '0')};

  ${mediaqueries.phablet} {
    margin-left: 0;
  }
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 100px auto 120px;
  padding-left: 68px;
  max-width: 749px;

  ${mediaqueries.desktop} {
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  }

  ${mediaqueries.tablet} {
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  }

  ${mediaqueries.phablet} {
    margin: 170px auto 180px;
    padding: 0 40px;
  }

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`

const HeroHeading = styled.h1`
  word-break: keep-all;
  color: var(--color-primary);

  ${mediaqueries.desktop} {
    font-size: 38px;
    line-height: 1.2;
  }

  ${mediaqueries.phablet} {
    font-size: 32px;
    line-height: 1.3;
  }

  font-size: 48px;
  font-family: var(--font-serif);
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet} {
    margin-bottom: 20px;
    font-size: 36px;
  }

  ${mediaqueries.phablet} {
    font-size: 32px;
  }
`

const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-size: 18px;
  color: var(--color-grey);

  ${mediaqueries.phablet} {
    font-size: 14px;
    flex-direction: column;
    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  }

  &.hasCoAuthors {
    ${mediaqueries.phablet} {
      &::before {
        content: '';
        position: absolute;
        left: -20px;
        right: -20px;
        top: -10px;
        bottom: -10px;
        border: 1px solid var(--color-horizontal-rule);
        opacity: 0.5;
        border-radius: 5px;
      }
    }
  }
`

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet} {
    max-width: 100%;
  }

  ${mediaqueries.phablet} {
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
  }
`
