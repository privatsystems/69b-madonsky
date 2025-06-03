'use client';

import { useRef, useEffect, useState } from 'react';
import Vimeo from '@u-wave/react-vimeo';

type VimeoInternalPlayer = {
    getVideoWidth: () => Promise<number>;
    getVideoHeight: () => Promise<number>;
};

type VimeoComponentRef = {
    getInternalPlayer: () => VimeoInternalPlayer;
};

const VimeoPlayer = ({ videoId }: { videoId: string }) => {
    const playerRef = useRef<VimeoComponentRef | null>(null);
    const [ratio, setRatio] = useState(16 / 9); // Fallback ratio

    // On utilise 60vh pour la hauteur
    const height = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600;
    const width = height * ratio;

    useEffect(() => {
        const fetchRatio = async () => {
            try {
                const internalPlayer = playerRef.current?.getInternalPlayer?.();
                if (!internalPlayer) return;

                const [w, h] = await Promise.all([
                    internalPlayer.getVideoWidth(),
                    internalPlayer.getVideoHeight(),
                ]);

                if (w && h) {
                    setRatio(w / h);
                }
            } catch (err) {
                console.error('Erreur récupération ratio Vimeo:', err);
            }
        };

        fetchRatio();
    }, [videoId]);

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
            <Vimeo
                video={videoId}
                ref={playerRef as any}
                responsive={false}
                controls
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    display: 'block',
                }}
            />
        </div>
    );
};

export default VimeoPlayer;
