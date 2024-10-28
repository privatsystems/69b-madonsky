import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PageProps } from "@/types";
import { useRouter } from "next/router";
import Init from '@/components/init'
import SiteProvider from "@/context/siteContext";
import Header from "@/components/header";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps<PageProps>) {

    const router = useRouter()

    return (<>
        <Head>
            <meta name="robots" content="noindex"></meta>
        </Head>
        <SiteProvider>
            <Init />
            < div className='container' >
                <div className={`content`} >
                    <Header />
                    <Component {...pageProps} key={`page-${router.pathname}`} />
                </div>
            </div>
        </SiteProvider>
    </>
    );
}
