
import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

type Props = {
    videoId: string;
};

const VimeoPlayer = ({ videoId }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);
    const [ratio, setRatio] = useState(16 / 9);

    useEffect(() => {
        if (!containerRef.current) return;

        const player = new Player(containerRef.current, {
            id: parseInt(videoId),
            responsive: false,
        });

        playerRef.current = player;

        player.getVideoWidth().then((w) => {
            player.getVideoHeight().then((h) => {
                if (w && h) setRatio(w / h);
            });
        });

        return () => {
            player.destroy();
        };
    }, [videoId]);

    const height = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600;
    const width = height * ratio;

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
