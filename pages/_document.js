import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={"fa"}>
        <Head />
        <body dir={"rtl"}>
          {/*<div dir={"rtl"}>*/}
          <Main />
          <NextScript />
          {/*</div>*/}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
