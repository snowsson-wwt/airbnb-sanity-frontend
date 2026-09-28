import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="nav">
      <Link href="/">
        <a className="logo"></a>
      </Link>
      <div className="nav-links">
        <Link href="/todo">
          <a className="nav-link">TODOs</a>
        </Link>
      </div>

      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo {
          display: block;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          color: #222;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: background-color 0.2s;
        }

        .nav-link:hover {
          background-color: #f7f7f7;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
