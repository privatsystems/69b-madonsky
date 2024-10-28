import { ArchivesItem } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image"
import Link from "next/link";


interface GridItemData {
    projet: ArchivesItem;
    index: number;
    setImageHover: Dispatch<SetStateAction<number>>;
    setHide: Dispatch<SetStateAction<boolean>>;
}

const GridItem: React.FC<GridItemData> = ({ projet, index, setImageHover, setHide }) => {

    const [hover, setHover] = useState(false)

    const handleMouseEnter = (index: number) => {
        setHover(true)
        setImageHover(index)
        setHide(false)
    }

    const handleMouseLeave = () => {
        setHover(false)
        setImageHover(0)
        setHide(true)
    }

    const { title, slug, thumb } = projet
    return <Link href={slug} >
        <div
            className={`grid_item ${hover ? 'hover' : ''}`} key={title}
            onMouseEnter={() => { handleMouseEnter(index) }}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={thumb.src}
                width={thumb.dimensions.width}
                height={thumb.dimensions.height}
                alt={thumb.alt || `${title}`}
                sizes='20vw'
            />
        </div>
    </Link>

}

export default GridItem