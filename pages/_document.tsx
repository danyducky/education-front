import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import React from "react";

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      return await Document.getInitialProps(ctx);
   }

   render() {
      return (
         <Html>
            <Head/>
            <body>
               <Main/>
               <NextScript/>
            </body>
         </Html>
      )
   }
}

export default MyDocument
