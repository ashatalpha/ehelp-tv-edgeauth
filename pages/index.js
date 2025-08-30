import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [search, setSearch] = useState('')

  const onSearch = () => {
    if (!search.trim()) { alert('Type a question first :)'); return }
    alert('Search: ' + search)
  }

  // Your categories (existing + new ones you wanted)
  const categories = [
    { name: 'Home & DIY', slug: 'home-diy', icon: '🔨', color: '#FF6B6B' },
    { name: 'Technology & Devices', slug: 'technology', icon: '💻', color: '#4ECDC4' },
    { name: 'Cooking & Food', slug: 'cooking-food', icon: '👨‍🍳', color: '#45B7D1' },
    { name: 'Money & Admin', slug: 'money-admin', icon: '💰', color: '#96CEB4' },
    { name: 'Health & Fitness', slug: 'health-fitness', icon: '💪', color: '#FECA57' },
    { name: 'Creative & Learning', slug: 'creative-learning', icon: '🎨', color: '#FF9FF3' },
    { name: 'Life Admin', slug: 'life-admin', icon: '📋', color: '#54A0FF' },
    // Your new categories
    { name: 'Outdoor & Gardening', slug: 'outdoor-gardening', icon: '🌱', color: '#5F27CD' },
    { name: 'Building & Engineering', slug: 'building-engineering', icon: '🏗️', color: '#00D2D3' },
    { name: 'Medical', slug: 'medical', icon: '⚕️', color: '#FF3838' },
    { name: 'Emergency Response', slug: 'emergency-response', icon: '🚨', color: '#FF6348' }
  ]

  // Sample popular content (you can replace with real data later)
  const popularToday = [
    { title: 'How to fix a leaky faucet', category: 'Home & DIY', views: '12.3k' },
    { title: 'Setting up WiFi router', category: 'Technology', views: '8.7k' },
    { title: 'Perfect scrambled eggs', category: 'Cooking & Food', views: '6.2k' },
    { title: 'First aid basics', category: 'Emergency Response', views: '5.1k' },
    { title: 'Plant indoor herbs', category: 'Outdoor & Gardening', views: '4.8k' }
  ]

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
        <p className="note">Your learning journey starts here.</p>
      </header>

      <main className="wrap">
        {/* Categories Section */}
        <section className="section">
          <h2>Browse Categories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Today Section */}
        <section className="section">
          <h2>Popular Today</h2>
          <div className="popular-list">
            {popularToday.map((item, index) => (
              <div key={index} className="popular-item">
                <div className="popular-content">
                  <h3>{item.title}</h3>
                  <p className="popular-meta">{item.category} • {item.views} views</p>
                </div>
                <span className="popular-rank">#{index + 1}</span>
              </div>
            ))}
          </div>
          <Link href="/popular" className="view-all-btn">View All Popular →</Link>
        </section>
      </main>

      <footer className="wrap">
        <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
      </footer>

      <style jsx>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 12px;
        }

        .category-card h3 {
          margin: 0;
          font-size: 16px;
          text-align: center;
          font-weight: 600;
        }

        .popular-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 20px 0;
        }

        .popular-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .popular-content h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .popular-meta {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .popular-rank {
          font-size: 20px;
          font-weight: bold;
          color: #FF6B6B;
          min-width: 40px;
          text-align: center;
        }

        .view-all-btn {
          display: inline-block;
          margin-top: 16px;
          padding: 12px 24px;
          background: #FF6B6B;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .view-all-btn:hover {
          background: #FF5252;
        }

        .section {
          margin: 40px 0;
        }

        .section h2 {
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
        }
      `}</style>
    </>
  )
}
