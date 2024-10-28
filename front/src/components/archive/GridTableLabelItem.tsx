import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { TableContext } from './tableContext';

interface LabelItemProps {
    label: string;
    index: number;
}

const GridTableLabelItem: React.FC<LabelItemProps> = ({ label, index }) => {
    const { selectLabelIndex, setSelectLabelIndex, setLabelUp, labelUp, setSelectLine } = useContext(TableContext);
    const [select, setSelect] = useState(selectLabelIndex === index);
    const [up, setUp] = useState(labelUp);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (select && selectLabelIndex !== index) {
            animForSelectionLeave();
            setSelect(false);
        }
    }, [selectLabelIndex, index, select]);

    const handleMouseEnter = useCallback(() => {
        const newTimeoutId = setTimeout(() => {
            if (!select) {
                animForSelectionEnter();
            } else {
                animForDirectionEnter();
            }
        }, 100);
        setTimeoutId(newTimeoutId);
    }, [select]);

    const handleMouseLeave = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (!select) {
            animForSelectionLeave();
        } else {
            animForDirectionLeave();
        }
    }, [select, timeoutId]);

    const handleMouseClick = useCallback(() => {
        setSelectLine(null);
        if (!select) {
            setSelectLabelIndex(index);
            setLabelUp(false);
            setSelect(true);
        } else {
            setLabelUp(!up);
            setUp(!up);
            animForDirectionEnter();
        }
    }, [select, setSelectLabelIndex, setLabelUp, index, up]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const selectorRef = useRef<HTMLDivElement | null>(null);

    // Initialize GSAP animations using useGSAP
    const { contextSafe } = useGSAP({ scope: containerRef });

    const animForDirectionEnter = contextSafe(() => {
        if (selectorRef.current) {
            selectorRef.current.style.transform = `rotate(${up ? 0 : 180}deg)`;
            selectorRef.current.style.opacity = '1';
        }
    });

    const animForDirectionLeave = contextSafe(() => {
        if (selectorRef.current) {
            selectorRef.current.style.transform = `rotate(${up ? 180 : 0}deg)`;
            selectorRef.current.style.opacity = '1';
        }
    });

    const animForSelectionEnter = contextSafe(() => {
        if (selectorRef.current) {
            selectorRef.current.style.opacity = '1';
        }
    });

    const animForSelectionLeave = contextSafe(() => {
        if (selectorRef.current) {
            selectorRef.current.style.opacity = '0';
        }
    });

    return (
        <div
            className={`${label}_item table_header-item ${select ? 'select' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
            ref={containerRef}
        >
            {label}
            <div className='table_header-icon'>
                <div
                    className='selector'
                    ref={selectorRef}
                    style={{ opacity: select ? 1 : 0 }}
                >
                    ↓
                </div>
            </div>
        </div>
    );
};

export default GridTableLabelItem;
