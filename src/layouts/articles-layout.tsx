import type * as React from 'react'
import { styled } from '@linaria/react'
import { cx } from '@linaria/core'
import Section from '@/theme/components/section'
import SEO from '@/theme/components/seo'
import Layout from '@/theme/components/layout'
import Paginator from '@/theme/components/navigation-paginator'
import type { IPageContextArticles, SiteProps } from '@/theme/types'
import { useRouter } from 'next/router'
import ArticlesHero from './articles/articles-hero'
import ArticlesList from './articles/articles-list'

const ArticlesPage: React.FC<{
  pageContext: IPageContextArticles
  siteProps: SiteProps
}> = ({ pageContext, siteProps }) => {
  const articles = pageContext.pageArticles
  const featuredAuthor = pageContext.featuredAuthor
  const router = useRouter()

  return (
    <Layout siteProps={siteProps}>
      <SEO pathname={router.pathname} siteProps={siteProps} />
      <ArticlesHero featuredAuthor={featuredAuthor} siteProps={siteProps} />
      <Section className={cx('narrow')}>
        <ArticlesList articles={articles} />
        <ArticlesPaginator className={cx(pageContext.pageCount > 1 && 'show')}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
      <ArticlesGradient />
    </Layout>
  )
}

export default ArticlesPage

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: var(--color-gradient);
  transition: var(--transition-color-mode);
`

const ArticlesPaginator = styled.div`
  &.show {
    margin-top: 95px;
  }
`
