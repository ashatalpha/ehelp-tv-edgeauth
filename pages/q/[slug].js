import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header.js'
import { POPULAR_TODAY, CATEGORIES } from '../../lib/data'
import { toQuerySlug, fromQuerySlug } from '../../lib/slug'

// Build paths for all known queries
export async function getStaticPaths() {
  const paths = []

  // From categories
  CATEGORIES.forEach(cat => {
    cat.items.forEach(q => {
      paths.push({ params: { slug: toQuerySlug(q) } })
    })
  })

  // From "Popular Today" (in case of extras)
  POPULAR_TODAY.forEach(item => {
    paths.push({ params: { slug: toQuerySlug(item.query) } })
  })

  return { paths, fallback: false }
}

// Provide props for each page
export async function getStaticProps({ params }) {
  const slug = params.slug
  const queryText = fromQuerySlug(slug)

  // Find the category that contains this query
  let category = null
  CATEGORIES.forEach(cat => {
    if (cat.items.find(q => toQuerySlug(q) === slug)) {
      category = cat.name
    }
  })

  return {
    props: {
      slug,
      query: queryText,
      category: category || 'General',
    },
    revalidate: 3600,
  }
}

export default function QueryPage({ slug, query, category }) {
  return (
    <>
      <Head>
        <title>{query} — ehelp.tv</title>
        <meta name="description" content={`Learn ${query} step by step with videos and guides on ehelp.tv`} />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      {/* Shared header with logo only */}
      <Header title={query} subtitle={`Category: ${category}`} />

      <main className="wrap">
        <nav style={{ marginBottom: 12 }}>
          <Link href="/" className="viewall">← Home</Link>
          <span style={{ margin: '0 6px', color: '#cbd5e1' }}>·</span>
          <Link
            href={`/category/${category.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`}
            className="viewall"
          >
            {category}
          </Link>
        </nav>

        <section className="section">
          <h2>How to {query}</h2>
          <p style={{ marginBottom: 16 }}>
            This is a placeholder page. Later you’ll embed videos, AI-generated steps, and resource links here.
          </p>
          <div className="card">
            <p className="muted">👋 Try wiring this up to an API or video search next.</p>
          </div>
        </section>

        <section className="cta">
          <h2>Creators wanted</h2>
          <p>Upload tutorials for “{query}” and get paid when people learn from you. (Coming soon)</p>
          <a className="button" href="#">Join the waitlist</a>
        </section>
      </main>

      <footer className="wrap">
        <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
      </footer>
    </>
  )
}
