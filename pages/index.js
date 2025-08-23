// /pages/index.js
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { POPULAR_TODAY, CATEGORIES } from '../lib/data'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const allQueries = useMemo(() => {
    const base = []
    CATEGORIES.forEach(cat => {
      cat.items.forEach(q => base.push({ query: q, category: cat.name }))
    })
    return base
  }, [])

  const filtered = useMemo(() => {
    let data = activeCat === 'All'
      ? allQueries
      : allQueries.filter(q => q.category === activeCat)
    if (search.trim()) {
      const s = search.trim().toLowerCase()
      data = data.filter(q => q.query.toLowerCase().includes(s))
    }
    return data.slice(0, 24) // keep it tight on homepage
  }, [activeCat, allQueries, search])

  const onSearch = () => {
    if (!search.trim()) {
      alert('Type a question first 🙂')
      return
    }
    // Placeholder: plug your AI search here later
    alert('Search: ' + search + '\n\n(Next step: call AI and show results.)')
  }

  return (
    <>
      <Head>
        <title>ehelp.tv — Learn Anything, Fast</title>
        <meta name="description" content="Ask anything. Learn it fast. ehelp.tv finds the best videos and step-by-step guides for how-to questions." />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      {/* HERO */}
      <header className="wrap hero">
        <div className="brand">
          <img className="logo" src="/favicon.svg" alt="" />
          <div>
            <h1>ehelp.tv</h1>
            <p className="tagline">Ask anything. Learn it fast.</p>
          </div>
        </div>
        <div className="searchbar">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Try: How to fix a leaky faucet?"
            aria-label="Search how-to"
          />
          <button type="button" onClick={onSearch}>Search</button>
        </div>
        <p className="note">Starter layout — plug your AI search in later.</p>
      </header>

      <main className="wrap">

        {/* POPULAR TODAY */}
        <section className="section">
          <div className="section-head">
            <h2>Popular Today</h2>
            <a className="viewall" href="#">View all</a>
          </div>
          <div className="grid cards">
            {POPULAR_TODAY.map((item, i) => (
              <a key={i} className="card card-pop" href="#">
                <div className="card-top">
                  <span className="chip">{item.category}</span>
                </div>
                <h3>{item.query}</h3>
                <p className="muted">~{item.volume.toLocaleString()} monthly searches</p>
              </a>
            ))}
          </div>
        </section>

        {/* BROWSE BY CATEGORY */}
        <section className="section">
          <div className="section-head">
            <h2>Browse by Category</h2>
            <div className="filters">
  <button
    className={`pill ${activeCat==='All' ? 'pill-active' : ''}`}
    onClick={()=>setActiveCat('All')}
  >
    All
  </button>
  {CATEGORIES.map((c) => (
    <a
      key={c.name}
      className={`pill ${activeCat===c.name ? 'pill-active' : ''}`}
      href={`/category/${(c.name).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`}
      onClick={(e)=>{ e.preventDefault(); setActiveCat(c.name); }}
      title="Open category page (Cmd/Ctrl+Click to open new tab)"
    >
      {c.name}
    </a>
  ))}
</div>

          <div className="grid cards">
            {filtered.map((item, i) => (
              <a key={`${item.query}-${i}`} className="card" href="#">
                <span className="chip">{item.category}</span>
                <h3>{item.query}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
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
