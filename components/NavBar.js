import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="nav">
      <div className="logo"></div>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/help">Help</Link>
      </div>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .nav-links a:hover {
          background-color: #f7f7f7;
        }
      `}</style>
    </div>
  )
}

export default NavBar
