import Footer from '../components/Footer'

const Help = () => {
  return (
    <>
      <div className="main">
        <h1>Help & Navigation</h1>
        
        <section className="help-section">
          <h2>Getting Around</h2>
          <p>
            Welcome to the AirBnB Clone! This application allows you to browse and explore properties.
          </p>
          
          <h3>Home Page</h3>
          <p>
            The home page displays all available properties with an interactive map. You can:
          </p>
          <ul>
            <li>Browse properties in the list view</li>
            <li>Click on map markers to see property locations</li>
            <li>Click on any property to view detailed information</li>
          </ul>
          
          <h3>Property Details</h3>
          <p>
            Each property page shows:
          </p>
          <ul>
            <li>Property images and description</li>
            <li>Location information with an embedded map</li>
            <li>Guest reviews and ratings</li>
            <li>Host information</li>
          </ul>
          
          <h3>Navigation</h3>
          <p>
            Use the logo in the header to return to the home page at any time.
          </p>
        </section>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .main {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        h1 {
          color: #222;
          margin-bottom: 30px;
        }
        
        .help-section {
          line-height: 1.6;
        }
        
        h2 {
          color: #333;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        
        h3 {
          color: #555;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        
        p {
          color: #666;
          margin-bottom: 15px;
        }
        
        ul {
          color: #666;
          margin-left: 20px;
          margin-bottom: 15px;
        }
        
        li {
          margin-bottom: 8px;
        }
      `}</style>
    </>
  )
}

export default Help
