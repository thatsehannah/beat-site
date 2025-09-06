import { createContext, ReactNode, useContext, useReducer } from "react";
import { mockPlaylist } from "./mockPlaylist";
import { playlistReducer, State } from "./reducer";

const PlaylistContext = createContext<any>(null);

const initialState: State = {
  isPlaying: false,
  seeked: false,
  currentIndex: 0,
  playlist: mockPlaylist,
};

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
