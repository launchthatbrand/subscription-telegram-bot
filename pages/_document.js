import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link key="styles" rel="stylesheet" href="/style.css"/>
        </Head>
        <body>
          <div className="outer">
            <Header />
            <Main />
            <Footer />
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument