import { User } from "./dpop";

export interface Artist {
  id: number;
  name: string;
  slug: string;
  profile_picture: string;
  bio: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ArtworkData {
  image: string;
  collaborators: number[];
}

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  description: string;
  artist: Artist;
  data: ArtworkData;
  meta: any[];
}

export interface Content {
  id: number;
  user: User;
  data: {
    width: number;
    height: number;
    type: string;
    youtubeId?: string;
  };
  caption: string;
  timestamp: string;
  artwork: Artwork;
}