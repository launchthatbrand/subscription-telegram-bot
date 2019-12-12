import Link from 'next/link'
import Head from 'next/head'

function Header() {
  return <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>   
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  </header>
}

export default Header