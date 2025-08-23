import Head from 'next/head'

export default function Home() {
  const onSearch = () => {
    const input = document.getElementById('q')
    const q = (input && input.value || '').trim()
    if (!q) { alert('Type a question first 🙂'); return; }
    alert('Search: ' + q + '\n\n(Next step: connect to AI and show results here.)')
  }

  return (
    <>
      <Head>
        <title>ehelp.tv — Learn Anything, Fast</title>
        <meta name="description" content="Ask anything. Learn it fast. ehelp.tv finds the best videos and step-by-step guides for how-to questions." />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <header className="wrap">
        <div className="brand">
          <img className="logo" src="/favicon.svg" alt="" />
          <div>
            <h1>ehelp.tv</h1>
            <p className="tagline">Ask anything. Learn it fast.</p>
          </div>
        </div>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input id="q" type="text" placeholder="Try: How do I fix a dripping faucet?" aria-label="Search how-to" />
          <button id="btn" type="button" onClick={onSearch}>Search</button>
        </form>
        <p className="note">Starter template — wire up this search to AI later.</p>
      </header>

      <main className="wrap">
        <section>
          <h2>Popular Categories</h2>
          <div className="grid" id="cats">
            <a className="card" href="#"><h3>Home Fixes</h3><p>Plumbing, paint, tools</p></a>
            <a className="card" href="#"><h3>Tech</h3><p>Phones, computers, apps</p></a>
            <a className="card" href="#"><h3>Cooking</h3><p>Quick meals & basics</p></a>
            <a className="card" href="#"><h3>Money</h3><p>Budgeting & taxes</p></a>
            <a className="card" href="#"><h3>Creative</h3><p>Video, design, music</p></a>
            <a className="card" href="#"><h3>Cars</h3><p>Maintenance & repairs</p></a>
          </div>
        </section>

        <section>
          <h2>How It Works</h2>
          <ol className="how">
            <li><strong>Ask:</strong> Type your question.</li>
            <li><strong>Watch & Read:</strong> We show the best videos + simple steps.</li>
            <li><strong>Save:</strong> Bookmark what helps you.</li>
          </ol>
        </section>

        <section className="cta">
          <h2>Want to teach?</h2>
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
