import { useState, useEffect } from 'react';
import Vimeo from '@u-wave/react-vimeo';

type VimeoInternalPlayer = {
    getVideoWidth: () => Promise<number>;
    getVideoHeight: () => Promise<number>;
};

type VimeoComponent = {
    getInternalPlayer: () => VimeoInternalPlayer;
};

const VimeoPlayer = ({ videoId }: { videoId: string }) => {
    const [ratio, setRatio] = useState(16 / 9);
    const [vimeoInstance, setVimeoInstance] = useState<VimeoComponent | null>(null);

    const height = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600;
    const width = height * ratio;

    // Quand on reçoit la vraie instance Vimeo, on récupère son player interne
    useEffect(() => {
        if (!vimeoInstance) return;

        const fetchRatio = async () => {
            try {
                // getInternalPlayer est une méthode sur l'instance Vimeo
                const internalPlayer = vimeoInstance.getInternalPlayer();
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
    }, [vimeoInstance, videoId]);

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
                // @ts-ignore
                ref={setVimeoInstance as any} // callback ref pour récupérer l'instance
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
