// pages/category/index.js
import Head from 'next/head'
import Link from 'next/link'
import { CATEGORIES } from '../../lib/data'
import { toSlug } from '../../lib/slug'

export default function CategoryIndex() {
  return (
    <>
      <Head>
        <title>Browse Categories — ehelp.tv</title>
        <meta name="description" content="Browse all how-to categories on ehelp.tv." />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <header className="wrap hero">
        <div className="brand">
  <a href="/" aria-label="eHelp.tv home">
    <img className="logo" src="/logo.png" alt="eHelp.tv" />
  </a>
</div>
      </header>

      <main className="wrap">
        <nav style={{marginBottom: 12}}>
          <Link href="/" className="viewall">← Back to Home</Link>
        </nav>

        <section className="section">
          <div className="grid cards">
            {CATEGORIES.map((c) => (
              <Link key={c.name} className="card" href={`/category/${toSlug(c.name)}`}>
                <span className="chip">Category</span>
                <h3>{c.name}</h3>
                <p className="muted">{c.items.length} popular searches</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="wrap">
        <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
      </footer>
    </>
  )
}
