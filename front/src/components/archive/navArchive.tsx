import { useContext } from "react";
import { TableContext } from "./tableContext";


const NavArchive = () => {

    const { setImagesMode, imagesMode } = useContext(TableContext)

    const handleCLick = (condition: boolean) => {
        if (condition) {
            if (imagesMode) setImagesMode(null)
        } else {
            if (!imagesMode) setImagesMode('image')
        }
    }


    return (
        <nav className='navArchive'>
            <ul>
                <li
                    className={`navArchive_item ${!imagesMode ? 'active' : ''}`}
                    onClick={() => { handleCLick(true) }}
                ><span className='cercle'></span>Text</li>
                <li
                    className={`navArchive_item ${imagesMode ? 'active' : ''}`}
                    onClick={() => { handleCLick(false) }}
                ><span className='cercle'></span>Image</li>
            </ul>
        </nav>
    )
}

export default NavArchive