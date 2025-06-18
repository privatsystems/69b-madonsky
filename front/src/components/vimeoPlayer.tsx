import { use, useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

type Props = {
    videoId: string; // Peut être un ID numérique sous forme de string ou une URL complète
};

const VimeoPlayer = ({ videoId }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);
    const [ratio, setRatio] = useState(16 / 9);
    const [height, setHeight] = useState(600);
    const [width, setWidth] = useState(1066);

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
            setHeight(window.innerHeight * 0.6);
            setWidth(window.innerHeight * 0.6 * ratio);
        }
    }, [ratio]);

    return (
        <div
            style={{
                width,
                height,
                margin: '0 auto',
                background: '#000',
                overflow: 'hidden',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

export default VimeoPlayer;
