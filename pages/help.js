import Link from 'next/link'
import Footer from '../components/Footer'

const Help = () => {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Help & Navigation Guide</h1>
      </div>
      
      <div className="help-content">
        <section>
          <h2>Getting Started</h2>
          <p>Welcome to our AirBnb Clone! This application helps you discover and explore properties with ease.</p>
        </section>

        <section>
          <h2>Navigation</h2>
          <ul>
            <li><strong>Home Page:</strong> Browse all available properties on the map and in a list view. Click on any property to see more details.</li>
            <li><strong>Property Details:</strong> View detailed information about a specific property, including images, reviews, location, and amenities.</li>
            <li><strong>Help Page:</strong> You're here! This page provides guidance on how to use the application.</li>
          </ul>
        </section>

        <section>
          <h2>Using the Map</h2>
          <p>The interactive map shows property locations with markers. Click on a marker to see a preview of the property, then click through to view full details.</p>
        </section>

        <section>
          <h2>Need More Help?</h2>
          <p>If you have questions or need assistance, feel free to reach out through our community channels.</p>
        </section>

        <div className="help-navigation">
          <Link href="/">← Back to Home</Link>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .help-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .help-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px 0;
          border-bottom: 2px solid #e0e0e0;
        }

        .help-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin: 0;
        }

        .help-content {
          line-height: 1.6;
        }

        .help-content section {
          margin-bottom: 30px;
        }

        .help-content h2 {
          font-size: 1.8rem;
          color: #ff5a5f;
          margin-bottom: 15px;
        }

        .help-content p {
          color: #555;
          margin-bottom: 10px;
        }

        .help-content ul {
          list-style: disc;
          margin-left: 20px;
        }

        .help-content li {
          margin-bottom: 10px;
          color: #555;
        }

        .help-content strong {
          color: #333;
        }

        .help-navigation {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .help-navigation a {
          color: #ff5a5f;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
        }

        .help-navigation a:hover {
          text-decoration: underline;
        }

        :global(.footer) {
          margin-top: 60px;
          padding: 20px 0;
          text-align: center;
          border-top: 2px solid #e0e0e0;
          color: #777;
        }
      `}</style>
    </div>
  )
}

export default Help
