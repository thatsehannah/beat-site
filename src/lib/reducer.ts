export type State = {
  isPlaying: boolean;
};

export type Action = { type: "play" } | { type: "pause" };

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
    default:
      throw new Error("Unknown action");
  }
};
