import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  const onSearch = () => {
    if (!search.trim()) { alert('Type a question first :)'); return }
    alert('Search: ' + search)
  }

  return (
    <>
      <Head>
        <title>ehelp.tv — Learn Anything, Fast</title>
        <meta name="description" content="Ask anything. Learn it fast." />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <header className="wrap hero">
        <div className="brand">
          <a href="/" aria-label="eHelp.tv home">
            <img className="logo" src="/logo.png" alt="eHelp.tv" />
          </a>
        </div>
        <div className="searchbar" style={{ marginTop: 12 }}>
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Try: How to fix a leaky faucet?"
            aria-label="Search how-to"
          />
          <button type="button" onClick={onSearch}>Search</button>
        </div>
        <p className="note">Starter layout - plug your AI search in later.</p>
      </header>

      <main className="wrap">
        <section className="section">
          <h2>Welcome</h2>
          <p>If you can see this, the homepage is compiling correctly.</p>
        </section>
      </main>

      <footer className="wrap">
        <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
      </footer>
    </>
  )
}
