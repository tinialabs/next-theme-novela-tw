import type * as React from 'react'
import { styled } from '@linaria/react'
import { useRouter } from 'next/router'
import Section from '@/theme/components/section'
import SEO from '@/theme/components/seo'
import Layout from '@/theme/components/layout'
import Paginator from '@/theme/components/navigation-paginator'
import type { IPageContextAuthor, SiteProps } from '@/theme/types'

import AuthorHero from './author/author-hero'
import AuthorArticles from './author/author-articles'

const ArticlesPage: React.FC<{
  pageContext: IPageContextAuthor
  siteProps: SiteProps
}> = ({ pageContext, siteProps }) => {
  const author = pageContext.author
  const articles = pageContext.pageArticles
  const router = useRouter()

  return (
    <Layout siteProps={siteProps}>
      <SEO
        pathname={router.pathname}
        title={author.name}
        description={author.bio}
        siteProps={siteProps}
      />
      <Section className="narrow">
        <AuthorHero author={author} />
        <AuthorArticles articles={articles} />
        <AuthorPaginator>
          <Paginator {...pageContext} />
        </AuthorPaginator>
      </Section>
      <AuthorsGradient />
    </Layout>
  )
}

export default ArticlesPage

const AuthorsGradient = styled.div`
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

const AuthorPaginator = styled.div`
  text-align: center;
`
