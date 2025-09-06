import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { mockPlaylist } from "./mockPlaylist";
import { Action, playlistReducer, State } from "./reducer";

type PlaylistContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

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

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};
