import { ArchivesItem } from "@/types";
import GridTableItem from "./GridTableItem";
import GridTableLabelItem from "./GridTableLabelItem";
import { useContext, useState } from "react";
import GridItem from "./gridItem";
import { SiteContext } from "@/context/siteContext";


const labels = ['title', 'form', 'topics', 'year']

interface GridData {
    projetsClass: ArchivesItem[] | null;
}

const Grid: React.FC<GridData> = ({ projetsClass }) => {

    const { isMob } = useContext(SiteContext)
    const [imageHover, setImageHover] = useState(0)
    const [hide, setHide] = useState(true)

    return (
        <>
            <div className='table'>
                <div className='table_header-wrapper'>
                    <div className='table_header'>
                        {labels.map((label, index) => {
                            return <GridTableLabelItem label={label} index={index} key={`gridlabel-${label}`} />
                        })}
                    </div>
                </div>
                {!isMob && <div className='contentTable table_fixed'>
                    {projetsClass && projetsClass[imageHover] && <GridTableItem projet={projetsClass[imageHover]} hide={hide} />}
                </div>}
            </div>
            <div className='grid'>
                {projetsClass && projetsClass.map((projet, index) => {
                    if (projet.format == 'scroll') return <GridItem
                        key={`grid_item-${projet.title}`}
                        projet={projet}
                        index={index}
                        setImageHover={setImageHover}
                        setHide={setHide}
                    />
                })}
            </div>
        </>
    )

}

export default Grid