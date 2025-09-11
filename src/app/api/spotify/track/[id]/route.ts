import { SpotifyTrack } from "@/lib/types";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const trackData = await trackRes.json();
  const spotifyTrack: SpotifyTrack = {
    name: trackData.name,
    artist: trackData.artists[0].name,
    albumCoverUrl: trackData.album.images[0].url,
    trackUri: trackData.external_urls.spotify,
  };

  return NextResponse.json(spotifyTrack);
};
