import Link from 'next/link'
import { CATEGORIES } from '../../lib/data'
import { toSlug } from '../../lib/slug'

export async function getStaticPaths() {
  const paths = CATEGORIES.map(c => ({ params: { slug: toSlug(c.name) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const match = CATEGORIES.find(c => toSlug(c.name) === params.slug)
  return {
    props: {
      categoryName: match?.name || '',
      items: match?.items || [],
    },
    revalidate: 3600,
  }
}

export default function CategoryPage({ categoryName, items }) {
  return (
    <>
      <Head>
        <title>{categoryName} — ehelp.tv</title>
        <meta
          name="description"
          content={`Learn ${categoryName} on ehelp.tv: popular how-to guides and tutorials.`}
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <Header
  title={categoryName}
  subtitle="These are starter items from your dataset. Plug your AI search later to show videos + steps."
/>
        <div className="brand">
  <a href="/" aria-label="eHelp.tv home">
    <img className="logo" src="/logo.png" alt="eHelp.tv" />
  </a>
</div>

        {/* Title block sits OUTSIDE the brand so tags stay balanced */}
        <div style={{ marginTop: 12 }}>
          <h1>{categoryName}</h1>
          <p className="note">
            These are starter items from your dataset. Plug your AI search later to show videos + steps.
          </p>
        </div>
      </header>

      <main className="wrap">
        <nav style={{ marginBottom: 12 }}>
          <Link href="/" className="viewall">← Back to Home</Link>
          <span style={{ margin: '0 6px', color: '#cbd5e1' }}>·</span>
          <Link href="/category" className="viewall">Browse all categories</Link>
        </nav>

        <section className="section">
          <div className="grid cards">
            {items.map((q, i) => (
              <a key={i} className="card" href="#">
                <span className="chip">{categoryName}</span>
                <h3>{q}</h3>
              </a>
            ))}
          </div>
        </section>

        <section className="cta">
          <h2>Creators wanted</h2>
          <p>Upload tutorials and get paid when people learn from you. (Coming soon)</p>
          <a className="button" href="#">Join the waitlist</a>
        </section>
      </main>

      <footer className="wrap">
        <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
      </footer>
    </>
  )
}
