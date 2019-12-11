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
        <Head />
        <body>
          <main>
            <Header />
            <Main />
            <Footer />
          </main>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument