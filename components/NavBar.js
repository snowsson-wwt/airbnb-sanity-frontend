import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="nav">
      <div className="logo"></div>
      <div className="nav-links">
        <Link href="/">
          <a style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>Home</a>
        </Link>
        <Link href="/todo">
          <a style={{ textDecoration: 'none', color: '#333' }}>TODO</a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
