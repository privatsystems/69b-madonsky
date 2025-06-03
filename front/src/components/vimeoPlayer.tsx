
import { useRef, useEffect, useState } from 'react';
import Vimeo from '@u-wave/react-vimeo';

type VimeoInternalPlayer = {
    getVideoWidth: () => Promise<number>;
    getVideoHeight: () => Promise<number>;
};

type VimeoComponent = {
    getInternalPlayer: () => VimeoInternalPlayer;
};

const VimeoPlayer = ({ videoId }: { videoId: string }) => {
    // On dit que playerRef peut être n'importe quel objet (on perd un peu de typage ici)
    const playerRef = useRef<unknown>(null);
    const [ratio, setRatio] = useState(16 / 9);

    const height = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600;
    const width = height * ratio;

    useEffect(() => {
        const fetchRatio = async () => {
            try {
                // On force un cast ici, en gardant l'usage safe dans la fonction
                const internalPlayer = (playerRef.current as VimeoComponent | null)?.getInternalPlayer?.();
                if (!internalPlayer) return;

                const [w, h] = await Promise.all([
                    internalPlayer.getVideoWidth(),
                    internalPlayer.getVideoHeight(),
                ]);

                if (w && h) setRatio(w / h);
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
            {/* @ts-expect-error Le typage du ref ne correspond pas exactement, on ignore ici */}
            <Vimeo
                video={videoId}
                ref={playerRef as React.Ref<Vimeo>}
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
