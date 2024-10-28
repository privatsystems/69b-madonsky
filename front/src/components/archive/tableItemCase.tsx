import { TableContext } from './tableContext'
import { useContext, useEffect, useState } from "react"

interface ItemTable {
    content: string | number;
    label: string;
    index: number;
}

const TableItemCase: React.FC<ItemTable> = ({ content, label, index }) => {

    const { selectLabelIndex } = useContext(TableContext)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (selectLabelIndex == 0) {
            if (index == 3) {
                setActive(true)
            } else {
                setActive(false)
            }
        } else {
            if (index == selectLabelIndex) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [selectLabelIndex])

    return <div className={`table_line-item ${label}_item ${active ? 'active' : ''}`} >{content}</div>
}

export default TableItemCase 