import Head from "next/head";
import { GetServerSideProps } from "next";
import fetchDatasArchives from "@/utils/fetchDatasArchives";
import { ArchivesDatas } from "@/types";
import NavArchive from "@/components/archive/navArchive";
import TableProvider from "@/components/archive/tableContext";
import IndexArchive from "@/components/archive/indexArchive";
import { useContext, useEffect } from "react";
import { SiteContext } from "@/context/siteContext";


const Archives: React.FC<ArchivesDatas> = ({ content, seo }) => {

  const { site_name, site_tagline, site_description, image_link } = seo
  const { setPage } = useContext(SiteContext)


  useEffect(() => {
    const header = document.querySelector('.header')
    if (header && header.classList.contains('hide')) header.classList.remove('hide')
    setPage('/')
  }, [])

  return (
    <>
      <Head>
        <title>{`${site_name} | ${site_tagline}`}</title>
        <meta name="description" content={`${site_description}`} />

        <meta key="og_title" property="og:title" content={`${site_name} | ${site_tagline}`} />
        <meta key="og_description" property="og:description" content={`${site_description}`} />
        {image_link && <meta key="og_image" property="og:image" content={`${image_link}`} />}
      </Head>
      <main>
        <TableProvider>
          <NavArchive />
          <IndexArchive content={content} />
        </TableProvider>
      </main>
    </>
  );
}

export default Archives

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const content = await fetchDatasArchives();
    return {
      props: {
        content: content.content,
        seo: content.seo,
      }
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
