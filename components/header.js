import Link from 'next/link'
import Head from 'next/head'

function Header() {
  return <>
    <Head>
      <title>My page title</title>
      <link key="styles" rel="stylesheet" href="/style.css"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      &middot;
      <Link href="/about">
        <a>About</a>
      </Link>
    </header>
  </>
}

export default Header