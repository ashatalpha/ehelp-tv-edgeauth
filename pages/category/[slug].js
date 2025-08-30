import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import { CATEGORIES, getCategoryBySlug } from '../../lib/data'
import { toQuerySlug } from '../../lib/slug'

// Generate paths for all categories
export async function getStaticPaths() {
  const paths = CATEGORIES.map((category) => ({
    params: { slug: category.slug }
  }))

  return { paths, fallback: false }
}

// Get category data for the page
export async function getStaticProps({ params }) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      category
    },
    revalidate: 3600 // Revalidate every hour
  }
}

export default function CategoryPage({ category }) {
  return (
    <>
      <Head>
        <title>{category.name} — Learn Everything | ehelp.tv</title>
        <meta 
          name="description" 
          content={`Master ${category.name.toLowerCase()} with our comprehensive guides and tutorials. Learn ${category.items.slice(0, 3).join(', ')} and more on ehelp.tv.`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header 
        title={category.name} 
        subtitle={`${category.items.length} helpful guides and tutorials`}
        showSearch={true}
      />

      <main className="wrap">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">›</span>
          <span>{category.name}</span>
        </nav>

        {/* Category Introduction */}
        <section className="section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div 
              className="category-icon-large"
              style={{ 
                backgroundColor: category.color,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white'
              }}
            >
              {category.icon}
            </div>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#1e293b' }}>
                {category.name}
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '16px' }}>
                Everything you need to know about {category.name.toLowerCase()}
              </p>
            </div>
          </div>
        </section>

        {/* How-to Guides Grid */}
        <section className="section">
          <h2>How-to Guides</h2>
          <div className="guides-grid">
            {category.items.map((item, index) => (
              <Link 
                key={index} 
                href={`/q/${toQuerySlug(item)}`} 
                className="guide-card"
              >
                <div className="guide-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="guide-content">
                  <h3>How to {item}</h3>
                  <p>Step-by-step guide to master this skill</p>
                </div>
                <div className="guide-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Categories */}
        <section className="section">
          <h2>Related Categories</h2>
          <div className="related-categories">
            {CATEGORIES
              .filter(cat => cat.slug !== category.slug)
              .slice(0, 4)
              .map((relatedCat) => (
                <Link 
                  key={relatedCat.slug} 
                  href={`/category/${relatedCat.slug}`}
                  className="related-card"
                >
                  <div 
                    className="related-icon"
                    style={{ backgroundColor: relatedCat.color }}
                  >
                    {relatedCat.icon}
                  </div>
                  <h3>{relatedCat.name}</h3>
                  <p>{relatedCat.items.length} guides</p>
                </Link>
              ))
            }
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <h2>Can't Find What You're Looking For?</h2>
          <p>Tell us what you'd like to learn and we'll create a guide for it.</p>
          <Link href="/request" className="button">
            Request a Guide
          </Link>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
        </div>
      </footer>

      <style jsx>{`
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }

        .guide-card {
          display: flex;
          align-items: center;
          padding: 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
          gap: 16px;
        }

        .guide-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: ${category.color};
        }

        .guide-number {
          background: ${category.color};
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          flex-shrink: 0;
        }

        .guide-content {
          flex: 1;
        }

        .guide-content h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .guide-content p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }

        .guide-arrow {
          font-size: 20px;
          color: ${category.color};
          font-weight: bold;
        }

        .related-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 24px 0;
        }

        .related-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
          text-align: center;
        }

        .related-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .related-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          margin-bottom: 12px;
        }

        .related-card h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .related-card p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .guides-grid {
            grid-template-columns: 1fr;
          }
          
          .related-categories {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
