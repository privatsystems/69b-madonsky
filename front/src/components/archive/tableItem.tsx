import { ArchivesItem } from "@/types"
import Link from "next/link"
import TableItemThumb from "./tableItemThumb"
import TableItemCase from "./tableItemCase"

interface ItemTable {
    projet: ArchivesItem
    xMouse: number
}


const TableItem: React.FC<ItemTable> = ({ projet, xMouse }) => {

    const { title, slug, form, topics, year, thumb } = projet

    const cases = [{
        label: 'title',
        content: title,
    }, {
        label: 'form',
        content: form,
    }, {
        label: 'topics',
        content: topics,
    }, {
        label: 'year',
        content: year,
    }]


    return (
        <Link className='table_line' href={`${slug}`} key={title}>
            {cases.map((c, index) => {
                return <TableItemCase content={c.content} label={c.label} key={`${index}${c.content}-${title}`} index={index} />
            })}
            {thumb && <TableItemThumb title={title} thumb={thumb} xMouse={xMouse} />}
        </Link>
    )
}

export default TableItem