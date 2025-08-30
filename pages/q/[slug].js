import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import { CATEGORIES, POPULAR_TODAY } from '../../lib/data'
import { toQuerySlug, fromQuerySlug } from '../../lib/slug'

// Build paths for all known queries
export async function getStaticPaths() {
  const paths = []
  
  // From categories
  CATEGORIES.forEach(cat => {
    cat.items.forEach(q => {
      paths.push({ params: { slug: toQuerySlug(q) } })
    })
  })
  
  // From "Popular Today" items
  POPULAR_TODAY.forEach(item => {
    paths.push({ params: { slug: item.slug } })
  })
  
  return { paths, fallback: 'blocking' }
}

// Provide props for each page
export async function getStaticProps({ params }) {
  const slug = params.slug
  const queryText = fromQuerySlug(slug)
  
  // Find the category that contains this query
  let category = null
  let categoryData = null
  
  CATEGORIES.forEach(cat => {
    if (cat.items.find(q => toQuerySlug(q) === slug)) {
      category = cat.name
      categoryData = cat
    }
  })
  
  // If not found in categories, check popular items
  if (!category) {
    const popularItem = POPULAR_TODAY.find(item => item.slug === slug)
    if (popularItem) {
      category = popularItem.category
      categoryData = CATEGORIES.find(cat => cat.name === category)
    }
  }
  
  // If still not found, return 404
  if (!category) {
    return {
      notFound: true
    }
  }
  
  return {
    props: {
      slug,
      query: queryText,
      category,
      categoryData,
    },
    revalidate: 3600,
  }
}

export default function QueryPage({ slug, query, category, categoryData }) {
  // Get related items from the same category
  const relatedItems = categoryData?.items
    .filter(item => toQuerySlug(item) !== slug)
    .slice(0, 4)
    .map(item => ({
      title: item,
      slug: toQuerySlug(item)
    })) || []

  return (
    <>
      <Head>
        <title>How to {query} — Step-by-Step Guide | ehelp.tv</title>
        <meta 
          name="description" 
          content={`Learn how to ${query} with our comprehensive step-by-step guide. Expert tips, tutorials, and resources to master this skill quickly.`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header 
        title={`How to ${query}`} 
        subtitle={`${category} Guide`}
        showSearch={true}
      />

      <main className="wrap">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">›</span>
          <Link href={`/category/${categoryData?.slug}`}>
            {category}
          </Link>
          <span className="separator">›</span>
          <span>How to {query}</span>
        </nav>

        {/* Main Content */}
        <section className="section">
          <div className="content-header">
            <div 
              className="category-badge"
              style={{ backgroundColor: categoryData?.color || '#3b82f6' }}
            >
              <span className="category-icon">{categoryData?.icon || '📚'}</span>
              {category}
            </div>
          </div>

          <h1 style={{ fontSize: '36px', margin: '20px 0', color: '#1e293b' }}>
            How to {query}
          </h1>

          <div className="content-placeholder">
            <div className="placeholder-icon">🚧</div>
            <h3>Content Coming Soon</h3>
            <p>
              We're working on creating a comprehensive step-by-step guide for "{query}". 
              This page will soon include:
            </p>
            <ul>
              <li>📝 Detailed step-by-step instructions</li>
              <li>🎥 Video tutorials and demonstrations</li>
              <li>📋 Required tools and materials list</li>
              <li>💡 Pro tips and expert advice</li>
              <li>⚠️ Safety warnings and precautions</li>
              <li>❓ FAQ and troubleshooting</li>
            </ul>
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#64748b' }}>
              Check back soon or <Link href="/contact">contact us</Link> to prioritize this guide.
            </p>
          </div>
        </section>

        {/* Related Guides */}
        {relatedItems.length > 0 && (
          <section className="section">
            <h2>More {category} Guides</h2>
            <div className="related-guides">
              {relatedItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={`/q/${item.slug}`}
                  className="related-guide-card"
                >
                  <div className="related-guide-content">
                    <h3>How to {item.title}</h3>
                    <p>{category} • Step-by-step guide</p>
                  </div>
                  <div className="related-guide-arrow">→</div>
                </Link>
              ))}
            </div>
            <Link 
              href={`/category/${categoryData?.slug}`} 
              className="view-all-btn"
              style={{ marginTop: '20px' }}
            >
              View All {category} Guides →
            </Link>
          </section>
        )}

        {/* CTA Section */}
        <section className="cta">
          <h2>Want to Contribute?</h2>
          <p>
            Do you have expertise in "{query}"? Help others learn by contributing your knowledge.
          </p>
          <Link href="/contribute" className="button">
            Share Your Expertise
          </Link>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} ehelp.tv · Learn anything, anywhere.</p>
        </div>
      </footer>

      <style jsx>{`
        .content-header {
          margin-bottom: 20px;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .category-icon {
          font-size: 16px;
        }

        .content-placeholder {
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          margin: 30px 0;
        }

        .placeholder-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .content-placeholder h3 {
          color: #334155;
          margin-bottom: 16px;
        }

        .content-placeholder ul {
          text-align: left;
          max-width: 400px;
          margin: 20px auto;
          padding-left: 0;
          list-style: none;
        }

        .content-placeholder li {
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .content-placeholder li:last-child {
          border-bottom: none;
        }

        .related-guides {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }

        .related-guide-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .related-guide-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: ${categoryData?.color || '#3b82f6'};
        }

        .related-guide-content h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .related-guide-content p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }

        .related-guide-arrow {
          font-size: 20px;
          color: ${categoryData?.color || '#3b82f6'};
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .related-guides {
            grid-template-columns: 1fr;
          }
          
          .content-placeholder {
            padding: 24px;
          }
        }
      `}</style>
    </>
  )
}
