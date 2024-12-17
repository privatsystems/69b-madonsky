interface Dimensions {
    width: number,
    height: number
}

export interface ImageType {
    src: string;
    dimensions: Dimensions;
    alt: string | null;
}

export interface Header {
    site_name: string;
    site_tagline: string;
    site_description: string;
    image_link: string | null;
    title_page: string;
}

export interface About {
    about: string;
    contact: string;
    pdf: string;
}

export interface ArchivesItem {
    slug: string;
    title: string;
    form: string;
    topics: string;
    year: string;
    thumb: ImageType;
    videourl: string;
    videocode: string;
    format: string;
}

export interface Related {
    title: string;
    slug: string;
}

export interface Project {
    slug: string;
    title: string;
    form: string;
    topics: string;
    year: string;
    videourl: string;
    videocode: string;
    format: string;
    text: string;
    related: Related[];
    images: ImageType[];
    index: number;
    list: string[];
    listVideo: string[];

}

export type Events = Event[]

export interface ArchivesDatas {
    seo: Header;
    content: ArchivesItem[];
}

export interface AboutDatas {
    seo: Header;
    content: About;
}

export interface ProjectDatas {
    seo: Header;
    content: Project;
    videos: {
        videourl: string;
        legend: string | null;
    }[]
}

export interface PageProps {
    seo: Header;
    content: ProjectDatas | AboutDatas | ArchivesDatas;
}

