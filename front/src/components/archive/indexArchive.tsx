import { TableContext } from './tableContext';
import { ArchivesItem } from "@/types";
import { useContext, useEffect, useState } from "react";
import Table from "./table";
import Grid from "./grid";

interface TableData {
    content: ArchivesItem[];
}

const labels = ['title', 'form', 'topics', 'year'];

const IndexArchive: React.FC<TableData> = ({ content }) => {
    const projets = content;
    // const containerRef = useRef<HTMLDivElement | null>(null); // Typing the ref properly
    const { selectLabelIndex, labelUp, setSelectLine, imagesMode } = useContext(TableContext);

    const [projetsClass, setProjetsClass] = useState<ArchivesItem[] | null>(null);
    const [xMouse, setXMouse] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setXMouse(e.clientX);
        };

        if (!imagesMode) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [imagesMode]);

    useEffect(() => {
        const handleResize = () => {
            setSelectLine(null);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setSelectLine]);

    // Sorting function for projects based on selected label
    useEffect(() => {
        const sortProjectsByLabel = (projets: ArchivesItem[], label: keyof ArchivesItem) => {
            if (label === 'year') {
                return projets.slice().sort((a, b) => {
                    const yearA = new Date(a.year);
                    const yearB = new Date(b.year);
                    return yearA.getTime() - yearB.getTime();
                }).reverse();
            } else {
                return projets.slice().sort((a, b) => {
                    const valueA = a[label];
                    const valueB = b[label];
                    // Vérifie si les deux valeurs sont des chaînes avant d'utiliser localeCompare
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        return valueA.localeCompare(valueB);
                    }
                    return 0; // Si ce n'est pas une chaîne, ne pas trier
                });
            }
        };

        // Utilisation de `as keyof ArchivesItem` pour indiquer que les labels sont des clés valides
        const sortedProjects = sortProjectsByLabel(projets, labels[selectLabelIndex] as keyof ArchivesItem);
        setProjetsClass(labelUp ? sortedProjects.reverse() : sortedProjects);
    }, [projets, selectLabelIndex, labelUp]);

    return (
        <div>
            {!imagesMode && projetsClass && <Table projetsClass={projetsClass} xMouse={xMouse} />}
            {imagesMode && projetsClass && <Grid projetsClass={projetsClass} />}
        </div>
    );
};

export default IndexArchive;
