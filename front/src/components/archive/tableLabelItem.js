import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { TableContext } from './tableContext';

export default function TableLabelItem({ label, index }) {
    const { selectLabelIndex, setSelectLabelIndex, setLabelUp, labelUp, setSelectLine } = useContext(TableContext);
    const [select, setSelect] = useState(selectLabelIndex === index);
    const [up, setUp] = useState(labelUp);
    const [timeoutId, setTimeoutId] = useState(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (select && selectLabelIndex !== index) {
            animForSelectionLeave();
            setSelect(false);
        }
    }, [selectLabelIndex]);

    const handleMouseEnter = useCallback(() => {
        setTimeoutId(setTimeout(() => {
            if (!select) {
                animForSelectionEnter();
            } else {
                animForDirectionEnter();
            }
        }, 100));
    }, [select]);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(timeoutId);
        if (!select && !selected) {
            animForSelectionLeave();
        } else if (select && !selected) {
            animForDirectionLeave();
        }
        setSelected(false);
    }, [select, selected, timeoutId]);

    const handleMouseClick = useCallback(() => {
        setSelectLine(null);
        setSelected(true);
        if (!select) {
            setSelectLabelIndex(index);
            setLabelUp(false);
            setSelect(true);
        } else {
            setLabelUp(!up);
            setUp(!up);
            animForDirectionEnter();
        }
    }, [select, up]);

    const container = useRef();
    const selectorRef = useRef();
    const { contextSafe } = useGSAP({ scope: container });

    const animForDirectionEnter = contextSafe(() => {
        selectorRef.current.style.transform = `rotate(${up ? 0 : 180}deg)`;
        selectorRef.current.style.opacity = 1;
    });

    const animForDirectionLeave = contextSafe(() => {
        selectorRef.current.style.transform = `rotate(${up ? 180 : 0}deg)`;
        selectorRef.current.style.opacity = 1;
    });

    const animForSelectionEnter = contextSafe(() => {
        selectorRef.current.style.opacity = 1;
    });

    const animForSelectionLeave = contextSafe(() => {
        selectorRef.current.style.opacity = 0;
    });

    return (
        <div
            className={`${label}_item table_header-item ${select ? 'select' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
            ref={container}
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
}
