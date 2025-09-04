export type State = {
  isPlaying: boolean;
  seeked: boolean;
};

export type Action =
  | { type: "play" }
  | { type: "pause" }
  | { type: "seeked" }
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
    case "reset":
      return {
        ...state,
        seeked: false,
      };
    default:
      throw new Error("Unknown action");
  }
};
