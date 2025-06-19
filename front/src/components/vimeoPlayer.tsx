import { useEffect, useRef, useState, useContext } from 'react';
import Player from '@vimeo/player';
import { SiteContext } from '@/context/siteContext';

type Props = {
    videoId: string; // Peut être un ID numérique sous forme de string ou une URL complète
    videoLegend: string | null; // Optionnel, pour afficher une légende ou un titre de vidéo
};

const horloge = '<svg viewBox="0 0 73 73" width="18" height="18"><path d="M36.5,73C16.37,73,0,56.63,0,36.5S16.37,0,36.5,0s36.5,16.37,36.5,36.5-16.37,36.5-36.5,36.5ZM36.5,8c-15.71,0-28.5,12.79-28.5,28.5s12.79,28.5,28.5,28.5,28.5-12.79,28.5-28.5-12.79-28.5-28.5-28.5Z" /><polygon points="32.78 16.03 32.78 38.11 24.55 46.33 29.86 51.64 40.46 41.03 40.46 16.03 32.78 16.03" /></svg>'

const VimeoPlayer = ({ videoId, videoLegend }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);
    const [ratio, setRatio] = useState(16 / 9);
    const [height, setHeight] = useState(600);
    const [width, setWidth] = useState(1066);

    const { isMob } = useContext(SiteContext);

    useEffect(() => {
        if (!containerRef.current || !videoId) return;

        // Détermine si c’est une URL complète ou un ID
        const isUrl = videoId.startsWith('http');
        const numericId = parseInt(videoId);

        // Si c’est ni une URL ni un ID valide, on quitte
        if (!isUrl && isNaN(numericId)) {
            console.warn('VimeoPlayer: Invalid videoId', videoId);
            return;
        }

        const player = new Player(containerRef.current, {
            ...(isUrl ? { url: videoId } : { id: numericId }),
            responsive: false,
        });

        playerRef.current = player;

        // Récupère le ratio de la vidéo pour l'affichage
        player.getVideoWidth().then((w) => {
            player.getVideoHeight().then((h) => {
                if (w && h) setRatio(w / h);
            });
        });

        return () => {
            player.destroy();
        };
    }, [videoId]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('isMob', isMob);
            if (!isMob) {
                setHeight(window.innerHeight * 0.6);
                setWidth(window.innerHeight * 0.6 * ratio);
            } else {

                setWidth(window.innerWidth - 30);
                setHeight((window.innerWidth - 30) * ratio);

            }
        }

    }, [ratio]);

    return (
        <div
            style={{
                width,
                height,
                margin: '0 auto',
                background: '#000',
                position: 'relative',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
            {videoLegend && <div className='scroller_pass' style={{
                position: 'absolute',
                top: height + 10
            }}>{videoLegend.replace(/◊/g, horloge)}</div>}

        </div>
    );
};

export default VimeoPlayer;
