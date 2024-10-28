import Head from "next/head";
import { AboutDatas } from '../types';
import { GetStaticProps } from "next";
import fetchDatasAbout from "@/utils/fetchDatasAbout";
import { useContext, useEffect } from "react";
import { SiteContext } from "@/context/siteContext";


const About: React.FC<AboutDatas> = ({ content, seo }) => {

    const { about, contact, pdf } = content
    const { site_name, site_description, image_link } = seo
    const { setPage } = useContext(SiteContext)

    useEffect(() => {
        const header = document.querySelector('.header')
        if (header && header.classList.contains('hide')) header.classList.remove('hide')
        setPage('/about')
    }, [])


    return (
        <>
            <Head>
                <title>{`About | ${site_name}`}</title>
                <meta name="description" content={`${site_description}`} />
                <meta key="og_title" property="og:title" content={`Aboute | ${site_name}`} />
                <meta key="og_description" property="og:description" content={`${site_description}`} />
                {image_link && <meta key="og_image" property="og:image" content={`${image_link}`} />}
            </Head>
            <main className='about'>
                <div className='documentation_text' dangerouslySetInnerHTML={{ __html: about }} />
                <a className='contact' href={`mailto:${contact}`} target="_blank" rel="noopener noreferrer">{contact}</a>
                {pdf && <a className="pdf" href={`${pdf}`} download={`${pdf}`}>Download CV</a>}
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const content = await fetchDatasAbout();
        return {
            props: {
                content: content.content,
                seo: content.seo
            }, revalidate: 10,
        };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {
            props: {
                content: {
                    title: 'Error',
                    description: 'Failed to load content',
                },
            },
        };
    }
};

export default About
