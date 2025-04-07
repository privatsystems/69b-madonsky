import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import fetchDatasProject from "@/utils/fetchDatasProject";
import fetchDatasArchives from "@/utils/fetchDatasArchives";
import { ProjectDatas } from "@/types";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import Cross from '@/components/svg/cross'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { useRouter } from "next/router";
import { SiteContext } from "@/context/siteContext";
import Vimeo from '@u-wave/react-vimeo';


const horloge = '<svg viewBox="0 0 73 73" width="18" height="18"><path d="M36.5,73C16.37,73,0,56.63,0,36.5S16.37,0,36.5,0s36.5,16.37,36.5,36.5-16.37,36.5-36.5,36.5ZM36.5,8c-15.71,0-28.5,12.79-28.5,28.5s12.79,28.5,28.5,28.5,28.5-12.79,28.5-28.5-12.79-28.5-28.5-28.5Z" /><polygon points="32.78 16.03 32.78 38.11 24.55 46.33 29.86 51.64 40.46 41.03 40.46 16.03 32.78 16.03" /></svg>'

const Project: React.FC<ProjectDatas> = ({ content, seo, videos }) => {

    const { title, form, topics, year, text, related, listVideo, index } = content
    const { site_name } = seo
    const documentationRef = useRef(null);
    const router = useRouter()
    const [textM, setTextM] = useState(text)
    const { setPage } = useContext(SiteContext)
    const [height, setHeight] = useState(0)

    useEffect(() => {

        setHeight(window.innerHeight)

        const header = document.querySelector('.header')
        if (header && !header.classList.contains('hide')) header.classList.add('hide')
        setPage('/other')
    }, [])

    useEffect(() => {
        // Remplacer chaque occurrence de "◊" par le SVG
        const updatedText = text.replace(/◊/g, horloge);
        setTextM(updatedText);
    }, [text]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollToPlugin)
    });

    const scrollToDocumentation = () => {
        if (documentationRef.current) {
            gsap.to(window, {
                scrollTo: { y: documentationRef.current, offsetY: 50 }, // scroll to the element with an offset
                duration: 1,
                ease: 'power3.inOut',
            });


        }
    }

    const handleNextProject = () => {
        // Calculate the index of the next project
        const nextProjectIndex = (index + 1) % listVideo.length;
        const nextProjectSlug = listVideo[nextProjectIndex]; // Get the slug of the next project

        // Use Next.js's router to navigate to the next project's page
        router.push(`/${nextProjectSlug}`);
    };

    return (
        <>
            <Head>
                <title>{`${title} | ${site_name}`}</title>
                <meta key="og_title" property="og:title" content={`${title} | ${site_name}`} />
            </Head>
            <main className={`projet ${content.format}`}>
                <Link href='/' className={`cross ${content.format}-cross`}><Cross /></Link>
                {videos && videos.map((video, index) => {
                    return (
                        <div className='images_wrapper' key={`${index}${video.videourl}`}>
                            <div className='scroller'>
                                <Vimeo
                                    video={video.videourl}
                                    responsive
                                />
                                {video.legend && <div className='scroller_pass'>{video.legend.replace(/◊/g, horloge)}</div>}
                            </div>
                        </div>
                    )
                })}
                <div className={`hero ${content.format}-hero`}>
                    <h1>{title}</h1>
                    <h2>{form}</h2>
                    <h2>{topics}</h2>
                    <h2>{year}</h2>
                    <div className='button_info' onClick={scrollToDocumentation}>+ info</div>
                </div>
                <div className='sticky_next' style={{ top: (height / 2) - 27 }}>
                    <div className="nextProject_button" onClick={handleNextProject}>next project</div>
                </div>
                <div className='documentation' ref={documentationRef}>
                    <div className='documentation_text' dangerouslySetInnerHTML={{ __html: textM }} />
                    {related && related.length > 0 && <div className='documentation_related'>Related Works: {related.map((r, index) => <span key={`link-${r.slug}`}><Link href={`/${r.slug}`}>{r.title}</Link>{index < related.length - 1 ? ', ' : '.'}</span>)}</div>}
                </div>
                <div className="nextProject_button mob" onClick={handleNextProject}>next project</div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const { params } = context;
        const content = await fetchDatasProject(params?.project)

        return {
            props: {
                content: content.content,
                videos: content.videos,
                seo: content.seo
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return {
            props: {
                content: {
                    title: "Error",
                    description: "Failed to load content",
                },
                exposition: null,
                revalidate: 10,
            },
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const ArchivesDatas = await fetchDatasArchives();
        return {
            paths: ArchivesDatas.content.map((project) => ({
                params: {
                    project: project.slug
                },
            })),
            fallback: "blocking",
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return {
            paths: [],
            fallback: "blocking",
        };
    }
};

export default Project