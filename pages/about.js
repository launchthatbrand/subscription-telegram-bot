import Link from 'next/link'

function About() {
  return <div>
    <h1>About Next.js!</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    &middot;
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
}

export default About
