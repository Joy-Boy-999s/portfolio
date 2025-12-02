import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="keywords" content="B.Neeraj Kumar" />
        <meta name="description" content="Hi there, I'm B.Neeraj Kumar." />
        <meta name="application-name" content="B.Neeraj Kumar" />
        <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}