import { createContext, useContext, useState, ReactNode } from 'react';

type PlaybackContextType = {
  play: (player: HTMLAudioElement) => void;
  pause: (player: HTMLAudioElement) => void;
};

const PlaybackContext = createContext<PlaybackContextType | undefined>(
  undefined
);

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}

type PlaybackProviderProps = {
  children: ReactNode;
};

export function PlaybackProvider({ children }: PlaybackProviderProps) {
  const [activePlayer, setActivePlayer] = useState<HTMLAudioElement | null>(
    null
  );

  const play = (player: HTMLAudioElement) => {
    if (activePlayer && activePlayer !== player) {
      activePlayer.pause();
    }
    setActivePlayer(player);
    player.play();
  };

  const pause = (player: HTMLAudioElement) => {
    if (activePlayer === player) {
      setActivePlayer(null);
      player.pause();
    }
  };

  return (
    <PlaybackContext.Provider value={{ play, pause }}>
      {children}
    </PlaybackContext.Provider>
  );
}
