import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES, POPULAR_TODAY } from '../lib/data'

export default function Home() {
  const [search, setSearch] = useState('')

  const onSearch = () => {
    if (!search.trim()) {
      alert('Type a question first :)')
      return
    }
    // TODO: Implement actual search functionality
    alert('Search: ' + search)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <>
      <Head>
        <title>ehelp.tv — Learn Anything, Fast</title>
        <meta name="description" content="Your one-stop destination to learn anything. From DIY projects to emergency response, master new skills with expert tutorials and guides." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {/* Header */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-content">
            <Link href="/" className="brand" aria-label="eHelp.tv home">
              <img className="logo" src="/logo.png" alt="eHelp.tv" />
            </Link>
            
            <div className="searchbar">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="Try: How to fix a leaky faucet?"
                aria-label="Search how-to guides"
              />
              <button type="button" onClick={onSearch}>
                Search
              </button>
            </div>
          </div>
          <p className="note">Your learning journey starts here — ask anything, learn it fast.</p>
        </div>
      </header>

      <main className="wrap">
        {/* Browse Categories Section */}
        <section className="section">
          <h2>Browse Categories</h2>
          <p>Explore our comprehensive collection of learning resources organized by topic.</p>
          
          <div className="categories-grid">
            {CATEGORIES.map((category) => (
              <Link 
                key={category.slug} 
                href={`/category/${category.slug}`} 
                className="category-card"
                style={{
                  '--color-primary': category.color,
                  '--color-secondary': category.colorSecondary || category.color
                }}
              >
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
                <p className="item-count">{category.items.length} guides</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Today Section */}
        <section className="section">
          <h2>Popular Today</h2>
          <p>See what others are learning right now — trending tutorials and guides.</p>
          
          <div className="popular-list">
            {POPULAR_TODAY.slice(0, 8).map((item, index) => (
              <Link 
                key={index} 
                href={`/q/${item.slug}`} 
                className="popular-item"
              >
                <div className="popular-content">
                  <h3>How to {item.query}</h3>
                  <p className="popular-meta">{item.category} • {item.views.toLocaleString()} views</p>
                </div>
                <span className="popular-rank">#{index + 1}</span>
              </Link>
            ))}
          </div>
          
          <Link href="/popular" className="view-all-btn">
            View All Popular Topics →
          </Link>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <h2>Ready to Learn Something New?</h2>
          <p>Join thousands of learners mastering new skills every day. From quick fixes to comprehensive guides, we've got you covered.</p>
          <Link href="/categories" className="button">
            Explore All Categories
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>
            <Link href="/about" style={{ color: '#64748b', marginRight: '20px' }}>About</Link>
            <Link href="/contact" style={{ color: '#64748b', marginRight: '20px' }}>Contact</Link>
            <Link href="/privacy" style={{ color: '#64748b' }}>Privacy</Link>
          </p>
        </div>
      </footer>
    </>
  )
}
