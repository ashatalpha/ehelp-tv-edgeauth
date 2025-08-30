import Link from 'next/link'
import { useState } from 'react'

export default function Header({ title, subtitle, showSearch = false }) {
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
    <header className="hero">
      <div className="wrap">
        <div className="hero-content">
          <Link href="/" className="brand" aria-label="eHelp.tv home">
            <img className="logo" src="/logo.png" alt="eHelp.tv" />
          </Link>
          
          {showSearch && (
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
          )}
          
          {title && (
            <div className="page-title">
              <h1>{title}</h1>
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
          )}
        </div>
        
        {!title && !showSearch && (
          <p className="note">Your learning journey starts here — ask anything, learn it fast.</p>
        )}
      </div>
      
      <style jsx>{`
        .page-title {
          flex: 1;
          text-align: center;
          margin: 0 20px;
        }
        
        .page-title h1 {
          margin: 0;
          font-size: 24px;
          color: #1e293b;
          font-weight: 600;
        }
        
        .subtitle {
          margin: 4px 0 0 0;
          color: #64748b;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
          }
          
          .page-title {
            margin: 16px 0 0 0;
            order: 2;
          }
          
          .searchbar {
            order: 1;
            width: 100%;
            max-width: none;
            margin: 20px 0 0 0;
          }
        }
      `}</style>
    </header>
  )
}
