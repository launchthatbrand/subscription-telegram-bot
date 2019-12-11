import Link from 'next/link'
import Head from 'next/head'

function Header() {
  return <>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link key="styles" rel="stylesheet" href="/style.css"/>
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>   
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  </>
}

export default Header