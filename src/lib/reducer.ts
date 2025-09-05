export type State = {
  isPlaying: boolean;
  seeked: boolean;
  currentIndex: number;
};

export type Action =
  | { type: "play" }
  | { type: "pause" }
  | { type: "seeked" }
  | { type: "nextTrack"; payload: { playlistLength: number } }
  | { type: "prevTrack" }
  | { type: "reset" };

export const musicPlayerReducer = (state: State, action: Action): State => {
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
          state.currentIndex < action.payload.playlistLength - 1
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
