import { ImageType } from "@/types"
import Image from "next/image"

interface ThumbData {
    thumb: ImageType,
    title: string,
    xMouse: number
}

const TableItemThumb: React.FC<ThumbData> = ({ thumb, title, xMouse }) => {

    return (
        <div className='table_line-image'
            style={{
                left: `${xMouse}px`
            }}>
            <Image
                src={thumb.src}
                width={thumb.dimensions.width}
                height={thumb.dimensions.height}
                alt={thumb.alt || `${title}`}
                sizes='20vw'
            />
        </div>
    )
}

export default TableItemThumb