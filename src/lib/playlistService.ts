import { type Track } from "./types";

export const getAllTracks = async (): Promise<Track[]> => {
  try {
    const response = await fetch("/api/tracks");
    if (response.ok) {
      const data = await response.json();

      return data;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error in getAllTracks:", error);
    throw error;
  }
};
