// components/Header.js
import Link from 'next/link'

export default function Header({ title, subtitle }) {
  return (
    <header className="wrap hero">
      <div className="brand">
        <Link href="/" aria-label="eHelp.tv home">
          <img className="logo" src="/logo.png" alt="eHelp.tv" />
        </Link>
      </div>

      {title && (
        <div style={{ marginTop: 12 }}>
          <h1>{title}</h1>
          {subtitle && <p className="note">{subtitle}</p>}
        </div>
      )}
    </header>
  )
}
