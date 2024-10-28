import { ArchivesItem } from "@/types";
import TableItem from "./tableItem"
import TableLabelItem from "./tableLabelItem"

const labels = ['title', 'form', 'topics', 'year']

interface TableData {
    projetsClass: ArchivesItem[] | null;
    xMouse: number;
}

const Table: React.FC<TableData> = ({ projetsClass, xMouse }) => {

    return (
        <div className='table'>
            <div className='table_header-wrapper'>
                <div className='table_header'>
                    {labels.map((label, index) => {
                        return <TableLabelItem label={label} index={index} key={`tableItem-${label}`} />
                    })}
                </div>
            </div>
            <div className={`contentTable`}>
                {projetsClass && projetsClass.map((projet: ArchivesItem) => {
                    if (projet.format == 'scroll') return <TableItem projet={projet} key={`tableItem-${projet.title}`} xMouse={xMouse} />
                })}
            </div>
        </div>
    )

}

export default Table