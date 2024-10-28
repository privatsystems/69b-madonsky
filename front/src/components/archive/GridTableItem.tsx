import { ArchivesItem } from "@/types"
import Link from "next/link"

interface ItemTable {
    projet: ArchivesItem;
    hide: boolean;
}

const GridTableItem: React.FC<ItemTable> = ({ projet, hide }) => {

    const { title, slug, form, topics, year } = projet

    const a = new Date(year)
    const anneego = a.getFullYear()

    return (
        <Link className='table_line' href={`${slug}`} key={title} style={{ opacity: hide ? 0 : 1 }}>
            <div className='table_line-item title_item'>{title}</div>
            <div className='table_line-item form_item'>{form}</div>
            <div className='table_line-item topics_item'>{topics}</div>
            <div className='table_line-item year_item'>{anneego}</div>
        </Link>
    )
}

export default GridTableItem