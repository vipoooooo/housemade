import * as React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import {Provider as StyletronProvider} from 'styletron-react';
import {Server, Sheet} from 'styletron-engine-atomic';
import {styletron} from '../helpers/styletron';
import restricted from './api/restricted';

class MyDocument extends Document<{stylesheets: Sheet[]}> {
  static async getInitialProps(context: any) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: (App: any) => (props: any) =>
          (
            <StyletronProvider value={styletron}>
              <App {...props} />
            </StyletronProvider>
          ),
      })

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    })
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...initialProps, stylesheets }
  }

  render() {
    return (
      <Html>
        <Head>
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{__html: sheet.css}}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
