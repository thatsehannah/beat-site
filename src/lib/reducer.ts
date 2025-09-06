import { Track } from "./types";

export type State = {
  isPlaying: boolean;
  seeked: boolean;
  currentIndex: number;
  playlist: Track[];
};

export type Action =
  | { type: "play" }
  | { type: "pause" }
  | { type: "seeked" }
  | { type: "nextTrack"; payload: { playlist: Track[] } }
  | { type: "prevTrack"; payload: { playlist: Track[] } }
  | { type: "reset" };

export const playlistReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "play":
      return {
        ...state,
        isPlaying: true,
      };
    case "pause":
      return {
        ...state,
        isPlaying: false,
      };
    case "seeked":
      return {
        ...state,
        seeked: true,
      };
    case "nextTrack":
      return {
        ...state,
        currentIndex:
          state.currentIndex < action.payload.playlist.length - 1
            ? state.currentIndex + 1
            : 0,
      };
    case "prevTrack": {
      return {
        ...state,
        currentIndex: state.currentIndex - 1 > 0 ? state.currentIndex - 1 : 0,
      };
    }
    case "reset":
      return {
        ...state,
        seeked: false,
      };
    default:
      throw new Error("Unknown action");
  }
};
